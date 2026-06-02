import { Card } from "@/components/shared/card";
import type { Automation } from "@/lib/types";

export function ValidationSummary({ automation }: { automation: Automation }) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-white">Resumo de validacao</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Item label="Regras ativas" value={automation.rulesEngine.filter((rule) => rule.active).length.toString()} />
        <Item label="Problemas" value={automation.fixedIssues.toLocaleString("pt-BR")} />
        <Item label="Risco reduzido" value={automation.riskReduced} />
      </div>
    </Card>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
