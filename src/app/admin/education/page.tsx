import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminEducationPage() {
  return (
    <SectionCrud
      resource="education"
      title="Education"
      description="Academic background and qualifications"
      titleField="degree"
      subtitleField="institution"
      fields={[
        { name: "institution", label: "Institution", required: true },
        { name: "degree", label: "Degree", required: true },
        { name: "field", label: "Field of Study" },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
        { name: "current", label: "Currently studying", type: "checkbox" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "achievements", label: "Achievements (comma-separated)", type: "json-array" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
