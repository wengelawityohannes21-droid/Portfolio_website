"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/admin/form-field";
import { MediaPicker } from "@/components/admin/media-picker";

type Skill = {
  id: string;
  name: string;
  proficiency: number;
  sortOrder: number;
  published: boolean;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  published: boolean;
  skills: Skill[];
};

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [addingSkillTo, setAddingSkillTo] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState({ name: "" });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/skill-categories");
      if (res.ok) setCategories(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const res = await fetch("/api/admin/skill-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory.trim(), published: true }),
    });
    if (res.ok) {
      setNewCategory("");
      fetchCategories();
      toast.success("Category added");
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete category and all its skills?")) return;
    await fetch(`/api/admin/skill-categories/${id}`, { method: "DELETE" });
    fetchCategories();
    toast.success("Category deleted");
  };

  const addSkill = async (categoryId: string) => {
    if (!newSkill.name.trim()) return;
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newSkill.name.trim(),
        categoryId,
        published: true,
      }),
    });
    if (res.ok) {
      setAddingSkillTo(null);
      setNewSkill({ name: "" });
      fetchCategories();
      toast.success("Skill added");
    }
  };

  const deleteSkill = async (id: string) => {
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const updateCategoryImage = async (id: string, imageUrl: string) => {
    const res = await fetch(`/api/admin/skill-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl || null }),
    });
    if (res.ok) {
      setCategories((current) =>
        current.map((category) =>
          category.id === id ? { ...category, imageUrl: imageUrl || null } : category
        )
      );
      toast.success(imageUrl ? "Category visual updated" : "Category visual removed");
    } else {
      toast.error("Failed to update category visual");
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Skills</h1>
        <p className="mt-1 text-sm text-slate-500">Manage skill categories and individual skills</p>
      </div>

      <div className="flex gap-2">
        <FormField
          label=""
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1"
        />
        <button
          type="button"
          onClick={addCategory}
          className="mt-6 inline-flex items-center gap-2 self-end rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{cat.name}</h2>
              <button
                type="button"
                onClick={() => deleteCategory(cat.id)}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <MediaPicker
              label="Category visual (optional)"
              folder="skills"
              value={cat.imageUrl ?? ""}
              onChange={(url) => updateCategoryImage(cat.id, url)}
              className="mb-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40"
            />

            <div className="space-y-2">
              {cat.skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50"
                >
                  <div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteSkill(skill.id)}
                    className="rounded p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {addingSkillTo === cat.id ? (
              <div className="mt-3 flex flex-wrap items-end gap-2">
                <FormField
                  label="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => addSkill(cat.id)}
                  className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddingSkillTo(null)}
                  className="rounded-xl px-3 py-2 text-sm text-slate-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingSkillTo(cat.id)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <Plus className="h-4 w-4" /> Add skill
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
