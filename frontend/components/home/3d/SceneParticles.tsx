"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "./scrollStore";

interface SceneParticlesProps {
  count?: number;
}

export default function SceneParticles({ count = 2000 }: SceneParticlesProps) {
  const meshRef = useRef<any>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorA = new THREE.Color("#6c63ff");
    const colorB = new THREE.Color("#00f0ff");
    const colorC = new THREE.Color("#a78bfa");

    for (let i = 0; i < count; i++) {
      // Spread particles in a wide sphere
      const radius = 8 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Mix between two accent colors
      const t = Math.random();
      let c: THREE.Color;
      if (t < 0.4) c = colorA;
      else if (t < 0.75) c = colorC;
      else c = colorB;

      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow ambient rotation, slightly driven by scroll
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x += delta * 0.008;
    // Slightly expand/contract based on scroll progress
    const scale = 1 + scrollStore.progress * 0.3;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
