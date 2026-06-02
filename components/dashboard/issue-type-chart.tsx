"use client";

import dynamic from "next/dynamic";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { ErrorTypeMetric } from "@/lib/types";

const colors = ["#32d6a0", "#72a7ff", "#f9c74f", "#ff6b6b"];

function IssueTypeChartInner({ data }: { data: ErrorTypeMetric[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#0b0f16", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const IssueTypeChart = dynamic(() => Promise.resolve(IssueTypeChartInner), {
  ssr: false,
  loading: () => <div className="h-64 rounded-md bg-white/[0.035]" />,
});
