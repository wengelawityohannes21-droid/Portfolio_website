import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { BlogPostItem } from "@/types/portfolio";

type BlogPreviewProps = {
  posts: BlogPostItem[];
};

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  const featured = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="section-padding bg-white/45 backdrop-blur-[2px] dark:bg-gray-900/35"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Blog"
          title="Thoughts & reflections"
          description="Writing on nutrition, youth leadership, food systems, and community impact."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <article className="card-surface flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-white text-brand/40 dark:from-brand/10 dark:to-gray-900">
                      <span className="text-4xl font-semibold">W</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {post.publishedAt ? (
                    <p className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(post.publishedAt), "MMM d, yyyy")}
                    </p>
                  ) : null}

                  <h3 className="mt-3 text-lg font-semibold text-ink dark:text-white">
                    {post.title}
                  </h3>

                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  ) : null}

                  {post.categories.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {posts.length > 3 ? (
          <div className="mt-10 text-center">
            <Link href="/blog" className="btn-secondary">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
