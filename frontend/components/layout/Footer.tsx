"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "rgba(128,128,128,0.15)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-bold text-lg" style={{ color: "var(--accent)" }}>
            {siteConfig.name}
          </span>
          <p className="text-sm mt-1 opacity-70">
            Multi-Disciplinary Creator & Technologist
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 opacity-60 transition-opacity"
            aria-label="GitHub"
          >
            <Github size={20} />
          </Link>
          <Link
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 opacity-60 transition-opacity"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href={`mailto:${siteConfig.socials.email}`}
            className="hover:opacity-100 opacity-60 transition-opacity"
            aria-label="Email"
          >
            <Mail size={20} />
          </Link>
        </div>

        <p className="text-sm opacity-50">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
