"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border"
      style={{
        background: "rgba(10,10,30,0.5)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, borderColor: "rgba(108,99,255,0.35)", transition: { duration: 0.2 } }}
    >
      {project.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        <h3
          className="text-xl font-heading font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: "rgba(108,99,255,0.08)",
                color: "var(--accent)",
                border: "1px solid rgba(108,99,255,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              <Github size={14} />
              Source
            </a>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `0 0 40px rgba(128,128,128,0.05), inset 0 0 0 1px var(--accent)`,
        }}
      />
    </motion.div>
  );
}
