import { getExecutionHistory } from "@/lib/mock-data";
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
