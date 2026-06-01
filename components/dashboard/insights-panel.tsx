import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import type { Insight } from "@/lib/types";

export function InsightsPanel({ insights }: { insights: Insight[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-5 w-5 text-amber-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white">Insights automaticos</h2>
      </div>
      <div className="mt-4 space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-md border border-white/10 bg-black/18 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
              <Badge tone={insight.severity === "high" ? "rose" : insight.severity === "medium" ? "amber" : "blue"}>{insight.category}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{insight.description}</p>
            <p className="mt-2 text-sm text-emerald-100">{insight.recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
