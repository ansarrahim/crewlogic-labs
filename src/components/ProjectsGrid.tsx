import { ExternalLink, FolderGit2, GitFork, History, Star } from "lucide-react";
import type { GithubRepo } from "@/lib/github";

function formatUpdated(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(dateString)
  );
}

export default function ProjectsGrid({
  repos,
  error,
}: {
  repos: GithubRepo[];
  error: string | null;
}) {
  if (error) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center text-sm text-amber-300">
        {error}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center text-sm text-slate-400">
        No public repositories to show yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-emerald-500/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <FolderGit2 className="h-4 w-4" />
              </div>
              <h3 className="font-mono text-sm font-bold text-slate-100">{repo.name}</h3>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400" />
          </div>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
            {repo.description ?? "No description provided."}
          </p>

          {repo.topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {repo.forks_count}
            </span>
            <span className="ml-auto flex items-center gap-1">
              <History className="h-3.5 w-3.5" />
              {formatUpdated(repo.updated_at)}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
