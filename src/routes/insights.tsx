import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, Globe2, Award, Search } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Insights — Jacto Connect IA" }] }),
  component: Insights,
});

const topParts = [
  { name: "Bico Completo JD-12 (427062)", pct: 38, count: 142 },
  { name: "Filtro do bico M50/60 (1168545)", pct: 22, count: 82 },
  { name: "Lança completa (915769)", pct: 16, count: 60 },
  { name: "Registro completo LP 601 (1217605)", pct: 13, count: 48 },
  { name: "Bomba elétrica (1265961)", pct: 11, count: 40 },
];

const shortcuts = ["Brasil", "LATAM", "América do Norte", "Europa", "Ásia", "África"];

// Global hotspots (x%, y%) on equirectangular world map
type Level = "low" | "medium" | "high" | "critical";
const hotspots: { x: number; y: number; level: Level; label: string; region: string }[] = [
  { x: 33, y: 68, level: "critical", label: "BR", region: "LATAM > Brasil > Mato Grosso" },
  { x: 28, y: 78, level: "high", label: "AR", region: "LATAM > Argentina" },
  { x: 22, y: 44, level: "high", label: "US", region: "América do Norte > EUA" },
  { x: 25, y: 56, level: "medium", label: "MX", region: "América do Norte > México" },
  { x: 51, y: 40, level: "high", label: "EU", region: "Europa > Ucrânia" },
  { x: 49, y: 60, level: "medium", label: "AF", region: "África > Nigéria" },
  { x: 54, y: 74, level: "low", label: "ZA", region: "África > África do Sul" },
  { x: 67, y: 52, level: "critical", label: "IN", region: "Ásia > Índia" },
  { x: 76, y: 48, level: "medium", label: "CN", region: "Ásia > China" },
  { x: 82, y: 76, level: "low", label: "AU", region: "Oceania > Austrália" },
];

const levelColor: Record<Level, string> = {
  low: "#A8F28F",
  medium: "#FFD75E",
  high: "#FF9A3C",
  critical: "#FF4D36",
};
const levelSize: Record<Level, number> = { low: 22, medium: 34, high: 46, critical: 58 };

function Insights() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [region, setRegion] = useState("");
  const [shortcut, setShortcut] = useState("LATAM");
  const [selected, setSelected] = useState(hotspots[0]);

  return (
    <Shell back="/" title="Insights & Mapa global" bg="muted">
      <div className="mt-2 inline-flex rounded-full bg-card border border-border p-1 text-xs font-semibold">
        {(["7d", "30d", "90d"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-full transition ${
              period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {p === "7d" ? "7 dias" : p === "30d" ? "30 dias" : "90 dias"}
          </button>
        ))}
      </div>

      {/* Region input */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Sua região
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Ex.: Brasil, Mato Grosso, México, LATAM, Europa"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Informe país, estado, cidade ou região de atuação
        </p>

        {/* Shortcut chips */}
        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto pb-1 px-1">
          {shortcuts.map((s) => (
            <button
              key={s}
              onClick={() => setShortcut(s)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                shortcut === s
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-muted text-secondary border-border hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <KPI icon={Award} label="Peça top global" value="Bico JD-12" sub="38% · SB-20B" />
        <KPI icon={Globe2} label="Região top" value="Índia / Brasil" sub="clusters críticos" tone="primary" />
      </div>

      {/* Global heatmap */}
      <div
        className="mt-4 rounded-2xl border border-border p-3 shadow-[var(--shadow-card)]"
        style={{ background: "#F3F3F3" }}
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-secondary">Mapa global de calor</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {period}
          </span>
        </div>
        <div
          className="relative mt-2 aspect-[2/1] overflow-hidden rounded-xl"
          style={{ background: "#F3F3F3" }}
        >
          <WorldMap />
          {hotspots.map((h) => {
            const size = levelSize[h.level];
            const color = levelColor[h.level];
            const active = selected.label === h.label;
            return (
              <button
                key={h.label}
                onClick={() => setSelected(h)}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: `translate(-50%, -50%) scale(${active ? 1.12 : 1})`,
                }}
                aria-label={h.region}
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: size * 2,
                    height: size * 2,
                    background: `radial-gradient(circle, ${color}cc 0%, ${color}66 40%, ${color}00 70%)`,
                    filter: "blur(2px)",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: size * 0.45,
                    height: size * 0.45,
                    background: color,
                    boxShadow: active ? "0 0 0 2px #fff" : "none",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-between gap-2 px-1">
          {(["low", "medium", "high", "critical"] as Level[]).map((l) => (
            <div key={l} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: levelColor[l] }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {l === "low" ? "Baixa" : l === "medium" ? "Média" : l === "high" ? "Alta" : "Crítica"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Region summary */}
      <div
        className="mt-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]"
        style={{ borderLeft: "4px solid var(--primary)" }}
      >
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Local selecionado
        </div>
        <div className="mt-0.5 text-sm font-extrabold text-secondary">{selected.region}</div>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-muted-foreground">Ocorrências</dt>
            <dd className="font-bold text-secondary tabular-nums">142</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Participação global</dt>
            <dd className="font-bold text-secondary tabular-nums">18%</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">Peça mais recorrente</dt>
            <dd className="font-bold text-secondary">427062 — Bico completo JD-12</dd>
          </div>
        </dl>
      </div>

      {/* Top parts */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-secondary">Top 5 peças no mundo</h3>
        </div>
        <ul className="mt-3 space-y-2.5">
          {topParts.map((p, i) => (
            <li key={p.name}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-secondary">
                  <span className="text-muted-foreground mr-1.5 tabular-nums">{i + 1}.</span>
                  {p.name}
                </span>
                <span className="font-bold text-secondary tabular-nums">{p.count}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-secondary"}`}
                  style={{ width: `${(p.pct / 38) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

function KPI({
  icon: Icon, label, value, sub, tone,
}: {
  icon: typeof Award; label: string; value: string; sub: string; tone?: "primary";
}) {
  return (
    <div className={`rounded-2xl p-4 shadow-[var(--shadow-card)] ${tone === "primary" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone === "primary" ? "bg-white/15" : "bg-accent text-primary"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${tone === "primary" ? "text-white/70" : "text-muted-foreground"}`}>
        {label}
      </div>
      <div className="text-base font-extrabold leading-tight">{value}</div>
      <div className={`text-[11px] mt-0.5 ${tone === "primary" ? "text-white/80" : "text-muted-foreground"}`}>
        {sub}
      </div>
    </div>
  );
}

function WorldMap() {
  // Stylized world map — simplified continent silhouettes in dark fill
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      fill="#111111"
    >
      {/* North America */}
      <path d="M18 22 C28 18 42 18 52 24 C58 30 56 38 52 44 C46 50 38 54 30 52 C24 56 18 58 14 54 C8 48 8 38 12 30 C12 26 14 22 18 22 Z" />
      {/* Central America */}
      <path d="M44 50 C50 52 54 56 52 60 C48 62 44 58 42 54 Z" />
      {/* South America */}
      <path d="M58 60 C66 58 72 64 72 72 C70 80 64 88 58 90 C54 84 52 76 54 68 C54 64 56 60 58 60 Z" />
      {/* Europe */}
      <path d="M94 30 C102 28 110 30 112 36 C108 42 100 42 94 40 C92 36 92 32 94 30 Z" />
      {/* Africa */}
      <path d="M96 46 C106 44 114 50 114 60 C112 70 106 78 100 78 C94 74 92 64 94 54 C94 50 95 47 96 46 Z" />
      {/* Middle East / Arabia */}
      <path d="M114 46 C120 46 124 50 122 56 C118 60 114 56 112 52 Z" />
      {/* Russia / North Asia */}
      <path d="M114 22 C140 20 160 22 172 28 C168 34 158 36 144 36 C132 36 120 34 114 30 Z" />
      {/* India */}
      <path d="M130 46 C136 46 140 52 138 58 C134 62 130 58 128 52 Z" />
      {/* China / East Asia */}
      <path d="M146 36 C158 36 166 40 168 46 C164 52 154 52 146 48 C142 44 142 38 146 36 Z" />
      {/* Southeast Asia */}
      <path d="M156 56 C162 56 164 60 162 64 C158 66 154 62 154 58 Z" />
      {/* Australia */}
      <path d="M158 72 C168 70 176 74 176 80 C172 86 162 86 156 82 C154 78 156 74 158 72 Z" />
      {/* Greenland */}
      <path d="M70 14 C76 12 82 16 82 22 C78 26 72 24 70 20 Z" />
    </svg>
  );
}
