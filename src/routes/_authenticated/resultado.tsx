import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Layers,
  Tag,
  Tractor,
  ChevronRight,
  Youtube,
  Star,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Headphones,
  MessageSquare,
} from "lucide-react";

import { Shell } from "@/components/jacto/Shell";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/resultado")({
  head: () => ({ meta: [{ title: "Resultado — Jacto Connect IA" }] }),
  component: Resultado,
});

interface Related {
  code: string;
  name: string;
  compat: string;
}

const related: Related[] = [
  { code: "1168547", name: "Bico JD 12", compat: "SB-20B, SB-B" },
  { code: "1168545", name: "Filtro do bico M50/60", compat: "SB-20B, SB20 Linha M" },
  { code: "1168546", name: "Capa do bico", compat: "SB-20B" },
  { code: "1217605", name: "Registro completo LP 601", compat: "SB-20B, SB-B" },
];

const distribs = [
  { name: "AgroDistrib SP", dist: "12 km", city: "Ribeirão Preto · SP" },
  { name: "Jacto Center MT", dist: "38 km", city: "Rondonópolis · MT" },
  { name: "Campo Peças PR", dist: "67 km", city: "Londrina · PR" },
];

const YOUTUBE_URL =
  "https://www.youtube.com/results?search_query=manuten%C3%A7%C3%A3o+Jacto+SB20";


function Resultado() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitRating = () => {
    if (rating === 0 || submitted) return;
    setSubmitted(true);
    toast.success("Avaliação enviada", {
      description: `Obrigado pelo feedback (${rating}/5).`,
    });
  };

  return (
    <Shell back="/capturar" title="Resultado da análise">
      <div className="mt-2 animate-slide-up">
        {/* Hero image */}
        <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-card)]">
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
            <div className="h-24 w-16 rounded-[40%] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rotate-12 shadow-2xl" />
          </div>
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-success px-2 py-1 text-[10px] font-extrabold text-success-foreground shadow-md">
            <CheckCircle2 className="h-3 w-3" /> 94%
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            Identificado
          </div>
        </div>

        {/* Identified card */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Tag className="h-3 w-3" /> 427062
          </div>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-secondary">
            Bico Completo JD-12
          </h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Tractor className="h-4 w-4 text-secondary" />
            Utilização <span className="font-semibold text-secondary">Jacto SB-20B</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-3">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-14 w-full items-center gap-3 rounded-xl bg-primary px-5 text-primary-foreground font-bold shadow-[var(--shadow-glow)] active:scale-[0.98] transition">
                <Layers className="h-5 w-5" />
                Peças relacionadas
                <ChevronRight className="ml-auto h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl p-0 sm:max-w-md sm:mx-auto">
              <SheetHeader className="px-5 pt-5 pb-2 text-left">
                <SheetTitle className="text-lg font-extrabold text-secondary">
                  Peças relacionadas
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Compatíveis ou sugeridas para o equipamento identificado.
                </SheetDescription>
              </SheetHeader>
              <ul className="max-h-[60vh] overflow-y-auto px-5 pb-6 pt-2 space-y-2">
                {related.map((r) => (
                  <li
                    key={r.code}
                    className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {r.code}
                        </div>
                        <div className="mt-0.5 font-bold text-secondary truncate">
                          {r.name}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-secondary">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      Compatível: {r.compat}
                    </div>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center gap-3 rounded-xl border border-border bg-background px-5 font-bold text-secondary hover:bg-muted transition"
          >
            <Youtube className="h-5 w-5 text-primary" />
            Para mais informações
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              YouTube <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Distribuidores próximos */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Distribuidores próximos
            </h3>
          </div>
          <ul className="mt-2 space-y-2">
            {distribs.map((d) => (
              <li key={d.name} className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-secondary truncate">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">{d.city}</div>
                    <div className="text-[10px] font-semibold text-primary mt-0.5">{d.dist} de distância</div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-primary text-primary text-[11px] font-bold">
                    <Navigation className="h-3.5 w-3.5" /> Mapa
                  </button>
                  <button className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold">
                    <Phone className="h-3.5 w-3.5" /> Contato
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Torre de Atendimento */}
        <section className="mt-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Torre de Atendimento Jacto
          </h3>
          <div className="mt-2 rounded-2xl bg-secondary p-4 text-secondary-foreground shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Suporte técnico 24/7</div>
                <div className="text-[11px] text-white/60">Atendentes especializados Jacto</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href="tel:0800" className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                <Phone className="h-4 w-4" /> Ligar agora
              </a>
              <button className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold">
                <MessageSquare className="h-4 w-4" /> Chamado
              </button>
            </div>
          </div>
        </section>



        {/* Rating */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          {submitted ? (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="mt-3 text-sm font-extrabold text-secondary">
                Obrigado pelo seu feedback!
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Sua avaliação ({rating}/5) ajuda a melhorar a identificação.
              </div>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-5 w-5 ${
                      n <= rating ? "fill-primary text-primary" : "text-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Avalie esta identificação
              </div>
              <div className="mt-1 text-sm font-semibold text-secondary">
                A peça apresentada está correta?
              </div>
              <div
                className="mt-3 flex items-center gap-1.5"
                onMouseLeave={() => setHover(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hover || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                      className="p-1 transition active:scale-90"
                    >
                      <Star
                        className={`h-7 w-7 transition ${
                          active ? "fill-primary text-primary" : "text-muted-foreground/50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <button
                onClick={submitRating}
                disabled={rating === 0}
                className="mt-4 h-11 w-full rounded-xl bg-secondary text-secondary-foreground text-sm font-bold transition disabled:bg-muted disabled:text-muted-foreground"
              >
                Enviar avaliação
              </button>
            </>
          )}
        </div>
      </div>
    </Shell>
  );
}
