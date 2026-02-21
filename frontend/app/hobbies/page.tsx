"use client";

import { motion } from "framer-motion";
import {
  Camera,
  BookOpen,
  Mountain,
  Utensils,
  Gamepad2,
  Plane,
  Music,
  Paintbrush,
} from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";

const hobbies = [
  {
    icon: Camera,
    title: "Photography",
    description: "Capturing moments and perspectives through the lens — street, architecture, and nature.",
    color: "#6c5ce7",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description: "From science fiction to philosophy — books shape how I think about the world.",
    color: "#00b894",
  },
  {
    icon: Mountain,
    title: "Hiking & Nature",
    description: "Finding clarity in the mountains — where the best ideas happen.",
    color: "#fdcb6e",
  },
  {
    icon: Utensils,
    title: "Cooking",
    description: "Experimenting with flavors and cuisines — another form of creative expression.",
    color: "#e17055",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "Strategy games and immersive worlds — entertainment meets problem-solving.",
    color: "#0984e3",
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Experiencing cultures, architectures, and perspectives from around the globe.",
    color: "#00cec9",
  },
  {
    icon: Music,
    title: "Music",
    description: "Listening, discovering, and sometimes creating — rhythm is everywhere.",
    color: "#fd79a8",
  },
  {
    icon: Paintbrush,
    title: "Sketching",
    description: "Quick sketches and doodles — keeping the creative muscle active daily.",
    color: "#a29bfe",
  },
];

export default function HobbiesPage() {
  return (
    <PageTransition themeId="hobbies">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hobbies
              <br />
              <span style={{ color: "var(--accent)" }}>& Beyond</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The things I do for fun often end up informing everything else.
              Creativity doesn&apos;t punch a clock.
            </motion.p>
          </div>

          {/* Hobby Grid */}
          <SectionHeading title="What I Love" subtitle="The interests that keep life interesting" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, i) => (
              <motion.div
                key={hobby.title}
                className="group relative p-6 rounded-2xl border cursor-default overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "rgba(128,128,128,0.1)",
                }}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                whileHover={{
                  y: -8,
                  rotate: 1,
                  borderColor: hobby.color,
                  transition: { duration: 0.25 },
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${hobby.color}15`, color: hobby.color }}
                >
                  <hobby.icon size={24} />
                </div>
                <h3
                  className="text-lg font-heading font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {hobby.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {hobby.description}
                </p>

                {/* Playful background circle */}
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: hobby.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
