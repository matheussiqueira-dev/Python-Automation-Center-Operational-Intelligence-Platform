import type { AuditEvent, LogSeverity } from "@/lib/types";

export function filterAuditBySeverity(events: AuditEvent[], severity?: LogSeverity) {
  return severity ? events.filter((event) => event.severity === severity) : events;
}

export function summarizeAudit(events: AuditEvent[]) {
  return {
    totalEvents: events.length,
    affectedRecords: events.reduce((sum, event) => sum + event.affectedRecords, 0),
    generatedFiles: events.filter((event) => event.generatedFile).length,
  };
}
