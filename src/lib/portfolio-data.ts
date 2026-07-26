import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { parseVisibleSections } from "@/lib/sections";
import type { PortfolioData } from "@/types/portfolio";

export async function getPortfolioData(): Promise<PortfolioData> {
  const [
    profile,
    settings,
    education,
    experience,
    leadership,
    research,
    projects,
    skillCategories,
    certifications,
    awards,
    volunteer,
    gallery,
    testimonials,
    blogPosts,
  ] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.siteSettings.findFirst(),
    prisma.education.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.experience.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.leadership.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.research.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.skillCategory.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      include: {
        skills: {
          where: { published: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
    prisma.certification.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.award.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.volunteer.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    }),
  ]);

  // Fall back to an elegant placeholder instead of crashing the build/page when
  // the database hasn't been seeded yet (e.g. a fresh production database).
  const resolvedProfile: NonNullable<typeof profile> =
    profile ?? {
      id: "placeholder",
      fullName: "Your Name",
      headline: "Add your headline in Admin → Profile",
      tagline: "Run the database seed, or fill in your profile from the admin dashboard.",
      typingPhrases: "[]",
      bio: "This is placeholder content. Log in to /admin to add your real profile information.",
      mission: null,
      passion: null,
      careerGoals: null,
      researchInterests: null,
      photoUrl: null,
      cvUrl: null,
      email: "",
      phone: null,
      location: null,
      linkedinUrl: null,
      githubUrl: null,
      websiteUrl: null,
      twitterUrl: null,
      instagramUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

  const resolvedSettings = settings ?? {
    id: "default",
    siteName: resolvedProfile.fullName,
    siteUrl: "http://localhost:3000",
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    ogImage: null,
    primaryColor: "#16A34A",
    accentColor: "#1F2937",
    backgroundColor: "#F9FAFB",
    darkModeDefault: false,
    analyticsId: null,
    homepageLayout: "default",
    showBlog: true,
    showTestimonials: true,
    visibleSections: "{}",
    resumeUrl: resolvedProfile.cvUrl,
  };

  const visibleSections = parseVisibleSections(
    "visibleSections" in resolvedSettings
      ? (resolvedSettings as { visibleSections?: string }).visibleSections
      : "{}"
  );
  // Honor legacy toggles if present
  if (resolvedSettings.showBlog === false) visibleSections.blog = false;
  if (resolvedSettings.showTestimonials === false) {
    visibleSections.testimonials = false;
  }

  return {
    profile: {
      id: resolvedProfile.id,
      fullName: resolvedProfile.fullName,
      headline: resolvedProfile.headline,
      tagline: resolvedProfile.tagline,
      typingPhrases: parseJsonArray(resolvedProfile.typingPhrases),
      bio: resolvedProfile.bio,
      mission: resolvedProfile.mission,
      passion: resolvedProfile.passion,
      careerGoals: resolvedProfile.careerGoals,
      researchInterests: resolvedProfile.researchInterests,
      photoUrl: resolvedProfile.photoUrl,
      cvUrl: resolvedProfile.cvUrl,
      email: resolvedProfile.email,
      phone: resolvedProfile.phone,
      location: resolvedProfile.location,
      linkedinUrl: resolvedProfile.linkedinUrl,
      githubUrl: resolvedProfile.githubUrl,
      websiteUrl: resolvedProfile.websiteUrl,
      twitterUrl: resolvedProfile.twitterUrl,
      instagramUrl: resolvedProfile.instagramUrl,
    },
    settings: {
      id: resolvedSettings.id,
      siteName: resolvedSettings.siteName,
      siteUrl: resolvedSettings.siteUrl,
      seoTitle: resolvedSettings.seoTitle,
      seoDescription: resolvedSettings.seoDescription,
      seoKeywords: resolvedSettings.seoKeywords,
      ogImage: resolvedSettings.ogImage,
      primaryColor: resolvedSettings.primaryColor,
      accentColor: resolvedSettings.accentColor,
      backgroundColor: resolvedSettings.backgroundColor,
      darkModeDefault: resolvedSettings.darkModeDefault,
      showBlog: visibleSections.blog !== false,
      showTestimonials: visibleSections.testimonials !== false,
      visibleSections,
      resumeUrl: resolvedSettings.resumeUrl,
    },
    education: education.map((item) => ({
      id: item.id,
      institution: item.institution,
      degree: item.degree,
      field: item.field,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description,
      achievements: parseJsonArray(item.achievements),
      sortOrder: item.sortOrder,
    })),
    experience: experience.map((item) => ({
      id: item.id,
      title: item.title,
      organization: item.organization,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description,
      responsibilities: parseJsonArray(item.responsibilities),
      achievements: parseJsonArray(item.achievements),
      sortOrder: item.sortOrder,
    })),
    leadership: leadership.map((item) => ({
      id: item.id,
      title: item.title,
      organization: item.organization,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description,
      achievements: parseJsonArray(item.achievements),
      sortOrder: item.sortOrder,
    })),
    research: research.map((item) => ({
      id: item.id,
      title: item.title,
      abstract: item.abstract,
      description: item.description,
      objective: item.objective,
      authors: parseJsonArray(item.authors),
      institution: item.institution,
      status: item.status,
      keywords: parseJsonArray(item.keywords),
      methods: parseJsonArray(item.methods),
      publicationLink: item.publicationLink,
      pdfUrl: item.pdfUrl,
      imageUrl: item.imageUrl,
      featured: item.featured,
      sortOrder: item.sortOrder,
    })),
    projects: projects.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      techStack: parseJsonArray(item.techStack),
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl,
      thumbnailUrl: item.thumbnailUrl,
      gallery: parseJsonArray(item.gallery),
      featured: item.featured,
      sortOrder: item.sortOrder,
    })),
    skillCategories: skillCategories.map((category) => ({
      id: category.id,
      name: category.name,
      sortOrder: category.sortOrder,
      skills: category.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        proficiency: skill.proficiency,
        sortOrder: skill.sortOrder,
      })),
    })),
    certifications: certifications.map((item) => ({
      id: item.id,
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issueDate,
      credentialUrl: item.credentialUrl,
      fileUrl: item.fileUrl,
      imageUrl: item.imageUrl,
      sortOrder: item.sortOrder,
    })),
    awards: awards.map((item) => ({
      id: item.id,
      title: item.title,
      issuer: item.issuer,
      date: item.date,
      description: item.description,
      sortOrder: item.sortOrder,
    })),
    volunteer: volunteer.map((item) => ({
      id: item.id,
      title: item.title,
      organization: item.organization,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description,
      sortOrder: item.sortOrder,
    })),
    gallery: gallery.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      sortOrder: item.sortOrder,
    })),
    testimonials: testimonials.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      company: item.company,
      content: item.content,
      avatarUrl: item.avatarUrl,
      rating: item.rating,
      sortOrder: item.sortOrder,
    })),
    blogPosts: blogPosts.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      coverImage: item.coverImage,
      categories: parseJsonArray(item.categories),
      tags: parseJsonArray(item.tags),
      publishedAt: item.publishedAt,
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      seoKeywords: item.seoKeywords,
      ogImage: item.ogImage,
      sortOrder: item.sortOrder,
    })),
  };
}

export async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
  });

  return posts.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    coverImage: item.coverImage,
    categories: parseJsonArray(item.categories),
    tags: parseJsonArray(item.tags),
    publishedAt: item.publishedAt,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    seoKeywords: item.seoKeywords,
    ogImage: item.ogImage,
    sortOrder: item.sortOrder,
  }));
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "published" },
  });

  if (!post) return null;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    categories: parseJsonArray(post.categories),
    tags: parseJsonArray(post.tags),
    publishedAt: post.publishedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: post.seoKeywords,
    ogImage: post.ogImage,
    sortOrder: post.sortOrder,
  };
}
