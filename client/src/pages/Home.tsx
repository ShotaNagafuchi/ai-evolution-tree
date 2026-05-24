import React, { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerticalTimeline from "@/components/VerticalTimeline";
import NodeDetailPanel from "@/components/NodeDetailPanel";
import BenchmarkTimeline from "@/components/BenchmarkTimeline";
import {
  nodes,
  eras,
  LANE_COLORS,
  laneLabels,
  ALL_LANES,
  BreakthroughNode,
  ResearchLane,
} from "@/data/evolutionData";
import { GitBranch, BarChart2, Info, Filter, X } from "lucide-react";

const STATUS_LEGEND = [
  { status: "active", color: "#22c55e", label: "Active / Ongoing" },
  { status: "foundational", color: "#3b82f6", label: "Foundational" },
  { status: "stalled", color: "#f59e0b", label: "Stalled" },
  { status: "superseded", color: "#ef4444", label: "Superseded" },
];

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<BreakthroughNode | null>(null);
  const [activeLanes, setActiveLanes] = useState<Set<ResearchLane>>(
    new Set(ALL_LANES)
  );
  const [activeEras, setActiveEras] = useState<Set<string>>(
    new Set(eras.map((e) => e.id))
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleSelectNode = useCallback((node: BreakthroughNode | null) => {
    setSelectedNode(node);
  }, []);

  const handleNavigateTo = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) setSelectedNode(node);
  }, []);

  const toggleLane = (lane: ResearchLane) => {
    setActiveLanes((prev) => {
      const next = new Set(prev);
      if (next.has(lane)) {
        if (next.size > 1) next.delete(lane);
      } else {
        next.add(lane);
      }
      return next;
    });
  };

  const toggleEra = (eraId: string) => {
    setActiveEras((prev) => {
      const next = new Set(prev);
      if (next.has(eraId)) {
        if (next.size > 1) next.delete(eraId);
      } else {
        next.add(eraId);
      }
      return next;
    });
  };

  const visibleCount = nodes.filter(
    (n) => activeLanes.has(n.lane) && activeEras.has(n.era)
  ).length;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top header */}
      <header className="flex-shrink-0 border-b border-border px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GitBranch size={18} className="text-primary" />
          <div>
            <h1 className="display text-base font-bold text-foreground leading-tight">
              AI Evolution Tree
            </h1>
            <p className="mono text-xs text-muted-foreground">
              {visibleCount} breakthroughs · 1956–2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs mono transition-colors ${
              showFilters
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter size={12} />
            Filters
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/ShotaNagafuchi/ai-evolution-tree"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs mono bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* Filter panel */}
      {showFilters && (
        <div className="flex-shrink-0 border-b border-border bg-card px-5 py-3 space-y-3">
          {/* Lane filters */}
          <div>
            <p className="mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">Research Lanes</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_LANES.map((lane) => (
                <button
                  key={lane}
                  onClick={() => toggleLane(lane)}
                  className="px-2.5 py-1 rounded-full text-xs mono transition-all"
                  style={
                    activeLanes.has(lane)
                      ? {
                          background: LANE_COLORS[lane] + "22",
                          color: LANE_COLORS[lane],
                          border: `1px solid ${LANE_COLORS[lane]}55`,
                        }
                      : {
                          background: "oklch(0.16 0.01 240)",
                          color: "oklch(0.45 0.02 240)",
                          border: "1px solid oklch(0.22 0.015 240)",
                        }
                  }
                >
                  {laneLabels[lane]}
                </button>
              ))}
            </div>
          </div>

          {/* Era filters */}
          <div>
            <p className="mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">Eras</p>
            <div className="flex flex-wrap gap-1.5">
              {eras.map((era) => (
                <button
                  key={era.id}
                  onClick={() => toggleEra(era.id)}
                  className="px-2.5 py-1 rounded-full text-xs mono transition-all"
                  style={
                    activeEras.has(era.id)
                      ? {
                          background: era.color + "22",
                          color: era.color,
                          border: `1px solid ${era.color}55`,
                        }
                      : {
                          background: "oklch(0.16 0.01 240)",
                          color: "oklch(0.45 0.02 240)",
                          border: "1px solid oklch(0.22 0.015 240)",
                        }
                  }
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status legend */}
          <div className="flex items-center gap-4 pt-1">
            {STATUS_LEGEND.map((s) => (
              <div key={s.status} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="mono text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Timeline tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="tree" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 px-4 pt-2 border-b border-border">
              <TabsList className="bg-secondary h-8">
                <TabsTrigger value="tree" className="text-xs mono gap-1.5 h-6">
                  <GitBranch size={11} />
                  Evolution Tree
                </TabsTrigger>
                <TabsTrigger value="benchmarks" className="text-xs mono gap-1.5 h-6">
                  <BarChart2 size={11} />
                  Benchmarks
                </TabsTrigger>
                <TabsTrigger value="about" className="text-xs mono gap-1.5 h-6">
                  <Info size={11} />
                  About
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="tree" className="flex-1 overflow-hidden m-0 mt-0">
              <VerticalTimeline
                onSelectNode={handleSelectNode}
                selectedNodeId={selectedNode?.id ?? null}
                activeLanes={activeLanes}
                activeEras={activeEras}
              />
            </TabsContent>

            <TabsContent value="benchmarks" className="flex-1 overflow-y-auto m-0 p-5">
              <div className="max-w-3xl">
                <h2 className="display text-xl font-bold text-foreground mb-1">
                  Benchmark Saturation History
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  How quickly AI surpassed human performance on each benchmark — and why researchers had to keep raising the bar.
                </p>
                <BenchmarkTimeline />
              </div>
            </TabsContent>

            <TabsContent value="about" className="flex-1 overflow-y-auto m-0 p-5">
              <div className="max-w-2xl space-y-5">
                <div>
                  <h2 className="display text-xl font-bold text-foreground mb-2">
                    About This Project
                  </h2>
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    AI Evolution Tree visualizes 70 years of AI research breakthroughs as an interactive phylogenetic chart. Each node represents a key theoretical or engineering breakthrough, placed on a vertical time axis and categorized by research approach (Algorithm, Architecture, Hardware, Data, Optimization, Alignment).
                  </p>
                </div>

                <div>
                  <h3 className="display text-base font-semibold text-foreground mb-2">How to Read the Tree</h3>
                  <div className="space-y-2 text-sm text-foreground/80">
                    <p><span className="text-foreground font-medium">Vertical axis</span> — Time (scroll down = move forward in history)</p>
                    <p><span className="text-foreground font-medium">Horizontal lanes</span> — Research approach category</p>
                    <p><span className="text-foreground font-medium">Solid lines</span> — Direct intellectual lineage</p>
                    <p><span className="text-foreground font-medium">Dashed lines</span> — Stalled or superseded path</p>
                    <p><span className="text-foreground font-medium">Left stripe color</span> — Research lane</p>
                    <p><span className="text-foreground font-medium">Click any node</span> — Opens detailed panel with mechanism, inspiration, capability metrics, and connections</p>
                  </div>
                </div>

                <div>
                  <h3 className="display text-base font-semibold text-foreground mb-2">Metrics Explained</h3>
                  <div className="space-y-1.5 text-sm text-foreground/80">
                    <p><span className="text-foreground font-medium">Capability Gain</span> — Estimated improvement in task performance (0–100)</p>
                    <p><span className="text-foreground font-medium">Influence Score</span> — How many subsequent breakthroughs cite or build on this work</p>
                    <p><span className="text-foreground font-medium">Compute Cost</span> — Relative change in training/inference cost (negative = reduction)</p>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-4 border border-border text-xs mono text-muted-foreground">
                  <p>Data sources: arXiv papers, Stanford AI Index, Epoch AI, Papers With Code benchmarks.</p>
                  <p className="mt-1">Open source · MIT License · <a href="https://github.com/ShotaNagafuchi/ai-evolution-tree" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">github.com/ShotaNagafuchi/ai-evolution-tree</a></p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div
            className="flex-shrink-0 border-l border-border bg-card overflow-hidden"
            style={{ width: 360 }}
          >
            <NodeDetailPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onNavigateTo={handleNavigateTo}
              allNodes={nodes}
            />
          </div>
        )}
      </div>
    </div>
  );
}
