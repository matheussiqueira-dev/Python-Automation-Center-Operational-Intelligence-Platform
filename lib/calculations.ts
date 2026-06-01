import type { Automation, DashboardMetrics } from "@/lib/types";

export function calculateTimeSaved(manualTimeHours: number, automatedTimeHours: number) {
  return Math.max(manualTimeHours - automatedTimeHours, 0);
}

export function calculateOperationalSavings(
  manualTimeHours: number,
  automatedTimeHours: number,
  hourlyRate = 120,
) {
  return calculateTimeSaved(manualTimeHours, automatedTimeHours) * hourlyRate;
}

export function calculateQualityScore(totalRecords: number, issuesDetected: number) {
  if (totalRecords <= 0) {
    return 0;
  }

  const errorRate = (issuesDetected / totalRecords) * 100;
  return Math.max(Math.round(100 - errorRate), 0);
}

export function calculateRoi(automation: Pick<Automation, "estimatedSavingsBRL" | "automatedTimeHours">) {
  const simulatedCost = Math.max(automation.automatedTimeHours * 120, 1);
  return Math.round((automation.estimatedSavingsBRL / simulatedCost) * 100);
}

export function aggregateDashboardMetrics(automations: Automation[]): DashboardMetrics {
  const totals = automations.reduce(
    (acc, automation) => {
      acc.totalExecutions += automation.status === "success" ? 3 : 2;
      acc.processedRecords += automation.processedRecords;
      acc.fixedIssues += automation.fixedIssues;
      acc.duplicatesRemoved += automation.duplicatesRemoved;
      acc.standardizedFields += automation.standardizedFields;
      acc.hoursSaved += automation.estimatedSavingsHours;
      acc.operationalSavingsBRL += automation.estimatedSavingsBRL;
      acc.qualityBefore += automation.qualityBefore;
      acc.qualityAfter += automation.qualityAfter;
      acc.reworkReduction += automation.reworkReduction;
      return acc;
    },
    {
      totalExecutions: 0,
      processedRecords: 0,
      fixedIssues: 0,
      duplicatesRemoved: 0,
      standardizedFields: 0,
      hoursSaved: 0,
      operationalSavingsBRL: 0,
      qualityBefore: 0,
      qualityAfter: 0,
      reworkReduction: 0,
    },
  );

  const count = Math.max(automations.length, 1);

  return {
    totalExecutions: totals.totalExecutions,
    processedRecords: totals.processedRecords,
    fixedIssues: totals.fixedIssues,
    duplicatesRemoved: totals.duplicatesRemoved,
    standardizedFields: totals.standardizedFields,
    hoursSaved: Math.round(totals.hoursSaved * 10) / 10,
    operationalSavingsBRL: totals.operationalSavingsBRL,
    averageQualityBefore: Math.round(totals.qualityBefore / count),
    averageQualityAfter: Math.round(totals.qualityAfter / count),
    averageQualityScore: Math.round(totals.qualityAfter / count),
    reworkReduction: Math.round(totals.reworkReduction / count),
  };
}

export function rankAutomationsByEfficiency(automations: Automation[]) {
  return [...automations].sort((a, b) => b.estimatedSavingsHours - a.estimatedSavingsHours);
}
