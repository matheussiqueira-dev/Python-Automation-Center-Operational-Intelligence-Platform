"use client";

import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Automation } from "@/lib/types";

function DataQualityChartInner({ automations }: { automations: Automation[] }) {
  const data = automations.map((automation) => ({
    name: automation.name.replace(" de ", " ").slice(0, 18),
    antes: automation.qualityBefore,
    depois: automation.qualityAfter,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#0b0f16", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#d4d4d8", fontSize: 12 }} />
          <Bar dataKey="antes" name="Antes" fill="#ff6b6b" radius={[6, 6, 0, 0]} />
          <Bar dataKey="depois" name="Depois" fill="#32d6a0" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export const DataQualityChart = dynamic(() => Promise.resolve(DataQualityChartInner), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-md bg-white/[0.035]" aria-hidden="true" />,
});
