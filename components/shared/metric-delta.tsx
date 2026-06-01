import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/formatters";

interface MetricDeltaProps {
  value: string;
  tone?: "positive" | "negative" | "neutral";
}

export function MetricDelta({ value, tone = "positive" }: MetricDeltaProps) {
  const Icon = tone === "positive" ? ArrowUpRight : tone === "negative" ? ArrowDownRight : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
        tone === "positive" && "bg-emerald-300/10 text-emerald-200",
        tone === "negative" && "bg-rose-300/10 text-rose-200",
        tone === "neutral" && "bg-white/8 text-zinc-300",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {value}
    </span>
  );
}
