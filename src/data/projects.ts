export interface Project
{
	name: string;
	title: string;
	description: string;
	tags: string[];
	language: string;
	repo?: string;
	live?: string;
	featured?: boolean;
}

/* Curated from github.com/Sytroxitz — original (non-fork) work first. */
export const projects: Project[] = [
	{
		name: "hydash",
		title: "Hydash",
		description:
			"A free and open-source game-server management platform. Manage every file and setting of your game server seamlessly from one clean dashboard.",
		tags: ["C#", "Dashboard", "Game Servers"],
		language: "C#",
		repo: "https://github.com/Sytroxitz/hydash",
		live: "https://hydash.net/",
		featured: true,
	},
	{
		name: "txz",
		title: "TXZ Language",
		description:
			"A small programming language written from scratch in Python — lexer, parser and interpreter included. A deep-dive into how languages really work.",
		tags: ["Python", "Interpreter", "Compilers"],
		language: "Python",
		repo: "https://github.com/Sytroxitz/txz",
		featured: true,
	},
	{
		name: "qrcode-scan",
		title: "QR & Barcode Scanner",
		description:
			"A browser-based scanner for QR codes and barcodes with multi-code detection, tap-to-select overlays and a live list of detected codes.",
		tags: ["JavaScript", "Web", "Computer Vision"],
		language: "JavaScript",
		repo: "https://github.com/Sytroxitz/qrcode-scan",
		live: "https://sytroxitz.github.io/qrcode-scan/",
		featured: true,
	},
	{
		name: "cyber-client_1.8",
		title: "CYBER Client",
		description:
			"A custom Minecraft 1.8.8 client built in Java, with its own launcher — performance tweaks and quality-of-life modules.",
		tags: ["Java", "Minecraft", "Modding"],
		language: "Java",
		repo: "https://github.com/Sytroxitz/cyber-client_1.8",
	},
	{
		name: "system-equipment-data",
		title: "System Equipment Data",
		description:
			"A lightweight C++ utility that reads and presents detailed computer specification data — CPU, memory and hardware at a glance.",
		tags: ["C++", "Systems", "CLI"],
		language: "C++",
		repo: "https://github.com/Sytroxitz/system-equipment-data",
	},
	{
		name: "ruby-discord-bot",
		title: "Ruby Discord Bot",
		description:
			"A clean, extensible Discord bot built with Discordrb in Ruby — a compact base for commands, events and automation.",
		tags: ["Ruby", "Discord", "Automation"],
		language: "Ruby",
		repo: "https://github.com/Sytroxitz/ruby-discord-bot",
	},
	{
		name: "py-kivy-clicker",
		title: "Kivy Clicker",
		description:
			"A small clicker game built in Python with the Kivy framework — cross-platform UI and game-loop fundamentals.",
		tags: ["Python", "Kivy", "Games"],
		language: "Python",
		repo: "https://github.com/Sytroxitz/py-kivy-clicker",
	},
	{
		name: "teamchat",
		title: "TeamChat Plugin",
		description:
			"An open-source TeamChat plugin for Minecraft servers, published on SpigotMC — private team channels done right.",
		tags: ["Java", "Spigot", "Plugin"],
		language: "Java",
		repo: "https://github.com/Sytroxitz/teamchat",
		live: "https://www.spigotmc.org/resources/teamchat-open-source.92482/",
	},
];
