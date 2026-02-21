"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  BarChart3,
  Building2,
  Palette,
  Music,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ─── data ─── */

const floatingBadges = [
  { label: "AI Development", icon: Cpu, color: "#10b981", angle: -35, radius: 58, delay: 0.9 },
  { label: "Data Science", icon: BarChart3, color: "#f97316", angle: -5, radius: 62, delay: 1.1 },
  { label: "Architecture", icon: Building2, color: "#3b82f6", angle: 25, radius: 56, delay: 1.3 },
  { label: "Interior Design", icon: Palette, color: "#a78bfa", angle: 50, radius: 60, delay: 1.5 },
  { label: "Dance", icon: Music, color: "#ec4899", angle: 75, radius: 54, delay: 1.7 },
];

const stats = [
  { value: 6, suffix: "+", label: "disciplines\nmastered" },
  { value: 10, suffix: "+", label: "projects\ncompleted" },
  { value: 100, suffix: "%", label: "passion\ndriven" },
];

const headingWords = [
  { text: "Building", accent: false },
  { text: "the", accent: false },
  { text: "Future", accent: false },
  { text: "\n", accent: false },
  { text: "Through", accent: false },
  { text: "Code,", accent: true },
  { text: "Design", accent: true },
  { text: "\n", accent: false },
  { text: "&", accent: false },
  { text: "Creativity", accent: true },
];

/* ─── sub-components ─── */

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = Math.max(1, Math.floor(target / (duration / 30)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.35]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(108,99,255,0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
    </div>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: "circle", size: 14, x: "8%", y: "18%", color: "rgba(108,99,255,0.15)", dur: 7 },
    { type: "circle", size: 8, x: "15%", y: "75%", color: "rgba(236,72,153,0.12)", dur: 5 },
    { type: "square", size: 10, x: "88%", y: "12%", color: "rgba(59,130,246,0.12)", dur: 8 },
    { type: "circle", size: 6, x: "92%", y: "65%", color: "rgba(249,115,22,0.15)", dur: 6 },
    { type: "square", size: 12, x: "45%", y: "8%", color: "rgba(167,139,250,0.1)", dur: 9 },
    { type: "circle", size: 10, x: "72%", y: "88%", color: "rgba(16,185,129,0.12)", dur: 7.5 },
    { type: "triangle", size: 11, x: "25%", y: "90%", color: "rgba(108,99,255,0.1)", dur: 6.5 },
    { type: "circle", size: 5, x: "60%", y: "15%", color: "rgba(236,72,153,0.1)", dur: 5.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, 0, -6, 0],
            rotate: s.type === "square" ? [0, 90, 180, 270, 360] : [0, 360],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.type === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: s.color,
                border: `1px solid ${s.color}`,
              }}
            />
          )}
          {s.type === "square" && (
            <div
              className="rounded-sm"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: "transparent",
                border: `1.5px solid ${s.color}`,
              }}
            />
          )}
          {s.type === "triangle" && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${s.size / 2}px solid transparent`,
                borderRight: `${s.size / 2}px solid transparent`,
                borderBottom: `${s.size}px solid ${s.color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function OrbitRing({ size, duration, dotCount, opacity, delay }: {
  size: number; duration: number; dotCount: number; opacity: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: `${size}%`,
        height: `${size}%`,
        marginLeft: `-${size / 2}%`,
        marginTop: `-${size / 2}%`,
        border: `1px dashed rgba(108,99,255,${opacity * 0.3})`,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{
        opacity: { delay, duration: 0.8 },
        scale: { delay, duration: 0.8 },
        rotate: { duration, repeat: Infinity, ease: "linear" },
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (360 / dotCount) * i;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: `rgba(108,99,255,${opacity})`,
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(${size * 2}px) translate(-50%, -50%)`,
            }}
          />
        );
      })}
    </motion.div>
  );
}


function Sparkles() {
  const sparkles = [
    { x: "10%", y: "15%", size: 4, delay: 0, dur: 2.2 },
    { x: "85%", y: "10%", size: 3, delay: 0.5, dur: 1.8 },
    { x: "90%", y: "45%", size: 5, delay: 1.0, dur: 2.5 },
    { x: "15%", y: "55%", size: 3, delay: 0.3, dur: 2.0 },
    { x: "75%", y: "80%", size: 4, delay: 0.8, dur: 2.3 },
    { x: "5%", y: "80%", size: 3, delay: 1.2, dur: 1.9 },
    { x: "50%", y: "5%", size: 5, delay: 0.6, dur: 2.6 },
    { x: "95%", y: "25%", size: 3, delay: 1.5, dur: 2.1 },
    { x: "30%", y: "90%", size: 4, delay: 0.2, dur: 2.4 },
    { x: "65%", y: "20%", size: 3, delay: 0.9, dur: 1.7 },
    { x: "20%", y: "35%", size: 5, delay: 1.3, dur: 2.0 },
    { x: "80%", y: "65%", size: 4, delay: 0.4, dur: 2.2 },
    { x: "45%", y: "75%", size: 3, delay: 1.1, dur: 1.8 },
    { x: "55%", y: "40%", size: 4, delay: 0.7, dur: 2.5 },
    { x: "35%", y: "12%", size: 3, delay: 1.4, dur: 2.1 },
    { x: "70%", y: "50%", size: 5, delay: 0.1, dur: 2.3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.delay + 0.8,
            ease: "easeInOut",
          }}
        >
          {/* 4-point star shape */}
          <svg width={s.size * 3} height={s.size * 3} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z"
              fill="rgba(167,139,250,0.7)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── main ─── */

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-6">
      {/* Background layers */}
      <DotGrid />
      <FloatingShapes />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#6c63ff] opacity-[0.07] blur-[120px]"
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-[5%] w-[500px] h-[500px] rounded-full bg-[#a78bfa] opacity-[0.06] blur-[120px]"
          animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#ec4899] opacity-[0.04] blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
          {/* Left ─ Text Content */}
          <div className="z-10 order-2 lg:order-1">
            {/* Animated tag */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{
                borderColor: "rgba(108,99,255,0.2)",
                backgroundColor: "rgba(108,99,255,0.04)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[#6c63ff]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                Available for projects
              </span>
            </motion.div>

            {/* Staggered heading */}
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-heading font-bold leading-[1.1] tracking-tight">
              {headingWords.map((word, i) => {
                if (word.text === "\n") {
                  return <br key={i} />;
                }
                return (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    style={{
                      color: word.accent ? "transparent" : "var(--text-primary)",
                      backgroundImage: word.accent
                        ? "linear-gradient(135deg, #6c63ff 0%, #a78bfa 50%, #6c63ff 100%)"
                        : undefined,
                      backgroundClip: word.accent ? "text" : undefined,
                      WebkitBackgroundClip: word.accent ? "text" : undefined,
                      backgroundSize: word.accent ? "200% 100%" : undefined,
                    }}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      backgroundPosition: word.accent ? ["0% 50%", "100% 50%", "0% 50%"] : undefined,
                    }}
                    transition={{
                      opacity: { delay: 0.15 + i * 0.06, duration: 0.5 },
                      y: { delay: 0.15 + i * 0.06, duration: 0.5 },
                      filter: { delay: 0.15 + i * 0.06, duration: 0.5 },
                      backgroundPosition: word.accent
                        ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        : undefined,
                    }}
                  >
                    {word.text}
                  </motion.span>
                );
              })}
            </h1>

            {/* Description with stagger */}
            <motion.p
              className="mt-6 text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              A multi-disciplinary creator who brings together AI development,
              data science, civil engineering, architecture, interior design,
              and dance. Turning imagination into reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              <Link href="/contact">
                <motion.button
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%)",
                    boxShadow: "0 8px 30px rgba(108, 99, 255, 0.3)",
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 14px 44px rgba(108, 99, 255, 0.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-150%" }}
                    animate={{ x: "250%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
              <Link href="/ai-development">
                <motion.button
                  className="px-7 py-3.5 rounded-full text-sm font-semibold border-2 transition-all relative overflow-hidden"
                  style={{
                    borderColor: "rgba(108, 99, 255, 0.25)",
                    color: "var(--text-primary)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(108, 99, 255, 0.6)",
                    backgroundColor: "rgba(108, 99, 255, 0.06)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Projects
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats with count-up */}
            <motion.div
              className="mt-14 flex gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12 }}
                >
                  <p
                    className="text-3xl md:text-4xl font-heading font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p
                    className="text-xs mt-1 whitespace-pre-line leading-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right ─ Photo with orbit rings + floating badges */}
          <div className="relative z-10 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Orbit rings */}
                <OrbitRing size={125} duration={40} dotCount={8} opacity={0.3} delay={0.4} />
                <OrbitRing size={142} duration={55} dotCount={5} opacity={0.22} delay={0.6} />

                {/* Outer glow halo */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[44%] w-[130%] aspect-square rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1] }}
                  transition={{ scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: 0.2, duration: 1 } }}
                />

                {/* Primary morphing gradient blob - stronger */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[118%] aspect-square"
                  style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(108,99,255,0.2) 30%, rgba(139,92,246,0.08) 55%, transparent 80%)",
                    borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
                  }}
                  animate={{
                    borderRadius: [
                      "40% 60% 55% 45% / 55% 40% 60% 45%",
                      "55% 45% 40% 60% / 45% 55% 45% 55%",
                      "45% 55% 60% 40% / 60% 45% 55% 40%",
                      "40% 60% 55% 45% / 55% 40% 60% 45%",
                    ],
                    scale: [1, 1.04, 0.97, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  initial={{ opacity: 0, scale: 0.6 }}
                />

                {/* Secondary warm accent blob */}
                <motion.div
                  className="absolute left-[35%] top-[25%] w-[50%] h-[40%] rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                  animate={{ x: [0, 15, -10, 0], y: [0, -10, 8, 0], scale: [1, 1.1, 0.95, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Tertiary blue accent blob */}
                <motion.div
                  className="absolute right-[15%] bottom-[30%] w-[40%] h-[35%] rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)",
                    filter: "blur(25px)",
                  }}
                  animate={{ x: [0, -12, 8, 0], y: [0, 10, -8, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Accent ring - brighter */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[108%] aspect-square rounded-full"
                  style={{
                    border: "1.5px solid rgba(108,99,255,0.15)",
                    boxShadow: "0 0 30px rgba(108,99,255,0.05), inset 0 0 30px rgba(108,99,255,0.03)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />

                {/* Sparkle / Glitter particles */}
                <Sparkles />

                {/* Person photo -- cropped larger to emphasize upper body */}
                <motion.div
                  className="relative w-[340px] sm:w-[400px] md:w-[480px] lg:w-[540px] h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px] overflow-hidden"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="/images/hero/younesh-nobg.png"
                    alt="Younesh"
                    className="w-full h-auto object-cover object-top relative z-10 scale-110"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.1)) drop-shadow(0 8px 20px rgba(108,99,255,0.06))",
                    }}
                  />
                  {/* Bottom fade to blend cropped edge */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[20%] z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
                    }}
                  />
                </motion.div>

                {/* Floating Badges (positioned radially) */}
                {floatingBadges.map((badge) => {
                  const rad = (badge.angle * Math.PI) / 180;
                  const xPct = 50 + badge.radius * Math.cos(rad);
                  const yPct = 50 + badge.radius * Math.sin(rad) * 0.6;
                  return (
                    <motion.div
                      key={badge.label}
                      className="absolute z-30"
                      style={{ left: `${xPct}%`, top: `${yPct}%`, transform: "translate(-50%, -50%)" }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: badge.delay,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 180,
                      }}
                    >
                      <motion.div
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-lg border"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.93)",
                          borderColor: "rgba(255,255,255,0.85)",
                          boxShadow: `0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.3), 0 2px 8px ${badge.color}10`,
                          backdropFilter: "blur(12px)",
                        }}
                        animate={{ y: [0, -7, 0] }}
                        transition={{
                          duration: 3 + badge.delay * 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: badge.delay * 0.3,
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${badge.color}15`,
                            color: badge.color,
                          }}
                        >
                          <badge.icon size={17} />
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap">
                          {badge.label}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "var(--text-secondary)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
