from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
SAMPLES_DIR = ROOT / "public" / "samples"


AUTOMATIONS = [
    {
        "id": "auto-001",
        "slug": "limpeza-planilhas-administrativas",
        "name": "Limpeza de planilhas administrativas",
        "category": "Tratamento de dados",
        "description": "Padroniza nomes, CPFs, datas, duplicidades e valores monetarios em bases administrativas.",
        "problem": "Bases recebidas de setores diferentes chegam com campos vazios, formatos divergentes e registros duplicados, consumindo horas de conferencia manual.",
        "status": "ready",
        "impact": "critical",
        "manualTimeHours": 18,
        "automatedTimeHours": 1.8,
        "estimatedSavingsHours": 16.2,
        "estimatedSavingsBRL": 1944,
        "processedRecords": 1240,
        "fixedIssues": 312,
        "duplicatesRemoved": 128,
        "standardizedFields": 936,
        "qualityBefore": 61,
        "qualityAfter": 94,
        "reworkReduction": 82,
        "errorTypes": [
            {"name": "Duplicidades", "value": 128},
            {"name": "CPF invalido", "value": 37},
            {"name": "Data invalida", "value": 44},
            {"name": "Valor fora do padrao", "value": 103},
        ],
    },
    {
        "id": "auto-002",
        "slug": "consolidacao-multiplos-arquivos",
        "name": "Consolidacao de multiplos arquivos",
        "category": "ETL",
        "description": "Une bases setoriais, normaliza colunas divergentes e gera uma visao consolidada por area.",
        "problem": "Relatorios mensais dependem de planilhas avulsas com nomenclaturas diferentes, categorias inconsistentes e registros repetidos.",
        "status": "ready",
        "impact": "high",
        "manualTimeHours": 16,
        "automatedTimeHours": 2.1,
        "estimatedSavingsHours": 13.9,
        "estimatedSavingsBRL": 1668,
        "processedRecords": 2180,
        "fixedIssues": 286,
        "duplicatesRemoved": 96,
        "standardizedFields": 654,
        "qualityBefore": 64,
        "qualityAfter": 92,
        "reworkReduction": 76,
        "errorTypes": [
            {"name": "Colunas divergentes", "value": 94},
            {"name": "Categorias inconsistentes", "value": 86},
            {"name": "Duplicidades", "value": 96},
            {"name": "Setor ausente", "value": 10},
        ],
    },
    {
        "id": "auto-003",
        "slug": "geracao-relatorio-executivo",
        "name": "Geracao de relatorio executivo",
        "category": "Business Intelligence",
        "description": "Transforma indicadores tratados em resumo gerencial com KPIs, graficos e recomendacoes.",
        "problem": "A preparacao de relatorios executivos exige consolidar metricas, revisar excecoes e montar apresentacoes manualmente.",
        "status": "success",
        "impact": "high",
        "manualTimeHours": 12,
        "automatedTimeHours": 1.4,
        "estimatedSavingsHours": 10.6,
        "estimatedSavingsBRL": 1272,
        "processedRecords": 960,
        "fixedIssues": 148,
        "duplicatesRemoved": 18,
        "standardizedFields": 420,
        "qualityBefore": 70,
        "qualityAfter": 96,
        "reworkReduction": 71,
        "errorTypes": [
            {"name": "Indicador ausente", "value": 42},
            {"name": "Periodo inconsistente", "value": 38},
            {"name": "Valor fora do padrao", "value": 50},
            {"name": "Duplicidades", "value": 18},
        ],
    },
    {
        "id": "auto-004",
        "slug": "auditoria-qualidade-dados",
        "name": "Auditoria de qualidade de dados",
        "category": "Governanca",
        "description": "Mapeia nulos, duplicidades, formatos invalidos, outliers e severidade por coluna.",
        "problem": "Times operacionais tomam decisoes com bases sem diagnostico de qualidade, aumentando risco e retrabalho.",
        "status": "attention",
        "impact": "critical",
        "manualTimeHours": 14,
        "automatedTimeHours": 2.3,
        "estimatedSavingsHours": 11.7,
        "estimatedSavingsBRL": 1404,
        "processedRecords": 1750,
        "fixedIssues": 401,
        "duplicatesRemoved": 72,
        "standardizedFields": 588,
        "qualityBefore": 58,
        "qualityAfter": 91,
        "reworkReduction": 79,
        "errorTypes": [
            {"name": "Campos obrigatorios ausentes", "value": 112},
            {"name": "Outliers", "value": 76},
            {"name": "Formato invalido", "value": 141},
            {"name": "Duplicidades", "value": 72},
        ],
    },
    {
        "id": "auto-005",
        "slug": "rotina-financeira-operacional",
        "name": "Rotina financeira e operacional",
        "category": "Operacoes",
        "description": "Classifica despesas, contratos, chamados e centros de custo para alertas de eficiencia.",
        "problem": "Acompanhamentos financeiros e operacionais dependem de filtros manuais para identificar anomalias, atrasos e variacoes mensais.",
        "status": "ready",
        "impact": "medium",
        "manualTimeHours": 10,
        "automatedTimeHours": 1.6,
        "estimatedSavingsHours": 8.4,
        "estimatedSavingsBRL": 1008,
        "processedRecords": 1420,
        "fixedIssues": 219,
        "duplicatesRemoved": 42,
        "standardizedFields": 364,
        "qualityBefore": 67,
        "qualityAfter": 90,
        "reworkReduction": 68,
        "errorTypes": [
            {"name": "Centro de custo invalido", "value": 63},
            {"name": "Contrato sem status", "value": 45},
            {"name": "Anomalia de valor", "value": 69},
            {"name": "Duplicidades", "value": 42},
        ],
    },
]


TIMELINE = [
    "Recebendo base",
    "Validando estrutura",
    "Identificando inconsistencias",
    "Aplicando regras de limpeza",
    "Consolidando informacoes",
    "Gerando relatorio",
    "Finalizando arquivos",
]


RULES = [
    {
        "field": "Data de admissao",
        "original": "32/13/2025",
        "correction": "Registro marcado como invalido",
        "rule": "Validacao de data no padrao dd/mm/yyyy",
        "impact": "Removido do calculo mensal ate correcao da origem",
    },
    {
        "field": "CPF",
        "original": "123.456.789-00",
        "correction": "CPF sinalizado para revisao",
        "rule": "Checagem de digitos verificadores ficticios",
        "impact": "Evita consolidacao de cadastro inconsistente",
    },
    {
        "field": "Valor",
        "original": "R$ 1.240,8",
        "correction": "1240.80",
        "rule": "Normalizacao monetaria para decimal",
        "impact": "Padroniza calculos financeiros e graficos",
    },
]


def make_files(slug: str) -> list[dict[str, str]]:
    return [
        {
            "id": f"{slug}-raw",
            "name": "raw-administrative-base.csv",
            "type": "CSV",
            "size": "32 KB",
            "generatedAt": "2026-05-21",
            "automationSlug": slug,
            "href": "/samples/raw-administrative-base.csv",
        },
        {
            "id": f"{slug}-processed",
            "name": "processed-administrative-base.csv",
            "type": "CSV",
            "size": "28 KB",
            "generatedAt": "2026-05-21",
            "automationSlug": slug,
            "href": "/samples/processed-administrative-base.csv",
        },
        {
            "id": f"{slug}-report",
            "name": "executive-report-sample.json",
            "type": "JSON",
            "size": "18 KB",
            "generatedAt": "2026-05-21",
            "automationSlug": slug,
            "href": "/samples/executive-report-sample.json",
        },
        {
            "id": f"{slug}-quality",
            "name": "quality-checklist.json",
            "type": "CHECKLIST",
            "size": "9 KB",
            "generatedAt": "2026-05-21",
            "automationSlug": slug,
            "href": "/samples/quality-checklist.json",
        },
    ]


def enrich_automations() -> list[dict]:
    enriched = []
    tones = ["green", "blue", "amber", "rose"]

    for automation in AUTOMATIONS:
        item = dict(automation)
        item["timeline"] = TIMELINE
        item["rules"] = RULES
        item["files"] = make_files(item["slug"])
        item["kpis"] = [
            {"label": "Registros processados", "value": f"{item['processedRecords']:,}".replace(",", "."), "delta": "+100%", "tone": tones[0]},
            {"label": "Inconsistencias corrigidas", "value": f"{item['fixedIssues']:,}".replace(",", "."), "delta": f"+{item['reworkReduction']}%", "tone": tones[1]},
            {"label": "Horas economizadas", "value": f"{item['estimatedSavingsHours']}h", "delta": "-retrabalho", "tone": tones[2]},
            {"label": "Score final", "value": f"{item['qualityAfter']}%", "delta": f"+{item['qualityAfter'] - item['qualityBefore']} pts", "tone": tones[3]},
        ]
        enriched.append(item)

    return enriched


def build_datasets() -> tuple[dict[str, list[dict]], dict[str, list[dict]]]:
    messy_rows = [
        {
            "id": "ADM-001",
            "nome": "ana  silva",
            "cpf": "123.456.789-00",
            "setor": "fin",
            "data": "32/13/2025",
            "valor": "R$ 1.240,8",
            "status": "ativo",
            "inconsistencies": ["nome", "cpf", "data", "valor"],
        },
        {
            "id": "ADM-002",
            "nome": "BRUNO COSTA",
            "cpf": "00000000000",
            "setor": "",
            "data": "2025-04-12",
            "valor": "845,00",
            "status": "pendente",
            "inconsistencies": ["cpf", "setor", "data"],
        },
        {
            "id": "ADM-002",
            "nome": "Bruno Costa",
            "cpf": "00000000000",
            "setor": "Financeiro",
            "data": "12/04/2025",
            "valor": "845.00",
            "status": "pendente",
            "inconsistencies": ["duplicidade", "cpf"],
        },
        {
            "id": "ADM-004",
            "nome": "carla lima",
            "cpf": "987.654.321-99",
            "setor": "Operacoes",
            "data": "",
            "valor": "R$ -",
            "status": "sem status",
            "inconsistencies": ["data", "valor", "status"],
        },
    ]
    processed_rows = [
        {
            "id": "ADM-001",
            "nome": "Ana Silva",
            "cpf": "CPF invalido - revisar",
            "setor": "Financeiro",
            "data": "Data invalida",
            "valor": "1240.80",
            "status": "Ativo",
            "corrections": ["nome padronizado", "cpf sinalizado", "data sinalizada", "valor normalizado"],
        },
        {
            "id": "ADM-002",
            "nome": "Bruno Costa",
            "cpf": "CPF invalido - revisar",
            "setor": "Financeiro",
            "data": "12/04/2025",
            "valor": "845.00",
            "status": "Pendente",
            "corrections": ["duplicidade removida", "setor preenchido", "data normalizada"],
        },
        {
            "id": "ADM-004",
            "nome": "Carla Lima",
            "cpf": "987.654.321-99",
            "setor": "Operacoes",
            "data": "Pendente de origem",
            "valor": "0.00",
            "status": "Em revisao",
            "corrections": ["nome padronizado", "valor zerado para auditoria", "status corrigido"],
        },
    ]

    messy = {automation["slug"]: messy_rows for automation in AUTOMATIONS}
    processed = {automation["slug"]: processed_rows for automation in AUTOMATIONS}
    return messy, processed


def write_json(path: Path, payload: object) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def write_csv(path: Path, rows: list[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=[key for key in rows[0].keys() if key not in {"inconsistencies", "corrections"}])
        writer.writeheader()
        for row in rows:
            writer.writerow({key: value for key, value in row.items() if key in writer.fieldnames})


def main() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    SAMPLES_DIR.mkdir(parents=True, exist_ok=True)

    automations = enrich_automations()
    messy, processed = build_datasets()

    history = [
        {"month": "Jan", "runs": 5, "records": 1280, "hoursSaved": 18, "savingsBRL": 2160, "qualityScore": 82},
        {"month": "Fev", "runs": 7, "records": 2140, "hoursSaved": 24, "savingsBRL": 2880, "qualityScore": 86},
        {"month": "Mar", "runs": 8, "records": 2940, "hoursSaved": 31, "savingsBRL": 3720, "qualityScore": 89},
        {"month": "Abr", "runs": 10, "records": 3820, "hoursSaved": 42, "savingsBRL": 5040, "qualityScore": 92},
        {"month": "Mai", "runs": 12, "records": 4610, "hoursSaved": 51, "savingsBRL": 6120, "qualityScore": 94},
    ]

    insights = [
        {
            "id": "recurring-duplicates",
            "title": "Duplicidades recorrentes",
            "description": "Duplicidades aparecem em todos os fluxos simulados e devem ser tratadas antes da consolidacao mensal.",
            "severity": "medium",
            "category": "governanca",
            "recommendation": "Criar uma chave de negocio por origem e setor antes da carga final.",
        }
    ]

    report = {
        "title": "Executive Report Sample",
        "summary": "Amostra de relatorio executivo gerado pela plataforma com KPIs, logs e recomendacoes.",
        "generatedAt": "2026-05-21",
        "credits": "Desenvolvido por Matheus Siqueira - https://www.matheussiqueira.dev",
    }

    quality_checklist = {
        "items": [
            "Campos obrigatorios validados",
            "Duplicidades removidas",
            "Datas normalizadas",
            "Valores monetarios padronizados",
            "Logs de execucao preservados",
        ]
    }

    write_json(DATA_DIR / "automations.json", automations)
    write_json(DATA_DIR / "messy-datasets.json", messy)
    write_json(DATA_DIR / "processed-datasets.json", processed)
    write_json(DATA_DIR / "execution-history.json", history)
    write_json(DATA_DIR / "insights.json", insights)
    write_json(SAMPLES_DIR / "executive-report-sample.json", report)
    write_json(SAMPLES_DIR / "quality-checklist.json", quality_checklist)
    write_csv(SAMPLES_DIR / "raw-administrative-base.csv", messy["limpeza-planilhas-administrativas"])
    write_csv(SAMPLES_DIR / "processed-administrative-base.csv", processed["limpeza-planilhas-administrativas"])

    print("Simulated datasets generated in data/ and public/samples/.")


if __name__ == "__main__":
    main()
