"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { isSectionVisible, type VisibleSections } from "@/lib/sections";

const navLinks = [
  { href: "#about", label: "About", key: "about" },
  { href: "#journey", label: "Journey", key: "journey" },
  { href: "#research", label: "Research", key: "research" },
  { href: "#projects", label: "Seeds", key: "projects" },
  { href: "#skills", label: "Skills", key: "skills" },
  { href: "#certifications", label: "Certifications", key: "certifications" },
  { href: "#awards", label: "Awards", key: "awards" },
  { href: "#volunteer", label: "Volunteer", key: "volunteer" },
  { href: "#gallery", label: "Gallery", key: "gallery" },
  { href: "#testimonials", label: "Testimonials", key: "testimonials" },
  { href: "#blog", label: "Blog", key: "blog" },
  { href: "#contact", label: "Contact", key: "contact" },
];

type NavbarProps = {
  siteName: string;
  visibleSections?: VisibleSections;
};

export function Navbar({ siteName, visibleSections = {} }: NavbarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const filteredLinks = useMemo(
    () =>
      navLinks.filter((link) =>
        link.key === "journey"
          ? ["education", "experience", "leadership"].some((key) =>
              isSectionVisible(visibleSections, key)
            )
          : isSectionVisible(visibleSections, link.key)
      ),
    [visibleSections]
  );

  const primaryLinks = filteredLinks.slice(0, 6);
  const moreLinks = filteredLinks.slice(6);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav shadow-soft" : "bg-transparent"
        )}
      >
        <nav className="section-container flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-ink dark:text-white"
          >
            {siteName.split(" ")[0]}
            <span className="text-brand">.</span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-ink dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            {moreLinks.length > 0 ? (
              <details className="relative">
                <summary className="cursor-pointer list-none rounded-lg px-2.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-ink dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  More
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-xl border border-gray-200 bg-white p-2 shadow-card dark:border-gray-700 dark:bg-gray-800">
                  {moreLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-ink dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </details>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-ink transition-colors hover:border-brand/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="h-10 w-10 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800" />
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-ink xl:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-[80] w-full max-w-sm border-l border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900 xl:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-semibold text-ink dark:text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto">
                {filteredLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
