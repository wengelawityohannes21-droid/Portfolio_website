"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { AutoSaveIndicator, useAutoSave } from "@/components/admin/auto-save-indicator";
import { FormField } from "@/components/admin/form-field";
import { MediaPicker } from "@/components/admin/media-picker";
import {
  ABOUT_CARDS,
  DEFAULT_VISIBLE_SECTIONS,
  HOMEPAGE_SECTIONS,
  parseVisibleSections,
  type VisibleSections,
} from "@/lib/sections";

type SettingsForm = {
  siteName: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  darkModeDefault: boolean;
  analyticsId: string;
  homepageLayout: string;
  showBlog: boolean;
  showTestimonials: boolean;
  resumeUrl: string;
  visibleSections: string;
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm<SettingsForm>();

  const formValues = watch();
  const autoSaveStatus = useAutoSave({
    section: "settings",
    data: formValues,
    enabled: !loading,
  });

  const sections = useMemo(
    () => parseVisibleSections(formValues.visibleSections),
    [formValues.visibleSections]
  );

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        reset({
          ...data,
          visibleSections: data.visibleSections || JSON.stringify(DEFAULT_VISIBLE_SECTIONS),
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const updateSection = (key: string, value: boolean) => {
    const next: VisibleSections = { ...sections, [key]: value };
    // Keep legacy booleans in sync
    if (key === "blog") setValue("showBlog", value);
    if (key === "testimonials") setValue("showTestimonials", value);
    setValue("visibleSections", JSON.stringify(next), { shouldDirty: true });
  };

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    try {
      const parsed = parseVisibleSections(data.visibleSections);
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          showBlog: parsed.blog !== false,
          showTestimonials: parsed.testimonials !== false,
          visibleSections: JSON.stringify(parsed),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            SEO, theme, and which homepage sections appear publicly
          </p>
        </div>
        <AutoSaveIndicator status={autoSaveStatus} />
      </div>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">Homepage sections</h2>
        <p className="text-sm text-slate-500">
          Turn off any section to hide it from the public site and navigation. Content stays in the
          database so you can turn it back on later.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {HOMEPAGE_SECTIONS.map((section) => (
            <label
              key={section.key}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-700"
            >
              <span className="font-medium text-slate-700 dark:text-slate-200">{section.label}</span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand-600"
                checked={sections[section.key] !== false}
                onChange={(e) => updateSection(section.key, e.target.checked)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">About highlight cards</h2>
        <p className="text-sm text-slate-500">
          Hide Mission, Passion, and other About cards without deleting the whole About section.
          You can also clear their text under Admin → About.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ABOUT_CARDS.map((card) => {
            const key = `about${card.key.charAt(0).toUpperCase()}${card.key.slice(1)}`;
            return (
              <label
                key={card.key}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-700"
              >
                <span className="font-medium text-slate-700 dark:text-slate-200">{card.label}</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-brand-600"
                  checked={sections[key] !== false}
                  onChange={(e) => updateSection(key, e.target.checked)}
                />
              </label>
            );
          })}
        </div>
        <input type="hidden" {...register("visibleSections")} />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">General</h2>
        <FormField label="Site Name" {...register("siteName")} />
        <FormField label="Site URL" {...register("siteUrl")} />
        <FormField
          as="select"
          label="Homepage Layout"
          options={[
            { label: "Default", value: "default" },
            { label: "Minimal", value: "minimal" },
            { label: "Full", value: "full" },
          ]}
          value={formValues.homepageLayout || "default"}
          onChange={(e) => setValue("homepageLayout", e.target.value)}
        />
        <MediaPicker
          label="Resume / CV"
          folder="documents"
          value={formValues.resumeUrl}
          onChange={(url) => setValue("resumeUrl", url)}
        />
        <input type="hidden" {...register("resumeUrl")} />
        <input type="hidden" {...register("showBlog")} />
        <input type="hidden" {...register("showTestimonials")} />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">SEO</h2>
        <FormField label="SEO Title" {...register("seoTitle")} />
        <FormField as="textarea" label="SEO Description" rows={3} {...register("seoDescription")} />
        <FormField label="SEO Keywords" {...register("seoKeywords")} />
        <MediaPicker
          label="OG Image"
          folder="general"
          value={formValues.ogImage}
          onChange={(url) => setValue("ogImage", url)}
        />
        <input type="hidden" {...register("ogImage")} />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">Theme Colors</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Primary" type="color" {...register("primaryColor")} />
          <FormField label="Accent" type="color" {...register("accentColor")} />
          <FormField label="Background" type="color" {...register("backgroundColor")} />
        </div>
        <FormField
          as="checkbox"
          label="Dark Mode Default"
          checked={!!formValues.darkModeDefault}
          onChange={(v) => setValue("darkModeDefault", v)}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">Analytics</h2>
        <FormField
          label="Google Analytics ID"
          placeholder="G-XXXXXXXXXX"
          {...register("analyticsId")}
        />
      </section>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Settings
      </button>
    </form>
  );
}
