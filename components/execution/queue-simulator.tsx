import { Clock3, ListChecks } from "lucide-react";
import { Card } from "@/components/shared/card";
import type { Automation } from "@/lib/types";

export function QueueSimulator({ automation, activeStep }: { automation: Automation; activeStep: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <ListChecks className="h-5 w-5 text-emerald-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Fila simulada</h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <QueueItem label="Posicao na fila" value="#1" />
        <QueueItem label="Status atual" value="running" />
        <QueueItem label="Tempo estimado" value={`${Math.max(Math.round(automation.automatedTimeHours * 60), 4)} min`} />
        <QueueItem label="Proxima etapa" value={activeStep} />
      </div>
      <div className="mt-4 rounded-md border border-white/10 bg-black/18 p-3">
        <p className="flex items-center gap-2 text-sm text-zinc-300">
          <Clock3 className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          {automation.name} em execucao com prioridade de demonstracao.
        </p>
      </div>
    </Card>
  );
}

function QueueItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
