"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { TestimonialItem } from "@/types/portfolio";

type TestimonialsProps = {
  items: TestimonialItem[];
};

export function Testimonials({ items }: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What collaborators say"
          description="Recommendations from mentors, partners, and collaborators."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="card-surface relative flex h-full flex-col">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-brand/20" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-4 w-4 ${
                        starIndex < item.rating
                          ? "fill-brand text-brand"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  “{item.content}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                  {item.avatarUrl ? (
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand dark:bg-brand/10">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {[item.role, item.company].filter(Boolean).join(" · ")}
                    </p>
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
