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
    if (role === "manager") {
      navigate({ to: "/insights" });
    } else {
      navigate({ to: search.redirect as "/equipamento" });
    }
  };

  return (
    <Shell back="/">
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-3 py-4">
        <div className="w-full max-w-md rounded-2xl border-2 border-border bg-card p-6 shadow-[var(--shadow-elegant)]">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LogIn className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold leading-tight tracking-tight text-secondary">
                {t("login.title")}
              </h1>
              <p className="text-xs text-muted-foreground truncate">{t("login.subtitle")}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-muted/60 px-3 py-2 text-[11px]">

            <div className="flex items-center gap-1.5 text-secondary min-w-0">
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                {t("login.regionLabel")}
              </span>
              <span className="font-bold text-secondary truncate">{region || "—"}</span>
            </div>
            <Link to="/" className="ml-2 text-[10px] font-bold text-primary hover:underline shrink-0">
              {t("login.changeRegion")}
            </Link>
          </div>

          {!ready && (
            <p className="mt-1.5 text-[11px] font-semibold text-destructive">{t("login.noRegion")}</p>
          )}

          <form onSubmit={onSubmit} className="mt-3 space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
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
            </div>
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
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("login.role")}
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <RoleOption
                  active={role === "usuario"}
                  onClick={() => setRole("usuario")}
                  icon={<UserIcon className="h-4 w-4" />}
                  label={t("login.roleUser")}
                />
                <RoleOption
                  active={role === "manager"}
                  onClick={() => setRole("manager")}
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label={t("login.roleManager")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!ready}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-[var(--shadow-glow)] active:scale-[0.98] transition disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              <LogIn className="h-4 w-4" /> {t("login.submit")}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width:100%; border-radius:0.625rem; border:1px solid var(--color-border);
          background:var(--color-background); padding:0.5rem 0.75rem;
          font-size:0.8125rem; color:var(--color-secondary); outline:none; transition:border-color .15s, box-shadow .15s;
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
