import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminVolunteerPage() {
  return (
    <SectionCrud
      resource="volunteer"
      title="Volunteer"
      description="Volunteer work and community service"
      fields={[
        { name: "title", label: "Role Title", required: true },
        { name: "organization", label: "Organization" },
        { name: "imageUrl", label: "Community or activity image", type: "media" },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
        { name: "current", label: "Currently volunteering", type: "checkbox" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
