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
  { icon: Terminal, label: "Full-Stack Dev", value: "5+ Projects" },
  { icon: GitBranch, label: "Open Source", value: "Active" },
  { icon: Layers, label: "AI/ML Models", value: "10+ Built" },
  { icon: Zap, label: "APIs Deployed", value: "Production" },
];

export default function AIDevelopmentPage() {
  return (
    <PageTransition themeId="ai">
      <div className="relative pt-32 pb-24 px-6 scanline">
        {/* Terminal-style grid overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-mono border"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
                backgroundColor: "rgba(0,255,136,0.05)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              &gt; current_role.execute()
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
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
              className="text-lg max-w-2xl mx-auto font-mono"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Building intelligent systems, crafting clean code, and deploying
              solutions that scale.
            </motion.p>
          </div>

          {/* Highlight stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl border text-center"
                style={{
                  backgroundColor: "rgba(0,255,136,0.03)",
                  borderColor: "rgba(0,255,136,0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon
                  size={28}
                  className="mx-auto mb-3"
                  style={{ color: "var(--accent)" }}
                />
                <p className="text-2xl font-heading font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Projects */}
          <section className="mb-24">
            <SectionHeading
              title="Projects"
              subtitle="A selection of what I've built"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {aiSkills && (
            <section>
              <SectionHeading
                title="Tech Stack"
                subtitle="Technologies I work with daily"
              />
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
