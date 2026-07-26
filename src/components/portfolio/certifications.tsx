import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { CertificationItem } from "@/types/portfolio";

type CertificationsProps = {
  items: CertificationItem[];
};

export function Certifications({ items }: CertificationsProps) {
  if (items.length === 0) return null;

  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning"
          description="Professional credentials across nutrition, leadership, digital tools, and marketing."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="card-surface flex h-full flex-col">
                {item.imageUrl ? (
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand/10">
                    <Award className="h-5 w-5" />
                  </div>
                )}

                <h3 className="text-base font-semibold text-ink dark:text-white">
                  {item.title}
                </h3>
                {item.issuer ? (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.issuer}
                  </p>
                ) : null}
                {item.issueDate ? (
                  <p className="mt-1 text-xs text-gray-500">{item.issueDate}</p>
                ) : null}

                {item.credentialUrl ? (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-brand hover:underline"
                  >
                    View credential
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
