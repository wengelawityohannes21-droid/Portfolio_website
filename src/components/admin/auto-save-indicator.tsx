"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Cloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

export function useAutoSave({
  section,
  itemId,
  data,
  enabled = true,
  debounceMs = 1500,
}: {
  section: string;
  itemId?: string;
  data: unknown;
  enabled?: boolean;
  debounceMs?: number;
}) {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    if (!enabled) return;

    const serialized = JSON.stringify(data);
    if (serialized === lastSavedRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setStatus("saving");
      try {
        const res = await fetch("/api/admin/drafts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section, itemId, payload: data }),
        });
        if (!res.ok) throw new Error("Save failed");
        lastSavedRef.current = serialized;
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } catch {
        setStatus("error");
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, section, itemId, enabled, debounceMs]);

  return status;
}

export function AutoSaveIndicator({ status }: { status: AutoSaveStatus }) {
  if (status === "idle") return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        status === "saving" && "bg-slate-100 text-slate-600",
        status === "saved" && "bg-brand-50 text-brand-700",
        status === "error" && "bg-red-50 text-red-600"
      )}
    >
      {status === "saving" && (
        <>
          <Loader2 className="h-3 w-3 animate-spin" /> Saving draft…
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="h-3 w-3" /> Draft saved
        </>
      )}
      {status === "error" && (
        <>
          <Cloud className="h-3 w-3" /> Save failed
        </>
      )}
    </div>
  );
}
