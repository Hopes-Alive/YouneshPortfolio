"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { scrollStore } from "@/components/home/3d/scrollStore";

/**
 * Drives the 3D scrollStore from Framer Motion's scroll tracking.
 * Returns derived chapter progress values for use by HTML overlay components.
 *
 * @param scrollYProgress — the normalized (0→1) scroll MotionValue from useScroll()
 */
export function useScrollChapters(scrollYProgress: MotionValue<number>) {
  // Smooth the raw progress so the 3D lags behind slightly (cinematic feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0001,
  });

  // Feed into scrollStore so R3F can read it without React re-renders
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      scrollStore.progress = v;
    });
    return unsub;
  }, [smoothProgress]);

  // ─── Per-chapter opacity values for HTML overlay sections ─────────────────
  // Chapter 1: 0%–22% scroll → fully visible 0–15%, fade out 15–22%
  const chapter1Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.18, 0.26],
    [0, 1,    1,    0]
  );

  // Chapter 2: 20%–46% → fade in 20–28%, fade out 38–46%
  const chapter2Opacity = useTransform(
    scrollYProgress,
    [0.20, 0.28, 0.40, 0.48],
    [0,    1,    1,    0]
  );

  // Chapter 3: 44%–68% → fade in 44–52%, fade out 60–68%
  const chapter3Opacity = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.62, 0.70],
    [0,    1,    1,    0]
  );

  // Chapter 4: 66%–88% → fade in 66–74%
  const chapter4Opacity = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.92, 1.0],
    [0,    1,    1,    0.6]
  );

  // Y-translation for parallax on text blocks
  const chapter1Y = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const chapter2Y = useTransform(scrollYProgress, [0.18, 0.50], [40, -40]);
  const chapter3Y = useTransform(scrollYProgress, [0.42, 0.72], [40, -40]);
  const chapter4Y = useTransform(scrollYProgress, [0.64, 1.0],  [40, -10]);

  return {
    chapter1Opacity,
    chapter2Opacity,
    chapter3Opacity,
    chapter4Opacity,
    chapter1Y,
    chapter2Y,
    chapter3Y,
    chapter4Y,
  };
}
