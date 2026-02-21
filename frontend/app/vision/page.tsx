"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Compass, Lightbulb, Globe, type LucideIcon } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { visionPillars } from "@/data/vision";

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  compass: Compass,
  lightbulb: Lightbulb,
  globe: Globe,
};

function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {/* Aurora gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 opacity-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(124,77,255,0.15) 50%, rgba(100,50,255,0.1) 100%)",
        }}
      />
    </div>
  );
}

export default function VisionPage() {
  return (
    <PageTransition themeId="vision">
      <div className="relative pt-32 pb-24 px-6 min-h-screen">
        <StarField />

        <div className="relative max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Rocket size={40} style={{ color: "var(--accent)" }} />
            </motion.div>
            <motion.h1
              className="text-5xl md:text-8xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ color: "var(--text-primary)" }}>My </span>
              <span
                className="text-gradient"
                style={{
                  backgroundImage: "linear-gradient(135deg, #7c4dff 0%, #b388ff 50%, #7c4dff 100%)",
                }}
              >
                Vision
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Every discipline I&apos;ve explored has led to this moment.
              Here&apos;s where I&apos;m heading — and why.
            </motion.p>
          </div>

          {/* Vision Pillars */}
          <div className="space-y-16">
            {visionPillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon] || Rocket;
              return (
                <motion.section
                  key={pillar.id}
                  className="relative p-8 md:p-12 rounded-3xl border"
                  style={{
                    backgroundColor: "rgba(124,77,255,0.03)",
                    borderColor: "rgba(124,77,255,0.12)",
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(124,77,255,0.1)", color: "var(--accent)" }}
                    >
                      <Icon size={28} />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-xs uppercase tracking-widest font-medium mb-1"
                        style={{ color: "var(--accent)" }}
                      >
                        {pillar.subtitle}
                      </p>
                      <h2
                        className="text-2xl md:text-3xl font-heading font-bold mb-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {pillar.title}
                      </h2>
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {pillar.description}
                      </p>
                      <ul className="space-y-3">
                        {pillar.items.map((item, j) => (
                          <motion.li
                            key={j}
                            className="flex items-center gap-3 text-sm"
                            style={{ color: "var(--text-primary)" }}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: "var(--accent)" }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
