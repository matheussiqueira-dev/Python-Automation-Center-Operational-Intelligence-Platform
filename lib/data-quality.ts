import messyDatasetsJson from "@/data/messy-datasets.json";
import { getAutomationBySlug } from "@/lib/mock-data";
import type {
  DataQualityIssue,
  DataQualityIssueType,
  DataQualityReport,
  DataQualitySeverity,
  DatasetProfile,
  DatasetRecord,
} from "@/lib/types";

const messyDatasets = messyDatasetsJson as Record<string, DatasetRecord[]>;

const datasetCatalog: Record<string, Omit<DatasetProfile, "records">> = {
  "limpeza-planilhas-administrativas": {
    id: "limpeza-planilhas-administrativas",
    name: "Base administrativa bruta",
    description: "Registros administrativos com nomes, documentos ficticios, datas, valores, centro de custo e status.",
    owner: "Operacoes",
    requiredColumns: ["nome", "cpf_ficticio", "setor", "data", "valor", "centro_custo", "status"],
    expectedDateColumns: ["data"],
    numericColumns: ["valor"],
    categoryColumns: ["nome", "setor", "categoria", "status"],
  },
  "consolidacao-multiplos-arquivos": {
    id: "consolidacao-multiplos-arquivos",
    name: "Arquivos departamentais",
    description: "Bases recebidas de areas diferentes antes da consolidacao operacional.",
    owner: "Controladoria",
    requiredColumns: ["setor", "categoria", "valor", "centro_custo"],
    expectedDateColumns: ["data"],
    numericColumns: ["valor"],
    categoryColumns: ["setor", "categoria", "status"],
  },
  "auditoria-qualidade-dados": {
    id: "auditoria-qualidade-dados",
    name: "Dataset de auditoria",
    description: "Amostra de auditoria usada para validar completude, unicidade, validade e consistencia.",
    owner: "Governanca de dados",
    requiredColumns: ["nome", "cpf_ficticio", "data", "valor", "status"],
    expectedDateColumns: ["data"],
    numericColumns: ["valor"],
    categoryColumns: ["nome", "setor", "categoria", "status"],
  },
};

export function getDatasetProfiles(): DatasetProfile[] {
  return Object.entries(datasetCatalog).map(([id, metadata]) => ({
    ...metadata,
    records: messyDatasets[id] ?? [],
  }));
}

export function getDatasetProfile(id: string) {
  return getDatasetProfiles().find((dataset) => dataset.id === id);
}

function scoreLabel(score: number): DataQualityReport["scoreLabel"] {
  if (score >= 90) return "Excelente";
  if (score >= 75) return "Bom";
  if (score >= 60) return "Atencao";
  return "Critico";
}

function severityFor(type: DataQualityIssueType): DataQualitySeverity {
  if (type === "obrigatorio_ausente" || type === "data_invalida" || type === "valor_negativo") return "alto";
  if (type === "duplicidade" || type === "tipo_invalido" || type === "outlier") return "medio";
  if (type === "texto_inconsistente") return "baixo";
  return "medio";
}

function isEmpty(value: DatasetRecord[string] | null) {
  return value === null || value === undefined || value === "";
}

function isValidDate(value: string) {
  const brDate = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!brDate) return false;
  const day = Number(brDate[1]);
  const month = Number(brDate[2]);
  const year = Number(brDate[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function toNumber(value: DatasetRecord[string] | null) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;
  const normalized = value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function addIssue(
  issues: DataQualityIssue[],
  datasetId: string,
  rowId: string,
  column: string,
  type: DataQualityIssueType,
  message: string,
  recommendation: string,
  impact: string,
) {
  issues.push({
    id: `${datasetId}-${rowId}-${column}-${type}-${issues.length + 1}`,
    datasetId,
    rowId,
    column,
    type,
    severity: severityFor(type),
    message,
    recommendation,
    impact,
  });
}

function detectOutliers(values: Array<{ rowId: string; column: string; value: number }>) {
  if (values.length < 3) return new Set<string>();
  const sorted = [...values].sort((a, b) => a.value - b.value);
  const q1 = sorted[Math.floor((sorted.length - 1) * 0.25)].value;
  const q3 = sorted[Math.floor((sorted.length - 1) * 0.75)].value;
  const iqr = q3 - q1;
  const lower = q1 - iqr * 1.5;
  const upper = q3 + iqr * 1.5;
  return new Set(values.filter((item) => item.value < lower || item.value > upper).map((item) => `${item.rowId}:${item.column}`));
}

export function analyzeDatasetQuality(dataset: DatasetProfile): DataQualityReport {
  const issues: DataQualityIssue[] = [];
  const duplicateIds = new Map<string, number>();
  const numericValues: Array<{ rowId: string; column: string; value: number }> = [];

  for (const row of dataset.records) {
    duplicateIds.set(row.id, (duplicateIds.get(row.id) ?? 0) + 1);

    for (const column of dataset.requiredColumns) {
      if (isEmpty(row[column])) {
        addIssue(
          issues,
          dataset.id,
          row.id,
          column,
          "obrigatorio_ausente",
          `Campo obrigatorio ${column} ausente.`,
          "Bloquear o registro para revisao antes do relatorio executivo.",
          "Pode distorcer KPIs e filtros gerenciais.",
        );
      }
    }

    for (const column of dataset.expectedDateColumns) {
      const value = row[column];
      if (typeof value === "string" && !isValidDate(value)) {
        addIssue(
          issues,
          dataset.id,
          row.id,
          column,
          "data_invalida",
          `Data invalida em ${column}.`,
          "Normalizar para dd/mm/yyyy e rejeitar datas impossiveis.",
          "Afeta series historicas e fechamento por periodo.",
        );
      }
    }

    for (const column of dataset.numericColumns) {
      const value = row[column];
      const parsed = toNumber(value);
      if (!isEmpty(value) && parsed === null) {
        addIssue(
          issues,
          dataset.id,
          row.id,
          column,
          "tipo_invalido",
          `Valor numerico invalido em ${column}.`,
          "Converter moeda e separadores antes de calcular indicadores.",
          "Pode quebrar agregacoes financeiras.",
        );
      }
      if (parsed !== null) {
        numericValues.push({ rowId: row.id, column, value: parsed });
        if (parsed < 0) {
          addIssue(
            issues,
            dataset.id,
            row.id,
            column,
            "valor_negativo",
            `Valor negativo indevido em ${column}.`,
            "Validar excecao com a area dona antes de consolidar.",
            "Pode inverter leitura de custo ou receita.",
          );
        }
      }
    }

    for (const column of dataset.categoryColumns) {
      const value = row[column];
      if (typeof value === "string" && (value.trim() !== value || /\s{2,}/.test(value) || value === value.toUpperCase())) {
        addIssue(
          issues,
          dataset.id,
          row.id,
          column,
          "texto_inconsistente",
          `Texto inconsistente em ${column}.`,
          "Aplicar trim, capitalizacao e mapa de categorias.",
          "Pode criar agrupamentos duplicados no dashboard.",
        );
      }
    }
  }

  for (const [rowId, count] of duplicateIds.entries()) {
    if (count > 1) {
      addIssue(
        issues,
        dataset.id,
        rowId,
        "id",
        "duplicidade",
        "Registro duplicado por identificador.",
        "Deduplicar por chave composta e manter trilha de auditoria.",
        "Distorce totais, volumetria e contagem de processos.",
      );
    }
  }

  const outliers = detectOutliers(numericValues);
  for (const item of numericValues) {
    if (outliers.has(`${item.rowId}:${item.column}`)) {
      addIssue(
        issues,
        dataset.id,
        item.rowId,
        item.column,
        "outlier",
        `Outlier simples detectado em ${item.column}.`,
        "Confirmar excecao operacional antes de usar no relatorio final.",
        "Pode distorcer medias, tendencias e previsoes.",
      );
    }
  }

  const columns = Array.from(new Set([...dataset.requiredColumns, ...dataset.expectedDateColumns, ...dataset.numericColumns, ...dataset.categoryColumns]));
  const completenessByColumn = columns.map((column) => {
    const filled = dataset.records.filter((row) => !isEmpty(row[column])).length;
    return {
      column,
      completeness: dataset.records.length ? Math.round((filled / dataset.records.length) * 100) : 100,
    };
  });

  const issueTypeSeries = Object.entries(
    issues.reduce<Record<string, number>>((acc, issue) => {
      acc[issue.type] = (acc[issue.type] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([type, count]) => ({ type: type as DataQualityIssueType, count }));

  const automation = getAutomationBySlug(dataset.id);
  const fallbackPenalty = issues.reduce((total, issue) => total + (issue.severity === "alto" ? 10 : issue.severity === "medio" ? 7 : 4), 0);
  const score = automation?.qualityBefore ?? Math.max(0, Math.min(100, 100 - fallbackPenalty));

  return {
    id: `dq-${dataset.id}`,
    datasetId: dataset.id,
    datasetName: dataset.name,
    generatedAt: "2026-07-07T10:00:00-03:00",
    score,
    scoreLabel: scoreLabel(score),
    totalRecords: dataset.records.length,
    totalIssues: issues.length,
    issues,
    completenessByColumn,
    issueTypeSeries,
    executiveSummary: `${dataset.name} recebeu score ${score} (${scoreLabel(score)}) com ${issues.length} problemas detectados em ${dataset.records.length} registros.`,
    recommendations: [
      "Validar campos obrigatorios antes de consolidar a base.",
      "Padronizar datas, moedas e categorias no ponto de entrada.",
      "Manter logs de deduplicacao e excecoes para auditoria.",
    ],
  };
}

export function analyzeDatasetById(datasetId: string) {
  const dataset = getDatasetProfile(datasetId);
  return dataset ? analyzeDatasetQuality(dataset) : null;
}

export function getDataQualityReports() {
  return getDatasetProfiles().map((dataset) => analyzeDatasetQuality(dataset));
}
