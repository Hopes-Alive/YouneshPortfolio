"use client";

import { motion } from "framer-motion";
import { Terminal, GitBranch, Layers, Zap } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import SkillBar from "@/components/shared/SkillBar";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const aiProjects = projects.filter((p) => p.category === "ai");
const aiSkills = skillGroups.find((g) => g.themeId === "ai");

const highlights = [
  { icon: Terminal, label: "Full-Stack Dev",  value: "5+ Projects" },
  { icon: GitBranch, label: "Open Source",   value: "Active" },
  { icon: Layers, label: "AI/ML Models",     value: "10+ Built" },
  { icon: Zap, label: "APIs Deployed",       value: "Production" },
];

export default function AIDevelopmentPage() {
  return (
    <PageTransition themeId="ai">
      <div className="relative page-wrapper scanline overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow orbs */}
        <div className="orb-teal w-96 h-96 -top-32 -right-32" />
        <div className="orb-teal w-80 h-80 bottom-20 left-10" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="page-hero-badge"
              style={{ borderColor: "rgba(0,255,136,0.3)", color: "var(--accent)", background: "rgba(0,255,136,0.05)" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="font-mono text-[10px]">&gt; current_role.execute()</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              AI & Software
              <br />
              <span style={{ color: "var(--accent)" }}>Development</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto font-mono leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Building intelligent systems, crafting clean code, and deploying
              solutions that scale.
            </motion.p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl text-center border relative overflow-hidden group"
                style={{
                  background: "rgba(0,255,136,0.02)",
                  borderColor: "rgba(0,255,136,0.12)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(0,255,136,0.4)", background: "rgba(0,255,136,0.05)" }}
              >
                <item.icon size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
                <p className="text-2xl font-heading font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Projects */}
          <section className="mb-24">
            <SectionHeading title="Projects" subtitle="A selection of what I've built" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {aiSkills && (
            <section>
              <SectionHeading title="Tech Stack" subtitle="Technologies I work with daily" />
              <div className="max-w-2xl mx-auto">
                {aiSkills.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
