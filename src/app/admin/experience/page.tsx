import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminExperiencePage() {
  return (
    <SectionCrud
      resource="experience"
      title="Experience"
      description="Work history and professional roles"
      titleField="title"
      subtitleField="organization"
      fields={[
        { name: "title", label: "Job Title", required: true },
        { name: "organization", label: "Organization", required: true },
        { name: "location", label: "Location" },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
        { name: "current", label: "Currently working here", type: "checkbox" },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "responsibilities",
          label: "Responsibilities (comma-separated)",
          type: "json-array",
        },
        { name: "achievements", label: "Achievements (comma-separated)", type: "json-array" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
