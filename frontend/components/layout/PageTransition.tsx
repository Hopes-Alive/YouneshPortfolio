"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ThemeId } from "@/lib/themes";
import { useTheme } from "@/hooks/useTheme";

const transitionVariants: Record<string, { initial: string; animate: string; exit: string }> = {
  ai: { initial: "aiInitial", animate: "aiAnimate", exit: "aiExit" },
  dance: { initial: "danceInitial", animate: "danceAnimate", exit: "danceExit" },
  engineering: { initial: "engInitial", animate: "engAnimate", exit: "engExit" },
  interior: { initial: "intInitial", animate: "intAnimate", exit: "intExit" },
};

const allVariants = {
  aiInitial: { opacity: 0, filter: "blur(10px)" },
  aiAnimate: { opacity: 1, filter: "blur(0px)" },
  aiExit: { opacity: 0, filter: "blur(10px)" },
  danceInitial: { opacity: 0, x: 100, rotate: 2 },
  danceAnimate: { opacity: 1, x: 0, rotate: 0 },
  danceExit: { opacity: 0, x: -100, rotate: -2 },
  engInitial: { opacity: 0, y: 50, scale: 0.98 },
  engAnimate: { opacity: 1, y: 0, scale: 1 },
  engExit: { opacity: 0, y: -50, scale: 0.98 },
  intInitial: { opacity: 0, scale: 1.02 },
  intAnimate: { opacity: 1, scale: 1 },
  intExit: { opacity: 0, scale: 0.98 },
  defaultInitial: { opacity: 0, y: 20 },
  defaultAnimate: { opacity: 1, y: 0 },
  defaultExit: { opacity: 0, y: -20 },
};

interface PageTransitionProps {
  children: ReactNode;
  themeId: ThemeId;
}

export default function PageTransition({ children, themeId }: PageTransitionProps) {
  useTheme(themeId);

  const variant = transitionVariants[themeId] || {
    initial: "defaultInitial",
    animate: "defaultAnimate",
    exit: "defaultExit",
  };

  return (
    <motion.div
      variants={allVariants}
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
