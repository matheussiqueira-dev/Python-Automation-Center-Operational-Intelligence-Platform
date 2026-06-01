import type { HTMLAttributes } from "react";
import { cn } from "@/lib/formatters";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-white/10 bg-white/[0.055] shadow-[0_18px_60px_rgba(0,0,0,0.24)]", className)}
      {...props}
    />
  );
}
