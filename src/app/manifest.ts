import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await prisma.siteSettings.findFirst();

  return {
    name: settings?.siteName || "Wengelawit Yohannes",
    short_name: "Wengelawit",
    description:
      settings?.seoDescription ||
      "Portfolio of Wengelawit Yohannes — Nutrition researcher and youth leader.",
    start_url: "/",
    display: "standalone",
    background_color: settings?.backgroundColor || "#F9FAFB",
    theme_color: settings?.primaryColor || "#16A34A",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
