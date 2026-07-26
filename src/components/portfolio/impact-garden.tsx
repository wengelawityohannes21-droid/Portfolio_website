"use client";

import {
  Building2,
  FlaskConical,
  Lightbulb,
  Rocket,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/portfolio/animated-counter";
import { Reveal } from "@/components/portfolio/reveal";

type ImpactStat = {
  value: number;
  suffix?: string;
  minimumDigits?: number;
  label: string;
  detail: string;
  icon: LucideIcon;
};

const IMPACT_STATS: ImpactStat[] = [
  {
    value: 1,
    label: "Research project",
    detail: "Evidence in motion",
    icon: FlaskConical,
    minimumDigits: 2,
  },
  {
    value: 2,
    label: "Organizations founded",
    detail: "Platforms for change",
    icon: Building2,
    minimumDigits: 2,
  },
  {
    value: 5,
    suffix: "+",
    label: "Leadership experiences",
    detail: "Teams moved forward",
    icon: Sprout,
    minimumDigits: 2,
  },
  {
    value: 10,
    suffix: "+",
    label: "Projects supported",
    detail: "Ideas strengthened",
    icon: Lightbulb,
  },
  {
    value: 100,
    suffix: "+",
    label: "Students & communities",
    detail: "People reached",
    icon: Users,
  },
  {
    value: 2,
    label: "Startups",
    detail: "New systems growing",
    icon: Rocket,
  },
];

export function ImpactGarden() {
  return (
    <section className="relative z-10 overflow-hidden py-12 md:py-20">
      <div className="section-container">
        <Reveal>
          <div className="living-glass relative overflow-hidden rounded-[2.5rem] p-6 md:p-10">
            <div className="absolute inset-x-10 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent lg:block" />

            <div className="mb-10 grid items-end gap-4 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                  Impact garden
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-ink md:text-5xl dark:text-white">
                  Growth you can measure.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-gray-500 md:text-right dark:text-gray-400">
                Each number is a living system—research, people, and ideas growing
                stronger together.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {IMPACT_STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.07, duration: 0.5 }}
                    className="group relative rounded-3xl border border-brand/10 bg-white/70 p-5 transition-all hover:-translate-y-2 hover:border-brand/25 hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900"
                  >
                    <Icon className="h-5 w-5 text-brand/70 transition-transform group-hover:-rotate-6 group-hover:scale-110" />
                    <div className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-ink dark:text-white">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        minimumDigits={stat.minimumDigits}
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-tight text-ink dark:text-white">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{stat.detail}</p>
                    <span className="absolute bottom-0 left-1/2 h-2 w-px bg-brand/25 transition-all group-hover:h-5" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
