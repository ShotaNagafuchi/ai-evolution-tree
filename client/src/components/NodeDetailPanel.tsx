import React from "react";
import { X, ExternalLink, TrendingUp, Cpu, Lightbulb, CheckCircle, XCircle, Tag } from "lucide-react";
import { BreakthroughNode, LANE_COLORS, laneLabels, statusLabels } from "@/data/evolutionData";

interface NodeDetailPanelProps {
  node: BreakthroughNode;
  onClose: () => void;
  onNavigateTo: (nodeId: string) => void;
  allNodes: BreakthroughNode[];
}

const statusColors: Record<string, string> = {
  active: "#22c55e",
  foundational: "#3b82f6",
  stalled: "#f59e0b",
  superseded: "#ef4444",
};

export default function NodeDetailPanel({
  node,
  onClose,
  onNavigateTo,
  allNodes,
}: NodeDetailPanelProps) {
  const laneColor = LANE_COLORS[node.lane];
  const children = allNodes.filter((n) => n.parentIds.includes(node.id));
  const parents = allNodes.filter((n) => node.parentIds.includes(n.id));

  return (
    <div className="detail-panel h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 py-4 border-b border-border"
        style={{ borderTop: `3px solid ${laneColor}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="mono text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: laneColor + "22", color: laneColor }}
              >
                {laneLabels[node.lane]}
              </span>
              <span
                className="mono text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: statusColors[node.status] + "22",
                  color: statusColors[node.status],
                }}
              >
                {statusLabels[node.status]}
              </span>
            </div>
            <h2 className="display text-xl font-bold text-foreground leading-tight">
              {node.label.replace(/\n/g, " ")}
            </h2>
            <p className="mono text-xs text-muted-foreground mt-1">{node.year}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-primary mt-2 font-medium italic">{node.tagline}</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Description */}
        <section>
          <p className="text-sm text-foreground/90 leading-relaxed">{node.description}</p>
        </section>

        {/* Capability Metrics */}
        {node.capabilityMetrics.length > 0 && (
          <section>
            <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
              <TrendingUp size={12} />
              Capability Gain
            </h3>
            <div className="space-y-3">
              {node.capabilityMetrics.map((m, i) => (
                <div key={i} className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-foreground">{m.domain}</span>
                    <span
                      className="mono text-xs font-bold"
                      style={{ color: laneColor }}
                    >
                      +{m.after - m.before}pt
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mono text-xs text-muted-foreground w-8 text-right">{m.before}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full relative">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full opacity-30"
                          style={{
                            width: `${m.before}%`,
                            background: laneColor,
                          }}
                        />
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${m.after}%`,
                            background: laneColor,
                            transition: "width 600ms cubic-bezier(0.23,1,0.32,1)",
                          }}
                        />
                      </div>
                    </div>
                    <span className="mono text-xs font-bold text-foreground w-8">{m.after}</span>
                  </div>
                  {m.benchmark && (
                    <p className="mono text-xs text-muted-foreground mt-1.5">{m.benchmark}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Overall scores */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-card rounded-lg p-2.5 border border-border text-center">
                <div className="mono text-lg font-bold" style={{ color: laneColor }}>
                  {node.capabilityGain}
                </div>
                <div className="mono text-xs text-muted-foreground mt-0.5">Capability</div>
              </div>
              <div className="bg-card rounded-lg p-2.5 border border-border text-center">
                <div className="mono text-lg font-bold text-amber-400">
                  {node.influenceScore}
                </div>
                <div className="mono text-xs text-muted-foreground mt-0.5">Influence</div>
              </div>
              <div className="bg-card rounded-lg p-2.5 border border-border text-center">
                <div
                  className="mono text-lg font-bold"
                  style={{ color: node.computeCost < 0 ? "#22c55e" : "#f59e0b" }}
                >
                  {node.computeCost > 0 ? "+" : ""}{node.computeCost}
                </div>
                <div className="mono text-xs text-muted-foreground mt-0.5">Compute</div>
              </div>
            </div>
          </section>
        )}

        {/* Mechanism */}
        <section>
          <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <Cpu size={12} />
            How It Works
          </h3>
          <p className="text-sm text-foreground/85 leading-relaxed bg-card rounded-lg p-3 border border-border">
            {node.mechanism}
          </p>
        </section>

        {/* Inspiration */}
        <section>
          <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <Lightbulb size={12} />
            Inspiration & Origin
          </h3>
          <p className="text-sm text-foreground/85 leading-relaxed bg-card rounded-lg p-3 border border-border">
            {node.inspiration}
          </p>
        </section>

        {/* Why it worked / failed */}
        {node.whyItWorked && (
          <section>
            <h3 className="mono text-xs uppercase tracking-widest text-green-500 mb-2 flex items-center gap-1.5">
              <CheckCircle size={12} />
              Why It Worked
            </h3>
            <p className="text-sm text-foreground/85 leading-relaxed bg-green-950/30 rounded-lg p-3 border border-green-900/40">
              {node.whyItWorked}
            </p>
          </section>
        )}

        {node.whyItFailed && (
          <section>
            <h3 className="mono text-xs uppercase tracking-widest text-red-400 mb-2 flex items-center gap-1.5">
              <XCircle size={12} />
              Why It Stalled / Was Superseded
            </h3>
            <p className="text-sm text-foreground/85 leading-relaxed bg-red-950/30 rounded-lg p-3 border border-red-900/40">
              {node.whyItFailed}
            </p>
          </section>
        )}

        {/* Key Paper */}
        {node.keyPaper && (
          <section>
            <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Key Paper
            </h3>
            <div className="bg-card rounded-lg p-3 border border-border">
              {node.keyPaperUrl ? (
                <a
                  href={node.keyPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-start gap-1.5"
                >
                  <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{node.keyPaper}</span>
                </a>
              ) : (
                <p className="text-sm text-foreground/85">{node.keyPaper}</p>
              )}
              {node.authors && (
                <p className="mono text-xs text-muted-foreground mt-1.5">
                  {node.authors} — {node.institution}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Tags */}
        <section>
          <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <Tag size={12} />
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="mono text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Connections */}
        {(parents.length > 0 || children.length > 0) && (
          <section>
            <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Connections
            </h3>
            {parents.length > 0 && (
              <div className="mb-3">
                <p className="mono text-xs text-muted-foreground mb-1.5">Built upon</p>
                <div className="space-y-1">
                  {parents.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onNavigateTo(p.id)}
                      className="w-full text-left text-xs px-3 py-2 rounded-md bg-secondary hover:bg-accent transition-colors flex items-center justify-between group"
                    >
                      <span className="text-foreground/85">{p.label.replace(/\n/g, " ")}</span>
                      <span className="mono text-muted-foreground group-hover:text-foreground transition-colors">
                        {p.year}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {children.length > 0 && (
              <div>
                <p className="mono text-xs text-muted-foreground mb-1.5">Led to</p>
                <div className="space-y-1">
                  {children.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onNavigateTo(c.id)}
                      className="w-full text-left text-xs px-3 py-2 rounded-md bg-secondary hover:bg-accent transition-colors flex items-center justify-between group"
                    >
                      <span className="text-foreground/85">{c.label.replace(/\n/g, " ")}</span>
                      <span className="mono text-muted-foreground group-hover:text-foreground transition-colors">
                        {c.year}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
