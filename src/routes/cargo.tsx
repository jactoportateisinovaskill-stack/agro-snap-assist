import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { Briefcase, Store, Wrench, User as UserIcon, ArrowRight } from "lucide-react";
import { Logo } from "@/components/jacto/Shell";
import { LanguageSwitcher } from "@/components/jacto/LanguageSwitcher";
import { useCargo, type Cargo, CARGO_LABELS } from "@/lib/profile";
import { getRegion } from "@/lib/region";
import { useLocale } from "@/i18n";

export const Route = createFileRoute("/cargo")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getRegion()) throw redirect({ to: "/" });
  },
  head: () => ({ meta: [{ title: "Selecionar cargo — Jacto Connect IA" }] }),
  component: CargoPage,
});

const OPTIONS: { id: Cargo; icon: React.ReactNode; desc: { pt: string; en: string; es: string } }[] = [
  {
    id: "gestor",
    icon: <Briefcase className="h-6 w-6" />,
    desc: {
      pt: "Acesso a métricas e insights operacionais.",
      en: "Access to operational metrics and insights.",
      es: "Acceso a métricas e insights operacionales.",
    },
  },
  {
    id: "revenda",
    icon: <Store className="h-6 w-6" />,
    desc: {
      pt: "Distribuidor autorizado de peças e equipamentos.",
      en: "Authorized parts and equipment dealer.",
      es: "Distribuidor autorizado de piezas y equipos.",
    },
  },
  {
    id: "assistencia",
    icon: <Wrench className="h-6 w-6" />,
    desc: {
      pt: "Equipe técnica de manutenção em campo.",
      en: "Field maintenance technical team.",
      es: "Equipo técnico de mantenimiento en campo.",
    },
  },
  {
    id: "cliente",
    icon: <UserIcon className="h-6 w-6" />,
    desc: {
      pt: "Produtor ou operador do equipamento.",
      en: "Producer or equipment operator.",
      es: "Productor u operador del equipo.",
    },
  },
];

function CargoPage() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const [cargo, setCargo] = useCargo();

  const labels = {
    pt: { title: "Qual é o seu cargo?", subtitle: "Selecione o perfil que melhor representa o seu acesso.", cta: "Prosseguir" },
    en: { title: "What is your role?", subtitle: "Pick the profile that best matches your access.", cta: "Continue" },
    es: { title: "¿Cuál es su cargo?", subtitle: "Elija el perfil que mejor representa su acceso.", cta: "Continuar" },
  }[locale];

  const handleProceed = () => {
    if (!cargo) return;
    navigate({ to: "/login" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/40 to-background">
      <header className="flex items-center justify-between px-5 pt-5 sm:px-8">
        <Logo />
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex max-w-md flex-col px-6 pt-10 sm:pt-16">
        <span className="self-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          Jacto Connect IA
        </span>
        <h1 className="mt-4 text-center text-2xl font-extrabold leading-tight tracking-tight text-secondary sm:text-3xl">
          {labels.title}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">{labels.subtitle}</p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OPTIONS.map((opt) => {
            const active = cargo === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setCargo(opt.id)}
                className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition shadow-[var(--shadow-card)] ${
                  active
                    ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {opt.icon}
                </div>
                <div className="text-base font-extrabold text-secondary">
                  {CARGO_LABELS[opt.id][locale]}
                </div>
                <p className="text-xs text-muted-foreground">{opt.desc[locale]}</p>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleProceed}
          disabled={!cargo}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
        >
          {labels.cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </main>
    </div>
  );
}
  );
}
