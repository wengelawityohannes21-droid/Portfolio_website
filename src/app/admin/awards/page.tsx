import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminAwardsPage() {
  return (
    <SectionCrud
      resource="awards"
      title="Awards"
      description="Honors, awards, and recognitions"
      titleField="title"
      subtitleField="issuer"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "issuer", label: "Issuer" },
        { name: "date", label: "Date", type: "date" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
