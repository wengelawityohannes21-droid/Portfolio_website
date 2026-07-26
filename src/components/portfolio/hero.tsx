"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Download, Mail, MapPin, Sparkles } from "lucide-react";
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
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#0d1f17] lg:block" />
        <div className="visual-grid absolute inset-y-0 right-0 hidden w-[42%] opacity-15 lg:block" />
        <div className="absolute left-1/3 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl dark:bg-brand/5" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-200/50 blur-3xl dark:bg-gray-800/40" />
      </div>

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand dark:bg-brand/10">
                <Sparkles className="h-3.5 w-3.5" />
                Research · Leadership · Innovation
              </div>
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
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {profile.location ? (
                <div className="mt-10 flex items-center gap-3 border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand dark:bg-brand/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Based in {profile.location} · Building impact across Africa
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.15} direction="right">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:py-8">
              <div className="absolute -inset-3 rounded-[2rem] border border-brand/20 lg:inset-3 lg:translate-x-6 lg:translate-y-6" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-2xl shadow-slate-950/15 dark:border-gray-800 dark:bg-gray-900">
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
                  <div className="image-veil opacity-30" />
                </div>
              </div>

              <div className="absolute -bottom-2 -left-4 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-card backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90 lg:bottom-14 lg:-left-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Focus
                </p>
                <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                  Food systems & public health
                </p>
              </div>

              <div className="absolute -right-3 top-8 hidden rounded-2xl border border-emerald-200/30 bg-[#0d1f17]/90 px-4 py-3 text-white shadow-card backdrop-blur-xl sm:block lg:-right-8 lg:top-20">
                <span className="inline-flex items-center gap-2 text-xs font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Evidence → action → impact
                </span>
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
