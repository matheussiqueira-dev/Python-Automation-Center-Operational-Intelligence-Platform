"use client";

import { cn } from "@/lib/formatters";

export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-white/10 bg-white/[0.045] p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            "h-9 rounded px-3 text-sm font-semibold transition",
            value === item.value ? "bg-emerald-300 text-zinc-950" : "text-zinc-400 hover:bg-white/8 hover:text-white",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
