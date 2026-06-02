"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/shared/card";
import type { RuleDefinition } from "@/lib/types";

export function RuleEnginePanel({ rules, onChange }: { rules: RuleDefinition[]; onChange?: (enabledRules: string[]) => void }) {
  const [enabled, setEnabled] = useState(() => new Set(rules.filter((rule) => rule.active).map((rule) => rule.id)));

  function toggle(ruleId: string) {
    const next = new Set(enabled);
    if (next.has(ruleId)) {
      next.delete(ruleId);
    } else {
      next.add(ruleId);
    }
    setEnabled(next);
    onChange?.([...next]);
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <SlidersHorizontal className="h-5 w-5 text-emerald-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Motor de regras</h2>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {rules.map((rule) => {
          const active = enabled.has(rule.id);
          return (
            <label key={rule.id} className="flex cursor-pointer gap-3 rounded-md border border-white/10 bg-black/18 p-3">
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(rule.id)}
                className="mt-1 h-4 w-4 accent-emerald-300"
              />
              <span>
                <span className="block text-sm font-semibold text-white">{rule.name}</span>
                <span className="mt-1 block text-xs leading-5 text-zinc-400">{rule.description}</span>
                <span className="mt-2 block text-xs text-emerald-100">{rule.affectedRecords} registros | {rule.reducedRisk}</span>
              </span>
            </label>
          );
        })}
      </div>
    </Card>
  );
}
