"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/shared/SectionHeading";
import Timeline from "@/components/shared/Timeline";
import { timelineEvents } from "@/data/timeline";

const values = [
  {
    title: "Curiosity-Driven",
    description:
      "Every career shift was driven by an insatiable curiosity to explore new domains and find unexpected connections.",
  },
  {
    title: "Human-Centered",
    description:
      "Whether designing a building or an algorithm, the end goal is always improving people's experience.",
  },
  {
    title: "Cross-Pollinating",
    description:
      "The best ideas come from combining insights across disciplines — dance informs design, engineering informs code.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition themeId="about">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-24">
            <motion.p
              className="text-sm uppercase tracking-[0.3em] font-medium mb-4"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The Story So Far
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              From rhythmic dance floors to structural blueprints to AI algorithms
              — my journey is anything but conventional. Each chapter taught me
              something the next one needed.
            </motion.p>
          </div>

          {/* Values */}
          <section className="mb-32">
            <SectionHeading title="What Drives Me" subtitle="Core values that connect every chapter" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="p-8 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "rgba(128,128,128,0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3
                    className="text-xl font-heading font-bold mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <SectionHeading
              title="My Journey"
              subtitle="A timeline of reinvention and growth"
            />
            <Timeline events={timelineEvents} />
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
