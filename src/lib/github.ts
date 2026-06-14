import type { Project } from "../data/projects";
import type { Skill } from "../data/skills";
import type { Stat } from "../data/site";
// `skills` is the single, human-edited source of truth for the always-on
// stack and its core / learning flags. See src/data/skills.ts.
import { skills as manualSkills } from "../data/skills";
import {
	hiddenRepos,
	repoOverrides,
	skillMeta,
	ghLanguageToSkill,
} from "../data/overrides";

const USER = "Sytroxitz";
const CACHE_KEY = "slxy:gh:v1";
const TTL = 1000 * 60 * 60 * 6; // 6 hours

/** The subset of the GitHub repo payload we actually use. */
export interface Repo
{
	name: string;
	description: string | null;
	language: string | null;
	html_url: string;
	homepage: string | null;
	fork: boolean;
	archived: boolean;
	stargazers_count: number;
	topics?: string[];
	pushed_at: string;
	created_at: string;
}

export interface GitHubData
{
	projects: Project[];
	skills: Skill[];
	stats: Stat[];
}

/* ---------------- cache (localStorage, 6h TTL) ---------------- */

function readCache() : Repo[] | null
{
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const { t, repos } = JSON.parse(raw) as { t: number; repos: Repo[] };
		if (Date.now() - t > TTL) return null;
		return repos;
	} catch {
		return null;
	}
}

function writeCache(repos: Repo[])
{
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), repos }));
	} catch {
		/* storage full or unavailable — ignore, we'll just re-fetch */
	}
}

/* ------------- fetch (deduped across callers) ---------------- */

let inflight: Promise<Repo[]> | null = null;

export function fetchRepos() : Promise<Repo[]>
{
	const cached = readCache();
	if (cached) return Promise.resolve(cached);
	if (inflight) return inflight;

	inflight = fetch(
		`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
		{ headers: { Accept: "application/vnd.github+json" } }
	)
		.then((res) => {
			if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
			return res.json() as Promise<Repo[]>;
		})
		.then((repos) => {
			writeCache(repos);
			return repos;
		})
		.finally(() => {
			inflight = null;
		});

	return inflight;
}

/* --------------------- mapping helpers ----------------------- */

function titleize(name: string) : string
{
	return name
		.replace(/[-_]+/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapRepo(r: Repo) : Project
{
	const o = repoOverrides[r.name] ?? {};
	const language = r.language ?? "Code";
	const tags =
		o.tags ??
		Array.from(
			new Set([language, ...(r.topics ?? [])].filter(Boolean) as string[])
		).slice(0, 4);

	return {
		name: r.name,
		title: o.title ?? titleize(r.name),
		description:
			o.description ?? r.description ?? "A project — see the repo for details.",
		tags,
		language,
		repo: r.html_url,
		live: r.homepage || undefined,
		featured: o.featured,
	};
}

export function buildProjects(repos: Repo[]) : Project[]
{
	return repos
		.filter((r) => !r.fork && !r.archived && !hiddenRepos.has(r.name))
		.map(mapRepo)
		.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

/** Orders skills core → learning → rest, keeping each group's own order
 *  (relies on a stable sort, which all modern engines provide). */
export function sortSkills(list: Skill[]) : Skill[]
{
	const rank = (s: Skill) => (s.primary ? 0 : s.focus ? 1 : 2);
	return [...list].sort((a, b) => rank(a) - rank(b));
}

export function buildSkills(repos: Repo[]) : Skill[]
{
	// 1) start from the curated list in src/data/skills.ts — this is where the
	//    order and the core (`primary`) / learning (`focus`) flags are set.
	const result: Skill[] = manualSkills.map((s) => ({ ...s }));
	const seen = new Set(result.map((s) => s.name));

	// 2) auto-append any language detected on GitHub that isn't already listed,
	//    so new languages show up on their own (no flag = a regular skill).
	for (const r of repos) {
		if (r.fork || hiddenRepos.has(r.name) || !r.language) continue;
		const name = ghLanguageToSkill[r.language];
		if (!name || seen.has(name) || !skillMeta[name]) continue;
		seen.add(name);
		result.push({ name, ...skillMeta[name] });
	}

	// 3) display order: core first, then learning, then everything else.
	return sortSkills(result);
}

export function buildStats(repos: Repo[]) : Stat[]
{
	const languages = new Set(
		repos
			.filter((r) => !r.fork && !hiddenRepos.has(r.name) && r.language)
			.map((r) => r.language as string)
	);

	const earliest = repos.reduce<number>((min, r) => {
		const t = Date.parse(r.created_at);
		return Number.isNaN(t) ? min : Math.min(min, t);
	}, Date.now());
	const years = Math.max(1, new Date().getFullYear() - new Date(earliest).getFullYear());

	return [
		{ value: String(repos.length), label: "Public repos" },
		{ value: String(languages.size), label: "Languages used" },
		{ value: `${years}+`, label: "Years on GitHub" },
	];
}

export function buildGitHubData(repos: Repo[]) : GitHubData
{
	return {
		projects: buildProjects(repos),
		skills: buildSkills(repos),
		stats: buildStats(repos),
	};
}
