import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { sectionEnabled } from "../data/config";
import type { SectionId } from "../data/config";
import "./Nav.css";

const allLinks: { label: string; href: string; id: SectionId }[] = [
	{ label: "About", href: "#about", id: "about" },
	{ label: "Stack", href: "#skills", id: "skills" },
	{ label: "Work", href: "#work", id: "work" },
	{ label: "Activity", href: "#codetime", id: "codetime" },
	{ label: "Contact", href: "#contact", id: "contact" },
];

// only show links for sections that are switched on in the global config
const links = allLinks.filter((l) => sectionEnabled(l.id));

export default function Nav()
{
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.header
			className={`nav ${scrolled ? "nav--scrolled" : ""}`}
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
		>
			<div className="container nav__inner">
				<a href="#top" className="nav__logo" aria-label="slxy.dev home">
					<span className="gradient-text">slxy</span>
					<span className="nav__dot">.dev</span>
				</a>

				<nav className="nav__links">
					{links.map((l) => (
						<a key={l.href} href={l.href} className="nav__link">
							{l.label}
						</a>
					))}
					<a
						href="https://github.com/Sytroxitz"
						target="_blank"
						rel="noreferrer"
						className="nav__cta"
					>
						GitHub
					</a>
				</nav>

				<button
					className="nav__burger"
					onClick={() => setOpen((v) => !v)}
					aria-label="Toggle menu"
				>
					{open ? <FiX size={22} /> : <FiMenu size={22} />}
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<motion.nav
						className="nav__mobile"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						{links.map((l) => (
							<a
								key={l.href}
								href={l.href}
								className="nav__mobile-link"
								onClick={() => setOpen(false)}
							>
								{l.label}
							</a>
						))}
						<a
							href="https://github.com/Sytroxitz"
							target="_blank"
							rel="noreferrer"
							className="nav__mobile-link nav__mobile-link--cta"
							onClick={() => setOpen(false)}
						>
							GitHub →
						</a>
					</motion.nav>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
