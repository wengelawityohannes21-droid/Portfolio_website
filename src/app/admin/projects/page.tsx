import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminProjectsPage() {
  return (
    <SectionCrud
      resource="projects"
      title="Projects"
      description="Portfolio projects and case studies"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "techStack", label: "Tech Stack (comma-separated)", type: "json-array" },
        { name: "githubUrl", label: "GitHub URL" },
        { name: "liveUrl", label: "Live URL" },
        { name: "thumbnailUrl", label: "Thumbnail URL" },
        { name: "gallery", label: "Gallery URLs (comma-separated)", type: "json-array" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
