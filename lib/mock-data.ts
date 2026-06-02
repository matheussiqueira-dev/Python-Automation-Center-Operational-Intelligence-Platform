import automationsJson from "@/data/automations.json";
import executionHistoryJson from "@/data/execution-history.json";
import messyDatasetsJson from "@/data/messy-datasets.json";
import processedDatasetsJson from "@/data/processed-datasets.json";
import insightsJson from "@/data/insights.json";
import reportsJson from "@/data/reports.json";
import systemHealthJson from "@/data/system-health.json";
import { aggregateDashboardMetrics } from "@/lib/calculations";
import { generateInsightsForAutomation, generatePortfolioInsights } from "@/lib/insights";
import type {
  Automation,
  AutomationRunResult,
  DatasetRecord,
  ExecutionHistoryEntry,
  GeneratedFile,
  Insight,
  SystemHealth,
} from "@/lib/types";

const automations = automationsJson as Automation[];
const executionHistory = executionHistoryJson as ExecutionHistoryEntry[];
const messyDatasets = messyDatasetsJson as Record<string, DatasetRecord[]>;
const processedDatasets = processedDatasetsJson as Record<string, DatasetRecord[]>;
const staticInsights = insightsJson as Insight[];
const reports = reportsJson as Array<Record<string, unknown>>;
const systemHealth = systemHealthJson as SystemHealth;

export function getAutomations() {
  return automations;
}

export function getAutomationBySlug(slug: string) {
  return automations.find((automation) => automation.slug === slug);
}

export function getAutomationById(id: string) {
  return automations.find((automation) => automation.id === id || automation.slug === id);
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

export function getReportsData() {
  return reports;
}

export function getSystemHealth() {
  return systemHealth;
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

export function buildAutomationRunResult(idOrSlug: string, enabledRules: string[] = []): AutomationRunResult | null {
  const automation = getAutomationById(idOrSlug);

  if (!automation) {
    return null;
  }

  const activeRules = enabledRules.length
    ? automation.rulesEngine.filter((rule) => enabledRules.includes(rule.id))
    : automation.rulesEngine.filter((rule) => rule.active);
  const ruleBoost = activeRules.length ? Math.min(activeRules.length * 7, automation.fixedIssues) : 0;

  return {
    automationId: automation.id,
    status: "success",
    durationMs: 4200 + automation.fixedIssues * 4,
    processedRecords: automation.processedRecords,
    fixedIssues: automation.fixedIssues + ruleBoost,
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
        message: `${automation.duplicatesRemoved.toLocaleString("pt-BR")} duplicidades removidas, ${automation.standardizedFields.toLocaleString("pt-BR")} campos padronizados e ${activeRules.length} regras ativas.`,
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
    auditTrail: automation.auditTrail,
    insights: generateInsightsForAutomation(automation),
    files: automation.files,
  };
}
