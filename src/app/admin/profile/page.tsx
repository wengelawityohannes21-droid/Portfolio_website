"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { AutoSaveIndicator, useAutoSave } from "@/components/admin/auto-save-indicator";
import { FormField } from "@/components/admin/form-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { parseJsonArray, toJsonArray } from "@/lib/utils";

type ProfileForm = {
  fullName: string;
  headline: string;
  tagline: string;
  typingPhrases: string;
  photoUrl: string;
  cvUrl: string;
  email: string;
  phone: string;
  location: string;
};

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm<ProfileForm>();

  const formValues = watch();
  const autoSaveStatus = useAutoSave({
    section: "profile",
    data: formValues,
    enabled: !loading,
  });

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        reset({
          fullName: data.fullName || "",
          headline: data.headline || "",
          tagline: data.tagline || "",
          typingPhrases: parseJsonArray(data.typingPhrases).join("\n"),
          photoUrl: data.photoUrl || "",
          cvUrl: data.cvUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          typingPhrases: toJsonArray(
            data.typingPhrases.split("\n").map((s) => s.trim()).filter(Boolean)
          ),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Profile saved");
    } catch {
      toast.error("Failed to save profile");
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Profile</h1>
          <p className="mt-1 text-sm text-slate-500">Hero section and basic identity</p>
        </div>
        <AutoSaveIndicator status={autoSaveStatus} />
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FormField label="Full Name" {...register("fullName")} />
        <FormField label="Headline" {...register("headline")} />
        <FormField label="Tagline" {...register("tagline")} />
        <FormField
          as="textarea"
          label="Typing Phrases"
          hint="One phrase per line"
          rows={5}
          {...register("typingPhrases")}
        />
        <MediaPicker
          label="Profile Photo"
          folder="profile"
          value={formValues.photoUrl}
          onChange={(url) => setValue("photoUrl", url)}
        />
        <input type="hidden" {...register("photoUrl")} />
        <MediaPicker
          label="CV / Resume"
          folder="documents"
          value={formValues.cvUrl}
          onChange={(url) => setValue("cvUrl", url)}
        />
        <input type="hidden" {...register("cvUrl")} />
        <FormField label="Email" type="email" {...register("email")} />
        <FormField label="Phone" {...register("phone")} />
        <FormField label="Location" {...register("location")} />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Profile
      </button>
    </form>
  );
}
