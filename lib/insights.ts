import type { Automation, Insight } from "@/lib/types";

export function generateInsightsForAutomation(automation: Automation): Insight[] {
  const qualityGain = automation.qualityAfter - automation.qualityBefore;
  const mainError = [...automation.errorTypes].sort((a, b) => b.value - a.value)[0];

  return [
    {
      id: `${automation.slug}-quality`,
      title: "Qualidade da base elevada",
      description: `${automation.name} elevou o score de dados de ${automation.qualityBefore}% para ${automation.qualityAfter}%.`,
      severity: qualityGain >= 25 ? "high" : "medium",
      category: "qualidade de dados",
      recommendation: "Manter a validacao antes da consolidacao mensal para reduzir erros recorrentes.",
    },
    {
      id: `${automation.slug}-efficiency`,
      title: "Ganho operacional mensuravel",
      description: `A rotina economiza ${automation.estimatedSavingsHours} horas por ciclo e libera a equipe para analise de excecoes.`,
      severity: automation.estimatedSavingsHours >= 10 ? "high" : "medium",
      category: "eficiencia",
      recommendation: "Priorizar execucoes semanais para bases com alto volume de retrabalho manual.",
    },
    {
      id: `${automation.slug}-risk`,
      title: "Principal causa de inconsistencia",
      description: `${mainError?.name ?? "Inconsistencias"} representa o maior grupo de problemas detectados nesta automacao.`,
      severity: automation.fixedIssues > 150 ? "high" : "medium",
      category: "risco operacional",
      recommendation: "Adicionar checagens preventivas no ponto de entrada dos dados.",
    },
  ];
}

export function generatePortfolioInsights(automations: Automation[]): Insight[] {
  const mostEfficient = [...automations].sort((a, b) => b.estimatedSavingsHours - a.estimatedSavingsHours)[0];
  const totalIssues = automations.reduce((sum, automation) => sum + automation.fixedIssues, 0);
  const qualityBefore =
    automations.reduce((sum, automation) => sum + automation.qualityBefore, 0) / Math.max(automations.length, 1);
  const qualityAfter =
    automations.reduce((sum, automation) => sum + automation.qualityAfter, 0) / Math.max(automations.length, 1);

  return [
    {
      id: "portfolio-efficiency-leader",
      title: "Maior ganho operacional",
      description: `${mostEfficient.name} lidera o ranking com ${mostEfficient.estimatedSavingsHours} horas economizadas por ciclo.`,
      severity: "high",
      category: "produtividade",
      recommendation: "Usar esta automacao como primeiro roteiro de demonstracao no portfolio.",
    },
    {
      id: "portfolio-quality-rise",
      title: "Melhoria media de qualidade",
      description: `A qualidade media subiu de ${Math.round(qualityBefore)}% para ${Math.round(qualityAfter)}% apos o processamento.`,
      severity: "high",
      category: "qualidade de dados",
      recommendation: "Exibir o before-after nas demonstracoes para tornar o ganho tangivel.",
    },
    {
      id: "portfolio-governance",
      title: "Base pronta para auditoria",
      description: `${totalIssues.toLocaleString("pt-BR")} inconsistencias simuladas possuem logs, regras e arquivos rastreaveis.`,
      severity: "medium",
      category: "governanca",
      recommendation: "Evoluir a trilha de auditoria para persistencia em banco quando houver integracao real.",
    },
  ];
}
