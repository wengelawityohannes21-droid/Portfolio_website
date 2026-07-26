"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

type MediaAsset = {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  folder: string;
  createdAt: string;
};

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("general");

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
    fetchAssets();
  }, [fetchAssets]);

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
      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.error || "Upload failed");
      }
      toast.success("Uploaded");
      fetchAssets();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const deleteAsset = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (response.ok) {
      fetchAssets();
      toast.success("Deleted");
    } else {
      toast.error("Could not delete this file");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Media Library</h1>
          <p className="mt-1 text-sm text-slate-500">Upload and manage media assets</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="general">General</option>
            <option value="profile">Profile</option>
            <option value="education">Education</option>
            <option value="experience">Experience</option>
            <option value="leadership">Leadership</option>
            <option value="research">Research</option>
            <option value="projects">Projects</option>
            <option value="skills">Skills</option>
            <option value="certificates">Certificates</option>
            <option value="awards">Awards</option>
            <option value="volunteer">Volunteer</option>
            <option value="testimonials">Testimonials</option>
            <option value="blog">Blog</option>
            <option value="gallery">Gallery</option>
            <option value="documents">Documents</option>
          </select>
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      ) : assets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
          No media uploaded yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                {asset.mimeType.startsWith("image/") ? (
                  <Image src={asset.url} alt={asset.originalName} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center p-4 text-sm text-slate-500">
                    {asset.originalName}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {asset.originalName}
                </p>
                <p className="text-xs text-slate-500">
                  {asset.folder} · {formatSize(asset.size)}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <code className="truncate text-xs text-brand-600">{asset.url}</code>
                  <button
                    type="button"
                    onClick={() => deleteAsset(asset.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
