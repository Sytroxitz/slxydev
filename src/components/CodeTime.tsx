import { useState } from "react";
import { FiActivity, FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { config } from "../data/config";
import "./CodeTime.css";

/**
 * Coding-time stats from CodeTime (https://codetime.dev) and WakaTime
 * (https://wakatime.com), rendered as badges in a matching style. Only
 * public ids are used — no token is ever shipped to the browser — and
 * `<img>` requests sidestep CORS. Badges that fail to load are hidden,
 * so a broken period never shows.
 */

const BRAND = "f62691";
const LABEL_BG = "18171a";

function badgeSrc(uid: string, minutes: number, style: string, label: string)
{
	const endpoint =
		`https://api.codetime.dev/v3/users/shield?uid=${encodeURIComponent(uid)}` +
		(minutes > 0 ? `&minutes=${minutes}` : "");
	return (
		`https://img.shields.io/endpoint?url=${encodeURIComponent(endpoint)}` +
		`&style=${style}&color=${BRAND}&labelColor=${LABEL_BG}` +
		`&label=${encodeURIComponent(label)}`
	);
}

/**
 * WakaTime serves its own shields-styled SVG badge. Its public badge only
 * exposes the all-time total (no period filtering), and it honours the same
 * style/color/labelColor/label params, so it lines up with the CodeTime ones.
 */
function wakaSrc(uuid: string, style: string, label: string)
{
	const params = new URLSearchParams({
		style,
		color: BRAND,
		labelColor: LABEL_BG,
		label,
	});
	return `https://wakatime.com/badge/user/${encodeURIComponent(
		uuid
	)}.svg?${params.toString()}`;
}

export default function CodeTime()
{
	const { uid, style, badges } = config.codetime;
	const waka = config.wakatime;
	const [failed, setFailed] = useState<Set<string>>(new Set());

	const markFailed = (key: string) =>
		setFailed((prev) => new Set(prev).add(key));

	const visible = badges.filter((b) => !failed.has(b.label));
	const wakaVisible = waka.uuid.trim().length > 0 && !failed.has("__waka");

	return (
		<section className="section codetime" id="codetime">
			<div className="container">
				<Reveal>
					<span className="eyebrow">Coding activity</span>
				</Reveal>
				<Reveal delay={0.05}>
					<h2 className="section-title">
						Time at the <span className="gradient-text">keyboard</span>
					</h2>
				</Reveal>
				<Reveal delay={0.1}>
					<p className="codetime__lead">
						Tracked automatically across my editors with CodeTime and
						WakaTime — these numbers update on their own.
					</p>
				</Reveal>

				<Reveal delay={0.15}>
					<div className="codetime__badges">
						{visible.map((b) => (
							<div className="codetime__badge" key={b.label}>
								<FiActivity className="codetime__badge-icon" aria-hidden focusable="false" />
								<img
									src={badgeSrc(uid, b.minutes, style, b.label)}
									alt={`CodeTime — ${b.label}`}
									loading="lazy"
									onError={() => markFailed(b.label)}
								/>
							</div>
						))}
						{wakaVisible && (
							<div className="codetime__badge" key="__waka">
								<FiActivity className="codetime__badge-icon" aria-hidden focusable="false" />
								<img
									src={wakaSrc(waka.uuid, style, waka.label)}
									alt={`WakaTime — ${waka.label}`}
									loading="lazy"
									onError={() => markFailed("__waka")}
								/>
							</div>
						)}
					</div>
				</Reveal>

				<Reveal delay={0.2} className="codetime__credits">
					<a
						href="https://codetime.dev"
						target="_blank"
						rel="noreferrer"
						className="codetime__credit"
						data-hover
					>
						Powered by CodeTime <FiArrowUpRight aria-hidden focusable="false" />
					</a>
					{wakaVisible && (
						<a
							href="https://wakatime.com/@slxy"
							target="_blank"
							rel="noreferrer"
							className="codetime__credit"
							data-hover
						>
							Powered by WakaTime <FiArrowUpRight aria-hidden focusable="false" />
						</a>
					)}
				</Reveal>
			</div>
		</section>
	);
}
