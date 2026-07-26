"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { GalleryItemData } from "@/types/portfolio";

type GalleryProps = {
  items: GalleryItemData[];
};

export function Gallery({ items }: GalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      id="gallery"
      className="section-padding bg-white dark:bg-gray-900/50"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments & milestones"
          description="Professional portraits, conferences, community work, and research in the field."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setActiveItem(item)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 text-left shadow-soft transition-all hover:shadow-card dark:border-gray-800 dark:bg-gray-800"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  {item.category ? (
                    <p className="mt-1 text-xs text-white/80">{item.category}</p>
                  ) : null}
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-ink opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-900/90 dark:text-white">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close gallery preview"
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink dark:text-white">
                  {activeItem.title}
                </h3>
                {activeItem.description ? (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {activeItem.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
