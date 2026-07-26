"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Check, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaAsset = {
  id: string;
  url: string;
  alt?: string | null;
  originalName: string;
  mimeType: string;
};

type MediaPickerProps = {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
};

export function MediaPicker({
  value,
  onChange,
  folder = "general",
  label = "Media",
  className,
}: MediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) setAssets(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) fetchAssets();
  }, [open, fetchAssets]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`/api/upload?folder=${folder}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const asset = await res.json();
        onChange(asset.url);
        setOpen(false);
        fetchAssets();
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700">
            {value.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) ? (
              <Image src={value} alt="" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <ImageIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-600 dark:bg-slate-800">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            Choose media
          </button>
          <label className="cursor-pointer rounded-xl bg-brand-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700">
            {uploading ? (
              <span className="inline-flex items-center gap-1">
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Upload className="h-4 w-4" /> Upload
              </span>
            )}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white">Media Library</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        onChange(asset.url);
                        setOpen(false);
                      }}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-slate-100 transition hover:border-brand-500",
                        value === asset.url && "border-brand-500 ring-2 ring-brand-200"
                      )}
                    >
                      {asset.mimeType.startsWith("image/") ? (
                        <Image
                          src={asset.url}
                          alt={asset.alt || asset.originalName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-2 text-xs text-slate-500">
                          {asset.originalName}
                        </div>
                      )}
                      {value === asset.url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-600/20">
                          <Check className="h-6 w-6 text-brand-700" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
