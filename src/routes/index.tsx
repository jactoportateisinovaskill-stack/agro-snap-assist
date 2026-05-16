import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ScanLine, User } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacto Connect IA — Início do Atendimento" },
      { name: "description", content: "Identifique qualquer peça agrícola em segundos com a precisão da IA." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell showMenu>
      <div className="mt-2 flex items-center gap-3 rounded-2xl bg-muted p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Técnico</div>
          <div className="font-bold text-secondary">Carlos Silva</div>
          <div className="text-xs text-muted-foreground">ID TEC-0047</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Atendimento</div>
          <div className="font-bold text-primary">#AT-2024-0892</div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
          <ScanLine className="h-3.5 w-3.5" /> Visão Computacional
        </span>
        <h1 className="mt-5 text-[28px] font-extrabold leading-[1.1] tracking-tight text-secondary">
          Identifique qualquer<br />peça agrícola <span className="text-primary">em segundos.</span>
        </h1>
        <p className="mt-3 max-w-[300px] text-sm text-muted-foreground">
          Fotografe a peça e receba o código, compatibilidade e fornecedores com a precisão da IA.
        </p>
      </div>

      <div className="relative mt-10 mx-auto flex h-56 w-56 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-ring" />
        <div className="absolute inset-6 rounded-full bg-primary/15 animate-pulse-ring [animation-delay:600ms]" />
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Camera className="h-14 w-14" strokeWidth={1.6} />
        </div>
      </div>

      <div className="mt-auto pt-8 space-y-3">
        <Link
          to="/capturar"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
        >
          <Camera className="h-5 w-5" /> Iniciar Identificação
        </Link>
        <Link
          to="/finalizado"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-secondary font-semibold text-sm hover:bg-muted transition"
        >
          <History className="h-4 w-4" /> Ver Histórico
        </Link>
      </div>
    </Shell>
  );
}
