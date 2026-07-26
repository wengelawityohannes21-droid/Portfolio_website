import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/portfolio-data";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [posts, settings] = await Promise.all([
    getBlogPosts(),
    prisma.siteSettings.findFirst(),
  ]);

  const siteUrl = settings?.siteUrl || baseUrl;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
