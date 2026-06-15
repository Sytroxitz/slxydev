import {
	SiPhp,
	SiCplusplus,
	SiSharp,
	SiPython,
	SiJavascript,
	SiTypescript,
	SiReact,
	SiRuby,
	SiDotnet,
	SiMysql,
	SiHtml5,
	SiCss3,
	SiGit,
	SiGo,
	SiRust,
	SiKotlin,
	SiSwift,
	SiDart,
	SiLua,
	SiC,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------
   This file holds the *curated* layer that sits on top of the live
   GitHub data. The site fetches repos from the GitHub API and merges
   them with the overrides below, so the Work and Stack sections stay
   up to date on their own — you only touch this file if you want to
   fine-tune how a specific repo is presented.
   ------------------------------------------------------------------ */

/** Repos that should never appear (forks, profile readme, dupes, …). */
export const hiddenRepos = new Set<string>([
	"Sytroxitz", // profile readme
	"MAUIRestClient", // fork
	"nitro-sniper", // fork
	"MCP-Snippets", // fork
	"cyber-launcher", // requirements dump, dupe of cyber-client
]);

export interface RepoOverride
{
	title?: string;
	description?: string;
	tags?: string[];
	featured?: boolean;
	/** Set `true` to drop this repo from the Work/projects grid only.
	 *  The repo still counts toward the Stack section and the stats —
	 *  use `hiddenRepos` if you want it gone everywhere. */
	hidden?: boolean;
}

/** Hand-written presentation for specific repos. Anything omitted
 *  falls back to GitHub's own name / description / language. */
export const repoOverrides: Record<string, RepoOverride> = {
	slxydev: {
		title: "slxy.dev",
		description:
			"This very site — my personal portfolio, built with React, TypeScript and Vite. It pulls my projects and tech stack live from the GitHub API and ships via Docker behind a Caddy reverse proxy.",
		tags: ["TypeScript", "React", "Vite"],
		featured: true,
	},
	hydash: {
		title: "Hydash",
		description:
			"A free and open-source game-server management platform. Manage every file and setting of your game server seamlessly from one clean dashboard.",
		tags: ["C#", "Dashboard", "Game Servers"],
		featured: true,
	},
	txz: {
		title: "TXZ Language",
		description:
			"A small programming language written from scratch in Python — lexer, parser and interpreter included. A deep-dive into how languages really work.",
		tags: ["Python", "Interpreter", "Compilers"],
		featured: true,
	},
	"qrcode-scan": {
		title: "QR & Barcode Scanner",
		description:
			"A browser-based scanner for QR codes and barcodes with multi-code detection, tap-to-select overlays and a live list of detected codes.",
		tags: ["JavaScript", "Web", "Computer Vision"],
		featured: true,
	},
	"cyber-client_1.8": {
		title: "CYBER Client",
		description:
			"A custom Minecraft 1.8.8 client built in Java, with its own launcher — performance tweaks and quality-of-life modules.",
		tags: ["Java", "Minecraft", "Modding"],
	},
	"system-equipment-data": {
		title: "System Equipment Data",
		description:
			"A lightweight C++ utility that reads and presents detailed computer specification data — CPU, memory and hardware at a glance.",
		tags: ["C++", "Systems", "CLI"],
	},
	"ruby-discord-bot": {
		title: "Ruby Discord Bot",
		description:
			"A clean, extensible Discord bot built with Discordrb in Ruby — a compact base for commands, events and automation.",
		tags: ["Ruby", "Discord", "Automation"],
	},
	"py-kivy-clicker": {
		title: "Kivy Clicker",
		description:
			"A small clicker game built in Python with the Kivy framework — cross-platform UI and game-loop fundamentals.",
		tags: ["Python", "Kivy", "Games"],
		hidden: true, // not really a "project" per se, more of a learning sandbox
	},
	"Tic-Tac-Toe": {
		title: "Tic-Tac-Toe",
		hidden: true, // more of a learning exercise than a full project
	},
	"CyberLauncher": {
		title: "CYBER Launcher",
		description:
			"A custom Minecraft launcher built in Java, with its own client — manage multiple accounts and launch configurations with ease.",
		tags: ["Java", "Minecraft", "Launcher"],
		hidden: true, // launcher of cyber-client, which is the main project repo
	},
	teamchat: {
		title: "TeamChat Plugin",
		description:
			"An open-source TeamChat plugin for Minecraft servers, published on SpigotMC — private team channels done right.",
		tags: ["Java", "Spigot", "Plugin"],
	},
};

/** True if a repo should be left out of the Work/projects grid — either
 *  hidden everywhere via `hiddenRepos` or flagged `hidden: true` in
 *  `repoOverrides`. Stack & stats use `hiddenRepos` alone, so a repo
 *  flagged only with `hidden` still shows up there. */
export function isHiddenFromProjects(name: string) : boolean
{
	return hiddenRepos.has(name) || repoOverrides[name]?.hidden === true;
}

/** Icon + brand colour for every skill we know how to render. */
export const skillMeta: Record<string, { icon: IconType; color: string }> = {
	PHP: { icon: SiPhp, color: "#777BB4" },
	"C#": { icon: SiSharp, color: "#9B4F96" },
	"C++": { icon: SiCplusplus, color: "#00599C" },
	C: { icon: SiC, color: "#A8B9CC" },
	TypeScript: { icon: SiTypescript, color: "#3178C6" },
	JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
	React: { icon: SiReact, color: "#61DAFB" },
	".NET": { icon: SiDotnet, color: "#512BD4" },
	Python: { icon: SiPython, color: "#3776AB" },
	Java: { icon: FaJava, color: "#E76F00" },
	MySQL: { icon: SiMysql, color: "#4479A1" },
	Ruby: { icon: SiRuby, color: "#CC342D" },
	HTML5: { icon: SiHtml5, color: "#E34F26" },
	CSS3: { icon: SiCss3, color: "#1572B6" },
	Git: { icon: SiGit, color: "#F05032" },
	Go: { icon: SiGo, color: "#00ADD8" },
	Rust: { icon: SiRust, color: "#DEA584" },
	Kotlin: { icon: SiKotlin, color: "#7F52FF" },
	Swift: { icon: SiSwift, color: "#F05138" },
	Dart: { icon: SiDart, color: "#0175C2" },
	Lua: { icon: SiLua, color: "#2C2D72" },
};

/** Maps GitHub's `language` names onto our skill display names.
 *  Used only to auto-add languages detected on GitHub that aren't already
 *  in the curated list. The core / learning flags live in src/data/skills.ts. */
export const ghLanguageToSkill: Record<string, string> = {
	PHP: "PHP",
	"C#": "C#",
	"C++": "C++",
	C: "C",
	TypeScript: "TypeScript",
	JavaScript: "JavaScript",
	Python: "Python",
	Java: "Java",
	Ruby: "Ruby",
	HTML: "HTML5",
	CSS: "CSS3",
	Go: "Go",
	Rust: "Rust",
	Kotlin: "Kotlin",
	Swift: "Swift",
	Dart: "Dart",
	Lua: "Lua",
};
