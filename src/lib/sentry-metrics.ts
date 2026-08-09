// Sentry orgs can live on a region-specific cluster (e.g. https://de.sentry.io
// for EU-region orgs) rather than the default https://sentry.io — using the
// wrong base URL causes the org/project lookup to silently fail. The auth
// token's payload includes the correct region_url; SENTRY_API_BASE_URL lets
// us pin it via env instead of decoding the token at request time.
function getApiBase(): string {
  const region = process.env.SENTRY_API_BASE_URL?.trim().replace(/\/$/, "");
  return `${region || "https://sentry.io"}/api/0`;
}

function isConfigured(): boolean {
  return Boolean(process.env.SENTRY_ORG && process.env.SENTRY_PROJECT && process.env.SENTRY_AUTH_TOKEN);
}

async function resolveProjectId(org: string, project: string, token: string): Promise<string | null> {
  const res = await fetch(`${getApiBase()}/projects/${org}/${project}/`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { id?: string };
  return data.id ?? null;
}

export async function getErrorCountLast24h(): Promise<number | null> {
  if (!isConfigured()) return null;

  const org = process.env.SENTRY_ORG!;
  const project = process.env.SENTRY_PROJECT!;
  const token = process.env.SENTRY_AUTH_TOKEN!;

  try {
    const projectId = await resolveProjectId(org, project, token);
    if (!projectId) return null;

    const url = new URL(`${getApiBase()}/organizations/${org}/stats_v2/`);
    url.searchParams.set("field", "sum(quantity)");
    url.searchParams.set("category", "error");
    url.searchParams.set("statsPeriod", "1d");
    url.searchParams.set("project", projectId);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { groups?: { totals?: Record<string, number> }[] };
    const total = data.groups?.reduce((sum, group) => sum + (group.totals?.["sum(quantity)"] ?? 0), 0);
    return total ?? 0;
  } catch (err) {
    console.error("Sentry metrics error:", err);
    return null;
  }
}

export function getSentryProjectUrl(): string | null {
  const org = process.env.SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT;
  if (!org || !project) return null;
  return `https://${org}.sentry.io/projects/${project}/`;
}
