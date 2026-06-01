import type { HTMLAttributes } from "react";
import { cn } from "@/lib/formatters";

type Tone = "green" | "blue" | "amber" | "rose" | "zinc";

const tones: Record<Tone, string> = {
  green: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  blue: "border-sky-300/25 bg-sky-300/10 text-sky-200",
  amber: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  rose: "border-rose-300/25 bg-rose-300/10 text-rose-200",
  zinc: "border-white/12 bg-white/8 text-zinc-200",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "zinc", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
