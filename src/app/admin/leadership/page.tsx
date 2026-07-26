import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminLeadershipPage() {
  return (
    <SectionCrud
      resource="leadership"
      title="Leadership"
      description="Leadership roles and organizational impact"
      fields={[
        { name: "title", label: "Role Title", required: true },
        { name: "organization", label: "Organization", required: true },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
        { name: "current", label: "Current role", type: "checkbox" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "achievements", label: "Achievements (comma-separated)", type: "json-array" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
