"use client";

import { motion } from "framer-motion";
import {
  Music,
  Building2,
  Ruler,
  Palette,
  Cpu,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { TimelineEvent } from "@/data/timeline";

const iconMap: Record<string, LucideIcon> = {
  music: Music,
  "building-2": Building2,
  ruler: Ruler,
  palette: Palette,
  cpu: Cpu,
  "bar-chart-3": BarChart3,
};

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
        style={{ backgroundColor: "rgba(128,128,128,0.2)" }}
      />

      {events.map((event, index) => {
        const Icon = iconMap[event.icon] || Cpu;
        const isLeft = index % 2 === 0;

        return (
          <motion.div
            key={event.year + event.title}
            className="relative mb-12 last:mb-0"
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`flex items-start gap-8 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Content */}
              <div
                className={`flex-1 ml-16 md:ml-0 ${
                  isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                }`}
              >
                <span
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {event.year}
                </span>
                <h3
                  className="text-xl font-heading font-bold mt-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {event.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed max-w-md"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {event.description}
                </p>
              </div>

              {/* Icon node */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex-shrink-0">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon size={18} />
                </motion.div>
              </div>

              {/* Empty space for the other side */}
              <div className="hidden md:block flex-1" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
