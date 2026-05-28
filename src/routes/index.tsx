import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RegionModal } from "@/components/jacto/RegionModal";
import { Logo } from "@/components/jacto/Shell";
import { LanguageSwitcher } from "@/components/jacto/LanguageSwitcher";
import { useRegion } from "@/lib/region";
import { useT } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacto Connect IA — Início" },
      { name: "description", content: "Identifique qualquer peça agrícola em segundos com a precisão da IA." },
    ],
  }),
  component: Index,
});

function Index() {
  const t = useT();
  const navigate = useNavigate();
  const [region] = useRegion();
  const [open, setOpen] = useState(false);

  // Open the modal automatically until a region is chosen.
  useEffect(() => {
    setOpen(!region);
  }, [region]);

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
          <button
            onClick={() => navigate({ to: "/login" })}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]"
          >
            {t("region.cta")}
          </button>
        )}
        {region && (
          <button
            onClick={() => setOpen(true)}
            className="mt-3 text-[11px] font-semibold text-muted-foreground underline-offset-2 hover:underline"
          >
            {region} · {t("login.changeRegion")}
          </button>
        )}
      </main>

      <RegionModal
        open={open}
        onConfirm={() => {
          setOpen(false);
          navigate({ to: "/login" });
        }}
      />
    </div>
  );
}
