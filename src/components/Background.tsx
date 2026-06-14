import { motion } from "framer-motion";
import "./Background.css";

/**
 * Layered ambient background:
 *  - two slowly drifting gradient "auroras" in the brand colours
 *  - a faint dot-grid
 *  - a subtle noise/grain overlay
 * All purely decorative and pointer-events: none.
 */
export default function Background()
{
	return (
		<div className="bg" aria-hidden="true">
			<motion.div
				className="bg-blob blob-pink"
				animate={{
					x: [0, 80, -40, 0],
					y: [0, -60, 40, 0],
					scale: [1, 1.15, 0.95, 1],
				}}
				transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="bg-blob blob-purple"
				animate={{
					x: [0, -70, 50, 0],
					y: [0, 50, -50, 0],
					scale: [1, 0.9, 1.2, 1],
				}}
				transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="bg-blob blob-violet"
				animate={{
					x: [0, 40, -60, 0],
					y: [0, -40, 30, 0],
				}}
				transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
			/>
			<div className="bg-grid" />
			<div className="bg-noise" />
			<div className="bg-vignette" />
		</div>
	);
}
