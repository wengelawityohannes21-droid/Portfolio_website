import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminResearchPage() {
  return (
    <SectionCrud
      resource="research"
      title="Research"
      description="Research projects and ongoing studies"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "abstract", label: "Abstract", type: "textarea" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "objective", label: "Objective", type: "textarea" },
        { name: "institution", label: "Institution" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Ongoing", value: "Ongoing" },
            { label: "Completed", value: "Completed" },
            { label: "Published", value: "Published" },
          ],
        },
        { name: "authors", label: "Authors (comma-separated)", type: "json-array" },
        { name: "keywords", label: "Keywords (comma-separated)", type: "json-array" },
        { name: "methods", label: "Methods (comma-separated)", type: "json-array" },
        { name: "publicationLink", label: "Publication Link" },
        { name: "pdfUrl", label: "PDF URL" },
        { name: "imageUrl", label: "Image URL" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
