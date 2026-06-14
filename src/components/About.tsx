import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { profile } from "../data/site";
import { focusAreas } from "../data/skills";
import "./About.css";

export default function About()
{
	return (
		<section className="section about" id="about">
			<div className="container">
				<div className="about__grid">
					<div className="about__intro">
						<Reveal>
							<span className="eyebrow">About me</span>
						</Reveal>
						<Reveal delay={0.05}>
							<h2 className="section-title">
								Curious by default,
								<br />
								<span className="gradient-text">builder by habit.</span>
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="about__text">{profile.bio}</p>
						</Reveal>
						<Reveal delay={0.15}>
							<p className="about__text">
								I started out modding games and writing Discord bots, and that
								curiosity grew into shipping real software — desktop apps,
								server tooling, even my own interpreted language. I care about
								clean code, fast iteration, and interfaces that feel good to
								use.
							</p>
						</Reveal>
					</div>

					<div className="about__focus">
						{focusAreas.map((f, i) => (
							<Reveal key={f.title} delay={0.1 + i * 0.08}>
								<motion.div
									className="focus-card"
									whileHover={{ y: -6 }}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									data-hover
								>
									<span className="focus-card__index">
										0{i + 1}
									</span>
									<h3 className="focus-card__title">{f.title}</h3>
									<p className="focus-card__body">{f.body}</p>
								</motion.div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
