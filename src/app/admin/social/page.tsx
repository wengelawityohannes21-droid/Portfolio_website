"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/admin/form-field";

type SocialForm = {
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  instagramUrl: string;
};

export default function AdminSocialPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm<SocialForm>();

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        reset({
          linkedinUrl: data.linkedinUrl || "",
          githubUrl: data.githubUrl || "",
          websiteUrl: data.websiteUrl || "",
          twitterUrl: data.twitterUrl || "",
          instagramUrl: data.instagramUrl || "",
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: SocialForm) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Social links saved");
    } catch {
      toast.error("Failed to save");
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Social Links</h1>
        <p className="mt-1 text-sm text-slate-500">Links shown on your portfolio</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FormField label="LinkedIn" placeholder="https://linkedin.com/in/..." {...register("linkedinUrl")} />
        <FormField label="GitHub" placeholder="https://github.com/..." {...register("githubUrl")} />
        <FormField label="Website" placeholder="https://..." {...register("websiteUrl")} />
        <FormField label="Twitter / X" placeholder="https://x.com/..." {...register("twitterUrl")} />
        <FormField label="Instagram" placeholder="https://instagram.com/..." {...register("instagramUrl")} />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Links
      </button>
    </form>
  );
}
