import { useEffect, useState } from "react";
import { fetchRepos, buildGitHubData, sortSkills } from "../lib/github";
import { projects as fallbackProjects } from "../data/projects";
import { skills as fallbackSkills } from "../data/skills";
import { stats as fallbackStats } from "../data/site";
import type { Project } from "../data/projects";
import type { Skill } from "../data/skills";
import type { Stat } from "../data/site";

export type DataStatus = "loading" | "live" | "fallback";

interface UseGitHub
{
	projects: Project[];
	skills: Skill[];
	stats: Stat[];
	status: DataStatus;
}

/**
 * Returns projects & skills, fresh from the GitHub API when possible.
 * Renders instantly with the curated static data, then swaps to live
 * data once it arrives. If GitHub is unreachable (offline, rate-limited)
 * the static fallback simply stays — the site never looks empty.
 */
export function useGitHub() : UseGitHub
{
	const [projects, setProjects] = useState<Project[]>(fallbackProjects);
	const [skills, setSkills] = useState<Skill[]>(sortSkills(fallbackSkills));
	const [stats, setStats] = useState<Stat[]>(fallbackStats);
	const [status, setStatus] = useState<DataStatus>("loading");

	useEffect(() => {
		let alive = true;

		fetchRepos()
			.then((repos) => {
				if (!alive) return;
				const data = buildGitHubData(repos);
				// guard against an empty/odd response wiping the page
				if (data.projects.length) setProjects(data.projects);
				if (data.skills.length) setSkills(data.skills);
				if (data.stats.length) setStats(data.stats);
				setStatus("live");
			})
			.catch(() => {
				if (alive) setStatus("fallback");
			});

		return () => {
			alive = false;
		};
	}, []);

	return { projects, skills, stats, status };
}
