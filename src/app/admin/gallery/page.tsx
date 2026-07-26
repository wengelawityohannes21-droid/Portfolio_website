import { SectionCrud } from "@/components/admin/section-crud";

export default function AdminGalleryPage() {
  return (
    <SectionCrud
      resource="gallery"
      title="Gallery"
      description="Photo gallery and visual media"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "imageUrl", label: "Gallery image", type: "media", folder: "gallery", required: true },
        { name: "category", label: "Category" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
