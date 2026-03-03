"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { label: "About",    href: "/about" },
  { label: "Vision",   href: "/vision" },
  { label: "Contact",  href: "/contact" },
];

const disciplines = [
  { label: "AI & Software",   href: "/ai-development" },
  { label: "Data Science",    href: "/data-science" },
  { label: "Engineering",     href: "/engineering" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Dance",           href: "/dance" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0a18 0%, #00000a 100%)",
        borderTop: "1px solid rgba(108,99,255,0.1)",
        color: "var(--text-secondary)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/">
              <motion.div className="flex items-center gap-2.5 mb-4 w-fit" whileHover={{ scale: 1.03 }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm text-white"
                  style={{
                    background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
                    boxShadow: "0 0 16px rgba(108,99,255,0.3)",
                  }}
                >
                  Y
                </div>
                <span className="font-bold text-base" style={{ color: "#f0f0ff" }}>
                  Younesh
                </span>
              </motion.div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(120,120,160,0.9)" }}>
              Multi-disciplinary creator building at the intersection of
              AI, design, engineering, and movement.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
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
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: "rgba(108,99,255,0.2)",
                    color: "rgba(120,120,160,0.9)",
                    background: "rgba(108,99,255,0.04)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(108,99,255,0.6)",
                    color: "#6c63ff",
                    background: "rgba(108,99,255,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "rgba(108,99,255,0.7)" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors flex items-center gap-1.5 w-fit group"
                    style={{ color: "rgba(120,120,160,0.9)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f0f0ff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(120,120,160,0.9)"; }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "rgba(108,99,255,0.7)" }}>
              Disciplines
            </p>
            <ul className="space-y-3">
              {disciplines.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors flex items-center gap-1.5 w-fit group"
                    style={{ color: "rgba(120,120,160,0.9)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f0f0ff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(120,120,160,0.9)"; }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="text-xs" style={{ color: "rgba(80,80,110,1)" }}>
          &copy; {new Date().getFullYear()} Younesh. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "rgba(80,80,110,1)" }}>
          Built with precision &amp; passion
        </p>
      </div>
    </footer>
  );
}
