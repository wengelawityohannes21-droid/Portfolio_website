import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminCertificationsPage() {
  return (
    <SectionCrud
      resource="certifications"
      title="Certifications"
      description="Professional certifications and credentials"
      titleField="title"
      subtitleField="issuer"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "issuer", label: "Issuer" },
        { name: "issueDate", label: "Issue Date", type: "date" },
        { name: "credentialUrl", label: "Credential URL" },
        { name: "fileUrl", label: "File URL" },
        { name: "imageUrl", label: "Image URL" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
