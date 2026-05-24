// EvolutionTree.tsx
// Design: Evolutionary Cartography — D3 hierarchical tree with parchment aesthetic
// Nodes: size=capabilityGain, color=category, dashed=stalled/superseded
// Edges: thickness=influenceScore

import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type EvolutionNode,
  type TheoryCategory,
  categoryColors,
  categoryLabels,
  evolutionNodes,
  statusLabels,
} from "@/data/evolutionData";

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  filterCategories: TheoryCategory[];
}

interface D3Node {
  id: string;
  x: number;
  y: number;
  data: EvolutionNode;
}

interface D3Edge {
  source: D3Node;
  target: D3Node;
}

const YEAR_MIN = 1955;
const YEAR_MAX = 2026;
const NODE_R_BASE = 9;
const NODE_R_SCALE = 0.14;

const CATEGORY_ORDER: TheoryCategory[] = [
  "symbolic",
  "connectionist",
  "reinforcement",
  "transformer",
  "diffusion",
  "hybrid",
];

export default function EvolutionTree({ selectedId, onSelect, filterCategories }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: EvolutionNode } | null>(null);

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: Math.max(600, entry.contentRect.height),
        });
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const draw = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 50, right: 80, bottom: 30, left: 70 };

    const visibleCats = filterCategories.length > 0
      ? CATEGORY_ORDER.filter((c) => filterCategories.includes(c))
      : CATEGORY_ORDER;

    const visibleNodes = evolutionNodes.filter(
      (n) => visibleCats.includes(n.category)
    );
    const visibleIds = new Set(visibleNodes.map((n) => n.id));

    // X: spread categories evenly
    const catCount = visibleCats.length;
    const colWidth = (width - margin.left - margin.right) / Math.max(catCount - 1, 1);

    const xForCat = (cat: TheoryCategory) => {
      const idx = visibleCats.indexOf(cat);
      if (catCount === 1) return margin.left + (width - margin.left - margin.right) / 2;
      return margin.left + idx * colWidth;
    };

    const yScale = d3
      .scaleLinear()
      .domain([YEAR_MIN, YEAR_MAX])
      .range([margin.top, height - margin.bottom]);

    // Assign positions, resolving same-year same-category collisions
    const nodeMap = new Map<string, D3Node>();
    const placedByYearCat = new Map<string, number>(); // key: `${year}-${cat}` → count

    visibleNodes
      .slice()
      .sort((a, b) => a.year - b.year)
      .forEach((n) => {
        const key = `${n.year}-${n.category}`;
        const count = placedByYearCat.get(key) ?? 0;
        placedByYearCat.set(key, count + 1);

        const baseX = xForCat(n.category);
        const jitter = (count % 2 === 0 ? 1 : -1) * Math.ceil(count / 2) * 28;

        nodeMap.set(n.id, {
          id: n.id,
          x: baseX + jitter,
          y: yScale(n.year),
          data: n,
        });
      });

    // Build edges
    const edges: D3Edge[] = [];
    visibleNodes.forEach((n) => {
      n.parentIds.forEach((pid) => {
        if (visibleIds.has(pid)) {
          const src = nodeMap.get(pid);
          const tgt = nodeMap.get(n.id);
          if (src && tgt) edges.push({ source: src, target: tgt });
        }
      });
    });

    // ── SVG setup with zoom ─────────────────────────────────────────────────
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 4])
      .on("zoom", (event) => {
        mainG.attr("transform", event.transform);
      });

    const svgEl = svg
      .attr("width", width)
      .attr("height", height)
      .call(zoom as any);

    const mainG = svgEl.append("g");

    // ── Static year axis (not zoomed) ───────────────────────────────────────
    const yearTicks = [1956, 1960, 1970, 1980, 1990, 2000, 2010, 2015, 2017, 2020, 2022, 2024, 2025];
    const axisG = svgEl.append("g").attr("class", "year-axis").attr("pointer-events", "none");

    yearTicks.forEach((yr) => {
      const y = yScale(yr);
      axisG.append("line")
        .attr("x1", margin.left - 10)
        .attr("x2", width - margin.right + 10)
        .attr("y1", y).attr("y2", y)
        .attr("stroke", "oklch(0.70 0.04 70)")
        .attr("stroke-width", 0.4)
        .attr("stroke-dasharray", "3,6")
        .attr("opacity", 0.35);

      axisG.append("text")
        .attr("x", margin.left - 14)
        .attr("y", y + 4)
        .attr("text-anchor", "end")
        .attr("font-family", "'IBM Plex Mono', monospace")
        .attr("font-size", 10)
        .attr("fill", "oklch(0.52 0.04 60)")
        .text(yr);
    });

    // ── Category column headers (static) ────────────────────────────────────
    visibleCats.forEach((cat) => {
      const x = xForCat(cat);
      svgEl.append("text")
        .attr("x", x)
        .attr("y", margin.top - 22)
        .attr("text-anchor", "middle")
        .attr("font-family", "'IBM Plex Mono', monospace")
        .attr("font-size", 9)
        .attr("letter-spacing", "0.07em")
        .attr("fill", categoryColors[cat])
        .attr("opacity", 0.9)
        .text(categoryLabels[cat].toUpperCase());

      // Faint column guide line
      svgEl.append("line")
        .attr("x1", x).attr("x2", x)
        .attr("y1", margin.top - 10)
        .attr("y2", height - margin.bottom)
        .attr("stroke", categoryColors[cat])
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.08)
        .attr("pointer-events", "none");
    });

    // ── Edges ───────────────────────────────────────────────────────────────
    const edgeG = mainG.append("g").attr("class", "edges");
    edges.forEach((edge, i) => {
      const { source: src, target: tgt } = edge;
      const isStalled = tgt.data.status === "stalled" || tgt.data.status === "superseded";
      const thickness = Math.max(0.8, (tgt.data.influenceScore / 100) * 3.5);
      const color = categoryColors[tgt.data.category];

      const midY = (src.y + tgt.y) / 2;
      const path = `M ${src.x} ${src.y} C ${src.x} ${midY}, ${tgt.x} ${midY}, ${tgt.x} ${tgt.y}`;

      edgeG.append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", thickness)
        .attr("stroke-dasharray", isStalled ? "6,4" : "none")
        .attr("opacity", isStalled ? 0.30 : 0.50)
        .attr("class", "svg-edge-animate")
        .style("animation-delay", `${i * 25}ms`);
    });

    // ── Nodes ───────────────────────────────────────────────────────────────
    const nodeG = mainG.append("g").attr("class", "nodes");

    visibleNodes.forEach((n, i) => {
      const pos = nodeMap.get(n.id)!;
      const r = NODE_R_BASE + n.capabilityGain * NODE_R_SCALE;
      const color = categoryColors[n.category];
      const isSelected = n.id === selectedId;
      const isStalled = n.status === "stalled" || n.status === "superseded";

      const g = nodeG.append("g")
        .attr("class", "node")
        .attr("transform", `translate(${pos.x},${pos.y})`)
        .style("cursor", "pointer")
        .on("click", (event) => {
          event.stopPropagation();
          onSelect(n.id === selectedId ? null : n.id);
        })
        .on("mouseenter", (event) => {
          const rect = svgRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltip({ x: event.clientX - rect.left, y: event.clientY - rect.top, node: n });
          }
        })
        .on("mouseleave", () => setTooltip(null));

      // Selection ring
      if (isSelected) {
        g.append("circle")
          .attr("r", r + 7)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4,3")
          .attr("opacity", 0.7);
      }

      // Main circle
      g.append("circle")
        .attr("r", r)
        .attr("fill", isStalled ? "oklch(0.97 0.018 85)" : color)
        .attr("fill-opacity", isStalled ? 1 : 0.15)
        .attr("stroke", color)
        .attr("stroke-width", isSelected ? 2.5 : isStalled ? 0.8 : 1.5)
        .attr("stroke-dasharray", isStalled ? "4,3" : "none");

      // Inner dot
      g.append("circle")
        .attr("r", Math.min(r * 0.32, 4.5))
        .attr("fill", color)
        .attr("opacity", isStalled ? 0.35 : 0.9);

      // Label — placed above node, short labels only
      const shortLabel = n.label.length > 22 ? n.label.split(" ").slice(0, 2).join(" ") : n.label;
      g.append("text")
        .attr("y", -r - 5)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Lora', serif")
        .attr("font-size", 9)
        .attr("font-weight", isSelected ? "600" : "400")
        .attr("fill", isStalled ? "oklch(0.58 0.04 60)" : "oklch(0.22 0.04 55)")
        .attr("opacity", isStalled ? 0.7 : 1)
        .text(shortLabel);

      // Year below
      g.append("text")
        .attr("y", r + 11)
        .attr("text-anchor", "middle")
        .attr("font-family", "'IBM Plex Mono', monospace")
        .attr("font-size", 8)
        .attr("fill", "oklch(0.55 0.04 60)")
        .text(n.year);
    });

    // Click background to deselect
    svg.on("click", () => onSelect(null));

    // Initial zoom to fit
    const initialScale = 0.85;
    const tx = (width * (1 - initialScale)) / 2;
    const ty = (height * (1 - initialScale)) / 2;
    (svgEl as any).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(initialScale));

  }, [dimensions, selectedId, filterCategories, onSelect]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />

      {/* Zoom hint */}
      <div className="absolute bottom-3 right-3 mono text-[9px] text-muted-foreground bg-background/70 px-2 py-1 rounded pointer-events-none">
        スクロールでズーム · ドラッグでパン · ノードをクリックで詳細
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-50 parchment-card rounded p-3 max-w-[230px] shadow-lg"
          style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
        >
          <p
            className="font-bold text-sm leading-tight mb-1"
            style={{ fontFamily: "'Playfair Display', serif", color: categoryColors[tooltip.node.category] }}
          >
            {tooltip.node.label}
          </p>
          <p className="mono text-[10px] text-muted-foreground mb-1.5">{tooltip.node.year}</p>
          <p className="text-xs text-foreground/80 leading-snug line-clamp-3">
            {tooltip.node.description}
          </p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <span
              className="mono text-[9px] px-1.5 py-0.5 rounded"
              style={{ background: categoryColors[tooltip.node.category] + "22", color: categoryColors[tooltip.node.category] }}
            >
              {categoryLabels[tooltip.node.category]}
            </span>
            <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {statusLabels[tooltip.node.status]}
            </span>
            <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              能力 +{tooltip.node.capabilityGain}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
