// Home.tsx
// Design: Evolutionary Cartography — main page layout
// Left: filter sidebar, Center: evolution tree, Right: detail panel (slide-in)
// Top: hero header with parchment background

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EvolutionTree from "@/components/EvolutionTree";
import NodeDetailPanel from "@/components/NodeDetailPanel";
import BenchmarkTimeline from "@/components/BenchmarkTimeline";
import {
  type TheoryCategory,
  categoryColors,
  categoryLabels,
  evolutionNodes,
  statusLabels,
} from "@/data/evolutionData";
import { Search, Filter, BarChart2, GitBranch, Info, ChevronRight, Menu, X } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663201320118/kgj73nLWxjESQWyKeSobhs/hero_tree-ntrH8AYGNkPq966hoj282T.webp";
const PARCHMENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663201320118/kgj73nLWxjESQWyKeSobhs/bg_parchment-XNe9quSEb6Gjmys45dzb2q.webp";

type Tab = "tree" | "benchmarks";

const ALL_CATEGORIES: TheoryCategory[] = [
  "symbolic",
  "connectionist",
  "reinforcement",
  "transformer",
  "diffusion",
  "hybrid",
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCategories, setFilterCategories] = useState<TheoryCategory[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("tree");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const toggleCategory = (cat: TheoryCategory) => {
    setFilterCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Search filter
  const searchResults = searchQuery.trim()
    ? evolutionNodes.filter(
        (n) =>
          n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(n.year).includes(searchQuery)
      )
    : [];

  const nodeCount = evolutionNodes.filter(
    (n) => filterCategories.length === 0 || filterCategories.includes(n.category)
  ).length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${PARCHMENT_BG})`,
        backgroundSize: "400px 400px",
        backgroundRepeat: "repeat",
      }}
    >
      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-border/60" style={{ minHeight: 220 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, opacity: 0.22 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.97 0.018 85 / 0.3), oklch(0.97 0.018 85 / 0.85))" }} />
        <div className="relative z-10 container py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GitBranch size={16} className="text-muted-foreground" />
                <span className="mono text-xs text-muted-foreground uppercase tracking-widest">
                  AI Evolution Tree
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 55)" }}
              >
                AI能力進化
                <span className="italic"> 系統図</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                1956年の記号AIから2025年の推論モデルまで、どの理論がどれだけAIの能力を引き上げたか——
                そしてどの理論が失速したかを、進化系統図として探索する。
              </p>
            </div>
            {/* Stats */}
            <div className="hidden md:flex gap-6 text-right">
              {[
                { label: "理論・モデル", value: evolutionNodes.length },
                { label: "ベンチマーク", value: 10 },
                { label: "カバー年数", value: "69年" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.38 0.10 240)" }}
                  >
                    {s.value}
                  </p>
                  <p className="mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 mt-5">
            {([
              { id: "tree", label: "進化系統図", icon: <GitBranch size={13} /> },
              { id: "benchmarks", label: "ベンチマーク推移", icon: <BarChart2 size={13} /> },
            ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-foreground text-background font-medium"
                    : "bg-background/60 text-muted-foreground hover:bg-background/80"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main Layout ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden" style={{ height: "calc(100vh - 220px)" }}>

        {/* ── Left Sidebar ──────────────────────────────────────────────────── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && activeTab === "tree" && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="shrink-0 border-r border-border/60 overflow-hidden flex flex-col"
              style={{ background: "oklch(0.96 0.018 85 / 0.95)" }}
            >
              <div className="p-3 flex-1 overflow-y-auto">
                {/* Search */}
                <div className="relative mb-4">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="理論・モデルを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 text-xs rounded border border-border bg-background/60 focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/60"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  />
                </div>

                {/* Search results */}
                {searchResults.length > 0 && (
                  <div className="mb-4">
                    <p className="mono text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5">
                      検索結果 ({searchResults.length})
                    </p>
                    <div className="space-y-1">
                      {searchResults.slice(0, 8).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => { setSelectedId(n.id); setSearchQuery(""); }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-accent transition-colors"
                        >
                          <span className="font-medium">{n.label}</span>
                          <span className="mono text-[9px] text-muted-foreground ml-1.5">{n.year}</span>
                        </button>
                      ))}
                    </div>
                    <hr className="ink-divider mt-3 mb-3" />
                  </div>
                )}

                {/* Category filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="mono text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Filter size={9} />
                      理論カテゴリ
                    </p>
                    {filterCategories.length > 0 && (
                      <button
                        onClick={() => setFilterCategories([])}
                        className="mono text-[9px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        リセット
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {ALL_CATEGORIES.map((cat) => {
                      const active = filterCategories.includes(cat);
                      const count = evolutionNodes.filter((n) => n.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-all duration-150"
                          style={
                            active
                              ? { background: categoryColors[cat] + "20", color: categoryColors[cat] }
                              : { color: "oklch(0.40 0.04 60)" }
                          }
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ background: categoryColors[cat], opacity: active ? 1 : 0.4 }}
                            />
                            {categoryLabels[cat]}
                          </span>
                          <span className="mono text-[9px] opacity-60">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status legend */}
                <div>
                  <p className="mono text-[9px] text-muted-foreground uppercase tracking-wider mb-2">
                    凡例
                  </p>
                  <div className="space-y-1.5 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <svg width="24" height="12">
                        <circle cx="6" cy="6" r="5" fill="oklch(0.38 0.10 240)" fillOpacity="0.18" stroke="oklch(0.38 0.10 240)" strokeWidth="1.5" />
                      </svg>
                      現役・基礎理論
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="24" height="12">
                        <circle cx="6" cy="6" r="5" fill="none" stroke="oklch(0.52 0.04 60)" strokeWidth="1" strokeDasharray="3,2" />
                      </svg>
                      失速・置換
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="24" height="12">
                        <line x1="0" y1="6" x2="24" y2="6" stroke="oklch(0.38 0.10 240)" strokeWidth="2" />
                      </svg>
                      実線 = 強い影響
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="24" height="12">
                        <line x1="0" y1="6" x2="24" y2="6" stroke="oklch(0.52 0.04 60)" strokeWidth="1" strokeDasharray="4,3" />
                      </svg>
                      点線 = 失速系統
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="24" height="12">
                        <circle cx="6" cy="6" r="3" fill="oklch(0.38 0.10 240)" />
                        <circle cx="18" cy="6" r="5" fill="oklch(0.38 0.10 240)" fillOpacity="0.3" />
                      </svg>
                      ノードサイズ = 能力上昇幅
                    </div>
                  </div>
                </div>

                {/* Node count */}
                <div className="mt-4 pt-3 border-t border-border/40">
                  <p className="mono text-[9px] text-muted-foreground">
                    表示中: <span className="text-foreground font-medium">{nodeCount}</span> / {evolutionNodes.length} ノード
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Center: Tree or Benchmarks ────────────────────────────────────── */}
        <main className="flex-1 min-w-0 relative overflow-hidden">
          {/* Sidebar toggle button */}
          {activeTab === "tree" && (
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="absolute top-3 left-3 z-20 p-1.5 rounded parchment-card hover:bg-accent transition-colors"
            >
              {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          )}

          {activeTab === "tree" ? (
            <div className="w-full h-full">
              <EvolutionTree
                selectedId={selectedId}
                onSelect={handleSelect}
                filterCategories={filterCategories}
              />
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto">
              <BenchmarkTimeline />
            </div>
          )}
        </main>

        {/* ── Right: Detail Panel ───────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedId && activeTab === "tree" && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="shrink-0 border-l border-border/60 overflow-hidden"
              style={{ background: "oklch(0.99 0.010 85 / 0.97)" }}
            >
              <div className="w-[320px] h-full overflow-y-auto">
                <NodeDetailPanel
                  nodeId={selectedId}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/40 py-3 px-4 flex items-center justify-between" style={{ background: "oklch(0.96 0.018 85 / 0.9)" }}>
        <p className="mono text-[10px] text-muted-foreground">
          AI Evolution Tree — データは主要論文・Stanford AI Index 2026・Epoch AIに基づく
        </p>
        <a
          href="https://github.com/ShotaNagafuchi/ai-evolution-tree"
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          GitHub
          <ChevronRight size={10} />
        </a>
      </footer>
    </div>
  );
}
