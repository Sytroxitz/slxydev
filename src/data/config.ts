/* ============================================================
   GLOBAL SITE CONFIG
   The one place to switch whole sections (and a few cosmetic
   features) on or off, plus the CodeTime settings.
   ============================================================ */

export type SectionId = "about" | "skills" | "work" | "codetime" | "contact";

export interface CodeTimeBadge
{
	/** Rolling look-back window in minutes (e.g. 1440 = last day,
	 *  10080 = last 7 days). Use 0 for the all-time total. The CodeTime
	 *  shield API has no calendar presets, so these are rolling windows. */
	minutes: number;
	/** The label rendered on the left of the badge. */
	label: string;
}

export const config = {
	/* Toggle whole sections here. `false` removes the section *and* its
	   nav link entirely. */
	sections: {
		about: true,
		skills: true,
		work: true,
		codetime: true,
		contact: true,
	} as Record<SectionId, boolean>,

	/* Cosmetic, site-wide features. */
	features: {
		customCursor: true,
		animatedBackground: true,
		scrollProgress: true,
	},

	/* CodeTime coding-time stats (https://codetime.dev).
	   Uses the PUBLIC shield endpoint — only your public user id is
	   needed, never your upload token. The section auto-hides while
	   `uid` is empty. */
	codetime: {
		// Paste your CodeTime user id here to switch the section on.
		//    Find it on https://codetime.dev/dashboard/settings — it's the
		//    `uid=...` value in your shield/badge URL.
		uid: "3002",
		// shields.io badge style: flat | flat-square | plastic | for-the-badge
		style: "for-the-badge",
		// Which windows to show. Add/remove freely; each is one badge.
		// `minutes` is a rolling look-back; 0 means the all-time total.
		badges: [
			{ minutes: 1440, label: "Last 24h" },
			{ minutes: 10080, label: "Last 7 days" },
			{ minutes: 0, label: "All time" },
		] as CodeTimeBadge[],
	},

	/* WakaTime coding-time total (https://wakatime.com).
	   Uses your PUBLIC badge — only the user UUID is needed, no token.
	   The public badge only exposes the all-time total (no period
	   filtering), so it renders as a single badge. Leave `uuid` empty
	   to hide it. */
	wakatime: {
		// Your WakaTime user UUID — the value in your public badge URL,
		//    wakatime.com/badge/user/<uuid>.svg (Profile → Embeddable badge).
		uuid: "d62706c6-dbaf-41b0-b0f4-8ca16e7d539e",
		// Label shown on the left of the badge.
		label: "WakaTime",
	},
};

/** True when a section should be rendered (also requires a CodeTime uid). */
export function sectionEnabled(id: SectionId) : boolean
{
	if (!config.sections[id]) return false;
	if (id === "codetime") return config.codetime.uid.trim().length > 0;
	return true;
}
