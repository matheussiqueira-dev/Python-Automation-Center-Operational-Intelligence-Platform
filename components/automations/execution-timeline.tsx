import { CheckCircle2, CircleDot } from "lucide-react";
import { cn } from "@/lib/formatters";

interface ExecutionTimelineProps {
  steps: string[];
  activeIndex: number;
  completed: boolean;
}

export function ExecutionTimeline({ steps, activeIndex, completed }: ExecutionTimelineProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <h3 className="text-sm font-semibold text-white">Timeline de execucao</h3>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const done = completed || index < activeIndex;
          const active = index === activeIndex && !completed;
          const Icon = done ? CheckCircle2 : CircleDot;

          return (
            <li key={step} className="flex gap-3">
              <Icon
                className={cn("mt-0.5 h-4 w-4 shrink-0", done && "text-emerald-200", active && "text-amber-200", !done && !active && "text-zinc-600")}
                aria-hidden="true"
              />
              <span className={cn("text-sm", done && "text-zinc-200", active && "text-amber-100", !done && !active && "text-zinc-500")}>{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
