import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { isSectionVisible } from "@/lib/sections";
import type { ProfileData, SiteSettingsData } from "@/types/portfolio";

type FooterProps = {
  profile: ProfileData;
  settings: SiteSettingsData;
};

export function Footer({ profile, settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="section-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-white">
              {settings.siteName}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {profile.headline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "#about", label: "About", key: "about" },
                { href: "#projects", label: "Projects", key: "projects" },
                { href: "#contact", label: "Contact", key: "contact" },
                { href: "/blog", label: "Blog", key: "blog" },
              ]
                .filter((link) => isSectionVisible(settings.visibleSections, link.key))
                .map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 transition-colors hover:text-brand dark:text-gray-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Connect
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {profile.email ? (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-brand dark:text-gray-400"
                  >
                    {profile.email}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ) : null}
              {profile.linkedinUrl ? (
                <li>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-brand dark:text-gray-400"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ) : null}
              {profile.location ? (
                <li className="text-gray-600 dark:text-gray-400">
                  {profile.location}
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-gray-800 md:flex-row">
          <p>
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1">
            Built with care using Next.js
            <Heart className="h-3.5 w-3.5 fill-brand text-brand" />
          </p>
        </div>
      </div>
    </footer>
  );
}
