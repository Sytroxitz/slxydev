import {
	FaGithub,
	FaXTwitter,
	FaDiscord,
	FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const profile = {
	handle: "slxy",
	name: "$lxy Txz",
	role: "Full-Stack Software Engineer",
	tagline: "I build tools, games and developer software.",
	bio: "A software engineer with many interests. PHP is my main language at work — it's where I ship and maintain real production web apps day to day — backed by plain JavaScript, HTML & CSS on the front-end. Right now I'm levelling up in React & TypeScript. I like turning rough ideas into polished, useful things, from game-server tooling to my own programming language.",
	location: "Germany",
	email: "me@slxy.dev",
	githubUser: "Sytroxitz",
};

export interface Social
{
	label: string;
	handle: string;
	href: string;
	icon: IconType;
}

export const socials: Social[] = [
	{
		label: "GitHub",
		handle: "Sytroxitz",
		href: "https://github.com/Sytroxitz",
		icon: FaGithub,
	},
	{
		label: "X / Twitter",
		handle: "@Slxy_Txz",
		href: "https://twitter.com/Slxy_Txz",
		icon: FaXTwitter,
	},
	{
		label: "Discord",
		handle: "slxy",
		href: "https://discord.com/users/261103679732580352",
		icon: FaDiscord,
	},
	{
		label: "YouTube",
		handle: "@slxy",
		href: "https://www.youtube.com/channel/UCAs8EWPBvR00TZ9wtOoYL6w",
		icon: FaYoutube,
	},
];

export interface Stat
{
	value: string;
	label: string;
}

// Fallback only — the real numbers are computed live from GitHub.
export const stats: Stat[] = [
	{ value: "15", label: "Public repos" },
	{ value: "6", label: "Languages used" },
	{ value: "5+", label: "Years on GitHub" },
];
