import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getBlogPosts } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and reflections on nutrition, youth leadership, food systems, and community impact.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-canvas dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="section-container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand dark:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <span className="text-sm font-semibold text-ink dark:text-white">
            Blog
          </span>
        </div>
      </header>

      <main className="section-container section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Articles
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink dark:text-white">
            Insights & reflections
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Writing on nutrition science, leadership, entrepreneurship, and
            community impact.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {posts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No published articles yet.
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="card-surface flex h-full flex-col overflow-hidden p-0"
              >
                <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.publishedAt ? (
                    <p className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(post.publishedAt), "MMM d, yyyy")}
                    </p>
                  ) : null}
                  <h2 className="mt-3 text-xl font-semibold text-ink dark:text-white">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-brand"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 text-sm font-medium text-brand hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
