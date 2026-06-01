"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { cn } from "@/lib/formatters";
import type { CorrectionRule, DatasetRecord } from "@/lib/types";

const columns = ["id", "nome", "cpf", "setor", "data", "valor", "status"];
const tabs = ["Tabela", "Resumo", "Regras aplicadas"] as const;

interface BeforeAfterTableProps {
  before: DatasetRecord[];
  after: DatasetRecord[];
  rules: CorrectionRule[];
}

export function BeforeAfterTable({ before, after, rules }: BeforeAfterTableProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tabela");
  const [expanded, setExpanded] = useState(false);
  const changes = before.reduce((sum, row) => sum + (row.inconsistencies?.length ?? 0), 0);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Antes e depois</h2>
          <p className="mt-2 text-sm text-zinc-400">Compare problemas originais, correcoes simuladas e regras aplicadas.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={cn(
                "h-9 rounded-md px-3 text-sm font-medium transition",
                tab === item ? "bg-emerald-300 text-zinc-950" : "bg-white/8 text-zinc-300 hover:bg-white/12",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {tab === "Tabela" ? (
        <div className="mt-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone="rose">Problema detectado</Badge>
            <Badge tone="green">Campo corrigido</Badge>
            <Badge tone="blue">{changes} alteracoes rastreadas</Badge>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <DataTable title="Base original" rows={before} mode="before" />
            <DataTable title="Base processada" rows={after} mode="after" />
          </div>
        </div>
      ) : null}

      {tab === "Resumo" ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <SummaryItem label="Linhas de entrada" value={before.length.toString()} />
          <SummaryItem label="Linhas validas apos tratamento" value={after.length.toString()} />
          <SummaryItem label="Mudancas rastreadas" value={changes.toString()} />
        </div>
      ) : null}

      {tab === "Regras aplicadas" ? (
        <div className="mt-5 space-y-3">
          {rules.slice(0, expanded ? rules.length : 2).map((rule) => (
            <div key={`${rule.field}-${rule.original}`} className="rounded-md border border-white/10 bg-black/18 p-4 text-sm">
              <p className="font-semibold text-white">Campo: {rule.field}</p>
              <p className="mt-2 text-zinc-400">Valor original: {rule.original}</p>
              <p className="mt-1 text-emerald-100">Correcao: {rule.correction}</p>
              <p className="mt-1 text-zinc-400">Regra aplicada: {rule.rule}</p>
              <p className="mt-1 text-zinc-400">Impacto: {rule.impact}</p>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() => setExpanded((value) => !value)}
            icon={expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          >
            {expanded ? "Ocultar detalhes" : "Expandir detalhes"}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

function DataTable({ title, rows, mode }: { title: string; rows: DatasetRecord[]; mode: "before" | "after" }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-zinc-950/58">
      <div className="border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="scrollbar-soft overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-zinc-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${title}-${row.id}-${row.nome}`} className="border-t border-white/8">
                {columns.map((column) => {
                  const marked = mode === "before" ? row.inconsistencies?.includes(column) : row.corrections?.some((item) => item.toLowerCase().includes(column));
                  return (
                    <td
                      key={column}
                      className={cn(
                        "px-4 py-3 text-zinc-300",
                        marked && mode === "before" && "bg-rose-400/12 text-rose-100",
                        marked && mode === "after" && "bg-emerald-300/12 text-emerald-100",
                      )}
                    >
                      {String(row[column] ?? "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
