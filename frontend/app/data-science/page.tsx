"use client";

import { motion } from "framer-motion";
import { TrendingUp, Database, BrainCircuit, FlaskConical } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import SkillBar from "@/components/shared/SkillBar";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const dsProjects = projects.filter((p) => p.category === "datascience");
const dsSkills = skillGroups.find((g) => g.themeId === "datascience");

const highlights = [
  { icon: Database,     label: "Datasets Processed", value: "50+" },
  { icon: BrainCircuit, label: "ML Models Trained",   value: "15+" },
  { icon: TrendingUp,   label: "Accuracy Avg",        value: "94%" },
  { icon: FlaskConical, label: "Experiments Run",     value: "200+" },
];

export default function DataSciencePage() {
  return (
    <PageTransition themeId="datascience">
      <div className="relative page-wrapper overflow-hidden data-grid">
        {/* Glow orbs */}
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,53,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="page-hero-badge"
              style={{ borderColor: "rgba(255,107,53,0.3)", color: "var(--accent)", background: "rgba(255,107,53,0.05)" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Extracting Signal from Noise
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Data
              <br />
              <span style={{ color: "var(--accent)" }}>Science</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "'IBM Plex Mono', monospace" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Turning raw data into actionable intelligence through rigorous
              analysis, modeling, and visualization.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl text-center border"
                style={{ background: "rgba(255,107,53,0.02)", borderColor: "rgba(255,107,53,0.12)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(255,107,53,0.4)", background: "rgba(255,107,53,0.05)" }}
              >
                <item.icon size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
                <p className="text-2xl font-heading font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Projects */}
          <section className="mb-24">
            <SectionHeading title="Projects" subtitle="Data-driven solutions I've built" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dsProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {dsSkills && (
            <section>
              <SectionHeading title="Tools & Languages" subtitle="My data science toolkit" />
              <div className="max-w-2xl mx-auto">
                {dsSkills.skills.map((skill, i) => (
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
