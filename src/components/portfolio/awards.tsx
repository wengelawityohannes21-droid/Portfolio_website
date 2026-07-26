import { Trophy } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { AwardItem } from "@/types/portfolio";

type AwardsProps = {
  items: AwardItem[];
};

export function Awards({ items }: AwardsProps) {
  if (items.length === 0) return null;

  return (
    <section
      id="awards"
      className="section-padding bg-white dark:bg-gray-900/50"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Awards"
          title="Recognition & milestones"
          description="Honors that reflect entrepreneurial ambition and community contribution."
        />

        <div className="mx-auto grid max-w-4xl gap-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="card-surface flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand/10">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink dark:text-white">
                    {item.title}
                  </h3>
                  {item.issuer ? (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.issuer}
                      {item.date ? ` · ${item.date}` : ""}
                    </p>
                  ) : null}
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
