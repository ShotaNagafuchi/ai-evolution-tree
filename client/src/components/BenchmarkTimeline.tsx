import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { benchmarkHistories, BenchmarkHistory } from "@/data/evolutionData";

const DOMAIN_COLORS: Record<string, string> = {
  Vision: "#3b82f6",
  Language: "#8b5cf6",
  Reasoning: "#f59e0b",
  Coding: "#22c55e",
};

export default function BenchmarkTimeline() {
  const [selected, setSelected] = useState<BenchmarkHistory>(benchmarkHistories[4]); // GSM8K default

  const chartData = selected.dataPoints.map((d) => ({
    year: d.year,
    score: d.score,
    model: d.model,
  }));

  const domainColor = DOMAIN_COLORS[selected.domain] || "#64748b";

  return (
    <div className="space-y-6">
      {/* Benchmark selector */}
      <div className="flex flex-wrap gap-2">
        {benchmarkHistories.map((bh) => (
          <button
            key={bh.id}
            onClick={() => setSelected(bh)}
            className={`px-3 py-1.5 rounded-full text-xs mono transition-all ${
              selected.id === bh.id
                ? "text-background font-medium"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
            style={
              selected.id === bh.id
                ? { background: DOMAIN_COLORS[bh.domain] || "#64748b" }
                : {}
            }
          >
            {bh.name}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="display text-lg font-semibold text-foreground">{selected.name}</h3>
            <p className="mono text-xs text-muted-foreground mt-0.5">
              {selected.domain} · Introduced {selected.introduced}
              {selected.saturated ? ` · Saturated ${selected.saturated}` : ""}
            </p>
          </div>
          <span
            className="mono text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: domainColor + "22", color: domainColor }}
          >
            {selected.domain}
          </span>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" />
            <XAxis
              dataKey="year"
              tick={{ fill: "oklch(0.55 0.02 240)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              tickLine={false}
              axisLine={{ stroke: "oklch(0.22 0.015 240)" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "oklch(0.55 0.02 240)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.13 0.012 240)",
                border: "1px solid oklch(0.22 0.015 240)",
                borderRadius: "8px",
                fontFamily: "IBM Plex Mono",
                fontSize: 12,
              }}
              labelStyle={{ color: "oklch(0.55 0.02 240)" }}
              itemStyle={{ color: domainColor }}
              formatter={(value: number, _: string, payload: any) => [
                `${value.toFixed(1)}% — ${payload.payload.model}`,
                "Score",
              ]}
            />
            {/* Human baseline */}
            <ReferenceLine
              y={selected.humanBaseline}
              stroke="oklch(0.65 0.18 250)"
              strokeDasharray="6 3"
              label={{
                value: `Human ${selected.humanBaseline}%`,
                fill: "oklch(0.65 0.18 250)",
                fontSize: 10,
                fontFamily: "IBM Plex Mono",
                position: "insideTopRight",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={domainColor}
              strokeWidth={2.5}
              dot={{ fill: domainColor, r: 5, strokeWidth: 0 }}
              activeDot={{ r: 7, fill: domainColor }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Data points table */}
        <div className="mt-4 border-t border-border pt-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground mono">
                <th className="text-left pb-2">Year</th>
                <th className="text-left pb-2">Model</th>
                <th className="text-right pb-2">Score</th>
                <th className="text-right pb-2">vs Human</th>
              </tr>
            </thead>
            <tbody>
              {selected.dataPoints.map((d, i) => (
                <tr key={i} className="border-t border-border/50">
                  <td className="mono py-1.5 text-muted-foreground">{d.year}</td>
                  <td className="py-1.5 text-foreground/85">{d.model}</td>
                  <td className="mono py-1.5 text-right font-medium" style={{ color: domainColor }}>
                    {d.score.toFixed(1)}%
                  </td>
                  <td
                    className="mono py-1.5 text-right"
                    style={{
                      color:
                        d.score >= selected.humanBaseline
                          ? "#22c55e"
                          : "oklch(0.55 0.02 240)",
                    }}
                  >
                    {d.score >= selected.humanBaseline
                      ? `+${(d.score - selected.humanBaseline).toFixed(1)}%`
                      : `${(d.score - selected.humanBaseline).toFixed(1)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saturation note */}
      {selected.saturated && (
        <div className="bg-amber-950/30 border border-amber-900/40 rounded-lg p-3 text-xs text-amber-300/80">
          <span className="font-medium mono">Benchmark Saturated {selected.saturated}:</span>{" "}
          AI performance exceeded human baseline, making this benchmark no longer useful for measuring progress.
          Researchers moved to harder benchmarks.
        </div>
      )}
    </div>
  );
}
