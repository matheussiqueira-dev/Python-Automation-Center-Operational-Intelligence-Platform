import { Calculator, TrendingUp } from "lucide-react";
import { Card } from "@/components/shared/card";
import { calculateRoi } from "@/lib/calculations";
import { formatCurrency, formatHours } from "@/lib/formatters";
import type { Automation } from "@/lib/types";

export function RoiSummary({ automations }: { automations: Automation[] }) {
  const best = [...automations].sort((a, b) => calculateRoi(b) - calculateRoi(a))[0];
  const totalSavings = automations.reduce((sum, automation) => sum + automation.estimatedSavingsBRL, 0);
  const totalHours = automations.reduce((sum, automation) => sum + automation.estimatedSavingsHours, 0);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <Calculator className="h-5 w-5 text-emerald-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Resumo de ROI simulado</h2>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <SummaryStat label="Economia operacional" value={formatCurrency(totalSavings)} />
        <SummaryStat label="Horas economizadas" value={formatHours(totalHours)} />
        <SummaryStat label="Maior ROI" value={`${calculateRoi(best)}%`} />
      </div>
      <div className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-200" aria-hidden="true" />
          <p className="text-sm leading-6 text-emerald-50">
            {best.name} e a rotina com maior retorno proporcional entre economia simulada e custo operacional da execucao.
          </p>
        </div>
      </div>
    </Card>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
