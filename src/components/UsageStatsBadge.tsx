"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export default function UsageStatsBadge() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/usage-stats")
      .then((res) => res.json())
      .then((data: { stats: { total: number } | null }) => {
        if (!cancelled && data.stats) setTotal(data.stats.total);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (total === null) return null;

  return (
    <div className="mx-auto mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-400">
      <Activity className="h-3.5 w-3.5 text-emerald-400" />
      {total.toLocaleString()} real agent {total === 1 ? "run" : "runs"} so far — live count
    </div>
  );
}
