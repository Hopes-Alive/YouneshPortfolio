"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { scrollStore } from "./scrollStore";

type Quality = 0 | 1 | 2;

function detectQuality(): Quality {
  if (typeof window === "undefined") return 1;
  // Check for reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  // Check hardware concurrency as a rough GPU proxy
  const cores = navigator.hardwareConcurrency ?? 2;
  if (cores <= 2) return 0;
  if (cores <= 4) return 1;
  return 2;
}

export default function SceneCanvas() {
  const [quality, setQuality] = useState<Quality>(1);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Detect quality tier on mount (client-only)
    setQuality(detectQuality());
    scrollStore.quality = detectQuality();

    // Test WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!ctx) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported || quality === 0) {
    // Low-end fallback: static dark gradient background
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(108,99,255,0.12) 0%, rgba(0,240,255,0.04) 40%, #00000a 70%)",
          zIndex: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ fov: 55, near: 0.1, far: 100, position: [0, 1, 12] }}
        gl={{
          antialias: quality === 2,
          powerPreference: "high-performance",
          alpha: false,
        }}
        style={{ background: "#00000a" }}
        dpr={quality === 2 ? [1, 2] : [1, 1]}
      >
        <Experience quality={quality} />
      </Canvas>
    </div>
  );
}
