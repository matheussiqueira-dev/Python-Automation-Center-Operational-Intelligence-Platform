import type { ReactNode } from "react";
import { Card } from "@/components/shared/card";
import { MetricDelta } from "@/components/shared/metric-delta";

interface KpiCardProps {
  label: string;
  value: string;
  helper: string;
  delta: string;
  icon: ReactNode;
}

export function KpiCard({ label, value, helper, delta, icon }: KpiCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-md bg-white/8 text-emerald-200">{icon}</div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">{helper}</p>
        <MetricDelta value={delta} tone="positive" />
      </div>
    </Card>
  );
}
