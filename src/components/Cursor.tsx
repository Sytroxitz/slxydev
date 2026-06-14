import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./Cursor.css";

/**
 * A soft glowing dot that trails the pointer, with a larger ring that
 * grows when hovering interactive elements. Only enabled on fine pointers.
 */
export default function Cursor()
{
	const [enabled, setEnabled] = useState(false);
	const [hovering, setHovering] = useState(false);

	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
	const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

	useEffect(() => {
		const fine =
			window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		if (!fine) return;

		setEnabled(true);
		document.body.classList.add("has-cursor");

		const move = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
			const target = e.target as HTMLElement;
			setHovering(
				!!target.closest("a, button, [data-hover]")
			);
		};

		window.addEventListener("mousemove", move);
		return () => {
			window.removeEventListener("mousemove", move);
			document.body.classList.remove("has-cursor");
		};
	}, [x, y]);

	if (!enabled) return null;

	return (
		<>
			<motion.div className="cursor-dot" style={{ x, y }} />
			<motion.div
				className="cursor-ring"
				style={{ x: ringX, y: ringY }}
				animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.5 }}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
			/>
		</>
	);
}
