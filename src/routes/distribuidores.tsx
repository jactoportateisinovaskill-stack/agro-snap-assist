import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, FileText, BookOpen, Headphones, MessageSquare, Map, ChevronRight, Navigation } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

export const Route = createFileRoute("/distribuidores")({
  head: () => ({ meta: [{ title: "Distribuidores — Jacto Connect IA" }] }),
  component: Distribuidores,
});

const distribs = [
  { name: "AgroDistrib SP", dist: "12 km", city: "Ribeirão Preto · SP" },
  { name: "Jacto Center MT", dist: "38 km", city: "Rondonópolis · MT" },
  { name: "Campo Peças PR", dist: "67 km", city: "Londrina · PR" },
];

function Distribuidores() {
  return (
    <Shell back="/resultado" title="Onde encontrar" bg="muted">
      <section className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Distribuidores próximos
          </h3>
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <Map className="h-3.5 w-3.5" /> Ver no mapa
          </button>
        </div>
        <ul className="mt-2 space-y-2">
          {distribs.map((d) => (
            <li key={d.name} className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-secondary">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.city}</div>
                  <div className="text-[11px] font-semibold text-primary mt-0.5">{d.dist} de distância</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-primary text-primary text-xs font-bold">
                  <Navigation className="h-3.5 w-3.5" /> Ver no mapa
                </button>
                <button className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                  <Phone className="h-3.5 w-3.5" /> Contato
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Material técnico
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <MaterialCard icon={FileText} title="Ficha técnica" sub="PDF · 1.2 MB" />
          <MaterialCard icon={BookOpen} title="Manual de instalação" sub="PDF · 3.8 MB" />
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Torre de Atendimento Jacto
        </h3>
        <div className="mt-2 rounded-2xl bg-secondary p-5 text-secondary-foreground shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold">Suporte técnico 24/7</div>
              <div className="text-xs text-white/60">Atendentes especializados Jacto</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href="tel:0800" className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              <Phone className="h-4 w-4" /> Ligar agora
            </a>
            <button className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-white/10 text-white text-sm font-semibold">
              <MessageSquare className="h-4 w-4" /> Abrir chamado
            </button>
          </div>
        </div>
      </section>

      <Link
        to="/finalizado"
        className="mt-8 flex h-14 items-center gap-3 rounded-xl bg-primary px-5 text-primary-foreground font-bold shadow-[var(--shadow-glow)]"
      >
        Finalizar atendimento
        <ChevronRight className="ml-auto h-5 w-5" />
      </Link>
    </Shell>
  );
}

function MaterialCard({ icon: Icon, title, sub }: { icon: typeof FileText; title: string; sub: string }) {
  return (
    <button className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 text-left shadow-[var(--shadow-card)] hover:border-primary transition">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-bold text-secondary text-sm leading-tight">{title}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </button>
  );
}
