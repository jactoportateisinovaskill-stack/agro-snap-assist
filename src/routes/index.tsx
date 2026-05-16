import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, MapPin, User, Info, AlertTriangle } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";
import { useRegion, regionAvailability } from "@/lib/region";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacto Connect IA — Início do Atendimento" },
      { name: "description", content: "Identifique qualquer peça agrícola em segundos com a precisão da IA." },
    ],
  }),
  component: Index,
});

const shortcuts = ["Brasil", "Centro-Oeste", "Sudeste", "Argentina", "México", "LATAM"];

function Index() {
  const [region, setRegionValue] = useRegion();
  const availability = regionAvailability(region);
  const enabled = region.trim().length > 0;

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
      </div>

      <div className="mt-5 flex flex-col items-center text-center">
        <h1 className="text-[22px] font-extrabold leading-[1.2] tracking-tight text-secondary">
          Identifique qualquer<br />peça agrícola <span className="text-primary">em segundos.</span>
        </h1>
        <p className="mt-2 max-w-[300px] text-sm text-muted-foreground">
          Antes de começar, informe sua região de atendimento.
        </p>
      </div>

      {/* Region context block */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <label htmlFor="region" className="text-[13px] font-semibold text-secondary">
            Região de atendimento
          </label>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Obrigatório</span>
        </div>

        <input
          id="region"
          value={region}
          onChange={(e) => setRegionValue(e.target.value)}
          placeholder="Ex.: Mato Grosso, Argentina, Centro-Oeste"
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-secondary placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Essa informação influencia os equipamentos e materiais disponíveis.
        </p>

        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto pb-1 px-1">
          {shortcuts.map((s) => {
            const active = region === s;
            return (
              <button
                key={s}
                onClick={() => setRegionValue(s)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                  active
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-muted text-secondary border-border hover:bg-accent"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {availability && (
          <div
            className={`mt-4 flex gap-2 rounded-xl border p-3 text-xs ${
              availability.level === "warning"
                ? "border-warning/40 bg-warning/10 text-secondary"
                : "border-info/40 bg-info/10 text-secondary"
            }`}
          >
            {availability.level === "warning" ? (
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-info mt-0.5" />
            )}
            <span className="leading-relaxed">{availability.message}</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        {enabled ? (
          <Link
            to="/capturar"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
          >
            <Camera className="h-5 w-5" /> Iniciar Identificação
          </Link>
        ) : (
          <button
            disabled
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-muted text-muted-foreground font-bold text-base cursor-not-allowed"
          >
            <Camera className="h-5 w-5" /> Informe a região para continuar
          </button>
        )}
      </div>
    </Shell>
  );
}
