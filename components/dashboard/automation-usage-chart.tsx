"use client";

import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Automation } from "@/lib/types";

function AutomationUsageChartInner({ automations }: { automations: Automation[] }) {
  const data = automations.map((automation) => ({
    name: automation.name.replace(" de ", " ").slice(0, 18),
    horas: automation.estimatedSavingsHours,
    registros: automation.processedRecords,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#0b0f16", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Bar dataKey="horas" name="Horas economizadas" fill="#72a7ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AutomationUsageChart = dynamic(() => Promise.resolve(AutomationUsageChartInner), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-md bg-white/[0.035]" aria-hidden="true" />,
});
