import { socials } from "../data/site";
import "./Footer.css";

export default function Footer()
{
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<div className="container footer__inner">
				<a href="#top" className="footer__logo">
					<span className="gradient-text">slxy</span>.dev
				</a>

				<p className="footer__meta">
					© {year} $lxy Txz · Built with React, TypeScript & Framer Motion.
				</p>

				<div className="footer__socials">
					{socials.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noreferrer"
							aria-label={s.label}
							data-hover
						>
							<s.icon />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
