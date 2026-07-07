"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";

type OperationalLog = ReturnType<typeof import("@/lib/executions").getOperationalLogs>[number];

const levelTone: Record<OperationalLog["level"], "green" | "blue" | "amber" | "rose"> = {
  info: "blue",
  success: "green",
  warning: "amber",
  error: "rose",
};

export function OperationalLogs({ logs }: { logs: OperationalLog[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [automationId, setAutomationId] = useState("all");
  const automationOptions = useMemo(() => ["all", ...Array.from(new Set(logs.map((log) => log.automationId)))], [logs]);

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const text = [log.message, log.context, log.automationName, log.automationId].join(" ").toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesLevel = level === "all" || log.level === level;
      const matchesAutomation = automationId === "all" || log.automationId === automationId;
      return matchesQuery && matchesLevel && matchesAutomation;
    });
  }, [automationId, level, logs, query]);

  return (
    <div className="space-y-6">
      <Card className="grid gap-4 p-4 lg:grid-cols-[1.4fr_0.5fr_0.65fr]">
        <label className="flex h-11 items-center gap-3 rounded-md border border-white/12 bg-zinc-950 px-3 text-sm text-zinc-300">
          <Search className="h-4 w-4 text-emerald-200" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar mensagem, contexto ou automacao"
            className="w-full bg-transparent outline-none placeholder:text-zinc-600"
          />
        </label>
        <select value={level} onChange={(event) => setLevel(event.target.value)} className="h-11 rounded-md border border-white/12 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none">
          <option value="all">Todos os niveis</option>
          <option value="info">info</option>
          <option value="success">success</option>
          <option value="warning">warning</option>
          <option value="error">error</option>
        </select>
        <select value={automationId} onChange={(event) => setAutomationId(event.target.value)} className="h-11 rounded-md border border-white/12 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none">
          {automationOptions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "Todas automacoes" : item}
            </option>
          ))}
        </select>
      </Card>

      <Card className="space-y-3 p-4">
        {filtered.map((log) => (
          <div key={log.id} className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm lg:grid-cols-[0.9fr_0.4fr_1.2fr_0.45fr] lg:items-center">
            <div>
              <p className="font-semibold text-white">{log.automationName}</p>
              <p className="mt-1 text-xs text-zinc-500">{log.context} - {log.timestamp}</p>
            </div>
            <Badge tone={levelTone[log.level]}>{log.level}</Badge>
            <p className="leading-6 text-zinc-300">{log.message}</p>
            <p className="text-right text-xs text-zinc-500">{log.recordsProcessed.toLocaleString("pt-BR")} registros</p>
          </div>
        ))}
        {filtered.length === 0 ? <p className="text-sm text-zinc-400">Nenhum log encontrado com os filtros atuais.</p> : null}
      </Card>
    </div>
  );
}
