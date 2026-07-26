"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { SkillCategoryItem } from "@/types/portfolio";

type SkillsProps = {
  categories: SkillCategoryItem[];
};

function SkillBar({
  name,
  proficiency,
  delay,
}: {
  name: string;
  proficiency: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink dark:text-white">{name}</span>
        <span className="tabular-nums text-gray-500 dark:text-gray-400">
          {proficiency}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${proficiency}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-400"
        />
      </div>
    </div>
  );
}

export function Skills({ categories }: SkillsProps) {
  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      className="section-padding bg-white dark:bg-gray-900/50"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Capabilities across disciplines"
          description="A blend of nutrition science, research methods, leadership, and digital fluency."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <Reveal key={category.id} delay={categoryIndex * 0.08}>
              <div className="card-surface h-full">
                <h3 className="text-lg font-semibold text-ink dark:text-white">
                  {category.name}
                </h3>
                <div className="mt-6 space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.id}
                      name={skill.name}
                      proficiency={skill.proficiency}
                      delay={categoryIndex * 0.08 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
