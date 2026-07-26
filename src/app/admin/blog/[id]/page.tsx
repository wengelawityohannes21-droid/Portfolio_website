"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AutoSaveIndicator, useAutoSave } from "@/components/admin/auto-save-indicator";
import { FormField } from "@/components/admin/form-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { parseJsonArray, toJsonArray } from "@/lib/utils";

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categories: string;
  tags: string;
  status: string;
  scheduledAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
};

export default function AdminBlogEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BlogForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categories: "",
    tags: "",
    status: "draft",
    scheduledAt: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    ogImage: "",
  });

  const autoSaveStatus = useAutoSave({
    section: "blog",
    itemId: id,
    data: form,
    enabled: !loading,
  });

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          categories: parseJsonArray(data.categories).join(", "),
          tags: parseJsonArray(data.tags).join(", "),
          status: data.status || "draft",
          scheduledAt: data.scheduledAt
            ? new Date(data.scheduledAt).toISOString().slice(0, 16)
            : "",
          seoTitle: data.seoTitle || "",
          seoDescription: data.seoDescription || "",
          seoKeywords: data.seoKeywords || "",
          ogImage: data.ogImage || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const update = (patch: Partial<BlogForm>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      if (patch.title && !prev.slug) {
        next.slug = slugify(patch.title, { lower: true, strict: true });
      }
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        categories: toJsonArray(
          form.categories.split(",").map((s) => s.trim()).filter(Boolean)
        ),
        tags: toJsonArray(form.tags.split(",").map((s) => s.trim()).filter(Boolean)),
        scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
        publishedAt: form.status === "published" ? new Date().toISOString() : undefined,
      };

      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success("Post saved");
      router.refresh();
    } catch {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Edit Post</h1>
            <AutoSaveIndicator status={autoSaveStatus} />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Post
        </button>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FormField label="Title" value={form.title} onChange={(e) => update({ title: e.target.value })} />
        <FormField label="Slug" value={form.slug} onChange={(e) => update({ slug: e.target.value })} />
        <FormField
          as="textarea"
          label="Excerpt"
          rows={3}
          value={form.excerpt}
          onChange={(e) => update({ excerpt: e.target.value })}
        />
        <MediaPicker
          label="Cover Image"
          folder="blog"
          value={form.coverImage}
          onChange={(url) => update({ coverImage: url })}
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Content
          </label>
          <RichTextEditor value={form.content} onChange={(html) => update({ content: html })} />
        </div>
        <FormField
          label="Categories (comma-separated)"
          value={form.categories}
          onChange={(e) => update({ categories: e.target.value })}
        />
        <FormField
          label="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => update({ tags: e.target.value })}
        />
        <FormField
          as="select"
          label="Status"
          options={[
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Scheduled", value: "scheduled" },
          ]}
          value={form.status}
          onChange={(e) => update({ status: e.target.value })}
        />
        {form.status === "scheduled" && (
          <FormField
            label="Scheduled At"
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => update({ scheduledAt: e.target.value })}
          />
        )}
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">SEO</h2>
        <FormField
          label="SEO Title"
          value={form.seoTitle}
          onChange={(e) => update({ seoTitle: e.target.value })}
        />
        <FormField
          as="textarea"
          label="SEO Description"
          rows={3}
          value={form.seoDescription}
          onChange={(e) => update({ seoDescription: e.target.value })}
        />
        <FormField
          label="SEO Keywords"
          value={form.seoKeywords}
          onChange={(e) => update({ seoKeywords: e.target.value })}
        />
        <MediaPicker
          label="OG Image"
          folder="blog"
          value={form.ogImage}
          onChange={(url) => update({ ogImage: url })}
        />
      </div>
    </div>
  );
}
