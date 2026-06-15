import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { profile, socials } from "../data/site";
import { useGitHub } from "../hooks/useGitHub";
import "./Hero.css";

const roles = [
	"Full-Stack Engineer",
	"Tool Builder",
	"Language Tinkerer",
	"WEB & C# Dev",
];

export default function Hero()
{
	const { stats } = useGitHub();
	const [roleIndex, setRoleIndex] = useState(0);

	useEffect(() => {
		const t = setInterval(
			() => setRoleIndex((i) => (i + 1) % roles.length),
			2600
		);
		return () => clearInterval(t);
	}, []);

	const container = {
		hidden: {},
		show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
	};
	const item = {
		hidden: { opacity: 0, y: 26 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
		},
	};

	return (
		<section className="hero" id="top">
			<motion.div
				className="container hero__inner"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<motion.p className="hero__avail" variants={item}>
					<span className="hero__pulse" />
					Open to opportunities · {profile.location}
				</motion.p>

				<motion.h1 className="hero__title" variants={item}>
					Hi, I'm <span className="gradient-text">{profile.name}</span>
				</motion.h1>

				<motion.div className="hero__roleline" variants={item}>
					<span className="hero__role-static">A </span>
					<span className="hero__role-rotator">
						{roles.map((r, i) => (
							<motion.span
								key={r}
								className="hero__role"
								initial={false}
								animate={{
									opacity: roleIndex === i ? 1 : 0,
									y: roleIndex === i ? 0 : 14,
								}}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								aria-hidden={roleIndex !== i}
							>
								{r}
							</motion.span>
						))}
					</span>
				</motion.div>

				<motion.p className="hero__lead" variants={item}>
					{profile.tagline} By day I build production web apps in PHP; by night
					it's game-server tooling, a homemade programming language and clean,
					responsive interfaces — I love building things that developers and
					players actually use.
				</motion.p>

				<motion.div className="hero__actions" variants={item}>
					<a href="#work" className="btn btn--primary" data-hover>
						View my work <FiArrowDownRight />
					</a>
					<a href="#contact" className="btn btn--ghost" data-hover>
						Get in touch
					</a>
				</motion.div>

				<motion.div className="hero__socials" variants={item}>
					{socials.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noreferrer"
							className="hero__social"
							aria-label={s.label}
							data-hover
						>
							<s.icon />
						</a>
					))}
				</motion.div>

				<motion.div className="hero__stats" variants={item}>
					{stats.map((s) => (
						<div className="hero__stat" key={s.label}>
							<span className="hero__stat-value gradient-text">{s.value}</span>
							<span className="hero__stat-label">{s.label}</span>
						</div>
					))}
				</motion.div>
			</motion.div>

			<motion.a
				href="#about"
				className="hero__scroll"
				aria-label="Scroll to about"
				animate={{ y: [0, 8, 0] }}
				transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
			>
				scroll <FiArrowUpRight style={{ transform: "rotate(45deg)" }} />
			</motion.a>
		</section>
	);
}
