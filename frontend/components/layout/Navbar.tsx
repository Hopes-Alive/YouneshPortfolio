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
  X,
} from "lucide-react";
import {
  primaryNavItems,
  workNavGroup,
  secondaryNavItems,
  navItems,
} from "@/data/site";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

// Map from route href → section anchor ID on the homepage
const HREF_TO_ANCHOR: Record<string, string> = {
  "/":                "#hero",
  "/about":           "#about",
  "/ai-development":  "#ai",
  "/data-science":    "#data",
  "/engineering":     "#engineering",
  "/interior-design": "#interior",
  "/dance":           "#dance",
  "/vision":          "#vision",
  "/contact":         "#contact",
};

function scrollToAnchor(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  "bar-chart": BarChart3,
  building: Building2,
  palette: Palette,
  music: Music,
};

const pageIconMap: Record<string, React.ElementType> = {
  "/": Home,
  "/about": User,
  "/ai-development": Cpu,
  "/data-science": BarChart3,
  "/engineering": Building2,
  "/interior-design": Palette,
  "/dance": Music,
  "/hobbies": Gamepad2,
  "/vision": Rocket,
  "/contact": Mail,
};

// Section accent colours for progress bar (matches ModelObject.tsx SECTION_COLORS)
const SECTION_PROGRESS_COLORS = [
  "#6c63ff", "#e8906a", "#00ff88", "#ff6b35",
  "#4fc3f7", "#d4a574", "#ff4081", "#9c6fff", "#00f0ff",
];

function isWorkPage(pathname: string) {
  return workNavGroup.items.some((item) => item.href === pathname);
}

function getAccentForHref(href: string) {
  const item = navItems.find((n) => n.href === href);
  if (!item) return "#6c63ff";
  return themes[item.themeId]?.colors.accent ?? "#6c63ff";
}

export default function Navbar() {
  const [isOpen, setIsOpen]               = useState(false);
  const [workOpen, setWorkOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [scrollPct, setScrollPct]         = useState(0);
  const [sectionIdx, setSectionIdx]       = useState(0);
  const [introReveal, setIntroReveal]     = useState(1);
  const pathname                          = usePathname();
  const workTimeoutRef                    = useRef<NodeJS.Timeout | null>(null);
  const isHome                            = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (isHome) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(max > 0 ? window.scrollY / max : 0);
        // Read sectionIndex from the global scrollStore proxy
        const store = (window as any).__scrollStore;
        if (store) setSectionIdx(store.sectionIndex ?? 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setIsOpen(false);
    setWorkOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isHome) {
      setIntroReveal(1);
      return;
    }

    const updateReveal = (rawValue: number) => {
      const clamped = Math.min(1, Math.max(0, rawValue));
      const MENU_REVEAL_START = 0.92;
      const linear = Math.min(1, Math.max(0, (clamped - MENU_REVEAL_START) / (1 - MENU_REVEAL_START)));
      const smooth = linear * linear * (3 - 2 * linear);
      setIntroReveal(smooth);
    };

    const existing = (window as any).__introProgress;
    if (typeof existing === "number") updateReveal(existing);

    const onIntroProgress = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      if (typeof customEvent.detail === "number") updateReveal(customEvent.detail);
    };

    window.addEventListener("portfolio-intro-progress", onIntroProgress as EventListener);
    return () => window.removeEventListener("portfolio-intro-progress", onIntroProgress as EventListener);
  }, [isHome]);

  const handleWorkEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    setWorkOpen(true);
  };
  const handleWorkLeave = () => {
    workTimeoutRef.current = setTimeout(() => setWorkOpen(false), 180);
  };

  // Accent colour for current section (progress bar)
  const progressColor = SECTION_PROGRESS_COLORS[sectionIdx] ?? "#6c63ff";

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
          scrolled ? "pt-2" : "pt-5"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: -100 + introReveal * 100, opacity: introReveal }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: introReveal > 0.98 ? "auto" : "none" }}
      >
        <div
          className={cn(
            "relative flex items-center gap-1 px-3 transition-all duration-500 w-full overflow-hidden",
            scrolled
              ? "mx-4 rounded-2xl py-2.5 max-w-4xl"
              : "mx-6 rounded-3xl py-3 max-w-5xl"
          )}
          style={{
            backgroundColor: scrolled ? "rgba(5, 5, 18, 0.92)" : "rgba(0, 0, 10, 0.5)",
            backdropFilter: "blur(24px) saturate(1.6)",
            border: scrolled
              ? "1px solid rgba(108,99,255,0.18)"
              : "1px solid rgba(255,255,255,0.06)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(108,99,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* ── Logo ── */}
          <button
            className="relative z-50 flex-shrink-0 px-2"
            onClick={() => isHome ? scrollToAnchor("#hero") : undefined}
          >
            {isHome ? (
              <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.04 }}>
                <LogoBadge />
                <span className="text-sm font-bold tracking-tight hidden sm:block" style={{ color: "#f0f0ff" }}>
                  Younesh
                </span>
              </motion.div>
            ) : (
              <Link href="/">
                <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.04 }}>
                  <LogoBadge />
                  <span className="text-sm font-bold tracking-tight hidden sm:block" style={{ color: "#f0f0ff" }}>
                    Younesh
                  </span>
                </motion.div>
              </Link>
            )}
          </button>

          {/* Separator */}
          <div className="hidden lg:block w-px h-5 mx-2 flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={pathname}
                isHome={isHome}
              />
            ))}

            {/* Work dropdown */}
            <div className="relative" onMouseEnter={handleWorkEnter} onMouseLeave={handleWorkLeave}>
              <motion.button
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium transition-all relative",
                  isWorkPage(pathname) ? "opacity-100" : "opacity-55 hover:opacity-100"
                )}
                style={{ color: "#f0f0ff" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Briefcase size={13} />
                Work
                <motion.div animate={{ rotate: workOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} />
                </motion.div>
                {isWorkPage(pathname) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(108,99,255,0.12)" }}
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {workOpen && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(5,5,18,0.95)",
                      backdropFilter: "blur(28px)",
                      border: "1px solid rgba(108,99,255,0.2)",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(108,99,255,0.06)",
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onMouseEnter={handleWorkEnter}
                    onMouseLeave={handleWorkLeave}
                  >
                    <div className="p-2">
                      <p className="text-[10px] uppercase tracking-widest font-semibold px-3 pt-2 pb-1.5" style={{ color: "rgba(108,99,255,0.7)" }}>
                        Disciplines
                      </p>
                      {workNavGroup.items.map((item, i) => {
                        const Icon = item.icon ? iconMap[item.icon] : Briefcase;
                        const isActive = pathname === item.href;
                        const accent = getAccentForHref(item.href);
                        const anchor = HREF_TO_ANCHOR[item.href];
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            {isHome && anchor ? (
                              <button
                                onClick={() => { scrollToAnchor(anchor); setWorkOpen(false); }}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group w-full text-left",
                                  "opacity-65 hover:opacity-100"
                                )}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(108,99,255,0.06)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${accent}18`, color: accent }}>
                                  {Icon && <Icon size={15} />}
                                </div>
                                <span className="text-[13px] font-medium" style={{ color: "#f0f0ff" }}>{item.label}</span>
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                                  isActive ? "opacity-100" : "opacity-65 hover:opacity-100"
                                )}
                                style={{ backgroundColor: isActive ? `${accent}18` : undefined }}
                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(108,99,255,0.06)"; }}
                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${accent}18`, color: accent }}>
                                  {Icon && <Icon size={15} />}
                                </div>
                                <span className="text-[13px] font-medium" style={{ color: "#f0f0ff" }}>{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />}
                              </Link>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={pathname}
                isHome={isHome}
              />
            ))}
          </div>

          {/* ── Hire Me CTA ── */}
          <div className="hidden lg:block flex-shrink-0 ml-2">
            {isHome ? (
              <motion.button
                onClick={() => scrollToAnchor("#contact")}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(108,99,255,0.25)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(108,99,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.button>
            ) : (
              <Link href="/contact">
                <motion.div
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(108,99,255,0.25)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(108,99,255,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                </motion.div>
              </Link>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden relative z-50 p-2 ml-auto rounded-xl"
            style={{ color: "#f0f0ff" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
              <motion.span
                className="block w-5 h-[1.5px] rounded-full bg-current origin-center"
                variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] rounded-full bg-current"
                variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] rounded-full bg-current origin-center"
                variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.25 }}
              />
            </motion.div>
          </button>

          {/* ── Scroll progress bar (homepage only) ── */}
          {isHome && (
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                width: `${scrollPct * 100}%`,
                background: `linear-gradient(90deg, ${progressColor}88, ${progressColor})`,
                borderRadius: "0 1px 1px 0",
                transition: "background 0.6s ease",
              }}
            />
          )}
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(0,0,10,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 p-2 rounded-xl"
              style={{ color: "rgba(255,255,255,0.4)" }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <div className="h-full flex flex-col pt-24 pb-10 px-6 overflow-y-auto">
              <div className="flex-1 space-y-1">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  const Icon = pageIconMap[item.href] || Briefcase;
                  const accent = getAccentForHref(item.href);
                  const isFirstWork = item.href === workNavGroup.items[0]?.href;
                  const isInWork = workNavGroup.items.some((w) => w.href === item.href);
                  const anchor = HREF_TO_ANCHOR[item.href];

                  return (
                    <div key={item.href}>
                      {isFirstWork && (
                        <motion.p
                          className="text-[10px] uppercase tracking-widest font-semibold pt-5 pb-2 px-4"
                          style={{ color: "rgba(108,99,255,0.6)" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          Disciplines
                        </motion.p>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {isHome && anchor ? (
                          <button
                            className={cn("flex items-center gap-4 px-4 py-3 rounded-2xl w-full text-left", isInWork ? "ml-3" : "")}
                            style={{ backgroundColor: isActive ? `${accent}14` : "transparent" }}
                            onClick={() => { scrollToAnchor(anchor); setIsOpen(false); }}
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18`, color: accent }}>
                              <Icon size={18} />
                            </div>
                            <span className="text-lg font-medium" style={{ color: isActive ? accent : "#f0f0ff", opacity: isActive ? 1 : 0.6 }}>
                              {item.label}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn("flex items-center gap-4 px-4 py-3 rounded-2xl transition-all", isInWork ? "ml-3" : "")}
                            style={{ backgroundColor: isActive ? `${accent}14` : "transparent" }}
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18`, color: accent }}>
                              <Icon size={18} />
                            </div>
                            <span className="text-lg font-medium" style={{ color: isActive ? accent : "#f0f0ff", opacity: isActive ? 1 : 0.6 }}>
                              {item.label}
                            </span>
                            {isActive && (
                              <motion.div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: accent }} layoutId="mobile-indicator" />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
                {isHome ? (
                  <button
                    className="block w-full py-4 rounded-2xl text-center font-semibold text-base text-white"
                    style={{ background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)", boxShadow: "0 8px 32px rgba(108,99,255,0.35)" }}
                    onClick={() => { scrollToAnchor("#contact"); setIsOpen(false); }}
                  >
                    Let&apos;s Work Together
                  </button>
                ) : (
                  <Link href="/contact" className="block">
                    <div
                      className="w-full py-4 rounded-2xl text-center font-semibold text-base text-white"
                      style={{ background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)", boxShadow: "0 8px 32px rgba(108,99,255,0.35)" }}
                    >
                      Let&apos;s Work Together
                    </div>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function LogoBadge() {
  return (
    <motion.div
      className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
        color: "#fff",
        boxShadow: "0 0 16px rgba(108,99,255,0.4)",
      }}
    >
      Y
      <motion.div
        className="absolute inset-0 -skew-x-12"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
      />
    </motion.div>
  );
}

function NavLink({
  href, label, pathname, isHome,
}: {
  href: string; label: string; pathname: string; isHome: boolean;
}) {
  const isActive = pathname === href;
  const accent = getAccentForHref(href);
  const anchor = HREF_TO_ANCHOR[href];

  if (isHome && anchor) {
    return (
      <motion.button
        onClick={() => scrollToAnchor(anchor)}
        className={cn(
          "relative px-3 py-1.5 rounded-xl text-[13px] font-medium transition-all inline-block",
          "opacity-55 hover:opacity-95"
        )}
        style={{ color: "#f0f0ff" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.button>
    );
  }

  return (
    <Link href={href}>
      <motion.span
        className={cn(
          "relative px-3 py-1.5 rounded-xl text-[13px] font-medium transition-all inline-block",
          isActive ? "opacity-100" : "opacity-55 hover:opacity-95"
        )}
        style={{ color: "#f0f0ff" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl -z-10"
            style={{ background: `${accent}14` }}
            layoutId="nav-pill"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </motion.span>
    </Link>
  );
}
