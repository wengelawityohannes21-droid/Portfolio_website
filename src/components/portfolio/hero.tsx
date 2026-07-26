"use client";

import Image from "next/image";
import { ChevronDown, Download, Mail } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { TypingEffect } from "@/components/portfolio/typing-effect";
import type { ProfileData, SiteSettingsData } from "@/types/portfolio";

type HeroProps = {
  profile: ProfileData;
  settings: SiteSettingsData;
};

export function Hero({ profile, settings }: HeroProps) {
  const cvUrl = profile.cvUrl || settings.resumeUrl;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl dark:bg-brand/5" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-200/50 blur-3xl dark:bg-gray-800/40" />
      </div>

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand">
                Portfolio
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl md:text-6xl">
                {profile.fullName}
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                {profile.headline}
              </p>
              <div className="mt-6 min-h-[2rem] text-base font-medium text-brand md:text-lg">
                <TypingEffect phrases={profile.typingPhrases} />
              </div>
              {profile.tagline ? (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {profile.tagline}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {cvUrl ? (
                  <a href={cvUrl} download className="btn-primary">
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                ) : null}
                <a href="#contact" className="btn-secondary">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} direction="right">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-brand/10 blur-2xl dark:bg-brand/5" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-card dark:border-gray-800 dark:bg-gray-900">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-gray-800">
                  {profile.photoUrl ? (
                    <Image
                      src={profile.photoUrl}
                      alt={profile.fullName}
                      fill
                      priority
                      unoptimized
                      className="object-cover object-[center_18%]"
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-semibold text-brand/30">
                      {profile.fullName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-16 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="inline-flex flex-col items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand dark:text-gray-400"
          >
            <span>Scroll down</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
