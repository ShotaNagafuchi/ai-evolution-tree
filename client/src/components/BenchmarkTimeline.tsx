// BenchmarkTimeline.tsx
// Design: Evolutionary Cartography — benchmark saturation chart
// Shows how quickly AI surpassed human baseline on each benchmark

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { benchmarkHistories } from "@/data/evolutionData";
import { useState } from "react";

const DOMAIN_COLORS: Record<string, string> = {
  Vision: "#2D6A4F",
  Language: "#6B2D8B",
  Reasoning: "#1B4F72",
  Coding: "#8B6914",
};

export default function BenchmarkTimeline() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const domains = Array.from(new Set(benchmarkHistories.map((b) => b.domain)));

  const filtered = selectedDomain
    ? benchmarkHistories.filter((b) => b.domain === selectedDomain)
    : benchmarkHistories;

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          ベンチマーク飽和タイムライン
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          各ベンチマークでAIが人間レベルに到達するまでの軌跡。点線は人間のベースライン性能を示す。
        </p>
      </div>

      {/* Domain filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSelectedDomain(null)}
          className={`cat-badge border transition-colors ${
            selectedDomain === null
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
          }`}
        >
          すべて
        </button>
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d === selectedDomain ? null : d)}
            className="cat-badge border transition-colors"
            style={
              selectedDomain === d
                ? { background: DOMAIN_COLORS[d] || "#555", color: "#fff", borderColor: DOMAIN_COLORS[d] || "#555" }
                : { background: "transparent", color: DOMAIN_COLORS[d] || "#555", borderColor: (DOMAIN_COLORS[d] || "#555") + "60" }
            }
          >
            {d}
          </button>
        ))}
      </div>

      {/* Benchmark cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((bh) => {
          const color = DOMAIN_COLORS[bh.domain] || "#555";
          const isSaturated = !!bh.saturated;
          const yearsToSaturate = bh.saturated ? bh.saturated - bh.introduced : null;

          return (
            <div key={bh.id} className="parchment-card rounded-lg p-4">
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {bh.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="cat-badge"
                      style={{ background: color + "20", color, border: `1px solid ${color}40` }}
                    >
                      {bh.domain}
                    </span>
                    <span className="mono text-[9px] text-muted-foreground">
                      導入: {bh.introduced}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {isSaturated ? (
                    <div>
                      <p className="mono text-[10px] font-medium" style={{ color }}>
                        {bh.saturated}年に突破
                      </p>
                      <p className="mono text-[9px] text-muted-foreground">
                        {yearsToSaturate}年で飽和
                      </p>
                    </div>
                  ) : (
                    <p className="mono text-[10px] text-muted-foreground">未飽和</p>
                  )}
                </div>
              </div>

              {/* Chart */}
              <ResponsiveContainer width="100%" height={130}>
                <LineChart
                  data={bh.dataPoints}
                  margin={{ top: 4, right: 8, bottom: 4, left: -20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.82 0.030 75)"
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fill: "oklch(0.52 0.04 60)" }}
                    tickLine={false}
                    axisLine={{ stroke: "oklch(0.82 0.030 75)" }}
                  />
                  <YAxis
                    domain={[0, 105]}
                    tick={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fill: "oklch(0.52 0.04 60)" }}
                    tickLine={false}
                    axisLine={false}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      background: "oklch(0.99 0.010 85)",
                      border: "1px solid oklch(0.82 0.030 75)",
                      borderRadius: 4,
                    }}
                    formatter={(val: number, _: string, props: any) => [
                      `${val} (${props.payload?.model || ""})`,
                      "スコア",
                    ]}
                  />
                  {/* Human baseline */}
                  <ReferenceLine
                    y={bh.humanBaseline}
                    stroke="oklch(0.45 0.04 60)"
                    strokeDasharray="5 3"
                    strokeOpacity={0.7}
                    label={{
                      value: `人間 ${bh.humanBaseline}`,
                      position: "insideTopRight",
                      fontSize: 8,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fill: "oklch(0.45 0.04 60)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={color}
                    strokeWidth={2.5}
                    dot={{ fill: color, r: 3.5, strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Latest score */}
              {bh.dataPoints.length > 0 && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/40">
                  <span className="mono text-[9px] text-muted-foreground">
                    最新: {bh.dataPoints[bh.dataPoints.length - 1].model}
                  </span>
                  <span className="mono text-[10px] font-medium" style={{ color }}>
                    {bh.dataPoints[bh.dataPoints.length - 1].score} / {bh.humanBaseline}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-6 parchment-card rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          飽和速度の加速
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "MNIST", year: 1998, saturated: 2003, gap: 5 },
            { label: "ImageNet", year: 2010, saturated: 2015, gap: 5 },
            { label: "GLUE", year: 2018, saturated: 2019, gap: 1 },
            { label: "GPQA", year: 2023, saturated: 2024, gap: 1 },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="mono text-[9px] text-muted-foreground uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: item.gap <= 1 ? "#8B2252" : "#2D6A4F" }}>
                {item.gap}年
              </p>
              <p className="mono text-[9px] text-muted-foreground">
                {item.year}→{item.saturated}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          MNISTは5年かけて飽和したが、GLUEやGPQAは導入から1年以内に人間レベルを超えた。
          ベンチマーク設計がAIの進歩に追いつけなくなっている。
        </p>
      </div>
    </div>
  );
}
