import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolio-data";
import { HomePage } from "@/components/portfolio/home-page";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const { profile, settings } = data;

  return {
    title: settings.seoTitle || `${profile.fullName} | Portfolio`,
    description:
      settings.seoDescription ||
      profile.tagline ||
      profile.headline,
    keywords: settings.seoKeywords?.split(",").map((k) => k.trim()),
    openGraph: {
      title: settings.seoTitle || profile.fullName,
      description: settings.seoDescription || profile.headline,
      url: settings.siteUrl,
      siteName: settings.siteName,
      images: settings.ogImage ? [{ url: settings.ogImage }] : undefined,
    },
    alternates: {
      canonical: settings.siteUrl,
    },
  };
}

export default async function Page() {
  const data = await getPortfolioData();
  return <HomePage data={data} />;
}
