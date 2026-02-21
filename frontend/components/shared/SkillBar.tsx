"use client";

import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--text-secondary)" }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(128,128,128,0.15)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
