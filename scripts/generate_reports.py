from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
SAMPLES_DIR = ROOT / "public" / "samples"


def main() -> None:
    automations = json.loads((DATA_DIR / "automations.json").read_text(encoding="utf-8"))
    reports = []

    for automation in automations:
        reports.append(
            {
                "id": f"report-{automation['slug']}",
                "title": f"Relatorio executivo - {automation['name']}",
                "generatedAt": "2026-06-01",
                "automationSlug": automation["slug"],
                "automationName": automation["name"],
                "status": "Disponivel",
                "format": "HTML",
                "executiveSummary": (
                    f"{automation['processedRecords']} registros processados, "
                    f"{automation['fixedIssues']} inconsistencias corrigidas e "
                    f"R$ {automation['monthlySavingsBRL']} de economia mensal simulada."
                ),
                "preview": [
                    f"Score de qualidade: {automation['qualityBefore']}% -> {automation['qualityAfter']}%",
                    f"Horas economizadas: {automation['estimatedSavingsHours']}h",
                    f"Economia anual simulada: R$ {automation['annualSavingsBRL']}",
                ],
                "href": "/samples/executive-report-sample.html",
            }
        )

    DATA_DIR.mkdir(exist_ok=True)
    SAMPLES_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "reports.json").write_text(json.dumps(reports, indent=2, ensure_ascii=False), encoding="utf-8")
    (SAMPLES_DIR / "executive-report-sample.html").write_text(
        "\n".join(
            [
                "<!doctype html>",
                "<html lang=\"pt-BR\">",
                "<head><meta charset=\"utf-8\"><title>Relatorio Executivo</title></head>",
                "<body>",
                "<h1>Python Automation Center</h1>",
                "<p>Relatorio executivo simulado com KPIs, qualidade de dados e recomendacoes.</p>",
                "<p>Desenvolvido por Matheus Siqueira - www.matheussiqueira.dev</p>",
                "</body>",
                "</html>",
            ]
        ),
        encoding="utf-8",
    )
    print("Simulated reports generated in data/reports.json and public/samples/.")


if __name__ == "__main__":
    main()
