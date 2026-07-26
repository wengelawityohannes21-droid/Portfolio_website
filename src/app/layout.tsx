import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultSiteName = "Wengelawit Yohannes";
const defaultDescription =
  "Portfolio of Wengelawit Yohannes — Nutrition researcher, youth leader, and entrepreneur.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: `${defaultSiteName} | Portfolio`,
    template: `%s | ${defaultSiteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Wengelawit Yohannes",
    "nutrition",
    "research",
    "portfolio",
    "Ethiopia",
    "youth leadership",
  ],
  authors: [{ name: defaultSiteName }],
  creator: defaultSiteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: defaultSiteName,
    title: defaultSiteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteName,
    description: defaultDescription,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
};

async function getLayoutDefaults() {
  try {
    const [profile, settings] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.siteSettings.findFirst(),
    ]);

    return {
      siteName: settings?.siteName || profile?.fullName || defaultSiteName,
      siteUrl: settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      description:
        settings?.seoDescription ||
        profile?.tagline ||
        profile?.headline ||
        defaultDescription,
      darkModeDefault: settings?.darkModeDefault ?? false,
      profile: profile
        ? {
            fullName: profile.fullName,
            headline: profile.headline,
            email: profile.email,
            photoUrl: profile.photoUrl,
            linkedinUrl: profile.linkedinUrl,
            githubUrl: profile.githubUrl,
            websiteUrl: profile.websiteUrl,
          }
        : null,
    };
  } catch {
    return {
      siteName: defaultSiteName,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      description: defaultDescription,
      darkModeDefault: false,
      profile: null,
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteName, siteUrl, description, darkModeDefault, profile } =
    await getLayoutDefaults();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description,
        inLanguage: "en-US",
      },
      ...(profile
        ? [
            {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: profile.fullName,
              url: siteUrl,
              email: profile.email,
              image: profile.photoUrl || undefined,
              jobTitle: profile.headline,
              sameAs: [
                profile.linkedinUrl,
                profile.githubUrl,
                profile.websiteUrl,
              ].filter(Boolean),
            },
          ]
        : []),
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider defaultTheme={darkModeDefault ? "dark" : "light"}>
          <QueryProvider>
            <SessionProvider>
              {children}
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  classNames: {
                    toast:
                      "rounded-xl border border-gray-200 bg-white shadow-card dark:border-gray-700 dark:bg-gray-900",
                  },
                }}
              />
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
