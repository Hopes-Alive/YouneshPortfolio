"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  BarChart3,
  Building2,
  Palette,
  Music,
  Gamepad2,
  Rocket,
  Mail,
} from "lucide-react";

const cards = [
  {
    title: "AI & Software",
    description: "Building intelligent systems with modern tech stacks",
    href: "/ai-development",
    icon: Cpu,
    color: "#00ff88",
    bgGlow: "rgba(0,255,136,0.1)",
  },
  {
    title: "Data Science",
    description: "Extracting insights and building predictive models",
    href: "/data-science",
    icon: BarChart3,
    color: "#ff6b35",
    bgGlow: "rgba(255,107,53,0.1)",
  },
  {
    title: "Engineering",
    description: "Structural design and architectural vision",
    href: "/engineering",
    icon: Building2,
    color: "#4fc3f7",
    bgGlow: "rgba(79,195,247,0.1)",
  },
  {
    title: "Interior Design",
    description: "Transforming spaces into experiences",
    href: "/interior-design",
    icon: Palette,
    color: "#c8956c",
    bgGlow: "rgba(200,149,108,0.1)",
  },
  {
    title: "Dance",
    description: "Expression through movement and rhythm",
    href: "/dance",
    icon: Music,
    color: "#ff4081",
    bgGlow: "rgba(255,64,129,0.1)",
  },
  {
    title: "Hobbies",
    description: "The eclectic interests that fuel creativity",
    href: "/hobbies",
    icon: Gamepad2,
    color: "#6c5ce7",
    bgGlow: "rgba(108,92,231,0.1)",
  },
  {
    title: "Vision",
    description: "Where I'm going and the impact I aim to make",
    href: "/vision",
    icon: Rocket,
    color: "#7c4dff",
    bgGlow: "rgba(124,77,255,0.1)",
  },
  {
    title: "Contact",
    description: "Let's build something together",
    href: "/contact",
    icon: Mail,
    color: "#2563eb",
    bgGlow: "rgba(37,99,235,0.1)",
  },
];

export default function IdentityCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-center mb-4"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Explore My World
        </motion.h2>
        <motion.p
          className="text-center mb-16 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Each discipline has shaped who I am. Dive into any world.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Link key={card.href} href={card.href}>
              <motion.div
                className="group relative p-6 rounded-2xl border cursor-pointer h-full"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "rgba(128,128,128,0.1)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{
                  y: -8,
                  backgroundColor: card.bgGlow,
                  borderColor: card.color,
                  transition: { duration: 0.25 },
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: card.bgGlow, color: card.color }}
                >
                  <card.icon size={24} />
                </div>
                <h3
                  className="text-lg font-heading font-bold mb-2 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {card.description}
                </p>
                <div
                  className="absolute bottom-4 right-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: card.color }}
                >
                  Explore &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
