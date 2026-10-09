"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useVariants } from "../utils/hooks";

/* Trailing cursor: instant dot + spring ring. Desktop only. */
function CustomCursor() {
  const { variant } = useVariants();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 22, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest?.("a, button, [data-cursor]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const isProject = variant === "PROJECT";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] grid place-items-center rounded-full border border-primary/50 bg-primary/10 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isProject ? 88 : hovering ? 52 : 32,
          height: isProject ? 88 : hovering ? 52 : 32,
          opacity: 1,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      >
        {isProject && (
          <span className="text-[11px] font-bold tracking-widest text-primary">
            VIEW
          </span>
        )}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full bg-primary mix-blend-screen"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pressed ? 4 : 8,
          height: pressed ? 4 : 8,
          opacity: 0.9,
        }}
      />
    </>
  );
}

export default CustomCursor;
