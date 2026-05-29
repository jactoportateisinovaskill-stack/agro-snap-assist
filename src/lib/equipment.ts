import { useEffect, useState } from "react";

export interface Equipment {
  modelo: string;
  linha: string;
  versao: string;
  ano: string;
  serial: string;
}

const KEY = "jacto:equipment";
const EVENT = "jacto:equipment";

export const EMPTY_EQUIPMENT: Equipment = {
  modelo: "",
  linha: "",
  versao: "",
  ano: "",
  serial: "",
};

export function getEquipment(): Equipment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Equipment) : null;
  } catch {
    return null;
  }
}

export function setEquipment(e: Equipment | null) {
  if (typeof window === "undefined") return;
  if (e) window.localStorage.setItem(KEY, JSON.stringify(e));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: e }));
}

export function isEquipmentComplete(e: Equipment | null): e is Equipment {
  return !!e && !!e.modelo && !!e.linha && !!e.serial;
}

export function useEquipment(): [Equipment | null, (e: Equipment | null) => void] {
  const [eq, setEq] = useState<Equipment | null>(null);
  useEffect(() => {
    setEq(getEquipment());
    const h = (e: Event) => setEq((e as CustomEvent<Equipment | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return [eq, (v) => { setEquipment(v); setEq(v); }];
}

// Sample catalog hints for the SB-20B universe
export const EQUIPMENT_OPTIONS = {
  modelos: ["SB-20B", "SB-12", "SB-30", "AJ-401", "Uniport 4530"],
  linhas: ["Costal"],

  versoes: ["Standard", "Premium", "Eletrônica"],
};
