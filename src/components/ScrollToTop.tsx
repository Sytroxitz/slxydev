import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import "./ScrollToTop.css";

/** A floating "back to top" button that fades in once the user has scrolled
 *  down a bit, then smooth-scrolls to the top of the page. */
export default function ScrollToTop()
{
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const toTop = () => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					className="scroll-top"
					onClick={toTop}
					aria-label="Scroll to top"
					data-hover
					initial={{ opacity: 0, scale: 0.8, y: 12 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 12 }}
					transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
				>
					<FiArrowUp aria-hidden focusable="false" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
