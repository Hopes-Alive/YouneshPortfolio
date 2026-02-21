"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Cpu,
  BarChart3,
  Building2,
  Palette,
  Music,
  Briefcase,
  Gamepad2,
  Rocket,
  Mail,
  User,
  Home,
} from "lucide-react";
import {
  primaryNavItems,
  workNavGroup,
  secondaryNavItems,
  navItems,
} from "@/data/site";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu, "bar-chart": BarChart3, building: Building2, palette: Palette, music: Music,
};

const pageIconMap: Record<string, React.ElementType> = {
  "/": Home, "/about": User, "/ai-development": Cpu, "/data-science": BarChart3,
  "/engineering": Building2, "/interior-design": Palette, "/dance": Music,
  "/hobbies": Gamepad2, "/vision": Rocket, "/contact": Mail,
};

function isWorkPage(p: string) {
  return workNavGroup.items.some((item) => item.href === p);
}

function getAccent(href: string) {
  const item = navItems.find((n) => n.href === href);
  return item ? themes[item.themeId]?.colors.accent : undefined;
}

/* ── Liquid Glass styles ── */

const glassBar = (scrolled: boolean) => ({
  background: scrolled
    ? "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
  backdropFilter: `blur(${scrolled ? 28 : 20}px) saturate(${scrolled ? 2 : 1.6})`,
  WebkitBackdropFilter: `blur(${scrolled ? 28 : 20}px) saturate(${scrolled ? 2 : 1.6})`,
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: scrolled
    ? "0 8px 40px rgba(0,0,0,0.08), 0 1.5px 0 rgba(255,255,255,0.35) inset, 0 -0.5px 0 rgba(0,0,0,0.05) inset"
    : "0 4px 30px rgba(0,0,0,0.05), 0 1.5px 0 rgba(255,255,255,0.3) inset",
});

const glassDropdown = {
  background: "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.1) 100%)",
  backdropFilter: "blur(32px) saturate(2)",
  WebkitBackdropFilter: "blur(32px) saturate(2)",
  border: "1px solid rgba(255,255,255,0.25)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.1), 0 1.5px 0 rgba(255,255,255,0.4) inset, 0 -0.5px 0 rgba(0,0,0,0.04) inset",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const workTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setIsOpen(false); setWorkOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const workEnter = () => { if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current); setWorkOpen(true); };
  const workLeave = () => { workTimeoutRef.current = setTimeout(() => setWorkOpen(false), 200); };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-out",
          scrolled ? "pt-2" : "pt-4"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "relative flex items-center gap-1.5 px-2.5 transition-all duration-700 ease-out overflow-hidden",
            scrolled ? "rounded-[20px] py-2 max-w-4xl" : "rounded-[26px] py-2.5 max-w-5xl"
          )}
          style={glassBar(scrolled)}
        >
          {/* Animated shimmer / light refraction sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />

          {/* Top edge highlight (water caustic feel) */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.5) 70%, transparent)",
            }}
          />

          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 px-2.5">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.04 }}>
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center font-heading font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                  color: "var(--bg-primary)",
                  boxShadow: "0 2px 8px rgba(108,99,255,0.3)",
                }}
              >
                Y
              </div>
              <span
                className="text-sm font-bold tracking-tight hidden sm:block"
                style={{ color: "var(--text-primary)" }}
              >
                Younesh
              </span>
            </motion.div>
          </Link>

          {/* Glass divider */}
          <div
            className="hidden lg:block w-[1px] h-5 mx-1 flex-shrink-0 rounded-full"
            style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)" }}
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center relative z-10">
            {primaryNavItems.map((item) => (
              <WaterNavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
            ))}

            {/* Work dropdown */}
            <div className="relative" onMouseEnter={workEnter} onMouseLeave={workLeave}>
              <motion.button
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-[14px] text-[13px] font-medium transition-all relative",
                  isWorkPage(pathname) || workOpen ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
                style={{ color: "var(--text-primary)" }}
                whileTap={{ scale: 0.96 }}
              >
                {(isWorkPage(pathname) || workOpen) && (
                  <motion.div
                    className="absolute inset-0 rounded-[14px] -z-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.3)",
                    }}
                    layoutId="water-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Briefcase size={13} className="opacity-50" />
                Work
                <motion.div animate={{ rotate: workOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={11} className="opacity-40" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {workOpen && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-[20px] overflow-hidden"
                    style={glassDropdown}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={workEnter}
                    onMouseLeave={workLeave}
                  >
                    {/* Dropdown shimmer */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                      animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    />
                    <div className="relative p-2">
                      <p className="text-[10px] uppercase tracking-widest font-semibold px-3 pt-2 pb-1.5" style={{ color: "var(--text-secondary)" }}>
                        Disciplines
                      </p>
                      {workNavGroup.items.map((item, i) => {
                        const Icon = item.icon ? iconMap[item.icon] : Briefcase;
                        const isActive = pathname === item.href;
                        const accent = getAccent(item.href);
                        return (
                          <motion.div key={item.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                            <Link
                              href={item.href}
                              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-[14px] transition-all group", isActive ? "opacity-100" : "opacity-65 hover:opacity-100")}
                              style={{ backgroundColor: isActive ? "rgba(255,255,255,0.18)" : undefined }}
                              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                              <div
                                className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                style={{
                                  background: `linear-gradient(135deg, ${accent}20, ${accent}08)`,
                                  color: accent,
                                  border: `1px solid ${accent}18`,
                                }}
                              >
                                {Icon && <Icon size={15} />}
                              </div>
                              <p className="text-[13px] font-medium flex-1 truncate" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                              {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {secondaryNavItems.map((item) => (
              <WaterNavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
            ))}
          </div>

          {/* CTA - frosted glass button */}
          <div className="hidden lg:block flex-shrink-0 relative z-10">
            <Link href="/contact">
              <motion.div
                className="px-5 py-1.5 rounded-[14px] text-[13px] font-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(108,99,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(108,99,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden relative z-10 p-2 ml-auto" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <motion.div className="w-6 h-5 flex flex-col justify-between" animate={isOpen ? "open" : "closed"}>
              <motion.span className="block h-[2px] rounded-full origin-left" style={{ backgroundColor: "var(--text-primary)" }}
                variants={{ open: { rotate: 45, width: "100%" }, closed: { rotate: 0, width: "100%" } }} transition={{ duration: 0.3 }} />
              <motion.span className="block h-[2px] rounded-full" style={{ backgroundColor: "var(--text-primary)" }}
                variants={{ open: { opacity: 0, x: -10 }, closed: { opacity: 1, x: 0 } }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-[2px] rounded-full origin-left" style={{ backgroundColor: "var(--text-primary)" }}
                variants={{ open: { rotate: -45, width: "100%" }, closed: { rotate: 0, width: "75%" } }} transition={{ duration: 0.3 }} />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu - frosted glass overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Blurred background */}
            <div className="absolute inset-0" style={{ backgroundColor: "var(--bg-primary)", opacity: 0.7, backdropFilter: "blur(40px)" }} />

            <div className="relative h-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
              <div className="flex-1 space-y-1.5">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  const Icon = pageIconMap[item.href] || Briefcase;
                  const accent = getAccent(item.href);
                  const isFirstWork = item.href === workNavGroup.items[0]?.href;
                  const isInWork = workNavGroup.items.some((w) => w.href === item.href);

                  return (
                    <div key={item.href}>
                      {isFirstWork && (
                        <motion.p className="text-[10px] uppercase tracking-widest font-semibold pt-5 pb-2 px-4"
                          style={{ color: "var(--text-secondary)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                          Disciplines
                        </motion.p>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ delay: i * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          className={cn("flex items-center gap-4 px-4 py-3.5 rounded-[18px] transition-all", isInWork ? "ml-1" : "")}
                          style={{
                            background: isActive
                              ? "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))"
                              : "transparent",
                            border: isActive ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                          }}
                        >
                          <div
                            className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${accent}18, ${accent}08)`,
                              color: accent,
                              border: `1px solid ${accent}15`,
                              boxShadow: isActive ? `0 0 12px ${accent}20` : undefined,
                            }}
                          >
                            <Icon size={19} />
                          </div>
                          <span className="text-[17px] font-medium" style={{ color: isActive ? accent : "var(--text-primary)", opacity: isActive ? 1 : 0.65 }}>
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} layoutId="mobile-water-dot" />
                          )}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-6">
                <Link href="/contact" className="block">
                  <div
                    className="w-full py-4 rounded-[18px] text-center font-semibold text-base text-white"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                      boxShadow: "0 8px 30px rgba(108,99,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    Let&apos;s Work Together
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WaterNavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <motion.span
        className={cn(
          "relative px-3.5 py-2 rounded-[14px] text-[13px] font-medium transition-all inline-block",
          isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
        )}
        style={{ color: "var(--text-primary)" }}
        whileTap={{ scale: 0.96 }}
      >
        {label}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-[14px] -z-10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
            layoutId="water-pill"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </motion.span>
    </Link>
  );
}
