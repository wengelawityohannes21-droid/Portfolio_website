import Image from "next/image";
import { ExternalLink, Github, Star } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { ProjectItem } from "@/types/portfolio";

type ProjectsProps = {
  items: ProjectItem[];
};

export function Projects({ items }: ProjectsProps) {
  if (items.length === 0) return null;

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Work that creates impact"
          description="Entrepreneurial ventures and community platforms at the intersection of nutrition, data, and leadership."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="card-surface flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-white text-4xl font-semibold text-brand/30 dark:from-brand/10 dark:to-gray-900">
                      {item.title.charAt(0)}
                    </div>
                  )}
                  {item.featured ? (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand shadow-sm backdrop-blur dark:bg-gray-900/90">
                      <Star className="h-3 w-3 fill-brand" />
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink dark:text-white">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  ) : null}

                  {item.techStack.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {item.githubUrl ? (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    ) : null}
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
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
