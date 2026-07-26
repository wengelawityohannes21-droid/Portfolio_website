import Image from "next/image";
import { Crown } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { formatDateLabel } from "@/lib/utils";
import type { LeadershipItem } from "@/types/portfolio";

type LeadershipProps = {
  items: LeadershipItem[];
};

function formatPeriod(item: LeadershipItem) {
  const start = formatDateLabel(item.startDate);
  const end = item.current ? "Present" : formatDateLabel(item.endDate);
  if (start && end) return `${start} — ${end}`;
  return end || start || "";
}

export function Leadership({ items }: LeadershipProps) {
  if (items.length === 0) return null;

  return (
    <section id="leadership" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Leadership"
          title="Leading with purpose"
          description="Founding and coordinating youth-led nutrition initiatives from campus to continent."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="card-surface flex h-full flex-col">
                {item.imageUrl ? (
                  <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.organization} leadership`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="image-veil opacity-50" />
                  </div>
                ) : null}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand/10">
                    <Crown className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {formatPeriod(item)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.organization}
                </p>

                {item.description ? (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                ) : null}

                {item.achievements.length > 0 ? (
                  <ul className="mt-5 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
