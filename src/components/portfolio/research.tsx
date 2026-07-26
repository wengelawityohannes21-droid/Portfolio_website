import Image from "next/image";
import { ArrowUpRight, FileDown, Microscope } from "lucide-react";
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
      className="section-padding relative z-10 overflow-hidden bg-[#eef4ef]/75 dark:bg-gray-950/75"
    >
      <div className="visual-grid pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="section-container">
        <SectionHeading
          eyebrow="Research notes"
          title="Questions under investigation"
          description="A living research desk—studies designed to turn observation into evidence, and evidence into action."
        />

        <div className="mx-auto max-w-6xl space-y-10">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="paper-texture relative overflow-hidden rounded-[0.3rem] border border-emerald-950/10 px-6 py-8 shadow-[0_30px_80px_rgba(21,55,35,0.11)] md:px-12 md:py-12 dark:border-white/10">
                <div className="absolute left-0 top-0 h-1 w-full bg-brand" />
                <div className="mb-10 flex flex-wrap items-start justify-between gap-5 border-b border-emerald-950/15 pb-6 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 text-brand">
                      <Microscope className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-400">
                        Research record
                      </p>
                      <p className="mt-1 font-mono text-xs text-ink dark:text-gray-200">
                        WY–{String(index + 1).padStart(2, "0")} / CURRENT STUDY
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 bg-white/70 px-3 py-2 font-mono text-[11px] uppercase tracking-wider dark:border-gray-700 dark:bg-gray-900/70">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.status.toLowerCase() === "ongoing"
                          ? "bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.15)]"
                          : "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.13)]"
                      }`}
                    />
                    {item.status}
                  </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
                      Title
                    </p>
                    <h3 className="mt-4 max-w-3xl font-serif text-3xl font-medium leading-tight tracking-[-0.03em] text-gray-950 md:text-5xl dark:text-white">
                      {item.title}
                    </h3>

                    {item.institution ? (
                      <p className="mt-5 text-sm italic text-gray-500 dark:text-gray-400">
                        {item.institution}
                      </p>
                    ) : null}

                    {item.abstract ? (
                      <div className="mt-10 border-l-2 border-brand/40 pl-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400">
                          Abstract
                        </p>
                        <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
                          {item.abstract}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <aside className="border-t border-emerald-950/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-white/10">
                    {item.imageUrl ? (
                      <div className="mb-8">
                        <div className="relative aspect-[4/3] overflow-hidden border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover grayscale-[20%]"
                            sizes="(max-width: 1024px) 100vw, 35vw"
                          />
                        </div>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-gray-400">
                          Figure {index + 1}. Study context
                        </p>
                      </div>
                    ) : null}

                    <div className="space-y-7">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                          Research area
                        </p>
                        <p className="mt-2 text-base font-semibold text-ink dark:text-white">
                          {item.keywords[0] || "Public Health Nutrition"}
                        </p>
                      </div>
                      {item.methods.length > 0 ? (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            Methods
                          </p>
                          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            {item.methods.join(" · ")}
                          </p>
                        </div>
                      ) : null}
                      {item.authors.length > 0 ? (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            Research team
                          </p>
                          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            {item.authors.join(" · ")}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </aside>
                </div>

                {(item.publicationLink || item.pdfUrl) && (
                  <div className="mt-10 flex flex-wrap gap-3 border-t border-emerald-950/15 pt-6 dark:border-white/10">
                    {item.publicationLink ? (
                      <a
                        href={item.publicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                      >
                        Open publication
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {item.pdfUrl ? (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-brand"
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        Research PDF
                      </a>
                    ) : null}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
