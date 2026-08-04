import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import ProjectsGrid from "@/components/ProjectsGrid";
import GithubMark from "@/components/icons/GithubMark";
import { CEO } from "@/lib/data";
import { GITHUB_PROFILE_URL, fetchGithubRepos } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects — CrewLogic Labs",
  description: `Live GitHub projects from ${CEO.name}, CEO & Lead Systems Architect at CrewLogic Labs.`,
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const { repos, error } = await fetchGithubRepos();

  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Open Source &amp; Projects
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Engr. {CEO.name}&apos;s Projects
              </h1>
              <p className="mt-4 text-slate-400">
                Pulled live from GitHub — every repository below is real, current work, not a
                curated case study.
              </p>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                <GithubMark className="h-4 w-4" />
                View Full GitHub Profile
              </a>
            </div>

            <ProjectsGrid repos={repos} error={error} />
          </div>
        </section>
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
