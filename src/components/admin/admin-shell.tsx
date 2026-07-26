"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  FileText,
  GraduationCap,
  Heart,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Microscope,
  Newspaper,
  Settings,
  Share2,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/preview", label: "Preview Site", icon: ExternalLink },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/profile", label: "Profile", icon: User },
      { href: "/admin/about", label: "About", icon: BookOpen },
      { href: "/admin/experience", label: "Experience", icon: Briefcase },
      { href: "/admin/education", label: "Education", icon: GraduationCap },
      { href: "/admin/skills", label: "Skills", icon: Sparkles },
      { href: "/admin/research", label: "Research", icon: Microscope },
      { href: "/admin/publications", label: "Publications", icon: FileText },
      { href: "/admin/projects", label: "Projects", icon: FolderOpen },
      { href: "/admin/leadership", label: "Leadership", icon: Users },
      { href: "/admin/certifications", label: "Certifications", icon: Trophy },
      { href: "/admin/awards", label: "Awards", icon: Award },
      { href: "/admin/volunteer", label: "Volunteer", icon: Heart },
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/gallery", label: "Gallery", icon: Camera },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/contact", label: "Contact", icon: Mail },
      { href: "/admin/social", label: "Social Links", icon: Share2 },
      { href: "/admin/media", label: "Media Library", icon: Image },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-canvas dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Portfolio CMS</p>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition",
                          active
                            ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
          <div className="lg:hidden">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Portfolio CMS</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500">{session?.user?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </SessionProvider>
  );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return (
      <SessionProvider>
        {children}
        <Toaster position="top-right" richColors />
      </SessionProvider>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
