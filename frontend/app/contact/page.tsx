"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin, Zap } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",        value: siteConfig.socials.email,  href: `mailto:${siteConfig.socials.email}` },
    { icon: MapPin, label: "Location",     value: "Available Worldwide",     href: null },
    { icon: Zap,    label: "Availability", value: "Open to opportunities",   href: null },
  ];

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(91,140,255,0.15)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
  };

  return (
    <PageTransition themeId="contact">
      <div className="page-wrapper overflow-hidden relative">
        {/* Glow */}
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(91,140,255,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(91,140,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let&apos;s
              <span style={{ color: "var(--accent)" }}> Connect</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Whether you have a project in mind, want to collaborate, or just
              want to say hello — I&apos;d love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>Name</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      required placeholder="Your name"
                      style={inputBase}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,140,255,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>Email</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      required placeholder="your@email.com"
                      style={inputBase}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,140,255,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>Subject</label>
                  <input
                    type="text" name="subject" value={formData.subject} onChange={handleChange}
                    required placeholder="What's this about?"
                    style={inputBase}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,140,255,0.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>Message</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    required rows={6} placeholder="Tell me about your project or idea..."
                    style={{ ...inputBase, resize: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,140,255,0.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(91,140,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: submitted
                      ? "linear-gradient(135deg, #00b894 0%, #00cec9 100%)"
                      : "linear-gradient(135deg, #5b8cff 0%, #7c6ee8 100%)",
                    boxShadow: "0 8px 24px rgba(91,140,255,0.25)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(91,140,255,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? "Message Sent! ✓" : (<><Send size={15} /> Send Message</>)}
                </motion.button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(91,140,255,0.1)", color: "var(--accent)" }}
                  >
                    <info.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-secondary)" }}>{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-sm font-semibold hover:underline" style={{ color: "var(--text-primary)" }}>{info.value}</a>
                    ) : (
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-6" style={{ borderTop: "1px solid rgba(91,140,255,0.1)" }}>
                <p className="text-xs font-medium mb-4" style={{ color: "var(--text-secondary)" }}>Find me online</p>
                <div className="flex gap-3">
                  {[
                    { href: siteConfig.socials.github,   icon: Github,   label: "GitHub" },
                    { href: siteConfig.socials.linkedin,  icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${siteConfig.socials.email}`, icon: Mail, label: "Email" },
                  ].map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{ border: "1px solid rgba(91,140,255,0.15)", color: "var(--text-secondary)" }}
                      whileHover={{ scale: 1.1, borderColor: "rgba(91,140,255,0.5)", color: "var(--accent)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <s.icon size={17} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
