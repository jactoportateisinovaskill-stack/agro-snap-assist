import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/_authenticated/finalizado")({
  head: () => ({ meta: [{ title: "Identificação concluída — Jacto Connect IA" }] }),
  component: Finalizado,
});

const resumo = [
  ["Peça identificada", "Bico Completo JD-12 (427062)"],
  ["Utilização", "Jacto SB-B"],
  ["Técnico", "Carlos Silva · TEC-0047"],
  ["Data e hora", "16/05/2026 · 14:32"],
  ["Confiança da IA", "94%"],
];

function Finalizado() {
  return (
    <Shell back="/" title="Concluído">
      <div className="mt-6 flex flex-col items-center text-center animate-slide-up">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Check className="h-12 w-12" strokeWidth={3} />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-secondary">
          Identificação concluída<br />com sucesso!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
          A peça foi identificada e os dados técnicos estão disponíveis abaixo.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Resumo</div>
        <dl className="mt-3 divide-y divide-border">
          {resumo.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4 py-2.5">
              <dt className="text-xs text-muted-foreground">{k}</dt>
              <dd className="text-sm font-semibold text-secondary text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-auto pt-8">
        <Link
          to="/"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
        >
          <Plus className="h-5 w-5" /> Nova Identificação
        </Link>
      </div>
    </Shell>
  );
}
