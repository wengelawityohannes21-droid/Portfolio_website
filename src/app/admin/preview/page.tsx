"use client";

import { ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function AdminPreviewPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Site Preview</h1>
          <p className="mt-1 text-sm text-slate-500">Live preview of your portfolio homepage</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            <ExternalLink className="h-4 w-4" /> Open in new tab
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <iframe
          key={key}
          src="/"
          title="Site Preview"
          className="h-[calc(100vh-12rem)] w-full bg-white"
        />
      </div>
    </div>
  );
}
