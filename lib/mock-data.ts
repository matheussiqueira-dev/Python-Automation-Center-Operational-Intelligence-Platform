import automationsJson from "@/data/automations.json";
import executionHistoryJson from "@/data/execution-history.json";
import messyDatasetsJson from "@/data/messy-datasets.json";
import processedDatasetsJson from "@/data/processed-datasets.json";
import insightsJson from "@/data/insights.json";
import { aggregateDashboardMetrics } from "@/lib/calculations";
import { generateInsightsForAutomation, generatePortfolioInsights } from "@/lib/insights";
import type {
  Automation,
  AutomationRunResult,
  DatasetRecord,
  ExecutionHistoryEntry,
  GeneratedFile,
  Insight,
} from "@/lib/types";

const automations = automationsJson as Automation[];
const executionHistory = executionHistoryJson as ExecutionHistoryEntry[];
const messyDatasets = messyDatasetsJson as Record<string, DatasetRecord[]>;
const processedDatasets = processedDatasetsJson as Record<string, DatasetRecord[]>;
const staticInsights = insightsJson as Insight[];

export function getAutomations() {
  return automations;
}

export function getAutomationBySlug(slug: string) {
  return automations.find((automation) => automation.slug === slug);
}

export function getDatasetsForAutomation(slug: string) {
  return {
    before: messyDatasets[slug] ?? [],
    after: processedDatasets[slug] ?? [],
  };
}

export function getExecutionHistory() {
  return executionHistory;
}

export function getDashboardMetrics() {
  return aggregateDashboardMetrics(automations);
}

export function getDashboardInsights() {
  return [...generatePortfolioInsights(automations), ...staticInsights].slice(0, 6);
}

export function getDownloadFiles(): GeneratedFile[] {
  return automations.flatMap((automation) => automation.files);
}

export function buildAutomationRunResult(slug: string): AutomationRunResult | null {
  const automation = getAutomationBySlug(slug);

  if (!automation) {
    return null;
  }

  return {
    automationId: automation.id,
    status: "success",
    durationMs: 4200 + automation.fixedIssues * 4,
    processedRecords: automation.processedRecords,
    fixedIssues: automation.fixedIssues,
    beforeQualityScore: automation.qualityBefore,
    afterQualityScore: automation.qualityAfter,
    logs: [
      {
        timestamp: "10:42:03",
        type: "info",
        message: `Dataset recebido com ${automation.processedRecords.toLocaleString("pt-BR")} registros.`,
        severity: "info",
        step: "Recebendo base",
      },
      {
        timestamp: "10:42:04",
        type: "warning",
        message: `${automation.fixedIssues.toLocaleString("pt-BR")} inconsistencias identificadas para tratamento.`,
        severity: "warning",
        step: "Identificando inconsistencias",
      },
      {
        timestamp: "10:42:05",
        type: "success",
        message: `${automation.duplicatesRemoved.toLocaleString("pt-BR")} duplicidades removidas e ${automation.standardizedFields.toLocaleString("pt-BR")} campos padronizados.`,
        severity: "success",
        step: "Aplicando regras de limpeza",
      },
      {
        timestamp: "10:42:06",
        type: "success",
        message: "Relatorio executivo gerado com sucesso.",
        severity: "success",
        step: "Finalizando arquivos",
      },
    ],
    insights: generateInsightsForAutomation(automation),
    files: automation.files,
  };
}
