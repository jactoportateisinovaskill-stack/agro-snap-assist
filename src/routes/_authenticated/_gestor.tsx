import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/_gestor")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const u = getAuthUser();
    if (!u) throw redirect({ to: "/login" });
    if (u.role !== "manager") throw redirect({ to: "/capturar" });
  },
  component: () => <Outlet />,
});
