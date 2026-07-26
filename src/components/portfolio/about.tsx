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
    <section id="about" className="section-padding bg-white dark:bg-gray-900/40">
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
            <div className="rounded-2xl border border-gray-100 bg-canvas p-8 shadow-soft dark:border-gray-800 dark:bg-gray-900">
              <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                {profile.bio}
              </p>
            </div>
          </Reveal>

          {highlights.length > 0 ? (
            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.08}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.value}
                    </p>
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
