import Image from "next/image";
import { HandHeart } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { formatDateLabel } from "@/lib/utils";
import type { VolunteerItem } from "@/types/portfolio";

type VolunteerProps = {
  items: VolunteerItem[];
};

function formatPeriod(item: VolunteerItem) {
  const start = formatDateLabel(item.startDate);
  const end = item.current ? "Present" : formatDateLabel(item.endDate);
  if (start && end) return `${start} — ${end}`;
  return end || start || "";
}

export function Volunteer({ items }: VolunteerProps) {
  if (items.length === 0) return null;

  return (
    <section id="volunteer" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Volunteer"
          title="Service to community"
          description="Volunteer leadership and mentorship across Rotaract, education, sports, and professional societies."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="card-surface flex h-full gap-4">
                {item.imageUrl ? (
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand/10">
                    <HandHeart className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold text-ink dark:text-white">
                    {item.title}
                  </h3>
                  {item.organization ? (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.organization}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs text-brand">{formatPeriod(item)}</p>
                  {item.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
