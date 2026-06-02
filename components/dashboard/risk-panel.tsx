import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import type { RiskMetric } from "@/lib/types";

const tone = {
  baixo: "green",
  medio: "blue",
  alto: "amber",
  critico: "rose",
} as const;

export function RiskPanel({ risks }: { risks: RiskMetric[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Risco e compliance</h2>
      </div>
      <div className="mt-4 space-y-3">
        {risks.map((risk) => (
          <div key={risk.name} className="rounded-md border border-white/10 bg-black/18 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-white">{risk.name}</p>
              <div className="flex items-center gap-2">
                <Badge tone={tone[risk.before]}>{risk.before}</Badge>
                <span className="text-xs text-zinc-600">para</span>
                <Badge tone={tone[risk.after]}>{risk.after}</Badge>
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{risk.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
