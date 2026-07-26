import Image from "next/image";
import { ExternalLink, FileText, FlaskConical } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { ResearchItem } from "@/types/portfolio";

type ResearchProps = {
  items: ResearchItem[];
};

export function Research({ items }: ResearchProps) {
  if (items.length === 0) return null;

  return (
    <section
      id="research"
      className="section-padding bg-white dark:bg-gray-900/50"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Research"
          title="Evidence that informs action"
          description="Applied research across rural nutrition, public health, and agricultural intelligence."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="card-surface flex h-full flex-col overflow-hidden p-0">
                {item.imageUrl ? (
                  <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-50 to-white dark:from-brand/10 dark:to-gray-900">
                    <FlaskConical className="h-10 w-10 text-brand/60" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand dark:bg-brand/10">
                      {item.status}
                    </span>
                    {item.featured ? (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-ink dark:text-white">
                    {item.title}
                  </h3>

                  {item.institution ? (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.institution}
                    </p>
                  ) : null}

                  {item.abstract ? (
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.abstract}
                    </p>
                  ) : null}

                  {item.authors.length > 0 ? (
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                      {item.authors.join(" · ")}
                    </p>
                  ) : null}

                  {item.keywords.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {item.publicationLink ? (
                      <a
                        href={item.publicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Publication
                      </a>
                    ) : null}
                    {item.pdfUrl ? (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Download PDF
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
