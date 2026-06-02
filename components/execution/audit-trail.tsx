import { FileClock } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import type { AuditEvent } from "@/lib/types";

export function AuditTrail({ events }: { events: AuditEvent[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <FileClock className="h-5 w-5 text-emerald-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Audit trail</h2>
      </div>
      <div className="mt-4 space-y-3">
        {events.map((event) => (
          <div key={event.id} className="rounded-md border border-white/10 bg-black/18 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-zinc-500">{event.timestamp}</span>
              <Badge tone={event.severity === "warning" ? "amber" : event.severity === "error" ? "rose" : "green"}>{event.severity}</Badge>
            </div>
            <p className="mt-2 text-sm text-white">{event.event}: {event.rule}</p>
            <p className="mt-1 text-sm text-zinc-400">{event.affectedRecords} registros afetados. {event.result}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
