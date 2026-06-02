from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
SAMPLES_DIR = ROOT / "public" / "samples"

PIPELINE = [
    "Na fila",
    "Recebendo base",
    "Validando estrutura",
    "Detectando inconsistencias",
    "Aplicando regras",
    "Consolidando dados",
    "Gerando relatorio",
    "Finalizando",
    "Concluido",
]

AUTOMATION_SEEDS = [
    ("auto-001", "limpeza-planilhas-administrativas", "Limpeza de planilhas administrativas", "Dados", "critical", "high", 18, 1.8, 1240, 312, 128, 936, 61, 94, 82, "Duplicidade, CPF e valores fora do padrao"),
    ("auto-002", "consolidacao-multiplos-arquivos", "Consolidacao de multiplos arquivos", "Operacoes", "high", "high", 16, 2.1, 2180, 286, 96, 654, 64, 92, 76, "Colunas divergentes e categorias inconsistentes"),
    ("auto-003", "geracao-relatorio-executivo", "Geracao de relatorio executivo", "Relatorios", "high", "medium", 12, 1.4, 960, 148, 18, 420, 70, 96, 71, "Indicadores ausentes e periodos inconsistentes"),
    ("auto-004", "auditoria-qualidade-dados", "Auditoria de qualidade de dados", "Auditoria", "critical", "high", 14, 2.3, 1750, 401, 72, 588, 58, 91, 79, "Nulos, outliers e campos obrigatorios ausentes"),
    ("auto-005", "rotina-financeira-operacional", "Rotina financeira e operacional", "Financeiro", "medium", "medium", 10, 1.6, 1420, 219, 42, 364, 67, 90, 68, "Centros de custo invalidos e anomalias de valor"),
    ("auto-006", "validacao-cadastros", "Validacao de cadastros", "Administrativo", "high", "medium", 9, 0.9, 1880, 267, 84, 612, 63, 93, 74, "Campos obrigatorios vazios e documentos ficticios invalidos"),
    ("auto-007", "monitoramento-sla", "Monitoramento de SLA", "Operacoes", "critical", "medium", 11, 1.2, 1320, 198, 21, 384, 69, 95, 72, "Chamados criticos, prazos violados e prioridades divergentes"),
    ("auto-008", "padronizacao-relatorios-mensais", "Padronizacao de relatorios mensais", "BI", "high", "low", 13, 1.5, 1540, 234, 37, 524, 66, 94, 73, "Periodos faltantes, colunas inconsistentes e formatacao divergente"),
]

ERROR_TYPES = [
    {"name": "Duplicidades", "value": 128},
    {"name": "Campo obrigatorio vazio", "value": 112},
    {"name": "Formato invalido", "value": 141},
    {"name": "Outliers", "value": 76},
]

CORRECTION_RULES = [
    {
        "field": "Valor",
        "original": "R$ 1.200,50",
        "correction": "1200.50",
        "rule": "normalizacao monetaria",
        "impact": "campo liberado para calculo agregado",
    },
    {
        "field": "Data de admissao",
        "original": "32/13/2025",
        "correction": "Registro marcado como invalido",
        "rule": "validacao de data no padrao dd/mm/yyyy",
        "impact": "removido do calculo mensal ate correcao da origem",
    },
    {
        "field": "Status",
        "original": "sem status",
        "correction": "Em revisao",
        "rule": "validar status permitido",
        "impact": "evita consolidacao com classificacao operacional invalida",
    },
]

RULES = [
    ("remover-duplicados", "Remover duplicados", "Remove registros repetidos pela chave de negocio.", "Base consolidada sem sobrecontagem", "risco de duplicidade"),
    ("validar-cpf-ficticio", "Validar CPF ficticio", "Marca documentos ficticios invalidos para revisao.", "Cadastros invalidos deixam de entrar no relatorio", "risco cadastral"),
    ("normalizar-datas", "Normalizar datas", "Converte datas validas para dd/mm/yyyy e sinaliza impossiveis.", "Periodos ficam comparaveis", "risco temporal"),
    ("padronizar-nomes", "Padronizar nomes", "Aplica capitalizacao e remove espacos duplicados.", "Relatorios ficam legiveis e agrupaveis", "risco de agrupamento"),
    ("corrigir-categorias", "Corrigir categorias", "Mapeia categorias divergentes para uma taxonomia padrao.", "Indicadores por categoria ficam consistentes", "risco de classificacao"),
    ("detectar-negativos", "Detectar valores negativos", "Sinaliza valores negativos fora de contexto.", "Anomalias financeiras ficam visiveis", "risco financeiro"),
    ("campos-obrigatorios", "Marcar obrigatorios vazios", "Identifica campos essenciais sem preenchimento.", "Registros incompletos deixam de contaminar KPIs", "risco de completude"),
    ("identificar-outliers", "Identificar outliers", "Marca valores fora da distribuicao esperada.", "Excecoes operacionais ficam auditaveis", "risco de decisao"),
    ("normalizar-monetarios", "Normalizar valores monetarios", "Converte moeda em decimal padronizado.", "Calculos financeiros ficam seguros", "risco contabil"),
    ("validar-status", "Validar status permitido", "Garante status dentro da lista oficial.", "Fluxos operacionais ficam comparaveis", "risco operacional"),
]


def write_json(path: Path, payload: object) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def make_rules_engine(index: int, fixed_issues: int) -> list[dict]:
    return [
        {
            "id": rule_id,
            "name": name,
            "description": description,
            "estimatedImpact": impact,
            "affectedRecords": max(8, fixed_issues // (position + 2)),
            "reducedRisk": reduced_risk,
            "active": position < 7 or index % 2 == 0,
        }
        for position, (rule_id, name, description, impact, reduced_risk) in enumerate(RULES)
    ]


def make_quality_dimensions(before: int, after: int, fixed_issues: int) -> list[dict]:
    dimensions = ["completude", "unicidade", "validade", "consistencia", "padronizacao", "integridade"]
    return [
        {
            "dimension": dimension,
            "before": max(40, before - offset),
            "after": min(99, after - offset // 2),
            "issues": max(6, fixed_issues // (offset + 2)),
            "severity": "critico" if offset <= 2 else "alto" if offset <= 4 else "medio",
            "recommendation": f"Manter regra automatizada de {dimension} antes do fechamento mensal.",
        }
        for offset, dimension in enumerate(dimensions)
    ]


def make_risk_profile() -> list[dict]:
    return [
        {"name": "Risco de duplicidade", "before": "alto", "after": "baixo", "description": "Evita contagem dupla em relatórios e indicadores."},
        {"name": "Campo obrigatorio vazio", "before": "critico", "after": "medio", "description": "Reduz registros incompletos em bases analiticas."},
        {"name": "Relatorio inconsistente", "before": "alto", "after": "baixo", "description": "Padroniza periodos, categorias e formatos."},
        {"name": "Atraso operacional", "before": "medio", "after": "baixo", "description": "Diminui dependencia de revisao manual."},
        {"name": "Decisao com dado invalido", "before": "critico", "after": "baixo", "description": "Sinaliza excecoes antes do consumo gerencial."},
        {"name": "Retrabalho", "before": "alto", "after": "baixo", "description": "Automatiza validacoes repetitivas."},
    ]


def make_audit_trail(slug: str, fixed_issues: int) -> list[dict]:
    return [
        {
            "id": f"{slug}-audit-{idx}",
            "timestamp": f"2026-06-01 14:{32 + idx:02d}",
            "event": event,
            "rule": rule,
            "affectedRecords": count,
            "severity": severity,
            "result": result,
            "generatedFile": generated_file,
        }
        for idx, (event, rule, count, severity, result, generated_file) in enumerate(
            [
                ("Regra aplicada", "normalizar_datas", fixed_issues // 3, "success", "Datas normalizadas e invalidas sinalizadas.", ""),
                ("Registros marcados", "campos_obrigatorios", fixed_issues // 5, "warning", "Registros incompletos enviados para revisao.", ""),
                ("Duplicidades removidas", "remover_duplicados", fixed_issues // 6, "success", "Base consolidada sem duplicidades.", ""),
                ("Relatorio gerado", "gerar_relatorio", fixed_issues, "success", "Relatorio executivo gerado.", "executive-report-sample.json"),
            ]
        )
    ]


def make_files(slug: str) -> list[dict[str, str]]:
    return [
        {"id": f"{slug}-raw", "name": "raw-administrative-base.csv", "type": "CSV", "size": "32 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/raw-administrative-base.csv"},
        {"id": f"{slug}-processed", "name": "processed-administrative-base.csv", "type": "CSV", "size": "28 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/processed-administrative-base.csv"},
        {"id": f"{slug}-execution", "name": "automation-execution-log.json", "type": "LOG", "size": "14 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/automation-execution-log.json"},
        {"id": f"{slug}-report-json", "name": "executive-report-sample.json", "type": "JSON", "size": "18 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/executive-report-sample.json"},
        {"id": f"{slug}-report-html", "name": "executive-report-sample.html", "type": "HTML", "size": "22 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/executive-report-sample.html"},
        {"id": f"{slug}-quality", "name": "quality-checklist.json", "type": "CHECKLIST", "size": "9 KB", "generatedAt": "2026-06-01", "automationSlug": slug, "href": "/samples/quality-checklist.json"},
    ]


def enrich_automations() -> list[dict]:
    automations = []
    for idx, seed in enumerate(AUTOMATION_SEEDS, start=1):
        (
            automation_id,
            slug,
            name,
            category,
            impact,
            complexity,
            manual_time,
            automated_time,
            records,
            fixed_issues,
            duplicates,
            standardized,
            quality_before,
            quality_after,
            rework,
            problem_hint,
        ) = seed
        saved_hours = round(manual_time - automated_time, 1)
        monthly_savings = int(saved_hours * 120 * 4)
        annual_savings = monthly_savings * 12
        status = "success" if idx in (3, 8) else "attention" if idx == 4 else "ready"
        automation = {
            "id": automation_id,
            "slug": slug,
            "name": name,
            "category": category,
            "complexity": complexity,
            "description": f"Automacao simulada para {name.lower()}, com regras de validacao, logs, score de qualidade e relatorio exportavel.",
            "problem": f"Rotina atual sofre com {problem_hint.lower()}, exigindo conferência manual e aumentando risco operacional.",
            "objective": "Reduzir retrabalho, padronizar dados, preservar rastreabilidade e entregar indicadores prontos para decisao.",
            "status": status,
            "impact": impact,
            "riskReduced": "Risco operacional e retrabalho reduzidos com validacao preventiva.",
            "manualTimeHours": manual_time,
            "automatedTimeHours": automated_time,
            "estimatedSavingsHours": saved_hours,
            "estimatedSavingsBRL": int(saved_hours * 120),
            "monthlySavingsBRL": monthly_savings,
            "annualSavingsBRL": annual_savings,
            "successRate": 95 + (idx % 4),
            "averageResponseTimeMs": 320 + idx * 24,
            "processedRecords": records,
            "fixedIssues": fixed_issues,
            "duplicatesRemoved": duplicates,
            "standardizedFields": standardized,
            "qualityBefore": quality_before,
            "qualityAfter": quality_after,
            "reworkReduction": rework,
            "errorTypes": ERROR_TYPES,
            "timeline": PIPELINE,
            "rules": CORRECTION_RULES,
            "rulesEngine": make_rules_engine(idx, fixed_issues),
            "qualityDimensions": make_quality_dimensions(quality_before, quality_after, fixed_issues),
            "riskProfile": make_risk_profile(),
            "auditTrail": make_audit_trail(slug, fixed_issues),
            "files": make_files(slug),
            "kpis": [
                {"label": "Registros processados", "value": f"{records:,}".replace(",", "."), "delta": "+100%", "tone": "green"},
                {"label": "Inconsistencias corrigidas", "value": f"{fixed_issues:,}".replace(",", "."), "delta": f"+{rework}%", "tone": "blue"},
                {"label": "Horas economizadas", "value": f"{saved_hours}h", "delta": "-retrabalho", "tone": "amber"},
                {"label": "Score final", "value": f"{quality_after}%", "delta": f"+{quality_after - quality_before} pts", "tone": "rose"},
            ],
        }
        automations.append(automation)
    return automations


def build_datasets(slugs: list[str]) -> tuple[dict[str, list[dict]], dict[str, list[dict]]]:
    messy_rows = [
        {"id": "ADM-001", "nome": "ana  silva", "cpf_ficticio": "123.456.789-00", "setor": "fin", "cargo": "analista", "data": "32/13/2025", "valor": "R$ 1.240,8", "categoria": "servico", "centro_custo": "CC-01", "status": "ativo", "severidade": "critico", "inconsistencies": ["nome", "cpf_ficticio", "data", "valor"]},
        {"id": "ADM-002", "nome": "BRUNO COSTA", "cpf_ficticio": "00000000000", "setor": "", "cargo": "coord", "data": "2025-04-12", "valor": "845,00", "categoria": "opex", "centro_custo": "", "status": "pendente", "severidade": "alto", "inconsistencies": ["cpf_ficticio", "setor", "data", "centro_custo"]},
        {"id": "ADM-002", "nome": "Bruno Costa", "cpf_ficticio": "00000000000", "setor": "Financeiro", "cargo": "coord", "data": "12/04/2025", "valor": "845.00", "categoria": "OPEX", "centro_custo": "CC-02", "status": "pendente", "severidade": "alto", "inconsistencies": ["duplicidade", "cpf_ficticio"]},
        {"id": "ADM-004", "nome": "carla lima", "cpf_ficticio": "987.654.321-99", "setor": "Operacoes", "cargo": "gestora", "data": "", "valor": "R$ -", "categoria": "contrato", "centro_custo": "CC-09", "status": "sem status", "severidade": "medio", "inconsistencies": ["data", "valor", "status"]},
    ]
    processed_rows = [
        {"id": "ADM-001", "nome": "Ana Silva", "cpf_ficticio": "CPF invalido - revisar", "setor": "Financeiro", "cargo": "Analista", "data": "Data invalida", "valor": "1240.80", "categoria": "Servico", "centro_custo": "CC-01", "status": "Ativo", "severidade": "critico", "corrections": ["nome padronizado", "cpf_ficticio sinalizado", "data sinalizada", "valor normalizado"]},
        {"id": "ADM-002", "nome": "Bruno Costa", "cpf_ficticio": "CPF invalido - revisar", "setor": "Financeiro", "cargo": "Coordenador", "data": "12/04/2025", "valor": "845.00", "categoria": "Opex", "centro_custo": "CC-02", "status": "Pendente", "severidade": "alto", "corrections": ["duplicidade removida", "setor preenchido", "data normalizada"]},
        {"id": "ADM-004", "nome": "Carla Lima", "cpf_ficticio": "987.654.321-99", "setor": "Operacoes", "cargo": "Gestora", "data": "Pendente de origem", "valor": "0.00", "categoria": "Contrato", "centro_custo": "CC-09", "status": "Em revisao", "severidade": "medio", "corrections": ["nome padronizado", "valor zerado para auditoria", "status corrigido"]},
    ]
    return ({slug: messy_rows for slug in slugs}, {slug: processed_rows for slug in slugs})


def write_csv(path: Path, rows: list[dict]) -> None:
    fields = [key for key in rows[0].keys() if key not in {"inconsistencies", "corrections"}]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row[key] for key in fields})


def build_execution_history(automations: list[dict]) -> list[dict]:
    rows = []
    for idx, automation in enumerate(automations):
        rows.append(
            {
                "id": f"exec-{idx + 1:03d}",
                "month": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"][idx],
                "date": f"2026-05-{18 + idx:02d}",
                "automationSlug": automation["slug"],
                "automationName": automation["name"],
                "category": automation["category"],
                "status": "completed" if idx != 3 else "queued",
                "runs": 5 + idx,
                "records": automation["processedRecords"],
                "fixedIssues": automation["fixedIssues"],
                "beforeQualityScore": automation["qualityBefore"],
                "afterQualityScore": automation["qualityAfter"],
                "hoursSaved": automation["estimatedSavingsHours"],
                "savingsBRL": automation["monthlySavingsBRL"],
                "qualityScore": automation["qualityAfter"],
                "generatedFiles": len(automation["files"]),
                "owner": ["Marina Alves", "Rafael Souza", "Livia Martins", "Diego Rocha"][idx % 4],
                "severity": "critico" if automation["impact"] == "critical" else "alto" if automation["impact"] == "high" else "medio",
            }
        )
    return rows


def build_reports(automations: list[dict]) -> list[dict]:
    return [
        {
            "id": f"report-{automation['slug']}",
            "title": f"Relatorio executivo - {automation['name']}",
            "generatedAt": "2026-06-01",
            "automationSlug": automation["slug"],
            "automationName": automation["name"],
            "status": "Disponivel",
            "format": "HTML" if idx % 2 else "JSON",
            "executiveSummary": f"{automation['processedRecords']} registros processados, {automation['fixedIssues']} inconsistencias corrigidas e economia mensal simulada de R$ {automation['monthlySavingsBRL']}.",
            "preview": [
                f"Score de qualidade: {automation['qualityBefore']}% -> {automation['qualityAfter']}%",
                f"Tempo economizado por ciclo: {automation['estimatedSavingsHours']}h",
                f"Reducao de retrabalho: {automation['reworkReduction']}%",
            ],
            "href": "/samples/executive-report-sample.html" if idx % 2 else "/samples/executive-report-sample.json",
        }
        for idx, automation in enumerate(automations)
    ]


def main() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    SAMPLES_DIR.mkdir(parents=True, exist_ok=True)

    automations = enrich_automations()
    slugs = [automation["slug"] for automation in automations]
    messy, processed = build_datasets(slugs)
    executions = build_execution_history(automations)
    reports = build_reports(automations)
    system_health = {
        "status": "healthy",
        "lastExecutionAt": "2026-06-01T14:42:06.000Z",
        "averageResponseTimeMs": 386,
        "successRate": 97,
        "activeAutomations": len(automations),
        "uptime": "99.95%",
        "errorsByCategory": ERROR_TYPES,
        "interactionEvents": 284,
    }
    insights = [
        {"id": "recurring-duplicates", "title": "Duplicidades recorrentes", "description": "Duplicidades aparecem em todos os fluxos simulados.", "severity": "medium", "category": "governanca", "recommendation": "Criar chave de negocio por origem e setor.", "estimatedImpact": "Reduzir retrabalho em 18%."},
        {"id": "sla-risk", "title": "SLA como risco operacional", "description": "Chamados criticos precisam de monitoramento preventivo.", "severity": "high", "category": "risco operacional", "recommendation": "Priorizar alertas antes do vencimento.", "estimatedImpact": "Aumentar taxa de SLA em 12%."},
    ]

    write_json(DATA_DIR / "automations.json", automations)
    write_json(DATA_DIR / "messy-datasets.json", messy)
    write_json(DATA_DIR / "processed-datasets.json", processed)
    write_json(DATA_DIR / "execution-history.json", executions)
    write_json(DATA_DIR / "insights.json", insights)
    write_json(DATA_DIR / "reports.json", reports)
    write_json(DATA_DIR / "system-health.json", system_health)
    write_json(SAMPLES_DIR / "automation-execution-log.json", automations[0]["auditTrail"])
    write_json(SAMPLES_DIR / "executive-report-sample.json", reports[0])
    write_json(SAMPLES_DIR / "quality-checklist.json", {"items": ["Campos obrigatorios validados", "Duplicidades removidas", "Datas normalizadas", "Valores monetarios padronizados", "Logs preservados"]})
    (SAMPLES_DIR / "executive-report-sample.html").write_text("<!doctype html><html><body><h1>Python Automation Center</h1><p>Relatorio executivo simulado.</p><p>Desenvolvido por Matheus Siqueira - www.matheussiqueira.dev</p></body></html>", encoding="utf-8")
    write_csv(SAMPLES_DIR / "raw-administrative-base.csv", messy["limpeza-planilhas-administrativas"])
    write_csv(SAMPLES_DIR / "processed-administrative-base.csv", processed["limpeza-planilhas-administrativas"])

    print("Senior simulated datasets generated in data/ and public/samples/.")


if __name__ == "__main__":
    main()
