import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Pencil, ArrowRight } from "lucide-react";
import { RegionModal } from "@/components/jacto/RegionModal";
import { Logo } from "@/components/jacto/Shell";
import { LanguageSwitcher } from "@/components/jacto/LanguageSwitcher";
import { useRegion, getRegion } from "@/lib/region";
import { useT } from "@/i18n";
import { getCargo } from "@/lib/profile";

export const Route = createFileRoute("/regiao")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getCargo()) throw redirect({ to: "/" });
  },
  head: () => ({ meta: [{ title: "Selecionar região — Jacto Connect IA" }] }),
  component: RegionPage,
});

function RegionPage() {
  const t = useT();
  const navigate = useNavigate();
  const [region] = useRegion();
  const [open, setOpen] = useState(() => !getRegion());

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/40 to-background">
      <header className="flex items-center justify-between px-5 pt-5 sm:px-8">
        <Logo />
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex max-w-md flex-col items-center px-6 pt-12 text-center sm:pt-20">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          Jacto Connect IA
        </span>
        <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-secondary sm:text-3xl">
          {t("region.title")}
        </h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("region.subtitle")}</p>

        {region && (
          <>
            <button
              onClick={() => setOpen(true)}
              className="group mt-7 flex w-full items-center gap-3 rounded-2xl border-2 border-primary/30 bg-card p-4 text-left shadow-[var(--shadow-card)] transition hover:border-primary hover:shadow-[var(--shadow-glow)] active:scale-[0.99]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("login.regionLabel")}
                </div>
                <div className="truncate text-base font-extrabold text-secondary">{region}</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                <Pencil className="h-3 w-3" /> {t("login.changeRegion")}
              </span>
            </button>

            <button
              onClick={() => navigate({ to: "/equipamento" })}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]"
            >
              {t("region.cta")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}
      </main>

      <RegionModal
        open={open}
        onConfirm={() => {
          setOpen(false);
          navigate({ to: "/equipamento" });
        }}
      />
    </div>
  );
}
