import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Layers, MapPin, Tag, Tractor, ChevronRight } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/resultado")({
  head: () => ({ meta: [{ title: "Resultado — Jacto Connect IA" }] }),
  component: Resultado,
});

function Resultado() {
  return (
    <Shell back="/capturar" title="Resultado da análise">
      <div className="mt-2 animate-slide-up">
        <div className="relative overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-card)]">
          <div className="aspect-[5/4] flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
            <div className="h-40 w-28 rounded-[40%] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rotate-12 shadow-2xl" />
          </div>
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-xs font-extrabold text-success-foreground shadow-md">
            <CheckCircle2 className="h-3.5 w-3.5" /> 94% de confiança
          </div>
          <div className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Identificado
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Tag className="h-3 w-3" /> JT-7823-BK
          </div>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-secondary">
            Bico Pulverizador Cerâmico
          </h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Tractor className="h-4 w-4 text-secondary" />
            Compatível com <span className="font-semibold text-secondary">Jacto Uniport 3030</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat label="Confiança" value="94%" tone="success" />
            <Stat label="Compatíveis" value="3" />
            <Stat label="Relacionadas" value="3" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Link
            to="/compatibilidade"
            className="flex h-14 items-center gap-3 rounded-xl bg-primary px-5 text-primary-foreground font-bold shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
          >
            <Layers className="h-5 w-5" />
            Ver compatibilidade
            <ChevronRight className="ml-auto h-5 w-5" />
          </Link>
          <Link
            to="/distribuidores"
            className="flex h-14 items-center gap-3 rounded-xl border border-border bg-background px-5 font-bold text-secondary hover:bg-muted transition"
          >
            <MapPin className="h-5 w-5 text-primary" />
            Ver distribuidores
            <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <div className={`text-lg font-extrabold ${tone === "success" ? "text-success" : "text-secondary"}`}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
