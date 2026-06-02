import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/shared/card";
import { IssueSeverityBadge } from "@/components/data-quality/issue-severity-badge";
import type { Automation } from "@/lib/types";

export function DataQualityScore({ automation }: { automation: Automation }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Data Quality Score</h2>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Score label="Antes" value={`${automation.qualityBefore}%`} />
        <Score label="Depois" value={`${automation.qualityAfter}%`} />
        <Score label="Problemas corrigidos" value={automation.fixedIssues.toLocaleString("pt-BR")} />
        <Score label="Duplicidades removidas" value={automation.duplicatesRemoved.toLocaleString("pt-BR")} />
      </div>
      <div className="mt-4 space-y-3">
        {automation.qualityDimensions.map((dimension) => (
          <div key={dimension.dimension} className="rounded-md border border-white/10 bg-black/18 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold capitalize text-white">{dimension.dimension}</p>
              <IssueSeverityBadge severity={dimension.severity} />
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${dimension.after}%` }} />
            </div>
            <p className="mt-2 text-xs text-zinc-400">{dimension.before}% {"->"} {dimension.after}% | {dimension.recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Score({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
