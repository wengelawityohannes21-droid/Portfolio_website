"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eraser, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { AutoSaveIndicator, useAutoSave } from "@/components/admin/auto-save-indicator";
import { FormField } from "@/components/admin/form-field";
import { ABOUT_CARDS } from "@/lib/sections";

type AboutForm = {
  bio: string;
  mission: string;
  passion: string;
  careerGoals: string;
  researchInterests: string;
};

const FIELD_HELP =
  "Leave empty or click Clear to remove this card from the public About section.";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm<AboutForm>();

  const formValues = watch();
  const autoSaveStatus = useAutoSave({
    section: "about",
    data: formValues,
    enabled: !loading,
  });

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        reset({
          bio: data.bio || "",
          mission: data.mission || "",
          passion: data.passion || "",
          careerGoals: data.careerGoals || "",
          researchInterests: data.researchInterests || "",
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const clearField = (field: keyof AboutForm) => {
    setValue(field, "", { shouldDirty: true });
    toast.message(`${field} cleared — save to hide it on the site`);
  };

  const onSubmit = async (data: AboutForm) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio: data.bio,
          mission: data.mission?.trim() || null,
          passion: data.passion?.trim() || null,
          careerGoals: data.careerGoals?.trim() || null,
          researchInterests: data.researchInterests?.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("About section saved");
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">About</h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit bio and highlight cards. Clear a field to remove that card from the public site.
          </p>
        </div>
        <AutoSaveIndicator status={autoSaveStatus} />
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FormField as="textarea" label="Bio" rows={6} {...register("bio")} />

        {ABOUT_CARDS.map((card) => (
          <div key={card.key} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {card.label}
              </label>
              <button
                type="button"
                onClick={() => clearField(card.key)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-950/40"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear / remove
              </button>
            </div>
            <textarea
              rows={4}
              {...register(card.key)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder={FIELD_HELP}
            />
            {!formValues[card.key]?.trim() ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Empty — this card will not appear on the portfolio after you save.
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save About
      </button>
    </form>
  );
}
