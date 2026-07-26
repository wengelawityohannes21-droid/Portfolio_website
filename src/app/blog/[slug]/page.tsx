import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getBlogPostBySlug } from "@/lib/portfolio-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    keywords: post.seoKeywords?.split(",").map((k) => k.trim()),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.ogImage || post.coverImage ? [{ url: (post.ogImage || post.coverImage)! }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    image: post.coverImage,
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="section-container flex h-16 items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand dark:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </header>

      <main className="section-container section-padding">
        <article className="mx-auto max-w-3xl">
          {post.coverImage ? (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="768px"
              />
            </div>
          ) : null}

          {post.publishedAt ? (
            <p className="inline-flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </p>
          ) : null}

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink dark:text-white md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>
          ) : null}

          {(post.categories.length > 0 || post.tags.length > 0) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {[...post.categories, ...post.tags].map((label) => (
                <span
                  key={label}
                  className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose-portfolio mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}
