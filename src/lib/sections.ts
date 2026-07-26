export const HOMEPAGE_SECTIONS = [
  { key: "about", label: "About" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "leadership", label: "Leadership" },
  { key: "research", label: "Research" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "certifications", label: "Certifications" },
  { key: "awards", label: "Awards" },
  { key: "volunteer", label: "Volunteer" },
  { key: "gallery", label: "Gallery" },
  { key: "testimonials", label: "Testimonials" },
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
] as const;

export const ABOUT_CARDS = [
  { key: "mission", label: "Mission" },
  { key: "passion", label: "Passion" },
  { key: "careerGoals", label: "Career Goals" },
  { key: "researchInterests", label: "Research Interests" },
] as const;

export type SectionKey = (typeof HOMEPAGE_SECTIONS)[number]["key"];
export type AboutCardKey = (typeof ABOUT_CARDS)[number]["key"];

export type VisibleSections = Record<string, boolean>;

export const DEFAULT_VISIBLE_SECTIONS: VisibleSections = {
  about: true,
  education: true,
  experience: true,
  leadership: true,
  research: true,
  projects: true,
  skills: true,
  certifications: true,
  awards: true,
  volunteer: true,
  gallery: true,
  testimonials: true,
  blog: true,
  contact: true,
  // About highlight cards — set false or clear content to hide
  aboutMission: true,
  aboutPassion: true,
  aboutCareerGoals: true,
  aboutResearchInterests: true,
};

export function parseVisibleSections(value?: string | null): VisibleSections {
  try {
    const parsed = value ? JSON.parse(value) : {};
    return { ...DEFAULT_VISIBLE_SECTIONS, ...parsed };
  } catch {
    return { ...DEFAULT_VISIBLE_SECTIONS };
  }
}

export function isSectionVisible(
  sections: VisibleSections,
  key: string,
  fallback = true
) {
  if (typeof sections[key] === "boolean") return sections[key];
  return fallback;
}
