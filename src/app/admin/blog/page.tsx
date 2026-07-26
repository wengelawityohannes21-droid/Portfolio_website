"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  excerpt?: string;
  updatedAt: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) setPosts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async () => {
    const title = "Untitled Post";
    const slug = `post-${Date.now()}`;
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, status: "draft", content: "" }),
    });
    if (res.ok) {
      const post = await res.json();
      window.location.href = `/admin/blog/${post.id}`;
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    toast.success("Post deleted");
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Blog</h1>
          <p className="mt-1 text-sm text-slate-500">Manage blog posts and articles</p>
        </div>
        <button
          type="button"
          onClick={createPost}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
          No posts yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="font-medium text-slate-900 hover:text-brand-600 dark:text-white"
                >
                  {post.title}
                </Link>
                <p className="truncate text-sm text-slate-500">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    post.status === "published"
                      ? "bg-brand-50 text-brand-700"
                      : post.status === "scheduled"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                  )}
                >
                  {post.status}
                </span>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => deletePost(post.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
