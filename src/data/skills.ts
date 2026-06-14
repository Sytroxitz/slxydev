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
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface Skill
{
	name: string;
	icon: IconType;
	color: string;
	primary?: boolean; // core, day-to-day tools
	focus?: boolean; // currently levelling up
}

/* ============================================================
   THIS is where you decide what's "core" vs "learning".
   This list is the single source of truth for the Tech-stack
   section — both live and offline.

   Per entry:
     primary: true  → shows the pink  "core"     badge
     focus:   true  → shows the violet "learning" badge
     (neither)      → a regular skill, no badge

   The order here is the order shown on the page. Any language
   you push to GitHub that isn't listed here is added on its
   own (as a regular skill) — see src/data/overrides.ts.
   ============================================================ */
export const skills: Skill[] = [
	{ name: "PHP", icon: SiPhp, color: "#777BB4", primary: true },
	{ name: "C#", icon: SiSharp, color: "#9B4F96", focus: true },
	{ name: "C++", icon: SiCplusplus, color: "#00599C", primary: false },
	{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", primary: true },
	{ name: "CSS3", icon: SiCss3, color: "#1572B6", primary: true },
	{ name: "HTML5", icon: SiHtml5, color: "#E34F26", primary: true },
	{ name: "MySQL", icon: SiMysql, color: "#4479A1", primary: true },
	{ name: "React", icon: SiReact, color: "#61DAFB", focus: true },
	{ name: "TypeScript", icon: SiTypescript, color: "#3178C6", focus: true },
	{ name: ".NET", icon: SiDotnet, color: "#512BD4" },
	{ name: "Python", icon: SiPython, color: "#3776AB" },
	{ name: "Java", icon: FaJava, color: "#E76F00" },
	{ name: "Ruby", icon: SiRuby, color: "#CC342D" },
	{ name: "Git", icon: SiGit, color: "#F05032" },
];

export interface Focus
{
	title: string;
	body: string;
}

export const focusAreas: Focus[] = [
	{
		title: "Backend & Web",
		body: "PHP is my daily driver at work — building and maintaining production web apps, APIs and the databases behind them, with front-ends in plain JavaScript & CSS.",
	},
	{
		title: "Systems & Desktop",
		body: "Native tooling and apps in C++, C# and .NET — performance-minded software that runs close to the metal.",
	},
	{
		title: "Languages & Tooling",
		body: "Building interpreters, bots and developer utilities. I enjoy understanding things down to how they're parsed.",
	},
];
