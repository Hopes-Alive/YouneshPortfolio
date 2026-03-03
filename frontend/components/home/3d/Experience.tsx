"use client";

import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "./scrollStore";
import RobotModel from "./ModelObject";
import SceneParticles from "./SceneParticles";
import PostProcessingEffects from "./PostProcessing";

interface ExperienceProps {
  quality: 0 | 1 | 2;
}

// Accent colour per section — matches the HTML theme
const SECTION_COLORS = [
  new THREE.Color("#6c63ff"), // 0 Hero — purple
  new THREE.Color("#e8906a"), // 1 About — warm amber
  new THREE.Color("#00ff88"), // 2 AI — green
  new THREE.Color("#ff6b35"), // 3 Data Science — orange
  new THREE.Color("#4fc3f7"), // 4 Engineering — blue
  new THREE.Color("#d4a574"), // 5 Interior Design — gold
  new THREE.Color("#ff4081"), // 6 Dance — pink
  new THREE.Color("#9c6fff"), // 7 Vision — deep violet
  new THREE.Color("#00f0ff"), // 8 Contact — teal
];

function DynamicKeyLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const current  = useRef(new THREE.Color("#6c63ff"));
  const target   = useRef(new THREE.Color("#6c63ff"));

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    const si = Math.max(0, Math.min(8, scrollStore.sectionIndex));
    target.current.copy(SECTION_COLORS[si]);
    current.current.lerp(target.current, delta * 2.5);
    lightRef.current.color.copy(current.current);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[3, 4, 5]}
      intensity={65}
      distance={30}
      decay={2}
    />
  );
}

export default function Experience({ quality }: ExperienceProps) {
  return (
    <>
      {/* Soft ambient base */}
      <ambientLight intensity={0.12} color="#120824" />

      {/* Dynamic key light — colour follows active section */}
      <DynamicKeyLight />

      {/* Rim light — cool halo from behind */}
      <pointLight position={[0, -3, -8]} intensity={22} color="#a78bfa" distance={22} decay={2} />

      {/* Overhead fill */}
      <pointLight position={[0, 8, 2]} intensity={12} color="#ffffff" distance={22} decay={2} />

      {/* Metallic reflections */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* Robot model + camera control */}
      <Suspense fallback={null}>
        <RobotModel />
      </Suspense>

      {/* Floating particles */}
      {quality >= 1 && (
        <SceneParticles count={quality === 2 ? 2500 : 1200} />
      )}

      {/* Post-processing */}
      <PostProcessingEffects quality={quality} />
    </>
  );
}
