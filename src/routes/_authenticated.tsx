import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthUser, setAuthUser } from "@/lib/auth";
import { getCargo } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getAuthUser()) {
      // Login removed from prototype flow — auto-seed a session from cargo.
      const cargo = getCargo();
      if (!cargo) throw redirect({ to: "/" });
      setAuthUser({
        name: "Operador",
        email: "demo@jacto.com",
        role: cargo === "gestor" ? "manager" : "usuario",
      });
    }
  },
  component: () => <Outlet />,
});
