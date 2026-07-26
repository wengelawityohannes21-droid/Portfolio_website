import { Briefcase } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { formatDateLabel } from "@/lib/utils";
import type { ExperienceItem } from "@/types/portfolio";

type ExperienceProps = {
  items: ExperienceItem[];
};

function formatPeriod(item: ExperienceItem) {
  const start = formatDateLabel(item.startDate);
  const end = item.current ? "Present" : formatDateLabel(item.endDate);
  if (start && end) return `${start} — ${end}`;
  return end || start || "";
}

export function Experience({ items }: ExperienceProps) {
  if (items.length === 0) return null;

  return (
    <section
      id="experience"
      className="section-padding bg-white dark:bg-gray-900/50"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional journey"
          description="Clinical practice, public health research, and entrepreneurial leadership across nutrition and agriculture."
        />

        <div className="relative mx-auto max-w-4xl space-y-8">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-brand/60 via-brand/20 to-transparent" />

          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <div className="relative pl-12">
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-white text-brand shadow-soft dark:bg-gray-900">
                  <Briefcase className="h-4 w-4" />
                </span>

                <div className="card-surface">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-ink dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {item.organization}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand dark:bg-brand/10">
                      {formatPeriod(item)}
                    </span>
                  </div>

                  {item.description ? (
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  ) : null}

                  {item.responsibilities.length > 0 ? (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-ink dark:text-white">
                        Responsibilities
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {item.responsibilities.map((entry) => (
                          <li
                            key={entry}
                            className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {item.achievements.length > 0 ? (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-ink dark:text-white">
                        Achievements
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {item.achievements.map((entry) => (
                          <li
                            key={entry}
                            className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
