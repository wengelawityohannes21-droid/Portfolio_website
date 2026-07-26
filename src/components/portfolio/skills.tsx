"use client";

import Image from "next/image";
import {
  Atom,
  BrainCircuit,
  ChartNoAxesCombined,
  Megaphone,
  Palette,
  Sparkles,
  Users,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { SkillCategoryItem } from "@/types/portfolio";

type SkillsProps = {
  categories: SkillCategoryItem[];
};

const CATEGORY_ICONS: Array<{ terms: string[]; icon: LucideIcon }> = [
  { terms: ["nutrition", "food", "agriculture"], icon: Wheat },
  { terms: ["research", "science"], icon: Atom },
  { terms: ["data", "analysis"], icon: ChartNoAxesCombined },
  { terms: ["leadership", "community"], icon: Users },
  { terms: ["programming", "ai", "technology"], icon: BrainCircuit },
  { terms: ["design", "creative"], icon: Palette },
  { terms: ["marketing", "business"], icon: Megaphone },
];

function getCategoryIcon(name: string) {
  const normalized = name.toLowerCase();
  return (
    CATEGORY_ICONS.find(({ terms }) => terms.some((term) => normalized.includes(term)))?.icon ??
    Sparkles
  );
}

export function Skills({ categories }: SkillsProps) {
  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-[#0d1f17] text-white"
    >
      <div className="visual-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-emerald-300/10" />
      <div className="pointer-events-none absolute -right-8 top-32 h-40 w-40 rounded-full border border-emerald-300/10" />

      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="A multidisciplinary toolkit"
          description="Research rigor, human-centered leadership, and digital fluency—organized by the ways I create impact, not arbitrary percentages."
          className="[&_h2]:text-white [&>p]:text-emerald-50/70"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, categoryIndex) => (
            <Reveal key={category.id} delay={categoryIndex * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm"
              >
                <div className="relative min-h-56 overflow-hidden rounded-[1.5rem] bg-white/[0.04] p-6">
                  {category.imageUrl ? (
                    <>
                      <Image
                        src={category.imageUrl}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover opacity-25 transition duration-700 group-hover:scale-105 group-hover:opacity-35"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[#0d1f17]/70" />
                    </>
                  ) : null}

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                        {(() => {
                          const Icon = getCategoryIcon(category.name);
                          return <Icon className="h-5 w-5" />;
                        })()}
                      </div>
                      <span className="font-mono text-xs tracking-[0.2em] text-white/30">
                        {String(categoryIndex + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-white">
                      {category.name}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.92 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.05 + skillIndex * 0.035,
                          }}
                          className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-sm text-emerald-50/85 transition-colors hover:border-emerald-300/30 hover:bg-emerald-300/10 hover:text-white"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
