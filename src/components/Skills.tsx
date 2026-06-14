import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useGitHub } from "../hooks/useGitHub";
import "./Skills.css";

export default function Skills()
{
	const { skills } = useGitHub();
	return (
		<section className="section skills" id="skills">
			<div className="container">
				<Reveal>
					<span className="eyebrow">Tech stack</span>
				</Reveal>
				<Reveal delay={0.05}>
					<h2 className="section-title">
						Tools I reach for
					</h2>
				</Reveal>
				<Reveal delay={0.1}>
					<p className="skills__lead">
						The tools I reach for day to day are marked{" "}
						<span className="skills__tag skills__tag--core">core</span>; the
						ones I'm actively levelling up in are marked{" "}
						<span className="skills__tag skills__tag--focus">learning</span>.
					</p>
				</Reveal>

				<div className="skills__grid">
					{skills.map((s, i) => (
						<Reveal key={s.name} delay={0.04 * i} y={20}>
							<motion.div
								className={`skill ${s.primary ? "skill--primary" : ""} ${
									s.focus ? "skill--focus" : ""
								}`}
								whileHover={{ y: -5 }}
								transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
								data-hover
								style={
									{ "--skill-color": s.color } as React.CSSProperties
								}
							>
								<s.icon className="skill__icon" />
								<span className="skill__name">{s.name}</span>
								{s.primary && <span className="skill__core">core</span>}
								{s.focus && <span className="skill__focus">learning</span>}
							</motion.div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
