"use client";

import { motion } from "framer-motion";
import { Sparkles, Sofa, Lightbulb, Eye } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import SkillBar from "@/components/shared/SkillBar";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const interiorProjects = projects.filter((p) => p.category === "interior");
const interiorSkills = skillGroups.find((g) => g.themeId === "interior");

const philosophies = [
  {
    icon: Eye,
    title: "Aesthetic Vision",
    description: "Each space tells a story through carefully curated visual harmony and balance.",
  },
  {
    icon: Sofa,
    title: "Comfort & Livability",
    description: "Beautiful spaces that people actually want to live and work in every day.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Mastery",
    description: "Light transforms mood — natural and artificial illumination designed with intention.",
  },
  {
    icon: Sparkles,
    title: "Material Craft",
    description: "Textures, fabrics, and finishes selected to create sensory-rich environments.",
  },
];

export default function InteriorDesignPage() {
  return (
    <PageTransition themeId="interior">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-4 text-xs uppercase tracking-[0.4em] font-medium"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Spaces that inspire
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Interior
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>Design</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transforming empty rooms into living experiences. Every material
              choice, every light angle, every piece of furniture — intentional.
            </motion.p>
          </div>

          {/* Design Philosophy */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {philosophies.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex gap-5 p-8 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "rgba(128,128,128,0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(200,149,108,0.1)", color: "var(--accent)" }}
                  >
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Portfolio */}
          <section className="mb-24">
            <SectionHeading title="Portfolio" subtitle="Selected interior design projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {interiorProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {interiorSkills && (
            <section>
              <SectionHeading title="Design Skills" subtitle="Tools and techniques in my repertoire" />
              <div className="max-w-2xl mx-auto">
                {interiorSkills.skills.map((skill, i) => (
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
