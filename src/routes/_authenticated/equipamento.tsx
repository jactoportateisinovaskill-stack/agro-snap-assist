import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Wrench, Check } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";
import { useT } from "@/i18n";
import {
  useEquipment,
  EMPTY_EQUIPMENT,
  EQUIPMENT_OPTIONS,
  type Equipment,
} from "@/lib/equipment";

export const Route = createFileRoute("/_authenticated/equipamento")({
  head: () => ({ meta: [{ title: "Equipamento — Jacto Connect IA" }] }),
  component: EquipmentPage,
});

function EquipmentPage() {
  const t = useT();
  const navigate = useNavigate();
  const [stored, save] = useEquipment();
  const [form, setForm] = useState<Equipment>(stored ?? { ...EMPTY_EQUIPMENT, modelo: "SB-20B" });

  const set = (k: keyof Equipment) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    save(form);
    navigate({ to: "/capturar" });
  };

  const skip = () => navigate({ to: "/capturar" });

  return (
    <Shell back="/login">
      <div className="mx-auto w-full max-w-md">
        <div className="mt-2 flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wrench className="h-5 w-5" />
          </div>
          <h1 className="mt-3 text-lg font-bold tracking-tight text-secondary sm:text-xl">
            {t("equipment.title")}
          </h1>
          <p className="mt-1 max-w-[320px] text-xs text-muted-foreground sm:text-sm">
            {t("equipment.subtitle")}
          </p>
        </div>

        <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={t("equipment.modelo")} required>
            <select required value={form.modelo} onChange={set("modelo")} className="i-input">
              <option value="">—</option>
              {EQUIPMENT_OPTIONS.modelos.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label={t("equipment.linha")} required>
            <select required value={form.linha} onChange={set("linha")} className="i-input">
              <option value="">—</option>
              {EQUIPMENT_OPTIONS.linhas.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label={t("equipment.versao")}>
            <select value={form.versao} onChange={set("versao")} className="i-input">
              <option value="">—</option>
              {EQUIPMENT_OPTIONS.versoes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label={t("equipment.ano")}>
            <input
              type="number" min="1990" max="2030" placeholder="2024"
              value={form.ano} onChange={set("ano")} className="i-input"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("equipment.serial")} required>
              <input
                required placeholder="SB20B-000000"
                value={form.serial} onChange={set("serial")} className="i-input"
              />
            </Field>
          </div>

          <div className="sm:col-span-2 mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button" onClick={skip}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition"
            >
              {t("equipment.skip")}
            </button>
            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]"
            >
              <Check className="h-4 w-4" /> {t("equipment.submit")}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .i-input {
          width:100%; border-radius:0.625rem; border:1px solid var(--color-border);
          background:var(--color-background); padding:0.55rem 0.75rem;
          font-size:0.875rem; color:var(--color-secondary); outline:none;
          transition:border-color .15s, box-shadow .15s;
        }
        .i-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent); }
      `}</style>
    </Shell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
