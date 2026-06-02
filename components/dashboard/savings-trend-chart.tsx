"use client";

import dynamic from "next/dynamic";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ExecutionHistoryEntry } from "@/lib/types";

function SavingsTrendChartInner({ data }: { data: ExecutionHistoryEntry[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#0b0f16", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
          <Line type="monotone" dataKey="savingsBRL" name="Economia mensal" stroke="#32d6a0" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const SavingsTrendChart = dynamic(() => Promise.resolve(SavingsTrendChartInner), {
  ssr: false,
  loading: () => <div className="h-64 rounded-md bg-white/[0.035]" />,
});
