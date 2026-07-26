import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminPublicationsPage() {
  return (
    <SectionCrud
      resource="publications"
      title="Publications"
      description="Published papers and articles"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "authors", label: "Authors (comma-separated)", type: "json-array" },
        { name: "journal", label: "Journal" },
        { name: "year", label: "Year" },
        { name: "doi", label: "DOI" },
        { name: "url", label: "URL" },
        { name: "abstract", label: "Abstract", type: "textarea" },
        { name: "pdfUrl", label: "PDF URL" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
