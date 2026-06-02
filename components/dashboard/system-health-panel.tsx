import { Activity } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import type { SystemHealth } from "@/lib/types";

export function SystemHealthPanel({ health }: { health: SystemHealth }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-emerald-200" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-white">System Health</h2>
        </div>
        <Badge tone={health.status === "healthy" ? "green" : health.status === "degraded" ? "amber" : "rose"}>{health.status}</Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <HealthItem label="Ultima execucao" value={new Date(health.lastExecutionAt).toLocaleString("pt-BR")} />
        <HealthItem label="Tempo medio" value={`${health.averageResponseTimeMs}ms`} />
        <HealthItem label="Taxa de sucesso" value={`${health.successRate}%`} />
        <HealthItem label="Uptime simulado" value={health.uptime} />
        <HealthItem label="Automacoes ativas" value={health.activeAutomations.toString()} />
        <HealthItem label="Eventos de interacao" value={health.interactionEvents.toString()} />
      </div>
    </Card>
  );
}

function HealthItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
