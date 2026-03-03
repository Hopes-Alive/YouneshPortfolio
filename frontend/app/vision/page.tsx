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
  const [stars, setStars] = useState<Array<{
    id: number; x: number; y: number; size: number; duration: number; delay: number;
  }>>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {/* Aurora */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(156,111,255,0.06) 50%, rgba(100,50,255,0.04) 100%)" }} />
    </div>
  );
}

export default function VisionPage() {
  return (
    <PageTransition themeId="vision">
      <div className="relative page-wrapper min-h-screen overflow-hidden">
        <StarField />
        {/* Central glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(156,111,255,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.div
              className="inline-block mb-5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Rocket size={38} style={{ color: "var(--accent)" }} />
            </motion.div>
            <motion.h1
              className="text-5xl md:text-8xl font-heading font-bold mb-6 leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ color: "var(--text-primary)" }}>My </span>
              <span
                className="text-gradient"
                style={{ backgroundImage: "linear-gradient(135deg, #9c6fff 0%, #c4a0ff 50%, #9c6fff 100%)" }}
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

          {/* Vision pillars */}
          <div className="space-y-8">
            {visionPillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon] || Rocket;
              return (
                <motion.section
                  key={pillar.id}
                  className="relative p-8 md:p-12 rounded-3xl border overflow-hidden"
                  style={{ background: "rgba(156,111,255,0.03)", borderColor: "rgba(156,111,255,0.12)" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ borderColor: "rgba(156,111,255,0.3)", background: "rgba(156,111,255,0.05)" }}
                >
                  {/* Glow on hover */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(156,111,255,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />

                  <div className="flex items-start gap-6 relative">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(156,111,255,0.1)", color: "var(--accent)" }}
                    >
                      <Icon size={26} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest font-medium mb-1" style={{ color: "var(--accent)" }}>
                        {pillar.subtitle}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                        {pillar.title}
                      </h2>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                        {pillar.description}
                      </p>
                      <ul className="space-y-3">
                        {pillar.items.map((item: string, j: number) => (
                          <motion.li
                            key={j}
                            className="flex items-center gap-3 text-sm"
                            style={{ color: "var(--text-primary)" }}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)" }} />
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
