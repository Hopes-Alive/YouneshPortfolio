"use client";

import { motion } from "framer-motion";
import { Compass, Ruler, HardHat, Building } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import SkillBar from "@/components/shared/SkillBar";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const engProjects = projects.filter((p) => p.category === "engineering");
const engSkills = skillGroups.find((g) => g.themeId === "engineering");

const principles = [
  { icon: Compass, title: "Precision",     description: "Every structure demands exactitude — from load calculations to material specs." },
  { icon: Ruler,   title: "Form & Function", description: "Architecture where beauty and structural integrity are inseparable." },
  { icon: HardHat, title: "Safety First",  description: "Engineering with rigorous adherence to codes, standards, and human safety." },
  { icon: Building,title: "Sustainable",   description: "Designing with environmental responsibility and long-term impact in mind." },
];

export default function EngineeringPage() {
  return (
    <PageTransition themeId="engineering">
      <div className="relative page-wrapper overflow-hidden blueprint-grid">
        {/* Corner marks */}
        {[
          "top-24 left-6 border-l-2 border-t-2",
          "top-24 right-6 border-r-2 border-t-2",
          "bottom-6 left-6 border-l-2 border-b-2",
          "bottom-6 right-6 border-r-2 border-b-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-14 h-14 opacity-20 ${cls}`} style={{ borderColor: "var(--accent)" }} />
        ))}

        {/* Glow */}
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(79,195,247,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="page-hero-badge"
              style={{ borderColor: "rgba(79,195,247,0.3)", color: "var(--accent)", background: "rgba(79,195,247,0.04)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Drawing No. CE-001 — Rev. A
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Civil Engineering
              <br />
              <span style={{ color: "var(--accent)" }}>&amp; Architecture</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Designing structures that stand the test of time — where engineering
              precision meets architectural vision.
            </motion.p>
          </div>

          {/* Principles */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {principles.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-6 rounded-xl border"
                  style={{ background: "rgba(79,195,247,0.02)", borderColor: "rgba(79,195,247,0.12)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ borderColor: "rgba(79,195,247,0.4)", background: "rgba(79,195,247,0.05)" }}
                >
                  <item.icon size={30} className="mb-4" style={{ color: "var(--accent)" }} />
                  <h3 className="text-lg font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-24">
            <SectionHeading title="Built Works" subtitle="Selected engineering and architecture projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {engProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {engSkills && (
            <section>
              <SectionHeading title="Technical Proficiency" subtitle="Engineering tools and expertise" />
              <div className="max-w-2xl mx-auto">
                {engSkills.skills.map((skill, i) => (
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
