// NodeDetailPanel.tsx
// Design: Evolutionary Cartography — parchment card with benchmark chart
// Shows node details + benchmark history via Recharts

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  type EvolutionNode,
  benchmarkHistories,
  categoryColors,
  categoryLabels,
  evolutionNodes,
  statusLabels,
} from "@/data/evolutionData";
import { X, ExternalLink, TrendingUp, AlertTriangle, CheckCircle2, Archive } from "lucide-react";

interface Props {
  nodeId: string;
  onClose: () => void;
}

const statusIcon = {
  active: <CheckCircle2 size={13} className="text-green-700" />,
  stalled: <AlertTriangle size={13} className="text-amber-700" />,
  superseded: <Archive size={13} className="text-slate-500" />,
  foundational: <TrendingUp size={13} className="text-blue-700" />,
};

const statusColor = {
  active: "text-green-800 bg-green-50 border-green-200",
  stalled: "text-amber-800 bg-amber-50 border-amber-200",
  superseded: "text-slate-600 bg-slate-50 border-slate-200",
  foundational: "text-blue-800 bg-blue-50 border-blue-200",
};

export default function NodeDetailPanel({ nodeId, onClose }: Props) {
  const node = evolutionNodes.find((n) => n.id === nodeId);
  if (!node) return null;

  const color = categoryColors[node.category];

  // Find related benchmarks
  const relatedBenchmarks = benchmarkHistories.filter((bh) =>
    bh.dataPoints.some((dp) =>
      node.benchmarks.some((nb) => nb.benchmark === bh.name)
    )
  );

  // Find children
  const children = evolutionNodes.filter((n) => n.parentIds.includes(nodeId));
  const parents = evolutionNodes.filter((n) => node.parentIds.includes(n.id));

  // Capability bar width
  const capWidth = `${node.capabilityGain}%`;
  const infWidth = `${node.influenceScore}%`;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border/60">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="cat-badge text-white"
              style={{ background: color }}
            >
              {categoryLabels[node.category]}
            </span>
            <span
              className={`cat-badge border flex items-center gap-1 ${statusColor[node.status]}`}
            >
              {statusIcon[node.status]}
              {statusLabels[node.status]}
            </span>
          </div>
          <h2
            className="text-lg font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color }}
          >
            {node.label}
          </h2>
          <p className="mono text-xs text-muted-foreground mt-0.5">{node.year}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 space-y-5">
        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground/85">{node.description}</p>

        {/* Key paper */}
        {node.keyPaper && (
          <div className="parchment-card rounded p-3">
            <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Key Paper
            </p>
            <p className="text-xs font-medium leading-snug">{node.keyPaper}</p>
            {node.keyPaperUrl && (
              <a
                href={node.keyPaperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 text-[11px] text-primary hover:underline"
              >
                <ExternalLink size={10} />
                論文を読む
              </a>
            )}
          </div>
        )}

        {/* Capability & Influence bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="mono text-[10px] text-muted-foreground uppercase tracking-wider">
                能力上昇幅
              </span>
              <span className="mono text-[11px] font-medium" style={{ color }}>
                {node.capabilityGain}/100
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: capWidth, background: color, opacity: 0.75 }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="mono text-[10px] text-muted-foreground uppercase tracking-wider">
                後世への影響力
              </span>
              <span className="mono text-[11px] font-medium" style={{ color }}>
                {node.influenceScore}/100
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: infWidth, background: color, opacity: 0.55 }}
              />
            </div>
          </div>
        </div>

        {/* Why stalled / succeeded */}
        {node.whyStalledOrSucceeded && (
          <div className="rounded p-3 border-l-2" style={{ borderColor: color, background: color + "10" }}>
            <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              {node.status === "stalled" || node.status === "superseded"
                ? "なぜ失速・置換されたか"
                : "なぜ成功したか"}
            </p>
            <p className="text-xs leading-relaxed">{node.whyStalledOrSucceeded}</p>
          </div>
        )}

        {/* Benchmark chart */}
        {node.benchmarks.length > 0 && (
          <div>
            <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              ベンチマーク実績
            </p>
            <div className="space-y-3">
              {node.benchmarks.map((bm) => {
                const history = benchmarkHistories.find((bh) => bh.name === bm.benchmark);
                const chartData = history
                  ? history.dataPoints.map((dp) => ({
                      year: dp.year,
                      score: dp.score,
                      model: dp.model,
                    }))
                  : [{ year: bm.year, score: bm.score, model: node.label }];

                return (
                  <div key={bm.benchmark} className="parchment-card rounded p-3">
                    <p className="text-xs font-semibold mb-2">{bm.benchmark}</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.82 0.030 75)" strokeOpacity={0.5} />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fill: "oklch(0.52 0.04 60)" }}
                          tickLine={false}
                          axisLine={{ stroke: "oklch(0.82 0.030 75)" }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fill: "oklch(0.52 0.04 60)" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 10,
                            background: "oklch(0.99 0.010 85)",
                            border: "1px solid oklch(0.82 0.030 75)",
                            borderRadius: 4,
                          }}
                          formatter={(val: number) => [`${val}`, "スコア"]}
                        />
                        <ReferenceLine
                          y={bm.humanBaseline}
                          stroke="oklch(0.52 0.04 60)"
                          strokeDasharray="4 3"
                          strokeOpacity={0.6}
                          label={{ value: "人間", position: "right", fontSize: 8, fontFamily: "'IBM Plex Mono', monospace", fill: "oklch(0.52 0.04 60)" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke={color}
                          strokeWidth={2}
                          dot={{ fill: color, r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="mono text-[9px] text-muted-foreground mt-1">
                      点線 = 人間ベースライン ({bm.humanBaseline})
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Relations */}
        {(parents.length > 0 || children.length > 0) && (
          <div className="space-y-2">
            {parents.length > 0 && (
              <div>
                <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                  親理論・前身
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {parents.map((p) => (
                    <span
                      key={p.id}
                      className="text-xs px-2 py-0.5 rounded border"
                      style={{
                        borderColor: categoryColors[p.category] + "60",
                        color: categoryColors[p.category],
                        background: categoryColors[p.category] + "10",
                      }}
                    >
                      {p.label} ({p.year})
                    </span>
                  ))}
                </div>
              </div>
            )}
            {children.length > 0 && (
              <div>
                <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                  派生・後継
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {children.map((c) => (
                    <span
                      key={c.id}
                      className="text-xs px-2 py-0.5 rounded border"
                      style={{
                        borderColor: categoryColors[c.category] + "60",
                        color: categoryColors[c.category],
                        background: categoryColors[c.category] + "10",
                      }}
                    >
                      {c.label} ({c.year})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
