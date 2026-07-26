import type { PrismaClient } from "@prisma/client";

export type AdminResource =
  | "education"
  | "experience"
  | "leadership"
  | "research"
  | "publications"
  | "projects"
  | "certifications"
  | "awards"
  | "volunteer"
  | "gallery"
  | "testimonials"
  | "blog"
  | "skills"
  | "skill-categories"
  | "media"
  | "messages"
  | "drafts";

export const JSON_ARRAY_FIELDS: Record<string, string[]> = {
  education: ["achievements"],
  experience: ["responsibilities", "achievements"],
  leadership: ["achievements"],
  research: ["authors", "keywords", "methods"],
  publications: ["authors"],
  projects: ["techStack", "gallery"],
  blog: ["categories", "tags"],
};

export const RESOURCE_DELEGATES: Record<
  AdminResource,
  keyof PrismaClient
> = {
  education: "education",
  experience: "experience",
  leadership: "leadership",
  research: "research",
  publications: "publication",
  projects: "project",
  certifications: "certification",
  awards: "award",
  volunteer: "volunteer",
  gallery: "galleryItem",
  testimonials: "testimonial",
  blog: "blogPost",
  skills: "skill",
  "skill-categories": "skillCategory",
  media: "mediaAsset",
  messages: "contactMessage",
  drafts: "draft",
};

export function isAdminResource(value: string): value is AdminResource {
  return value in RESOURCE_DELEGATES;
}

export function getDelegate(prisma: PrismaClient, resource: AdminResource) {
  const key = RESOURCE_DELEGATES[resource];
  return prisma[key] as {
    findMany: (args?: unknown) => Promise<unknown[]>;
    findUnique: (args: unknown) => Promise<unknown | null>;
    create: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
    delete: (args: unknown) => Promise<unknown>;
    count: (args?: unknown) => Promise<number>;
  };
}

export function normalizeResourceBody(
  resource: AdminResource,
  body: Record<string, unknown>
) {
  const data = { ...body };
  const jsonFields = JSON_ARRAY_FIELDS[resource] ?? [];

  for (const field of jsonFields) {
    if (field in data) {
      const value = data[field];
      if (Array.isArray(value)) {
        data[field] = JSON.stringify(value);
      } else if (typeof value === "string") {
        try {
          JSON.parse(value);
        } catch {
          data[field] = JSON.stringify(
            value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          );
        }
      }
    }
  }

  if (resource === "blog") {
    if (data.scheduledAt && typeof data.scheduledAt === "string") {
      data.scheduledAt = new Date(data.scheduledAt);
    }
    if (data.publishedAt && typeof data.publishedAt === "string") {
      data.publishedAt = new Date(data.publishedAt);
    }
    if (data.status === "published" && !data.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  if (resource === "skills" && data.category) {
    data.categoryId = data.category;
    delete data.category;
  }

  return data;
}

export function getListInclude(resource: AdminResource) {
  if (resource === "skills") {
    return { include: { category: true } };
  }
  if (resource === "skill-categories") {
    return { include: { skills: { orderBy: { sortOrder: "asc" } } } };
  }
  return {};
}

export function getListOrderBy(resource: AdminResource) {
  if (resource === "messages") return { createdAt: "desc" as const };
  if (resource === "drafts") return { updatedAt: "desc" as const };
  return { sortOrder: "asc" as const };
}
