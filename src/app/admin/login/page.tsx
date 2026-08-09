import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Incorrect password.",
  "rate-limited": "Too many attempts — please wait a moment and try again.",
  "not-configured": "Admin login isn't configured yet (ADMIN_PASSWORD is unset).",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : null;

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <Lock className="h-4 w-4" />
          </span>
          <h1 className="text-lg font-semibold text-slate-100">Admin Login</h1>
        </div>

        <form action="/api/admin/login" method="POST" className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-slate-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-emerald-500/60 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            />
          </div>

          {errorMessage && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-sm text-amber-300">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-[background-color,transform] active:scale-[0.98] hover:bg-emerald-400"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
