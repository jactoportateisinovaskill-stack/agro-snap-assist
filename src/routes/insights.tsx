import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, MapPin, Award } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Insights — Jacto Connect IA" }] }),
  component: Insights,
});

const topParts = [
  { name: "Bico Pulverizador", pct: 38, count: 142 },
  { name: "Filtro de linha", pct: 22, count: 82 },
  { name: "Regulador de pressão", pct: 16, count: 60 },
  { name: "Conjunto de vedação", pct: 13, count: 48 },
  { name: "Mangueira flexível", pct: 11, count: 40 },
];

// approximate Brazil regions as hotspot dots (x%, y%, intensity)
const hotspots = [
  { x: 38, y: 58, r: 38, c: "MT" },
  { x: 44, y: 70, r: 30, c: "MS" },
  { x: 55, y: 78, r: 26, c: "SP" },
  { x: 52, y: 86, r: 22, c: "PR" },
  { x: 60, y: 40, r: 18, c: "BA" },
  { x: 50, y: 30, r: 12, c: "PA" },
];

function Insights() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <Shell back="/" title="Insights & Mapa de calor" bg="muted">
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

      <div className="mt-4 grid grid-cols-2 gap-3">
        <KPI icon={Award} label="Peça top" value="Bico Pulverizador" sub="38% dos atendimentos" />
        <KPI icon={MapPin} label="Região top" value="Mato Grosso" sub="142 atendimentos" tone="primary" />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-secondary">Mapa de calor — Brasil</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{period}</span>
        </div>
        <div className="relative mt-3 aspect-[4/5] rounded-xl bg-muted overflow-hidden">
          {/* stylized brazil silhouette */}
          <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-secondary/15 fill-current">
            <path d="M50 8 C62 10 70 18 72 26 C78 30 82 38 80 46 C84 52 84 62 78 68 C82 76 76 86 70 90 C72 100 64 110 56 112 C50 118 40 116 36 110 C28 110 22 104 22 96 C16 92 14 84 18 78 C12 72 14 62 20 58 C16 50 22 40 30 38 C30 28 38 18 44 14 C44 10 48 8 50 8 Z" />
          </svg>
          {hotspots.map((h) => (
            <div
              key={h.c}
              className="absolute"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="rounded-full bg-primary/40 blur-md"
                style={{ width: h.r * 2, height: h.r * 2 }}
              />
              <div
                className="absolute inset-0 m-auto rounded-full bg-primary"
                style={{ width: h.r * 0.6, height: h.r * 0.6, left: 0, right: 0, top: 0, bottom: 0 }}
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-extrabold text-white">
                {h.c}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-secondary">Top 5 peças do mês</h3>
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
