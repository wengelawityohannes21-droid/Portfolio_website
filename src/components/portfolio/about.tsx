import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { ProfileData, SiteSettingsData } from "@/types/portfolio";
import { isSectionVisible } from "@/lib/sections";

type AboutProps = {
  profile: ProfileData;
  settings: SiteSettingsData;
};

export function About({ profile, settings }: AboutProps) {
  const sections = settings.visibleSections;

  const highlights = [
    {
      label: "Mission",
      value: profile.mission,
      visible: isSectionVisible(sections, "aboutMission"),
    },
    {
      label: "Passion",
      value: profile.passion,
      visible: isSectionVisible(sections, "aboutPassion"),
    },
    {
      label: "Career Goals",
      value: profile.careerGoals,
      visible: isSectionVisible(sections, "aboutCareerGoals"),
    },
    {
      label: "Research Interests",
      value: profile.researchInterests,
      visible: isSectionVisible(sections, "aboutResearchInterests"),
    },
  ].filter((item) => item.visible && item.value?.trim());

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white dark:bg-gray-900/40">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border border-brand/10" />
      <div className="pointer-events-none absolute -left-12 top-36 h-44 w-44 rounded-full border border-brand/10" />
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Researcher, leader, and builder"
          description="Dedicated to nutrition science, youth leadership, and evidence-based impact across Ethiopia and Africa."
        />

        <div
          className={
            highlights.length > 0
              ? "grid gap-8 lg:grid-cols-[1.25fr_0.75fr]"
              : "mx-auto max-w-3xl"
          }
        >
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-gray-100 bg-[#0d1f17] p-8 text-white shadow-card md:p-10 dark:border-gray-800">
              <span className="absolute -right-3 -top-12 font-serif text-[12rem] leading-none text-emerald-300/[0.07]">
                “
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                The story behind the work
              </p>
              <p className="relative mt-8 whitespace-pre-line text-base leading-relaxed text-emerald-50/80 md:text-lg">
                {profile.bio}
              </p>
              <div className="mt-10 flex items-center gap-3">
                <span className="h-px w-12 bg-emerald-300/50" />
                <span className="text-xs uppercase tracking-[0.18em] text-emerald-100/50">
                  Purpose-led practice
                </span>
              </div>
            </div>
          </Reveal>

          {highlights.length > 0 ? (
            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.08}>
                  <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs text-brand/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                          {item.label}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
