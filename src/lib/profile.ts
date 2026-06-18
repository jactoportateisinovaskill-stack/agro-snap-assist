import { useEffect, useState } from "react";

export type Cargo = "gestor" | "parceiro" | "cliente";

const KEY = "jacto:cargo";
const EVENT = "jacto:cargo";

export function getCargo(): Cargo | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  if (v === "gestor" || v === "parceiro" || v === "cliente") return v;
  // Migrate legacy values (revenda/assistencia) → parceiro
  if (v === "revenda" || v === "assistencia") {
    window.localStorage.setItem(KEY, "parceiro");
    return "parceiro";
  }
  return null;
}

export function setCargo(c: Cargo | null) {
  if (typeof window === "undefined") return;
  if (c) window.localStorage.setItem(KEY, c);
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
}

export function useCargo(): [Cargo | null, (c: Cargo | null) => void] {
  const [cargo, setCargoState] = useState<Cargo | null>(null);
  useEffect(() => {
    setCargoState(getCargo());
    const h = (e: Event) => setCargoState((e as CustomEvent<Cargo | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return [cargo, (c) => { setCargo(c); setCargoState(c); }];
}

export const CARGO_LABELS: Record<Cargo, { pt: string; en: string; es: string }> = {
  gestor: { pt: "Gestor", en: "Manager", es: "Gestor" },
  parceiro: {
    pt: "Revenda / Assistência técnica",
    en: "Reseller / Technical support",
    es: "Distribuidor / Asistencia técnica",
  },
  cliente: { pt: "Cliente", en: "Customer", es: "Cliente" },
};

