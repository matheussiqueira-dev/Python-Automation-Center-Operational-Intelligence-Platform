import { CheckCircle2, CircleDot } from "lucide-react";
import { cn } from "@/lib/formatters";

export function ExecutionPipeline({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {steps.map((step, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;
        const Icon = complete ? CheckCircle2 : CircleDot;

        return (
          <div key={step} className={cn("rounded-md border p-3", complete && "border-emerald-300/20 bg-emerald-300/10", active && "border-sky-300/25 bg-sky-300/10", !complete && !active && "border-white/10 bg-white/[0.035]")}>
            <Icon className={cn("h-4 w-4", complete && "text-emerald-200", active && "text-sky-200", !complete && !active && "text-zinc-600")} aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-white">{step}</p>
          </div>
        );
      })}
    </div>
  );
}
