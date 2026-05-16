import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-base shadow-[var(--shadow-glow)]">
        J
      </div>
      <div className="leading-tight">
        <div className="font-extrabold text-secondary text-[15px] tracking-tight">Jacto Connect</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">IA</div>
      </div>
    </div>
  );
}

interface ShellProps {
  children: ReactNode;
  back?: string;
  title?: string;
  showMenu?: boolean;
  bg?: "white" | "muted" | "dark";
}

export function Shell({ children, back, title, showMenu, bg = "white" }: ShellProps) {
  const bgClass =
    bg === "muted" ? "bg-muted" : bg === "dark" ? "bg-secondary text-secondary-foreground" : "bg-background";
  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 px-5 pt-6 pb-4 bg-inherit">
        <div className="flex items-center gap-3 min-w-0">
          {back && (
            <Link
              to={back}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary hover:bg-accent transition"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          {title ? (
            <h1 className="text-base font-bold tracking-tight truncate">{title}</h1>
          ) : (
            <Logo />
          )}
        </div>
        {showMenu && (
          <Link
            to="/insights"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary hover:bg-accent transition"
            aria-label="Insights"
          >
            <BarChart3 className="h-5 w-5" />
          </Link>
        )}
      </header>
      <main className="flex-1 flex flex-col px-5 pb-8">{children}</main>
    </div>
  );
}
