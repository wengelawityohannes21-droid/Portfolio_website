"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/admin/form-field";
import { SortableList } from "@/components/admin/sortable-list";
import { cn, parseJsonArray } from "@/lib/utils";

export type CrudField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "checkbox" | "select" | "json-array";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  rows?: number;
};

export type CrudItem = {
  id: string;
  title?: string;
  name?: string;
  organization?: string;
  institution?: string;
  sortOrder?: number;
  published?: boolean;
  [key: string]: unknown;
};

type SectionCrudProps = {
  resource: string;
  title: string;
  description?: string;
  fields: CrudField[];
  titleField?: string;
  subtitleField?: string;
  defaultValues?: Record<string, unknown>;
  enableDnd?: boolean;
};

function getItemTitle(item: CrudItem, titleField: string, subtitleField?: string) {
  const primary = String(item[titleField] ?? item.title ?? item.name ?? "Untitled");
  const secondary = subtitleField ? String(item[subtitleField] ?? "") : "";
  return { primary, secondary };
}

export function SectionCrud({
  resource,
  title,
  description,
  fields,
  titleField = "title",
  subtitleField = "organization",
  defaultValues = {},
  enableDnd = true,
}: SectionCrudProps) {
  const [items, setItems] = useState<CrudItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<CrudItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    const initial: Record<string, unknown> = {
      published: true,
      sortOrder: items.length,
      ...defaultValues,
    };
    fields.forEach((f) => {
      if (!(f.name in initial)) {
        initial[f.name] = f.type === "checkbox" ? false : f.type === "json-array" ? "" : "";
      }
    });
    setEditing(null);
    setFormData(initial);
    setFormOpen(true);
  };

  const openEdit = (item: CrudItem) => {
    const data: Record<string, unknown> = { ...item };
    fields.forEach((f) => {
      if (f.type === "json-array" && typeof data[f.name] === "string") {
        data[f.name] = parseJsonArray(data[f.name] as string).join(", ");
      }
    });
    setEditing(item);
    setFormData(data);
    setFormOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...formData };
      fields.forEach((f) => {
        if (f.type === "json-array" && typeof payload[f.name] === "string") {
          payload[f.name] = (payload[f.name] as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      });

      const url = editing
        ? `/api/admin/${resource}/${editing.id}`
        : `/api/admin/${resource}`;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      toast.success(editing ? "Updated successfully" : "Created successfully");
      setFormOpen(false);
      setEditing(null);
      fetchItems();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted");
      fetchItems();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleReorder = async (ordered: CrudItem[]) => {
    setItems(ordered);
    await fetch("/api/admin/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resource, orderedIds: ordered.map((i) => i.id) }),
    });
  };

  const moveItem = async (id: string, direction: "up" | "down") => {
    await fetch(`/api/admin/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reorder", direction }),
    });
    fetchItems();
  };

  const togglePublish = async (item: CrudItem) => {
    await fetch(`/api/admin/${resource}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "publish", published: !item.published }),
    });
    fetchItems();
  };

  const renderFormField = (field: CrudField) => {
    const value = formData[field.name];

    if (field.type === "checkbox") {
      return (
        <FormField
          key={field.name}
          as="checkbox"
          label={field.label}
          checked={!!value}
          onChange={(checked) => setFormData((d) => ({ ...d, [field.name]: checked }))}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <FormField
          key={field.name}
          as="textarea"
          label={field.label}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
          value={String(value ?? "")}
          onChange={(e) => setFormData((d) => ({ ...d, [field.name]: e.target.value }))}
        />
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <FormField
          key={field.name}
          as="select"
          label={field.label}
          options={field.options}
          value={String(value ?? "")}
          onChange={(e) => setFormData((d) => ({ ...d, [field.name]: e.target.value }))}
        />
      );
    }

    return (
      <FormField
        key={field.name}
        label={field.label}
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(e) =>
          setFormData((d) => ({
            ...d,
            [field.name]:
              field.type === "number" ? Number(e.target.value) : e.target.value,
          }))
        }
      />
    );
  };

  const renderItemActions = (item: CrudItem, index: number) => {
    const { primary, secondary } = getItemTitle(item, titleField, subtitleField);
    return (
      <div className="flex w-full items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-slate-900 dark:text-white">{primary}</p>
          {secondary && (
            <p className="truncate text-sm text-slate-500">{secondary}</p>
          )}
          {"published" in item && (
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                item.published
                  ? "bg-brand-50 text-brand-700"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {item.published ? "Published" : "Draft"}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {!enableDnd && (
            <>
              <button
                type="button"
                onClick={() => moveItem(item.id, "up")}
                disabled={index === 0}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(item.id, "down")}
                disabled={index === items.length - 1}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </>
          )}
          {"published" in item && (
            <button
              type="button"
              onClick={() => togglePublish(item)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              title={item.published ? "Unpublish" : "Publish"}
            >
              {item.published ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => openEdit(item)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-500">No items yet. Create your first one.</p>
        </div>
      ) : enableDnd ? (
        <SortableList items={items} onReorder={handleReorder} renderItem={renderItemActions} />
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              {renderItemActions(item, index)}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            >
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                {editing ? "Edit item" : "New item"}
              </h2>
              <div className="space-y-4">{fields.map(renderFormField)}</div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
