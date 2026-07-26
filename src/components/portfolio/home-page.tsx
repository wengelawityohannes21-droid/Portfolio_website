import { BackToTop } from "@/components/portfolio/back-to-top";
import { Footer } from "@/components/portfolio/footer";
import { Navbar } from "@/components/portfolio/navbar";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { GrowthJourney } from "@/components/portfolio/growth-journey";
import { GrowthManifesto } from "@/components/portfolio/growth-manifesto";
import { ImpactGarden } from "@/components/portfolio/impact-garden";
import { OrganicAtmosphere } from "@/components/portfolio/organic-atmosphere";
import { Research } from "@/components/portfolio/research";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Certifications } from "@/components/portfolio/certifications";
import { Awards } from "@/components/portfolio/awards";
import { Volunteer } from "@/components/portfolio/volunteer";
import { Gallery } from "@/components/portfolio/gallery";
import { Testimonials } from "@/components/portfolio/testimonials";
import { BlogPreview } from "@/components/portfolio/blog-preview";
import { Contact } from "@/components/portfolio/contact";
import type { PortfolioData } from "@/types/portfolio";
import { isSectionVisible } from "@/lib/sections";

type HomePageProps = {
  data: PortfolioData;
};

export function HomePage({ data }: HomePageProps) {
  const { profile, settings } = data;
  const v = settings.visibleSections;

  const show = (key: string, hasItems = true) =>
    isSectionVisible(v, key) && hasItems;

  return (
    <>
      <ScrollProgress />
      <Navbar siteName={settings.siteName} visibleSections={v} />
      <main className="relative isolate overflow-hidden">
        <OrganicAtmosphere />
        <div className="relative z-10">
          <Hero profile={profile} settings={settings} />
          {show("about") ? <About profile={profile} settings={settings} /> : null}
          <ImpactGarden />
          <GrowthJourney
            education={data.education}
            experience={data.experience}
            leadership={data.leadership}
            showEducation={show("education", data.education.length > 0)}
            showExperience={show("experience", data.experience.length > 0)}
            showLeadership={show("leadership", data.leadership.length > 0)}
          />
          {show("research", data.research.length > 0) ? (
            <Research items={data.research} />
          ) : null}
          {show("projects", data.projects.length > 0) ? (
            <Projects items={data.projects} />
          ) : null}
          {show("skills", data.skillCategories.length > 0) ? (
            <Skills categories={data.skillCategories} />
          ) : null}
          {show("certifications", data.certifications.length > 0) ? (
            <Certifications items={data.certifications} />
          ) : null}
          {show("awards", data.awards.length > 0) ? (
            <Awards items={data.awards} />
          ) : null}
          {show("volunteer", data.volunteer.length > 0) ? (
            <Volunteer items={data.volunteer} />
          ) : null}
          {show("gallery", data.gallery.length > 0) ? (
            <Gallery items={data.gallery} />
          ) : null}
          {show("testimonials", data.testimonials.length > 0) ? (
            <Testimonials items={data.testimonials} />
          ) : null}
          {show("blog", data.blogPosts.length > 0) ? (
            <BlogPreview posts={data.blogPosts} />
          ) : null}
          <GrowthManifesto />
          {show("contact") ? <Contact profile={profile} /> : null}
        </div>
      </main>
      <Footer profile={profile} settings={settings} />
      <BackToTop />
    </>
  );
}
