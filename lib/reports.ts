import { formatCurrency } from "@/lib/formatters";
import { getAutomations, getReportsData } from "@/lib/mock-data";

export function getReports() {
  const generated = getReportsData();
  if (generated.length) {
    return generated as ReturnType<typeof buildFallbackReports>;
  }
  return buildFallbackReports();
}

function buildFallbackReports() {
  return getAutomations().map((automation, index) => ({
    id: `report-${automation.slug}`,
    title: `Relatorio executivo - ${automation.name}`,
    generatedAt: `2026-05-${String(18 + index).padStart(2, "0")}`,
    automationSlug: automation.slug,
    automationName: automation.name,
    status: "Disponivel",
    format: index % 2 === 0 ? "JSON" : "HTML",
    executiveSummary: `${automation.processedRecords.toLocaleString("pt-BR")} registros processados, ${automation.fixedIssues.toLocaleString("pt-BR")} inconsistencias corrigidas e ${formatCurrency(automation.estimatedSavingsBRL)} de economia operacional simulada.`,
    preview: [
      `Score de qualidade: ${automation.qualityBefore}% -> ${automation.qualityAfter}%`,
      `Horas economizadas por ciclo: ${automation.estimatedSavingsHours}h`,
      `Reducao de retrabalho: ${automation.reworkReduction}%`,
    ],
    href: automation.files.find((file) => file.type === "JSON" || file.type === "HTML")?.href ?? "/samples/executive-report-sample.json",
  }));
}

export function buildReportPayload(automationSlug: string) {
  const report = getReports().find((item) => item.automationSlug === automationSlug);

  if (!report) {
    return null;
  }

  return {
    ...report,
    generatedAt: new Date().toISOString(),
    status: "success",
    sections: ["Resumo executivo", "KPIs", "Riscos", "Recomendacoes", "Arquivos gerados"],
  };
}
