"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, CircleDot, Leaf, Sprout } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { formatDateLabel } from "@/lib/utils";
import type {
  EducationItem,
  ExperienceItem,
  LeadershipItem,
} from "@/types/portfolio";

type GrowthJourneyProps = {
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  showEducation: boolean;
  showExperience: boolean;
  showLeadership: boolean;
};

type JourneyCard = {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string | null;
  imageUrl: string | null;
};

function period(startDate: string | null, endDate: string | null, current: boolean) {
  const start = formatDateLabel(startDate);
  const end = current ? "Present" : formatDateLabel(endDate);
  if (start && end) return `${start} — ${end}`;
  return end || start || "";
}

function JourneyCards({ items }: { items: JourneyCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={index * 0.06}>
          <motion.article
            whileHover={{ y: -7, rotate: index % 2 === 0 ? -0.35 : 0.35 }}
            transition={{ duration: 0.25 }}
            className="living-glass group h-full overflow-hidden rounded-[1.75rem]"
          >
            {item.imageUrl ? (
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.organization}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="image-veil opacity-55" />
              </div>
            ) : null}
            <div className="p-6">
              {item.period ? (
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                  {item.period}
                </p>
              ) : null}
              <h4 className="mt-3 text-lg font-semibold tracking-tight text-ink dark:text-white">
                {item.title}
              </h4>
              <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.organization}
              </p>
              {item.description ? (
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              ) : null}
            </div>
          </motion.article>
        </Reveal>
      ))}
    </div>
  );
}

export function GrowthJourney({
  education,
  experience,
  leadership,
  showEducation,
  showExperience,
  showLeadership,
}: GrowthJourneyProps) {
  const stages = [
    showEducation && education.length
      ? {
          id: "education",
          number: "01",
          label: "Roots",
          title: "Where knowledge took root",
          description:
            "The academic soil that shaped my thinking across nutrition, food systems, and strategy.",
          icon: BookOpen,
          items: education.map((item) => ({
            id: item.id,
            title: item.degree,
            organization: [item.institution, item.field].filter(Boolean).join(" · "),
            period: period(item.startDate, item.endDate, item.current),
            description: item.description,
            imageUrl: item.imageUrl,
          })),
        }
      : null,
    showExperience && experience.length
      ? {
          id: "experience",
          number: "02",
          label: "Stem",
          title: "Turning learning into practice",
          description:
            "Research, public health, and entrepreneurial work translated into real-world contribution.",
          icon: BriefcaseBusiness,
          items: experience.map((item) => ({
            id: item.id,
            title: item.title,
            organization: [item.organization, item.location].filter(Boolean).join(" · "),
            period: period(item.startDate, item.endDate, item.current),
            description: item.description,
            imageUrl: item.imageUrl,
          })),
        }
      : null,
    showLeadership && leadership.length
      ? {
          id: "leadership",
          number: "03",
          label: "Canopy",
          title: "Creating room for others to grow",
          description:
            "Organizations, coalitions, and student communities built through shared purpose.",
          icon: Leaf,
          items: leadership.map((item) => ({
            id: item.id,
            title: item.title,
            organization: item.organization,
            period: period(item.startDate, item.endDate, item.current),
            description: item.description,
            imageUrl: item.imageUrl,
          })),
        }
      : null,
  ].filter(Boolean) as Array<{
    id: string;
    number: string;
    label: string;
    title: string;
    description: string;
    icon: typeof BookOpen;
    items: JourneyCard[];
  }>;

  if (stages.length === 0) return null;

  return (
    <section id="journey" className="section-padding relative z-10 overflow-hidden">
      <div className="section-container">
        <SectionHeading
          eyebrow="My journey"
          title="A life still growing"
          description="Not a résumé timeline—a living journey from roots of knowledge to branches of collective impact."
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-10 left-5 top-10 w-px bg-brand/10 lg:left-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="h-full w-0.5 origin-bottom bg-gradient-to-t from-amber-700/50 via-brand/70 to-emerald-300"
            />
          </div>
          <div className="absolute bottom-0 left-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-amber-700/20 bg-amber-50 text-amber-800 lg:left-1/2 lg:-translate-x-1/2 dark:bg-amber-950">
            <CircleDot className="h-3.5 w-3.5" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-4 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-card lg:left-1/2 lg:-translate-x-1/2"
          >
            <Sprout className="h-5 w-5" />
          </motion.div>

          <div className="space-y-24 py-16 md:space-y-32">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const copyOnLeft = index % 2 === 0;
              return (
                <div
                  id={stage.id}
                  key={stage.id}
                  className="relative grid gap-8 pl-14 lg:grid-cols-2 lg:gap-20 lg:pl-0"
                >
                  <span className="absolute left-1.5 top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-canvas bg-brand text-white shadow-soft lg:left-1/2 lg:-translate-x-1/2 dark:border-gray-900">
                    <Icon className="h-3 w-3" />
                  </span>

                  <Reveal
                    direction={copyOnLeft ? "right" : "left"}
                    className={copyOnLeft ? "" : "lg:order-2"}
                  >
                    <div className={copyOnLeft ? "lg:text-right" : ""}>
                      <p className="font-mono text-xs tracking-[0.2em] text-brand">
                        {stage.number} / {stage.label.toUpperCase()}
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-ink md:text-4xl dark:text-white">
                        {stage.title}
                      </h3>
                      <p
                        className={`mt-4 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400 ${
                          copyOnLeft ? "lg:ml-auto" : ""
                        }`}
                      >
                        {stage.description}
                      </p>
                    </div>
                  </Reveal>

                  <div className={copyOnLeft ? "" : "lg:order-1"}>
                    <JourneyCards items={stage.items} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
