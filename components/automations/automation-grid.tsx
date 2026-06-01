"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { AutomationCard } from "@/components/automations/automation-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Automation } from "@/lib/types";

export function AutomationGrid({ automations }: { automations: Automation[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [impact, setImpact] = useState("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(automations.map((item) => item.category)))], [automations]);
  const impacts = ["all", "critical", "high", "medium"];

  const filtered = automations.filter((automation) => {
    const matchesQuery = [automation.name, automation.category, automation.description]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === "all" || automation.category === category;
    const matchesImpact = impact === "all" || automation.impact === impact;

    return matchesQuery && matchesCategory && matchesImpact;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 md:grid-cols-[1fr_220px_180px]">
        <label className="relative block">
          <span className="sr-only">Buscar automacao</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, categoria ou problema"
            className="h-11 w-full rounded-md border border-white/10 bg-black/20 pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-300 focus:outline-none"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Filtrar por categoria</span>
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-black/20 pl-10 pr-3 text-sm text-white focus:border-emerald-300 focus:outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "Todas as categorias" : item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Filtrar por impacto</span>
          <select
            value={impact}
            onChange={(event) => setImpact(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm text-white focus:border-emerald-300 focus:outline-none"
          >
            {impacts.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "Todos os impactos" : `Impacto ${item}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhuma automacao encontrada" description="Ajuste os filtros ou limpe a busca para ver as simulacoes disponiveis." />
      )}
    </div>
  );
}
