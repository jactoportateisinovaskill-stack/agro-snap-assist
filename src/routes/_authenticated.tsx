import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    // Mock auth lives in localStorage — only check on the client. During SSR
    // we let the route render; the client navigation will re-evaluate.
    if (typeof window === "undefined") return;
    if (!getAuthUser()) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />,
});
