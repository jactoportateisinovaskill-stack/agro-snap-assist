import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Wrench, Check, ArrowRight } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";
import { useT } from "@/i18n";
import { useEquipment, EMPTY_EQUIPMENT } from "@/lib/equipment";
import sb20 from "@/assets/equip-sb20.png.asset.json";
import sb8 from "@/assets/equip-sb8.png.asset.json";

export const Route = createFileRoute("/_authenticated/equipamento")({
  head: () => ({ meta: [{ title: "Equipamento — Jacto Connect IA" }] }),
  component: EquipmentPage,
});

const MODELS: { id: string; name: string; tag: string; img: string }[] = [
  { id: "SB-20", name: "SB-20", tag: "Costal à bateria 20L", img: sb20.url },
  { id: "SB-20 sem kit elétrico", name: "SB-20 sem kit elétrico", tag: "Costal à bateria 20L (sem bateria/carregador)", img: sb20.url },
  { id: "SB-8", name: "SB-8", tag: "Pulverizador Bateria Profissional", img: sb8.url },
];

function EquipmentPage() {
  const t = useT();
  const navigate = useNavigate();
  const [stored, save] = useEquipment();
  const [selected, setSelected] = useState<string>(stored?.modelo || "");

  const current = MODELS.find((m) => m.id === selected);

  const confirm = () => {
    if (!selected) return;
    save({ ...EMPTY_EQUIPMENT, ...(stored ?? {}), modelo: selected });
    navigate({ to: "/capturar" });
  };

  const skip = () => navigate({ to: "/capturar" });

  return (
    <Shell back="/regiao">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mt-2 flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wrench className="h-5 w-5" />
          </div>
          <h1 className="mt-3 text-lg font-bold tracking-tight text-secondary sm:text-xl">
            {t("equipment.title")}
          </h1>
          <p className="mt-1 max-w-[340px] text-xs text-muted-foreground sm:text-sm">
            Selecione o modelo do seu equipamento para personalizar a busca.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MODELS.map((m) => {
            const active = selected === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelected(m.id)}
                className={`group relative overflow-hidden rounded-xl border bg-background p-2 text-left transition active:scale-[0.98] ${
                  active
                    ? "border-primary shadow-[var(--shadow-glow)] ring-2 ring-primary/30"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={m.img}
                    alt={`Equipamento ${m.name}`}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-secondary">{m.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{m.tag}</p>
                  </div>
                  {active && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {current && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3">
            <img
              src={current.img}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Modelo selecionado
              </p>
              <p className="truncate text-sm font-bold text-secondary">{current.name}</p>
              <p className="truncate text-xs text-muted-foreground">{current.tag}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={skip}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
          >
            {t("equipment.skip")}
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={confirm}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:opacity-50"
          >
            {t("equipment.submit")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Shell>
  );
}
