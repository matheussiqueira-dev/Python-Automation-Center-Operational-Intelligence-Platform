"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import type { CorrectionRule, DatasetRecord } from "@/lib/types";

export function DataDiffViewer({ before, after, rules }: { before: DatasetRecord[]; after: DatasetRecord[]; rules: CorrectionRule[] }) {
  const [open, setOpen] = useState(false);
  const changes = before.reduce((sum, row) => sum + (row.inconsistencies?.length ?? 0), 0);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Data Diff Viewer</h2>
          <p className="mt-1 text-sm text-zinc-400">{changes} alteracoes detectadas entre entrada e saida.</p>
        </div>
        <Button variant="secondary" onClick={() => setOpen((value) => !value)} icon={open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}>
          {open ? "Ocultar detalhes" : "Ver detalhes"}
        </Button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <DiffTable title="Antes" rows={before} />
        <DiffTable title="Depois" rows={after} />
      </div>
      {open ? (
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {rules.map((rule) => (
            <div key={rule.field} className="rounded-md border border-white/10 bg-black/18 p-3 text-sm">
              <p className="font-semibold text-white">Campo: {rule.field}</p>
              <p className="mt-1 text-zinc-400">Antes: {rule.original}</p>
              <p className="text-emerald-100">Depois: {rule.correction}</p>
              <p className="text-zinc-400">Regra: {rule.rule}</p>
              <p className="text-zinc-400">Impacto: {rule.impact}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function DiffTable({ title, rows }: { title: string; rows: DatasetRecord[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-white/10">
      <div className="bg-white/[0.045] px-3 py-2 text-sm font-semibold text-white">{title}</div>
      <div className="scrollbar-soft overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <tbody>
            {rows.slice(0, 3).map((row, index) => (
              <tr key={`${title}-${row.id}-${index}`} className="border-t border-white/8">
                <td className="px-3 py-2 text-zinc-500">{row.id}</td>
                <td className="px-3 py-2 text-zinc-300">{String(row.nome ?? "-")}</td>
                <td className="px-3 py-2 text-zinc-300">{String(row.valor ?? "-")}</td>
                <td className="px-3 py-2 text-zinc-300">{String(row.status ?? "-")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
