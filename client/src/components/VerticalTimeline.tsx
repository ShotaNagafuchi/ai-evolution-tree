import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  nodes,
  eras,
  LANE_COLORS,
  laneLabels,
  ALL_LANES,
  BreakthroughNode,
  ResearchLane,
  Era,
  NodeStatus,
} from "@/data/evolutionData";

interface TimelineProps {
  onSelectNode: (node: BreakthroughNode | null) => void;
  selectedNodeId: string | null;
  activeLanes: Set<ResearchLane>;
  activeEras: Set<string>;
}

const YEAR_START = 1956;
const YEAR_END = 2026;
const YEAR_HEIGHT = 36; // px per year
const LANE_WIDTH = 170;
const YEAR_AXIS_WIDTH = 68;
const NODE_CARD_WIDTH = 156;
const TOTAL_HEIGHT = (YEAR_END - YEAR_START + 2) * YEAR_HEIGHT;

const STATUS_BORDER: Record<NodeStatus, string> = {
  active: "2px solid",
  foundational: "2px solid",
  stalled: "1px dashed",
  superseded: "1px dashed",
};

function yearToY(year: number): number {
  return (year - YEAR_START) * YEAR_HEIGHT + YEAR_HEIGHT / 2;
}

function laneToX(lane: ResearchLane): number {
  const idx = ALL_LANES.indexOf(lane);
  return YEAR_AXIS_WIDTH + idx * LANE_WIDTH + LANE_WIDTH / 2;
}

export default function VerticalTimeline({
  onSelectNode,
  selectedNodeId,
  activeLanes,
  activeEras,
}: TimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const totalWidth = YEAR_AXIS_WIDTH + ALL_LANES.length * LANE_WIDTH;

  const visibleNodes = nodes.filter(
    (n) => activeLanes.has(n.lane) && activeEras.has(n.era)
  );

  // Scroll to selected node
  useEffect(() => {
    if (!selectedNodeId || !containerRef.current) return;
    const node = nodes.find((n) => n.id === selectedNodeId);
    if (!node) return;
    const y = yearToY(node.year);
    const container = containerRef.current;
    const targetScroll = y - container.clientHeight / 2;
    container.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
  }, [selectedNodeId]);

  const handleNodeClick = useCallback(
    (node: BreakthroughNode) => {
      onSelectNode(selectedNodeId === node.id ? null : node);
    },
    [onSelectNode, selectedNodeId]
  );

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto overflow-x-auto h-full"
      style={{ background: "oklch(0.09 0.01 240)" }}
    >
      <svg
        ref={svgRef}
        width={totalWidth}
        height={TOTAL_HEIGHT + 40}
        style={{ display: "block", minWidth: totalWidth }}
      >
        {/* Era background bands */}
        {eras.map((era) => {
          const y1 = yearToY(era.yearStart) - YEAR_HEIGHT / 2;
          const y2 = yearToY(Math.min(era.yearEnd, YEAR_END)) + YEAR_HEIGHT / 2;
          const isActive = activeEras.has(era.id);
          return (
            <g key={era.id}>
              <rect
                x={YEAR_AXIS_WIDTH}
                y={y1}
                width={ALL_LANES.length * LANE_WIDTH}
                height={y2 - y1}
                fill={era.color}
                opacity={isActive ? 0.04 : 0.01}
              />
              {/* Era label */}
              <text
                x={YEAR_AXIS_WIDTH + 8}
                y={y1 + 16}
                fill={era.color}
                opacity={isActive ? 0.55 : 0.2}
                fontSize={9}
                fontFamily="IBM Plex Mono"
                letterSpacing="0.08em"
              >
                {era.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Lane vertical dividers */}
        {ALL_LANES.map((lane, i) => (
          <line
            key={lane}
            x1={YEAR_AXIS_WIDTH + i * LANE_WIDTH}
            y1={0}
            x2={YEAR_AXIS_WIDTH + i * LANE_WIDTH}
            y2={TOTAL_HEIGHT + 40}
            stroke="oklch(0.18 0.015 240)"
            strokeWidth={1}
          />
        ))}

        {/* Year axis ticks */}
        {Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => {
          const year = YEAR_START + i;
          const y = yearToY(year);
          const isMajor = year % 5 === 0;
          return (
            <g key={year}>
              {isMajor && (
                <>
                  <line
                    x1={YEAR_AXIS_WIDTH - 8}
                    y1={y}
                    x2={YEAR_AXIS_WIDTH + ALL_LANES.length * LANE_WIDTH}
                    y2={y}
                    stroke="oklch(0.18 0.015 240)"
                    strokeWidth={0.5}
                    strokeDasharray="2 4"
                  />
                  <text
                    x={YEAR_AXIS_WIDTH - 12}
                    y={y + 4}
                    textAnchor="end"
                    fill="oklch(0.45 0.02 240)"
                    fontSize={10}
                    fontFamily="IBM Plex Mono"
                  >
                    {year}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Connection lines between nodes */}
        {visibleNodes.map((node) =>
          node.parentIds.map((parentId) => {
            const parent = nodes.find((n) => n.id === parentId);
            if (!parent || !activeLanes.has(parent.lane) || !activeEras.has(parent.era)) return null;
            const x1 = laneToX(parent.lane);
            const y1 = yearToY(parent.year);
            const x2 = laneToX(node.lane);
            const y2 = yearToY(node.year);
            const isHighlighted =
              selectedNodeId === node.id || selectedNodeId === parentId;
            const isSameLane = x1 === x2;
            const midY = (y1 + y2) / 2;
            const d = isSameLane
              ? `M ${x1} ${y1} L ${x2} ${y2}`
              : `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
            return (
              <path
                key={`${parentId}-${node.id}`}
                d={d}
                fill="none"
                stroke={isHighlighted ? LANE_COLORS[node.lane] : "oklch(0.28 0.02 240)"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={
                  node.status === "superseded" || node.status === "stalled"
                    ? "4 3"
                    : undefined
                }
                opacity={isHighlighted ? 0.9 : 0.4}
                style={{
                  transition: "stroke 150ms ease, opacity 150ms ease",
                }}
              />
            );
          })
        )}

        {/* Node cards */}
        {visibleNodes.map((node) => {
          const cx = laneToX(node.lane);
          const cy = yearToY(node.year);
          const laneColor = LANE_COLORS[node.lane];
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredId === node.id;
          const isActive = isSelected || isHovered;
          const cardX = cx - NODE_CARD_WIDTH / 2;
          const cardY = cy - 26;
          const cardH = 52;

          return (
            <g
              key={node.id}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Card background */}
              <rect
                x={cardX}
                y={cardY}
                width={NODE_CARD_WIDTH}
                height={cardH}
                rx={6}
                fill={isActive ? "oklch(0.18 0.015 240)" : "oklch(0.13 0.012 240)"}
                stroke={isSelected ? laneColor : isHovered ? laneColor + "88" : "oklch(0.22 0.015 240)"}
                strokeWidth={isSelected ? 2 : 1}
                style={{ transition: "all 150ms ease" }}
              />
              {/* Left accent stripe */}
              <rect
                x={cardX}
                y={cardY + 4}
                width={3}
                height={cardH - 8}
                rx={1.5}
                fill={laneColor}
                opacity={isActive ? 1 : 0.6}
              />
              {/* Node label */}
              <foreignObject
                x={cardX + 8}
                y={cardY + 4}
                width={NODE_CARD_WIDTH - 12}
                height={cardH - 8}
              >
                <div
                  style={{
                    fontFamily: "Lora, Georgia, serif",
                    fontSize: "11px",
                    lineHeight: "1.3",
                    color: isActive ? "oklch(0.92 0.01 240)" : "oklch(0.75 0.01 240)",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    transition: "color 150ms ease",
                  }}
                >
                  {node.shortLabel}
                </div>
              </foreignObject>
              {/* Year badge */}
              <text
                x={cx + NODE_CARD_WIDTH / 2 - 4}
                y={cardY + 12}
                textAnchor="end"
                fill={laneColor}
                opacity={isActive ? 0.9 : 0.5}
                fontSize={8}
                fontFamily="IBM Plex Mono"
              >
                {node.year}
              </text>
              {/* Status indicator dot */}
              {(node.status === "stalled" || node.status === "superseded") && (
                <circle
                  cx={cx + NODE_CARD_WIDTH / 2 - 4}
                  cy={cardY + cardH - 8}
                  r={3}
                  fill={node.status === "stalled" ? "#f59e0b" : "#ef4444"}
                  opacity={0.7}
                />
              )}
            </g>
          );
        })}

        {/* Lane headers (sticky-like at top) */}
        {ALL_LANES.map((lane, i) => {
          const x = YEAR_AXIS_WIDTH + i * LANE_WIDTH;
          const isActive = activeLanes.has(lane);
          return (
            <g key={`header-${lane}`}>
              <rect
                x={x}
                y={0}
                width={LANE_WIDTH}
                height={32}
                fill="oklch(0.09 0.01 240)"
              />
              <rect
                x={x + 4}
                y={8}
                width={LANE_WIDTH - 8}
                height={18}
                rx={3}
                fill={LANE_COLORS[lane]}
                opacity={isActive ? 0.15 : 0.05}
              />
              <text
                x={x + LANE_WIDTH / 2}
                y={21}
                textAnchor="middle"
                fill={LANE_COLORS[lane]}
                opacity={isActive ? 0.9 : 0.3}
                fontSize={9}
                fontFamily="IBM Plex Mono"
                letterSpacing="0.06em"
              >
                {laneLabels[lane].toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
