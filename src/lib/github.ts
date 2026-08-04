export const GITHUB_USERNAME = "ansarrahim";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
};

type FetchReposResult = {
  repos: GithubRepo[];
  error: string | null;
};

export async function fetchGithubRepos(): Promise<FetchReposResult> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return { repos: [], error: `GitHub API returned ${res.status}. Try again shortly.` };
    }

    const data = (await res.json()) as GithubRepo[];

    const repos = data
      .filter((repo) => !repo.fork)
      .filter((repo) => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return { repos, error: null };
  } catch {
    return { repos: [], error: "Couldn't reach GitHub right now. Try again shortly." };
  }
}
