import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { useGitHub } from "../hooks/useGitHub";
import "./Projects.css";

export default function Projects()
{
	const { projects, status } = useGitHub();
	const [showAll, setShowAll] = useState(false);
	const visible = showAll ? projects : projects.slice(0, 6);

	return (
		<section className="section work" id="work">
			<div className="container">
				<div className="work__head">
					<div>
						<Reveal>
							<span className="eyebrow">Selected work</span>
						</Reveal>
						<Reveal delay={0.05}>
							<h2 className="section-title">
								Things I've <span className="gradient-text">built</span>
							</h2>
						</Reveal>
						<Reveal delay={0.08}>
							<p className="work__sync">
								<span
									className={`work__sync-dot ${
										status === "live" ? "is-live" : ""
									}`}
								/>
								{status === "live"
									? "Synced live from GitHub"
									: "Pulled from GitHub"}
							</p>
						</Reveal>
					</div>
					<Reveal delay={0.1}>
						<a
							href="https://github.com/Sytroxitz"
							target="_blank"
							rel="noreferrer"
							className="work__all"
							data-hover
						>
							All on GitHub <FiArrowUpRight />
						</a>
					</Reveal>
				</div>

				<div className="work__grid">
					{visible.map((p, i) => (
						<Reveal key={p.name} delay={Math.min(i, 3) * 0.07} y={30}>
							<motion.article
								className={`card ${p.featured ? "card--featured" : ""}`}
								whileHover={{ y: -8 }}
								transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
								data-hover
							>
								<div className="card__glow" />
								<div className="card__top">
									<span className="card__lang">{p.language}</span>
									<div className="card__links">
										{p.repo && (
											<a
												href={p.repo}
												target="_blank"
												rel="noreferrer"
												aria-label={`${p.title} on GitHub`}
												data-hover
											>
												<FiGithub />
											</a>
										)}
										{p.live && (
											<a
												href={p.live}
												target="_blank"
												rel="noreferrer"
												aria-label={`${p.title} live`}
												data-hover
											>
												<FiExternalLink />
											</a>
										)}
									</div>
								</div>

								<h3 className="card__title">{p.title}</h3>
								<p className="card__desc">{p.description}</p>

								<ul className="card__tags">
									{p.tags.map((t) => (
										<li key={t}>{t}</li>
									))}
								</ul>
							</motion.article>
						</Reveal>
					))}
				</div>

				{projects.length > 6 && (
					<div className="work__more">
						<button
							className="btn btn--ghost"
							onClick={() => setShowAll((v) => !v)}
							data-hover
						>
							{showAll ? "Show less" : `Show ${projects.length - 6} more`}
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
