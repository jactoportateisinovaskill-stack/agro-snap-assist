import { useEffect, useState } from "react";

export type Role = "gestor" | "usuario";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

const KEY = "jacto:auth";
const EVENT = "jacto:auth";

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(u: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: u }));
}

export function login(input: { name: string; email: string; role: Role }) {
  setAuthUser({ name: input.name.trim() || "Operador", email: input.email.trim(), role: input.role });
}

export function logout() {
  setAuthUser(null);
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    setUser(getAuthUser());
    const h = (e: Event) => setUser((e as CustomEvent<AuthUser | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return {
    user,
    isAuthenticated: !!user,
    isGestor: user?.role === "gestor",
    login,
    logout,
  };
}
