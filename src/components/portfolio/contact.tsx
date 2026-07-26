"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { z } from "zod";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import type { ProfileData } from "@/types/portfolio";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactProps = {
  profile: ProfileData;
};

export function Contact({ profile }: ContactProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Failed to send message");
      }

      toast.success("Message sent successfully. I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    { href: profile.linkedinUrl, icon: FaLinkedin, label: "LinkedIn" },
    { href: profile.githubUrl, icon: FaGithub, label: "GitHub" },
    { href: profile.twitterUrl, icon: FaTwitter, label: "Twitter" },
    { href: profile.instagramUrl, icon: FaInstagram, label: "Instagram" },
  ].filter((link) => link.href);

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect"
          description="Open to collaborations, research opportunities, speaking engagements, and meaningful partnerships."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card-surface h-full">
              <h3 className="text-lg font-semibold text-ink dark:text-white">
                Get in touch
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Whether you&apos;re exploring a research collaboration, leadership
                initiative, or entrepreneurial partnership, I&apos;d love to hear from
                you.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-brand"
                  >
                    {profile.email}
                  </a>
                </li>
                {profile.phone ? (
                  <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <a href={`tel:${profile.phone}`} className="hover:text-brand">
                      {profile.phone}
                    </a>
                  </li>
                ) : null}
                {profile.location ? (
                  <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {profile.location}
                  </li>
                ) : null}
              </ul>

              {socialLinks.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-ink transition-colors hover:border-brand hover:text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-surface space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-ink dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-ink dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-ink dark:text-white"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="How can I help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message ? (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
