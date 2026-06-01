"use client";

import dynamic from "next/dynamic";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ExecutionHistoryEntry } from "@/lib/types";

function OperationalImpactChartInner({ data }: { data: ExecutionHistoryEntry[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="hoursSaved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#32d6a0" stopOpacity={0.34} />
              <stop offset="95%" stopColor="#32d6a0" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#0b0f16", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Area type="monotone" dataKey="hoursSaved" name="Horas economizadas" stroke="#32d6a0" fill="url(#hoursSaved)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const OperationalImpactChart = dynamic(() => Promise.resolve(OperationalImpactChartInner), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-md bg-white/[0.035]" aria-hidden="true" />,
});
