import Link from "next/link";
import {
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Mail,
  MessageSquare,
  Microscope,
  Newspaper,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

async function getCounts() {
  const [
    experience,
    education,
    projects,
    blog,
    research,
    publications,
    messages,
    unreadMessages,
  ] = await Promise.all([
    prisma.experience.count(),
    prisma.education.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.research.count(),
    prisma.publication.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return {
    experience,
    education,
    projects,
    blog,
    research,
    publications,
    messages,
    unreadMessages,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const statCards = [
    { label: "Experience", value: counts.experience, icon: Briefcase, href: "/admin/experience" },
    { label: "Education", value: counts.education, icon: GraduationCap, href: "/admin/education" },
    { label: "Projects", value: counts.projects, icon: FileText, href: "/admin/projects" },
    { label: "Blog Posts", value: counts.blog, icon: Newspaper, href: "/admin/blog" },
    { label: "Research", value: counts.research, icon: Microscope, href: "/admin/research" },
    { label: "Publications", value: counts.publications, icon: Award, href: "/admin/publications" },
    { label: "Messages", value: counts.messages, icon: MessageSquare, href: "/admin/contact" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back. Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-brand-50 p-2.5 text-brand-600 dark:bg-brand-900/30">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {card.value}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-600 group-hover:text-brand-700 dark:text-slate-300">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-600" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent Messages</h2>
          </div>
          {counts.unreadMessages > 0 && (
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
              {counts.unreadMessages} unread
            </span>
          )}
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {recentMessages.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No messages yet.</p>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {msg.name}
                    {!msg.read && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-brand-500" />
                    )}
                  </p>
                  <p className="truncate text-sm text-slate-500">{msg.subject || msg.message}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-slate-200 px-5 py-3 dark:border-slate-800">
          <Link
            href="/admin/contact"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all messages →
          </Link>
        </div>
      </div>
    </div>
  );
}
