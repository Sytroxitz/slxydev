import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { profile, socials } from "../data/site";
import "./Contact.css";

export default function Contact()
{
	return (
		<section className="section contact" id="contact">
			<div className="container">
				<Reveal>
					<div className="contact__card">
						<div className="contact__glow" />
						<span className="eyebrow">Get in touch</span>
						<h2 className="contact__title">
							Let's build something
							<br />
							<span className="gradient-text">worth shipping.</span>
						</h2>
						<p className="contact__text">
							Got a project, a role, or just an idea you want to talk through?
							My inbox is open.
						</p>

						<motion.a
							href={`mailto:${profile.email}`}
							className="contact__email"
							whileHover={{ y: -3 }}
							transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							data-hover
						>
							{profile.email}
							<FiArrowUpRight />
						</motion.a>

						<div className="contact__socials">
							{socials.map((s) => (
								<a
									key={s.label}
									href={s.href}
									target="_blank"
									rel="noreferrer"
									className="contact__social"
									data-hover
								>
									<s.icon />
									<span>{s.handle}</span>
								</a>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
