import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, Image as ImageIcon, Zap } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/_authenticated/capturar")({
  head: () => ({ meta: [{ title: "Capturar Peça — Jacto Connect IA" }] }),
  component: Capturar,
});

function Capturar() {
  const navigate = useNavigate();
  return (
    <Shell back="/" title="Capturar peça" bg="dark">
      <p className="mt-1 text-sm text-white/60">Centralize a peça no quadro para análise.</p>

      <div className="relative mt-6 aspect-[3/4] w-full overflow-hidden rounded-3xl bg-black">
        {/* simulated viewfinder */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.42 0.02 0) 0%, oklch(0.18 0.005 0) 75%)",
          }}
        />
        {/* mock part silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-28 rounded-[40%] bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-2xl rotate-12" />
        </div>

        {/* frame overlay */}
        <div className="absolute inset-8 rounded-2xl border-2 border-primary/80">
          <span className="absolute -top-px -left-px h-6 w-6 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <span className="absolute -top-px -right-px h-6 w-6 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <span className="absolute -bottom-px -left-px h-6 w-6 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        </div>

        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Câmera ativa
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-white">
          Centralize a peça no quadro
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Galeria">
          <ImageIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => navigate({ to: "/analisando" })}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] active:scale-95 transition"
          aria-label="Capturar foto"
        >
          <span className="absolute inset-1.5 rounded-full border-2 border-white/40" />
          <Camera className="h-7 w-7" />
        </button>

        <Link to="/analisando" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Usar IA">
          <Zap className="h-5 w-5" />
        </Link>
      </div>
    </Shell>
  );
}
