"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Cpu, BarChart3, Building2,
  Palette, Music, Rocket, Mail, Github, Linkedin,
  Send, CheckCircle, Sparkles,
} from "lucide-react";
import { scrollStore } from "@/components/home/3d/scrollStore";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { timelineEvents } from "@/data/timeline";
import { visionPillars } from "@/data/vision";
import { siteConfig } from "@/data/site";

const SceneCanvas = dynamic(
  () => import("@/components/home/3d/SceneCanvas"),
  { ssr: false, loading: () => <div style={{ position: "fixed", inset: 0, background: "#00000a", zIndex: 0 }} /> }
);

// ── Section config ─────────────────────────────────────────────────────────────
const SECTION_VH    = [100, 200, 220, 200, 200, 200, 180, 200, 160];
const SECTION_NAMES = ["Home", "About", "AI", "Data", "Eng", "Interior", "Dance", "Vision", "Contact"];
const SECTION_COLORS = [
  "#6c63ff", "#e8906a", "#00ff88", "#ff6b35",
  "#4fc3f7", "#d4a574", "#ff4081", "#9c6fff", "#00f0ff",
];

function scrollToSection(idx: number) {
  const vh = window.innerHeight;
  let acc = 0;
  for (let i = 0; i < idx; i++) acc += SECTION_VH[i];
  window.scrollTo({ top: (acc / 100) * vh, behavior: "smooth" });
}
if (typeof window !== "undefined") {
  (window as any).__scrollToSection = scrollToSection;
}

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const letterVariant = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  show: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Discipline chips ──────────────────────────────────────────────────────────
const DISCIPLINES = [
  { label: "AI & ML",      color: "#00ff88", Icon: Cpu,       idx: 2 },
  { label: "Data Science", color: "#ff6b35", Icon: BarChart3, idx: 3 },
  { label: "Engineering",  color: "#4fc3f7", Icon: Building2, idx: 4 },
  { label: "Interior",     color: "#d4a574", Icon: Palette,   idx: 5 },
  { label: "Dance",        color: "#ff4081", Icon: Music,     idx: 6 },
  { label: "Vision",       color: "#9c6fff", Icon: Rocket,    idx: 7 },
];

// ── Cycling roles ─────────────────────────────────────────────────────────────
const ROLES = [
  "AI Engineer & Developer",
  "Data Scientist",
  "Civil Engineer",
  "Interior Designer",
  "Dance Teacher",
];

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-5" style={{ color }}>
      {text}
    </p>
  );
}

/** Card with animated gradient border — accepts per-section accent colour */
function GlassCard({
  children, className = "", style = {}, accent = "#6c63ff",
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; accent?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        padding: "1px",
        borderRadius: "1.5rem",
        background: `linear-gradient(135deg, ${accent}44, rgba(255,255,255,0.04) 50%, ${accent}18)`,
      }}
    >
      <div
        className={className}
        style={{
          background: "rgba(4, 4, 22, 0.90)",
          backdropFilter: "blur(26px) saturate(1.5)",
          borderRadius: "calc(1.5rem - 1px)",
          padding: "2.5rem",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MiniSkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: "rgba(220,220,255,0.85)" }}>{name}</span>
        <span style={{ color, fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        />
      </div>
    </div>
  );
}

function ProjectChip({ title, description, tags, color }: {
  title: string; description: string; tags: string[]; color: string;
}) {
  return (
    <motion.div
      style={{
        background: "rgba(4,4,22,0.8)",
        border: `1px solid ${color}22`,
        borderRadius: "1rem",
        padding: "1.25rem 1.5rem",
      }}
      whileHover={{ borderColor: `${color}66`, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-1">
        <h4 style={{ color: "#f0f0ff", fontWeight: 700, fontSize: "0.9rem" }}>{title}</h4>
        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1 ml-3" style={{ background: color }} />
      </div>
      <p style={{ color: "rgba(160,160,200,0.72)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
        {description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {tags.map((t) => (
          <span key={t} style={{
            background: `${color}12`, color, fontSize: "0.65rem",
            padding: "0.2rem 0.55rem", borderRadius: 999, border: `1px solid ${color}25`,
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function StatRow({ stats, color = "#f0f0ff" }: { stats: { value: string; label: string }[]; color?: string }) {
  return (
    <div className="flex flex-wrap gap-0 mt-8">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-stretch">
          {i > 0 && <div style={{ width: 1, background: "rgba(255,255,255,0.08)", margin: "0 1.75rem" }} />}
          <div>
            <p className="text-3xl font-heading font-bold" style={{ color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(160,160,200,0.6)" }}>{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Large faded section number shown behind content */
function BigNum({ n, color }: { n: string; color: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        right: "-1rem",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(9rem, 22vw, 20rem)",
        fontWeight: 900,
        fontFamily: "'Space Grotesk', sans-serif",
        color: `${color}07`,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.06em",
        zIndex: 0,
      }}
    >
      {n}
    </div>
  );
}

/** Vertical dot navigation on right side of screen */
function SideProgress({ active }: { active: number }) {
  return (
    <div
      style={{
        position: "fixed",
        right: "1.25rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
      }}
      className="hidden lg:flex"
    >
      {SECTION_NAMES.map((name, i) => (
        <motion.button
          key={name}
          onClick={() => scrollToSection(i)}
          title={name}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
          whileHover={{ scale: 1.4 }}
        >
          <motion.div
            style={{ borderRadius: 999 }}
            animate={{
              width: i === active ? 5 : 4,
              height: i === active ? 18 : 4,
              background: i === active ? SECTION_COLORS[i] : "rgba(255,255,255,0.18)",
              boxShadow: i === active ? `0 0 8px ${SECTION_COLORS[i]}` : "none",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.button>
      ))}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIdx((r) => (r + 1) % ROLES.length);
        setRoleFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const letters = "YOUNESH".split("");

  return (
    <section
      id="hero"
      style={{ height: `${SECTION_VH[0]}vh`, position: "relative", zIndex: 10 }}
      className="flex items-center overflow-hidden"
    >
      {/* Subtle grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orbs */}
      <div aria-hidden style={{ position: "absolute", top: "20%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "10%", left: "25%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div className="px-6 md:px-16 max-w-7xl w-full mx-auto">
        <div className="md:max-w-[56%]">

          {/* Available badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              background: "rgba(108,99,255,0.10)",
              border: "1px solid rgba(108,99,255,0.28)",
              color: "#a78bfa",
            }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Available for projects
            <Sparkles size={11} style={{ opacity: 0.6 }} />
          </motion.div>

          {/* Name — letter by letter */}
          <div style={{ perspective: "600px", marginBottom: "0.5rem" }}>
            <motion.h1
              className="font-heading font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(3.8rem, 11vw, 9rem)" }}
              variants={stagger}
              initial="hidden"
              animate="show"
              transition={{ delayChildren: 0.45 }}
            >
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  variants={letterVariant}
                  style={{
                    display: "inline-block",
                    color: "#f0f0ff",
                    textShadow: "0 0 60px rgba(108,99,255,0.18)",
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Accent line under name */}
          <motion.div
            style={{ height: 2, borderRadius: 1, marginBottom: "1.25rem", overflow: "hidden" }}
            initial={{ width: 0 }}
            animate={{ width: "min(320px, 80%)" }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #6c63ff, #a78bfa, #00f0ff)" }} />
          </motion.div>

          {/* Cycling role */}
          <motion.div
            className="font-heading font-semibold mb-5 h-8 flex items-center"
            style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: roleFade ? 1 : 0, y: roleFade ? 0 : -12 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "linear-gradient(90deg, #6c63ff, #a78bfa, #00f0ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm leading-relaxed mb-8 max-w-sm"
            style={{ color: "rgba(160,160,200,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Building at the intersection of AI, architecture, design, and movement.
            Every discipline feeds every other.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              onClick={() => scrollToSection(2)}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
                boxShadow: "0 8px 32px rgba(108,99,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 48px rgba(108,99,255,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Work
              <ArrowRight size={15} />
              <motion.div
                className="absolute inset-0 -skew-x-12 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
                initial={{ x: "-150%" }}
                animate={{ x: "250%" }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection(8)}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
              style={{
                border: "1px solid rgba(108,99,255,0.28)",
                color: "#f0f0ff",
                background: "rgba(108,99,255,0.05)",
              }}
              whileHover={{ borderColor: "rgba(108,99,255,0.65)", background: "rgba(108,99,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={14} style={{ opacity: 0.75 }} />
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Discipline chips */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {DISCIPLINES.map((d, i) => (
              <motion.button
                key={d.label}
                onClick={() => scrollToSection(d.idx)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                style={{
                  background: `${d.color}0e`,
                  border: `1px solid ${d.color}28`,
                  color: d.color,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.07, duration: 0.4 }}
                whileHover={{ background: `${d.color}20`, borderColor: `${d.color}55`, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <d.Icon size={11} />
                {d.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: "rgba(160,160,200,0.4)" }}>
          Scroll
        </span>
        <motion.div
          style={{
            width: 24, height: 38, borderRadius: 12,
            border: "1px solid rgba(108,99,255,0.28)",
            display: "flex", justifyContent: "center", paddingTop: 7,
          }}
        >
          <motion.div
            style={{ width: 3, height: 7, borderRadius: 2, background: "#6c63ff" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function AboutSection() {
  const ACC = "#e8906a";
  return (
    <section id="about" style={{ minHeight: `${SECTION_VH[1]}vh`, position: "relative", zIndex: 10 }}>
      {/* First screen */}
      <div className="min-h-screen flex items-center justify-end px-6 md:px-16 relative">
        <BigNum n="01" color={ACC} />
        <motion.div className="w-full md:max-w-[46%] relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="01 — About" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              The Story Behind<br />
              <span style={{ color: ACC }}>The Disciplines</span>
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(200,190,220,0.8)" }}>
              From teaching dance in 2015 to building AI systems in 2022 — every pivot was
              intentional. Each discipline gave me tools the next one needed.
            </p>
            <StatRow color={ACC} stats={[
              { value: "6+", label: "Disciplines" },
              { value: "200+", label: "Students" },
              { value: "10+", label: "Years" },
            ]} />
          </GlassCard>
        </motion.div>
      </div>

      {/* Timeline + values */}
      <div className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-6">
          <GlassCard accent={ACC}>
            <h3 className="font-heading font-bold text-lg mb-8" style={{ color: "#f0f0ff" }}>The Journey</h3>
            <div className="space-y-6">
              {timelineEvents.map((ev, i) => (
                <motion.div key={ev.year} className="flex gap-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.5 }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-xs" style={{ background: `${ACC}18`, color: ACC, border: `1px solid ${ACC}30` }}>
                      {ev.year}
                    </div>
                    {i < timelineEvents.length - 1 && <div style={{ width: 1, flex: 1, background: `${ACC}15`, marginTop: "0.5rem" }} />}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-sm mb-1" style={{ color: "#f0f0ff" }}>{ev.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(180,170,210,0.7)" }}>{ev.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Cross-disciplinary", d: "Every skill shaped by something from a completely different field." },
            { t: "Systems thinker", d: "Patterns across domains that single-discipline practitioners miss." },
            { t: "Creator at heart", d: "Code, concrete, or choreography — building things is the constant." },
          ].map((v, i) => (
            <motion.div key={v.t} style={{ background: `${ACC}08`, border: `1px solid ${ACC}18`, borderRadius: "1rem", padding: "1.5rem" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="font-semibold text-sm mb-2" style={{ color: ACC }}>{v.t}</p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(180,170,210,0.7)" }}>{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AI & Software ─────────────────────────────────────────────────────────────

function AISection() {
  const ACC = "#00ff88";
  const aiProjects = projects.filter((p) => p.category === "ai");
  const aiSkills   = skillGroups.find((g) => g.themeId === "ai")?.skills ?? [];
  return (
    <section id="ai" style={{ minHeight: `${SECTION_VH[2]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center px-6 md:px-16 relative">
        <BigNum n="02" color={ACC} />
        <motion.div className="w-full md:max-w-[46%] relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="02 — AI & Software" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              Building Intelligence<br /><span style={{ color: ACC }}>That Scales</span>
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(200,190,220,0.8)" }}>
              LLMs, full-stack platforms, production APIs — robust systems built to last.
            </p>
            <div className="flex flex-wrap gap-2">
              {["5+ Projects", "3 Prod APIs", "Python 95%", "10+ AI Models"].map((t) => (
                <span key={t} style={{ background: `${ACC}10`, color: ACC, fontSize: "0.72rem", padding: "0.3rem 0.8rem", borderRadius: 999, border: `1px solid ${ACC}25`, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Projects</h3>
              <div className="space-y-4">{aiProjects.map((p) => <ProjectChip key={p.id} title={p.title} description={p.description} tags={p.tags} color={ACC} />)}</div>
            </GlassCard>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Core Skills</h3>
              {aiSkills.slice(0, 6).map((s) => <MiniSkillBar key={s.name} name={s.name} level={s.level} color={ACC} />)}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Data Science ──────────────────────────────────────────────────────────────

function DataSection() {
  const ACC = "#ff6b35";
  const dsProjects = projects.filter((p) => p.category === "datascience");
  const dsSkills   = skillGroups.find((g) => g.themeId === "datascience")?.skills ?? [];
  return (
    <section id="data" style={{ minHeight: `${SECTION_VH[3]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center px-6 md:px-16 relative">
        <BigNum n="03" color={ACC} />
        <motion.div className="w-full md:max-w-[46%] relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="03 — Data Science" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              Extracting Signal<br /><span style={{ color: ACC }}>From Noise</span>
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(200,190,220,0.8)" }}>
              Predictive models, NLP pipelines, visual dashboards that drive real decisions.
            </p>
            <StatRow color={ACC} stats={[
              { value: "50+", label: "Datasets" },
              { value: "94%", label: "Avg Accuracy" },
              { value: "15+", label: "Models" },
            ]} />
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Projects</h3>
              <div className="space-y-4">{dsProjects.map((p) => <ProjectChip key={p.id} title={p.title} description={p.description} tags={p.tags} color={ACC} />)}</div>
            </GlassCard>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Core Skills</h3>
              {dsSkills.slice(0, 6).map((s) => <MiniSkillBar key={s.name} name={s.name} level={s.level} color={ACC} />)}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Engineering ───────────────────────────────────────────────────────────────

function EngineeringSection() {
  const ACC = "#4fc3f7";
  const engProjects = projects.filter((p) => p.category === "engineering");
  const engSkills   = skillGroups.find((g) => g.themeId === "engineering")?.skills ?? [];
  return (
    <section id="engineering" style={{ minHeight: `${SECTION_VH[4]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center justify-end px-6 md:px-16 relative">
        <BigNum n="04" color={ACC} />
        <motion.div className="w-full md:max-w-[46%] relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="04 — Engineering" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              Structures That<br /><span style={{ color: ACC }}>Stand The Test</span>
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(200,190,220,0.8)" }}>
              Civil engineering taught me to balance aesthetics with structural integrity.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["Safety first", "Sustainable", "Precision"].map((p) => (
                <div key={p} style={{ background: `${ACC}0e`, border: `1px solid ${ACC}22`, borderRadius: "0.75rem", padding: "0.75rem", textAlign: "center" }}>
                  <p style={{ color: ACC, fontSize: "0.72rem", fontWeight: 600 }}>{p}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Projects</h3>
              <div className="space-y-4">{engProjects.map((p) => <ProjectChip key={p.id} title={p.title} description={p.description} tags={p.tags} color={ACC} />)}</div>
            </GlassCard>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Tools & Skills</h3>
              {engSkills.map((s) => <MiniSkillBar key={s.name} name={s.name} level={s.level} color={ACC} />)}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Interior Design ───────────────────────────────────────────────────────────

function InteriorSection() {
  const ACC = "#d4a574";
  const intProjects = projects.filter((p) => p.category === "interior");
  const intSkills   = skillGroups.find((g) => g.themeId === "interior")?.skills ?? [];
  return (
    <section id="interior" style={{ minHeight: `${SECTION_VH[5]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center px-6 md:px-16 relative">
        <BigNum n="05" color={ACC} />
        <motion.div className="w-full md:max-w-[46%] relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="05 — Interior Design" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              Spaces That<br /><span style={{ color: ACC }}>Tell Stories</span>
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(200,190,220,0.8)" }}>
              Great interiors are invisible — they shape how people feel without announcing themselves.
            </p>
            <div className="space-y-2.5">
              {["Functional beauty over decoration", "Light as the primary material", "Client vision, amplified"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACC }} />
                  <p style={{ color: "rgba(200,190,220,0.8)", fontSize: "0.82rem" }}>{t}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Projects</h3>
              <div className="space-y-4">{intProjects.map((p) => <ProjectChip key={p.id} title={p.title} description={p.description} tags={p.tags} color={ACC} />)}</div>
            </GlassCard>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }}>
            <GlassCard accent={ACC}>
              <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Skills</h3>
              {intSkills.map((s) => <MiniSkillBar key={s.name} name={s.name} level={s.level} color={ACC} />)}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Dance ─────────────────────────────────────────────────────────────────────

function DanceSection() {
  const ACC = "#ff4081";
  const danceSkills = skillGroups.find((g) => g.themeId === "dance")?.skills ?? [];
  return (
    <section id="dance" style={{ minHeight: `${SECTION_VH[6]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center justify-center px-6 relative">
        <BigNum n="06" color={ACC} />
        <motion.div className="w-full max-w-xl relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC} style={{ textAlign: "center" }}>
            <SectionLabel text="06 — Dance" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              Where It<br /><span style={{ color: ACC }}>All Began</span>
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(200,190,220,0.8)" }}>
              Dance was my first language. Teaching it shaped my ability to communicate complex ideas simply.
            </p>
            <div className="flex justify-center gap-10 mb-8">
              {[{ v: "200+", l: "Students" }, { v: "5+", l: "Years" }, { v: "20+", l: "Shows" }].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-heading font-bold" style={{ color: ACC }}>{s.v}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(160,160,200,0.6)" }}>{s.l}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Bollywood", "Contemporary", "Hip Hop", "Classical"].map((style) => (
                <div key={style} style={{ background: `${ACC}0e`, border: `1px solid ${ACC}22`, borderRadius: "0.75rem", padding: "0.75rem" }}>
                  <p style={{ color: ACC, fontSize: "0.8rem", fontWeight: 600 }}>{style}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-16 max-w-2xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <h3 className="font-heading font-bold text-base mb-5" style={{ color: "#f0f0ff" }}>Skills</h3>
            {danceSkills.map((s) => <MiniSkillBar key={s.name} name={s.name} level={s.level} color={ACC} />)}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ── Vision ────────────────────────────────────────────────────────────────────

function VisionSection() {
  const ACC = "#9c6fff";
  return (
    <section id="vision" style={{ minHeight: `${SECTION_VH[7]}vh`, position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center justify-center px-6 relative">
        <BigNum n="07" color={ACC} />
        <motion.div className="w-full max-w-xl text-center relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <GlassCard accent={ACC}>
            <SectionLabel text="07 — Vision" color={ACC} />
            <h2 className="font-heading font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f0ff" }}>
              The View<br /><span style={{ color: ACC }}>From Here</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(200,190,220,0.8)" }}>
              Building at the frontier of AI and design — where technology enhances human creativity.
            </p>
          </GlassCard>
        </motion.div>
      </div>
      <div className="py-10 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visionPillars.map((pillar, i) => (
            <motion.div key={pillar.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <GlassCard accent={ACC}>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: ACC }}>{pillar.subtitle}</p>
                <h3 className="font-heading font-bold text-base mb-3" style={{ color: "#f0f0ff" }}>{pillar.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(180,170,210,0.75)" }}>{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACC }} />
                      <span style={{ color: "rgba(200,190,220,0.75)", fontSize: "0.78rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const ACC = "#00f0ff";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `mailto:${siteConfig.socials.email}?subject=${encodeURIComponent(`Portfolio Contact from ${form.name}`)}&body=${encodeURIComponent(`Message: ${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)}`
    );
    setSent(true);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(0,0,20,0.55)",
    border: `1px solid ${focused === field ? `${ACC}55` : "rgba(0,240,255,0.12)"}`,
    borderRadius: "0.75rem",
    padding: "0.85rem 1rem",
    color: "#f0f0ff",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: focused === field ? `0 0 0 3px ${ACC}12` : "none",
  });

  return (
    <section id="contact" style={{ minHeight: `${SECTION_VH[8]}vh`, position: "relative", zIndex: 10 }} className="flex items-center justify-center px-6 py-16">
      <motion.div className="w-full max-w-lg" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
        <GlassCard accent={ACC}>
          <SectionLabel text="08 — Contact" color={ACC} />
          <h2 className="font-heading font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#f0f0ff" }}>
            Let&apos;s Build Something<br /><span style={{ color: ACC }}>Remarkable</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(200,190,220,0.75)" }}>
            Whether it&apos;s code, design, or strategy — open to interesting problems.
          </p>

          {sent ? (
            <motion.div className="flex flex-col items-center gap-4 py-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle size={48} style={{ color: ACC }} />
              <p className="font-semibold" style={{ color: "#f0f0ff" }}>Message sent! I&apos;ll be in touch.</p>
              <button onClick={() => setSent(false)} className="text-xs underline" style={{ color: "rgba(160,160,200,0.5)" }}>Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input style={inputStyle("name")} type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              <input style={inputStyle("email")} type="email" placeholder="Email address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              <textarea style={{ ...inputStyle("message"), resize: "vertical", minHeight: "110px" }} placeholder="What are you building?" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
              <motion.button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: `linear-gradient(135deg, #00c9ff 0%, ${ACC} 100%)`, color: "#000816", boxShadow: `0 8px 32px ${ACC}22` }}
                whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${ACC}40` }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={15} />
                Send Message
              </motion.button>
            </form>
          )}

          <div className="flex items-center gap-5 mt-8 pt-6" style={{ borderTop: `1px solid ${ACC}14` }}>
            {[
              { href: siteConfig.socials.github,   Icon: Github,   label: "GitHub" },
              { href: siteConfig.socials.linkedin,  Icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${siteConfig.socials.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                <motion.div className="flex items-center gap-2 text-xs font-medium" style={{ color: "rgba(160,160,200,0.6)" }} whileHover={{ color: "#f0f0ff", scale: 1.06 }}>
                  <Icon size={15} />{label}
                </motion.div>
              </a>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const totalPx = SECTION_VH.reduce((a, b) => a + b, 0) * vh / 100;
      scrollStore.progress = scrollY / Math.max(1, totalPx - vh);

      let accPx = 0;
      for (let i = 0; i < SECTION_VH.length; i++) {
        const sectionPx = SECTION_VH[i] * vh / 100;
        if (scrollY < accPx + sectionPx - vh * 0.28) {
          scrollStore.sectionIndex = i;
          scrollStore.sectionProgress = Math.max(0, (scrollY - accPx) / sectionPx);
          setActiveSection(i);
          return;
        }
        accPx += sectionPx;
      }
      scrollStore.sectionIndex = SECTION_VH.length - 1;
      scrollStore.sectionProgress = 1;
      setActiveSection(SECTION_VH.length - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#00000a", minHeight: "100vh" }}>
      <SceneCanvas />
      <SideProgress active={activeSection} />
      <HeroSection />
      <AboutSection />
      <AISection />
      <DataSection />
      <EngineeringSection />
      <InteriorSection />
      <DanceSection />
      <VisionSection />
      <ContactSection />
    </div>
  );
}
