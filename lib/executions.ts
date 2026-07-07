import { getExecutionHistory } from "@/lib/mock-data";
import { buildAutomationRunResult, getAutomations } from "@/lib/mock-data";
import type { ExecutionHistoryEntry, ExecutionStatus } from "@/lib/types";

export function getExecutions(filters?: {
  status?: ExecutionStatus;
  category?: string;
  severity?: "baixo" | "medio" | "alto" | "critico";
}) {
  return getExecutionHistory().filter((execution: ExecutionHistoryEntry) => {
    const statusMatches = !filters?.status || execution.status === filters.status;
    const categoryMatches = !filters?.category || execution.category === filters.category;
    const severityMatches = !filters?.severity || execution.severity === filters.severity;
    return statusMatches && categoryMatches && severityMatches;
  });
}

export function getOperationalLogs() {
  return getAutomations().flatMap((automation) => {
    const result = buildAutomationRunResult(automation.slug);

    return (result?.logs ?? []).map((log, index) => ({
      id: `${automation.slug}-${index + 1}`,
      runId: `${automation.slug}-run`,
      automationId: automation.id,
      automationName: automation.name,
      timestamp: log.timestamp,
      level: log.type,
      message: log.message,
      context: log.step,
      durationMs: result?.durationMs ?? 0,
      recordsProcessed: result?.processedRecords ?? automation.processedRecords,
      severity: log.severity,
    }));
  });
}
