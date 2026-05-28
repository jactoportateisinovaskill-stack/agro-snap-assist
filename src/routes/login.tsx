import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LogIn, MapPin, ShieldCheck, User as UserIcon } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";
import { useT } from "@/i18n";
import { login, type Role } from "@/lib/auth";
import { useRegion } from "@/lib/region";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Jacto Connect IA" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: (s.redirect as string) || "/equipamento",
  }),
  component: LoginPage,
});

function LoginPage() {
  const t = useT();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [region] = useRegion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("usuario");

  const ready = region.trim().length > 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    login({ name, email, role });
    navigate({ to: search.redirect as "/equipamento" });
  };

  return (
    <Shell back="/">
      <div className="mt-2 flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LogIn className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-[22px] font-extrabold leading-tight tracking-tight text-secondary">
          {t("login.title")}
        </h1>
        <p className="mt-1.5 max-w-[300px] text-sm text-muted-foreground">{t("login.subtitle")}</p>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-muted/60 px-4 py-3 text-xs">
        <div className="flex items-center gap-2 text-secondary">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold uppercase tracking-wider text-muted-foreground">
            {t("login.regionLabel")}
          </span>
          <span className="font-bold text-secondary">{region || "—"}</span>
        </div>
        <Link to="/" className="text-[11px] font-bold text-primary hover:underline">
          {t("login.changeRegion")}
        </Link>
      </div>

      {!ready && (
        <p className="mt-2 text-[11px] font-semibold text-destructive">{t("login.noRegion")}</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Field label={t("login.name")}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Carlos Silva"
            className="input"
          />
        </Field>
        <Field label={t("login.email")}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="nome@empresa.com"
            className="input"
          />
        </Field>
        <Field label={t("login.password")}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="••••••••"
            className="input"
          />
        </Field>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("login.role")}
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <RoleOption
              active={role === "usuario"}
              onClick={() => setRole("usuario")}
              icon={<UserIcon className="h-4 w-4" />}
              label={t("login.roleUser")}
            />
            <RoleOption
              active={role === "gestor"}
              onClick={() => setRole("gestor")}
              icon={<ShieldCheck className="h-4 w-4" />}
              label={t("login.roleManager")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!ready}
          className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-[var(--shadow-glow)] active:scale-[0.98] transition disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
        >
          <LogIn className="h-5 w-5" /> {t("login.submit")}
        </button>
      </form>

      <style>{`
        .input {
          width:100%; border-radius:0.75rem; border:1px solid var(--color-border);
          background:var(--color-background); padding:0.75rem 1rem;
          font-size:0.875rem; color:var(--color-secondary); outline:none; transition:border-color .15s, box-shadow .15s;
        }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent); }
      `}</style>
    </Shell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function RoleOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-secondary hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
