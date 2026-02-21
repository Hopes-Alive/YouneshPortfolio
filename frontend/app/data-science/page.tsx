"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, Brain, PieChart } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import SkillBar from "@/components/shared/SkillBar";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const dsProjects = projects.filter((p) => p.category === "datascience");
const dsSkills = skillGroups.find((g) => g.themeId === "datascience");

const metrics = [
  { icon: Database, label: "Datasets Analyzed", value: "50+" },
  { icon: TrendingUp, label: "Models Trained", value: "30+" },
  { icon: Brain, label: "Deep Learning", value: "NLP & CV" },
  { icon: PieChart, label: "Dashboards Built", value: "15+" },
];

export default function DataSciencePage() {
  return (
    <PageTransition themeId="datascience">
      <div className="relative pt-32 pb-24 px-6 data-grid">
        {/* Decorative chart lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1200 200">
            <motion.path
              d="M0,150 Q150,50 300,120 T600,80 T900,100 T1200,60"
              fill="none"
              stroke="#ff6b35"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5 }}
            />
            <motion.path
              d="M0,180 Q200,100 400,140 T800,90 T1200,110"
              fill="none"
              stroke="#00bcd4"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.8 }}
            />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-mono border"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
                backgroundColor: "rgba(255,107,53,0.05)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              data_pipeline.running
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
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
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Turning raw data into actionable insights. Building models that
              predict, classify, and illuminate.
            </motion.p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl border text-center"
                style={{
                  backgroundColor: "rgba(255,107,53,0.03)",
                  borderColor: "rgba(255,107,53,0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
                <p className="text-2xl font-heading font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Projects */}
          <section className="mb-24">
            <SectionHeading title="Data Projects" subtitle="Analytical work and ML solutions" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dsProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Skills */}
          {dsSkills && (
            <section>
              <SectionHeading title="Data Toolkit" subtitle="Tools and technologies I leverage" />
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
