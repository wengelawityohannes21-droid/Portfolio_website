"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Mail, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/admin/form-field";
import { cn } from "@/lib/utils";

type ContactForm = {
  email: string;
  phone: string;
  location: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<ContactForm>();

  const fetchMessages = useCallback(async () => {
    const res = await fetch("/api/admin/messages");
    if (res.ok) setMessages(await res.json());
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/profile").then((r) => r.json()),
      fetchMessages(),
    ]).then(([profile]) => {
      reset({
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    }).finally(() => setLoading(false));
  }, [reset, fetchMessages]);

  const onSubmit = async (data: ContactForm) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Contact info saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "read", read }),
    });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    fetchMessages();
    toast.success("Message deleted");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Contact</h1>
        <p className="mt-1 text-sm text-slate-500">Contact details and inbox messages</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">Public Contact Info</h2>
        <FormField label="Email" type="email" {...register("email")} />
        <FormField label="Phone" {...register("phone")} />
        <FormField label="Location" {...register("location")} />
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Mail className="h-5 w-5 text-brand-600" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Messages</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {messages.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "px-5 py-4",
                  !msg.read && "bg-brand-50/30 dark:bg-brand-900/10"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {msg.name}{" "}
                      <span className="font-normal text-slate-500">&lt;{msg.email}&gt;</span>
                    </p>
                    {msg.subject && (
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {msg.subject}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{msg.message}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => markRead(msg.id, !msg.read)}
                      className="rounded-lg px-2 py-1 text-xs text-brand-600 hover:bg-brand-50"
                    >
                      {msg.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMessage(msg.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
