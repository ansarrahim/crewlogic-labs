import type { Metadata } from "next";
import { Bug, LogOut, Sparkles, Users } from "lucide-react";
import { getLeadsDaily } from "@/lib/leads";
import { getErrorCountLast24h, getSentryProjectUrl } from "@/lib/sentry-metrics";
import { getUsageThisAndLastMonth } from "@/lib/usage-stats";
import MetricCard from "@/components/admin/MetricCard";
import NotConnected from "@/components/admin/NotConnected";
import LeadsSparkline from "@/components/admin/LeadsSparkline";

export const metadata: Metadata = {
  title: "Admin · Metrics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const [leadsDaily, errorCount, usage] = await Promise.all([
    getLeadsDaily(30),
    getErrorCountLast24h(),
    getUsageThisAndLastMonth(),
  ]);

  const sentryUrl = getSentryProjectUrl();
  const leadsLast7 = leadsDaily?.slice(-7).reduce((sum, d) => sum + d.count, 0) ?? 0;
  const leadsLast30 = leadsDaily?.reduce((sum, d) => sum + d.count, 0) ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Admin
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-100">Metrics</h1>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-rose-500/40 hover:text-rose-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard title="Leads" icon={Users}>
            {leadsDaily ? (
              <>
                <p className="font-mono text-3xl font-bold text-emerald-400">{leadsLast30}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {leadsLast7} in the last 7 days &middot; last 30 days
                </p>
                <div className="mt-4">
                  <LeadsSparkline data={leadsDaily} />
                </div>
              </>
            ) : (
              <NotConnected message="Not connected — set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN." />
            )}
          </MetricCard>

          <MetricCard
            title="Errors (24h)"
            icon={Bug}
            href={sentryUrl ?? undefined}
            linkLabel="Open in Sentry"
          >
            {errorCount !== null ? (
              <>
                <p className="font-mono text-3xl font-bold text-rose-400">{errorCount}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {errorCount === 0 ? "No errors in the last 24 hours" : "errors in the last 24 hours"}
                </p>
              </>
            ) : (
              <NotConnected message="Not connected — set SENTRY_ORG / SENTRY_PROJECT / SENTRY_AUTH_TOKEN." />
            )}
          </MetricCard>

          <MetricCard title="Agent Usage" icon={Sparkles} href="/#terminal" linkLabel="View live tools">
            {usage ? (
              <>
                <p className="font-mono text-3xl font-bold text-cyan-400">{usage.thisMonth}</p>
                <p className="mt-1 text-xs text-slate-500">
                  runs this month &middot; {usage.lastMonth} last month
                </p>
              </>
            ) : (
              <NotConnected message="Not connected — set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN." />
            )}
          </MetricCard>
        </div>
      </div>
    </div>
  );
}
