import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { cn, formatDateLabel } from "@/lib/utils";
import type { EducationItem } from "@/types/portfolio";

type EducationProps = {
  items: EducationItem[];
};

function formatPeriod(item: EducationItem) {
  const start = formatDateLabel(item.startDate);
  const end = item.current ? "Present" : formatDateLabel(item.endDate);
  if (start && end) return `${start} — ${end}`;
  return end || start || "";
}

export function Education({ items }: EducationProps) {
  if (items.length === 0) return null;

  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="Building interdisciplinary expertise across nutrition science and strategic business."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-brand/60 via-brand/20 to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <div
                  className={cn(
                    "relative grid gap-6 md:grid-cols-2 md:gap-12",
                    index % 2 === 1 && "md:[&>div:first-child]:order-2"
                  )}
                >
                  <div className="hidden md:block" />
                  <div className="relative pl-12 md:pl-0">
                    <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-white text-brand shadow-soft dark:bg-gray-900 md:left-1/2 md:-translate-x-1/2">
                      <GraduationCap className="h-4 w-4" />
                    </span>

                    <div className="card-surface overflow-hidden p-0">
                      {item.imageUrl ? (
                        <div className="relative aspect-[16/8] overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.institution}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="image-veil" />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <p className="text-sm font-medium text-brand">
                          {formatPeriod(item)}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-ink dark:text-white">
                          {item.degree}
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          {item.institution}
                          {item.field ? ` · ${item.field}` : ""}
                        </p>
                        {item.description ? (
                          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        ) : null}
                        {item.achievements.length > 0 ? (
                          <ul className="mt-4 space-y-2">
                            {item.achievements.map((achievement) => (
                              <li
                                key={achievement}
                                className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
