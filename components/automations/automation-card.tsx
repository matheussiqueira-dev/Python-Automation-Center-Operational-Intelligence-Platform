import { Clock3, Eye, PlayCircle, TrendingUp } from "lucide-react";
import { AutomationStatusBadge } from "@/components/automations/automation-status-badge";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { formatCurrency, formatHours, impactLabel } from "@/lib/formatters";
import type { Automation } from "@/lib/types";

export function AutomationCard({ automation }: { automation: Automation }) {
  const impactTone = automation.impact === "critical" ? "rose" : automation.impact === "high" ? "green" : "amber";

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="zinc">{automation.category}</Badge>
          <h2 className="mt-4 text-lg font-semibold leading-6 text-white">{automation.name}</h2>
        </div>
        <AutomationStatusBadge status={automation.status} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{automation.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-white/10 bg-black/18 p-3">
          <Clock3 className="mb-2 h-4 w-4 text-zinc-500" aria-hidden="true" />
          <p className="text-xs text-zinc-500">Manual</p>
          <p className="mt-1 font-semibold text-white">{formatHours(automation.manualTimeHours)}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/18 p-3">
          <TrendingUp className="mb-2 h-4 w-4 text-emerald-200" aria-hidden="true" />
          <p className="text-xs text-zinc-500">Automatizado</p>
          <p className="mt-1 font-semibold text-white">{formatHours(automation.automatedTimeHours)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="green">{formatHours(automation.estimatedSavingsHours)} economizadas</Badge>
        <Badge tone={impactTone}>Impacto {impactLabel(automation.impact)}</Badge>
        <Badge tone="blue">{formatCurrency(automation.monthlySavingsBRL)} mes</Badge>
        <Badge tone="amber">Complexidade {automation.complexity}</Badge>
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-500">{automation.riskReduced}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button href={`/automations/${automation.slug}`} icon={<PlayCircle className="h-4 w-4" aria-hidden="true" />}>
          Executar demo
        </Button>
        <Button href={`/automations/${automation.slug}`} variant="secondary" icon={<Eye className="h-4 w-4" aria-hidden="true" />}>
          Detalhes
        </Button>
      </div>
    </Card>
  );
}
