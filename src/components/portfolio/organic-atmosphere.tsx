"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const spores = [
  { left: "8%", top: "24%", size: 6, duration: 10, delay: 0 },
  { left: "18%", top: "72%", size: 4, duration: 13, delay: 2 },
  { left: "76%", top: "18%", size: 5, duration: 11, delay: 1 },
  { left: "88%", top: "62%", size: 7, duration: 15, delay: 3 },
  { left: "58%", top: "82%", size: 4, duration: 12, delay: 4 },
];

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
      <motion.div
        style={{ x: farX, y }}
        animate={
          prefersReducedMotion
            ? undefined
            : { rotate: [0, 12, 0], borderRadius: ["44% 56% 62% 38%", "58% 42% 39% 61%", "44% 56% 62% 38%"] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[9%] h-44 w-32 border border-brand/10 bg-white/10 backdrop-blur-sm dark:border-emerald-300/10"
      />
      {spores.map((spore, index) => (
        <motion.span
          key={`${spore.left}-${spore.top}`}
          style={{
            left: spore.left,
            top: spore.top,
            width: spore.size,
            height: spore.size,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -26, 0],
                  x: [0, index % 2 ? 10 : -10, 0],
                  opacity: [0.15, 0.55, 0.15],
                  scale: [0.8, 1.35, 0.8],
                }
          }
          transition={{
            duration: spore.duration,
            delay: spore.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-brand/50 shadow-[0_0_18px_rgba(22,163,74,0.35)]"
        />
      ))}
      <div className="organic-noise absolute inset-0 opacity-[0.035] dark:opacity-[0.025]" />
    </div>
  );
}
