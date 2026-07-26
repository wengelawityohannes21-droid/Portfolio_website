import Image from "next/image";
import { ArrowUpRight, Github, Sprout } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { ProjectItem } from "@/types/portfolio";

type ProjectsProps = {
  items: ProjectItem[];
};

export function Projects({ items }: ProjectsProps) {
  if (items.length === 0) return null;

  return (
    <section id="projects" className="section-padding relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full border border-brand/10" />
      <div className="pointer-events-none absolute -left-16 top-48 h-44 w-44 rounded-full border border-brand/10" />
      <div className="section-container">
        <SectionHeading
          eyebrow="The work"
          title="🌾 Seeds I’m Growing"
          description="Ideas are not finished products. These are living ventures—planted with intention, strengthened through collaboration, and cultivated for lasting impact."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="living-glass group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-2 transition-all duration-500 hover:-translate-y-3 hover:rotate-[0.2deg]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-[#e9f4eb] dark:bg-gray-800">
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Sprout className="h-16 w-16 text-brand/30" strokeWidth={1} />
                    </div>
                  )}
                  <div className="image-veil opacity-60" />
                  <span className="absolute right-4 top-4 font-mono text-xs tracking-[0.2em] text-white/75">
                    SEED / {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.featured ? (
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#0d1f17]/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-100 backdrop-blur-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Cultivating now
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5 pb-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-brand/20" />
                    <Sprout className="h-4 w-4 text-brand" />
                    <span className="h-px flex-1 bg-brand/20" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-ink dark:text-white">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-3 flex-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  ) : null}

                  {item.techStack.length > 0 ? (
                    <div className="mt-6">
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">
                        What feeds this seed
                      </p>
                      <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-brand/10 bg-brand-50/70 px-2.5 py-1 text-xs text-brand-800 dark:bg-brand/10 dark:text-brand-200"
                        >
                          {tech}
                        </span>
                      ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200/70 pt-5 dark:border-gray-800">
                    {item.githubUrl ? (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-brand"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    ) : null}
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                      >
                        Explore
                        <ArrowUpRight className="h-3.5 w-3.5" />
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
