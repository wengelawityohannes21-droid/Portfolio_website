import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function toJsonArray(value: string[] | string | undefined | null): string {
  if (!value) return "[]";
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return JSON.stringify(parsed);
    } catch {
      return JSON.stringify(
        value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }
  }
  return JSON.stringify(value);
}

export function formatDateLabel(value?: string | null) {
  if (!value) return "";
  return value;
}
