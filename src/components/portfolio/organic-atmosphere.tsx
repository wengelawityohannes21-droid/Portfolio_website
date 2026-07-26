"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export function OrganicAtmosphere() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 35, damping: 18 });
  const y = useSpring(pointerY, { stiffness: 35, damping: 18 });
  const farX = useTransform(x, (value) => value * -0.55);
  const farY = useTransform(y, (value) => value * -0.55);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 48);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 48);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ x, y }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-[12%] h-96 w-96 rounded-full bg-emerald-300/20 blur-[110px] dark:bg-emerald-500/10"
      />
      <motion.div
        style={{ x: farX, y: farY }}
        animate={prefersReducedMotion ? undefined : { scale: [1.08, 1, 1.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 top-[38%] h-[34rem] w-[34rem] rounded-full bg-lime-200/20 blur-[130px] dark:bg-lime-400/[0.07]"
      />
      <motion.div
        style={{ x, y: farY }}
        className="absolute bottom-[4%] left-[28%] h-80 w-80 rounded-full bg-amber-100/25 blur-[110px] dark:bg-amber-300/[0.06]"
      />
      <div className="organic-noise absolute inset-0 opacity-[0.035] dark:opacity-[0.025]" />
    </div>
  );
}
