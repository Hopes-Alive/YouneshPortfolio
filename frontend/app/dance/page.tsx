"use client";

import { motion } from "framer-motion";
import { Heart, Users, Star, Mic2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import SkillBar from "@/components/shared/SkillBar";
import { skillGroups } from "@/data/skills";

const danceSkills = skillGroups.find((g) => g.themeId === "dance");

const danceHighlights = [
  { icon: Users, value: "200+", label: "Students Taught" },
  { icon: Star, value: "5+", label: "Years Teaching" },
  { icon: Mic2, value: "20+", label: "Performances" },
  { icon: Heart, value: "100%", label: "Passion" },
];

const danceStyles = [
  {
    name: "Contemporary",
    description: "Fluid movement exploring emotion and storytelling through the body.",
  },
  {
    name: "Hip-Hop",
    description: "High-energy street dance with rhythm, precision, and attitude.",
  },
  {
    name: "Classical",
    description: "Traditional forms rooted in discipline, grace, and cultural heritage.",
  },
  {
    name: "Freestyle",
    description: "Improvisational expression — where instinct meets rhythm in real-time.",
  },
];

export default function DancePage() {
  return (
    <PageTransition themeId="dance">
      <div className="relative pt-32 pb-24 px-6 dance-gradient overflow-hidden">
        {/* Flowing curve decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
            <motion.path
              d="M-100,400 C200,100 400,700 700,300 S1000,600 1300,200"
              fill="none"
              stroke="#ff4081"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.3 }}
            />
            <motion.path
              d="M-50,600 C150,200 500,800 800,350 S1100,500 1350,150"
              fill="none"
              stroke="#e040fb"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.6 }}
            />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1
              className="text-6xl md:text-8xl font-heading font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              Dance
            </motion.h1>
            <motion.p
              className="text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Where it all began. Dance taught me discipline, expression,
              connection — and the courage to move through life with intention.
            </motion.p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {danceHighlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-2xl text-center border"
                style={{
                  backgroundColor: "rgba(255,64,129,0.05)",
                  borderColor: "rgba(255,64,129,0.15)",
                }}
                initial={{ opacity: 0, y: 30, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              >
                <item.icon size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
                <p className="text-3xl font-heading font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Dance Styles */}
          <section className="mb-24">
            <SectionHeading title="Dance Styles" subtitle="Genres I teach and perform" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {danceStyles.map((style, i) => (
                <motion.div
                  key={style.name}
                  className="group relative p-8 rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,64,129,0.03)",
                    borderColor: "rgba(255,64,129,0.12)",
                  }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ borderColor: "#ff4081" }}
                >
                  <h3 className="text-2xl font-heading font-bold mb-3" style={{ color: "var(--accent)" }}>
                    {style.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {style.description}
                  </p>
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills */}
          {danceSkills && (
            <section>
              <SectionHeading title="Dance Expertise" subtitle="Skills honed through years of practice" />
              <div className="max-w-2xl mx-auto">
                {danceSkills.skills.map((skill, i) => (
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
