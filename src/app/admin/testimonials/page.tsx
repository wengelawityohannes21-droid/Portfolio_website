import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminTestimonialsPage() {
  return (
    <SectionCrud
      resource="testimonials"
      title="Testimonials"
      description="Client and colleague testimonials"
      titleField="name"
      subtitleField="company"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "role", label: "Role" },
        { name: "company", label: "Company" },
        { name: "content", label: "Testimonial", type: "textarea", required: true },
        { name: "avatarUrl", label: "Person photo", type: "media", folder: "testimonials" },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
