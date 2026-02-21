"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.h2
        className="text-4xl md:text-5xl font-heading font-bold"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="mt-6 h-1 w-20 rounded-full mx-auto"
        style={{ backgroundColor: "var(--accent)" }}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </div>
  );
}
