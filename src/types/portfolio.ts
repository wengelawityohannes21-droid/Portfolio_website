import type { VisibleSections } from "@/lib/sections";

export type ProfileData = {
  id: string;
  fullName: string;
  headline: string;
  tagline: string | null;
  typingPhrases: string[];
  bio: string;
  mission: string | null;
  passion: string | null;
  careerGoals: string | null;
  researchInterests: string | null;
  photoUrl: string | null;
  cvUrl: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
};

export type SiteSettingsData = {
  id: string;
  siteName: string;
  siteUrl: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogImage: string | null;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  darkModeDefault: boolean;
  showBlog: boolean;
  showTestimonials: boolean;
  visibleSections: VisibleSections;
  resumeUrl: string | null;
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  description: string | null;
  achievements: string[];
  sortOrder: number;
};

export type ExperienceItem = {
  id: string;
  title: string;
  organization: string;
  location: string | null;
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  description: string | null;
  responsibilities: string[];
  achievements: string[];
  sortOrder: number;
};

export type LeadershipItem = {
  id: string;
  title: string;
  organization: string;
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  description: string | null;
  achievements: string[];
  sortOrder: number;
};

export type ResearchItem = {
  id: string;
  title: string;
  abstract: string | null;
  description: string | null;
  objective: string | null;
  authors: string[];
  institution: string | null;
  status: string;
  keywords: string[];
  methods: string[];
  publicationLink: string | null;
  pdfUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

export type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  thumbnailUrl: string | null;
  gallery: string[];
  featured: boolean;
  sortOrder: number;
};

export type SkillItem = {
  id: string;
  name: string;
  proficiency: number;
  sortOrder: number;
};

export type SkillCategoryItem = {
  id: string;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  skills: SkillItem[];
};

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string | null;
  issueDate: string | null;
  credentialUrl: string | null;
  fileUrl: string | null;
  imageUrl: string | null;
  sortOrder: number;
};

export type AwardItem = {
  id: string;
  title: string;
  issuer: string | null;
  date: string | null;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
};

export type VolunteerItem = {
  id: string;
  title: string;
  organization: string | null;
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  description: string | null;
  sortOrder: number;
};

export type GalleryItemData = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string | null;
  sortOrder: number;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatarUrl: string | null;
  rating: number;
  sortOrder: number;
};

export type BlogPostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  categories: string[];
  tags: string[];
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogImage: string | null;
  sortOrder: number;
};

export type PortfolioData = {
  profile: ProfileData;
  settings: SiteSettingsData;
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  research: ResearchItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategoryItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
  gallery: GalleryItemData[];
  testimonials: TestimonialItem[];
  blogPosts: BlogPostItem[];
};
