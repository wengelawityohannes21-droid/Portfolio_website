"use client";

import { motion } from "framer-motion";
import { Leaf, Sprout } from "lucide-react";

export function GrowthManifesto() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0b2117] py-24 text-white md:py-36">
      <div className="visual-grid absolute inset-0 opacity-20" />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: [0, 7, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 top-12 text-emerald-300/10"
      >
        <Leaf className="h-52 w-52" strokeWidth={0.6} />
      </motion.div>

      <div className="section-container relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-300"
        >
          <Sprout className="h-6 w-6" />
        </motion.div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/70">
          The philosophy behind the work
        </p>
        <h2 className="mx-auto mt-6 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl md:text-8xl">
          I nourish.
          <br />
          I build.
          <br />
          <span className="text-emerald-300">I grow.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-emerald-50/65 md:text-lg">
          From evidence to organizations, and from young ideas to resilient
          systems—every project begins with care and grows through collective
          action.
        </p>
      </div>
    </section>
  );
}
