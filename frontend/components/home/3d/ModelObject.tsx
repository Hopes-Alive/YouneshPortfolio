"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "./scrollStore";

const CHARACTER_URL = "/models/character.enc";

interface SectionKF {
  pos: [number, number, number];
  rotY: number;
  scale: number;
  camPos: [number, number, number];
  camLookX: number;
}

// One keyframe per section — tuned for the new character silhouette
const SECTION_KF: SectionKF[] = [
  { pos: [0.4, -1.2, 0], rotY: -0.15, scale: 1.06, camPos: [0, 1.1, 8.4], camLookX: 0.2 }, // 0 Hero
  { pos: [-1.1, -1.2, 0], rotY: 0.5, scale: 1.04, camPos: [1.5, 1.1, 7.2], camLookX: -0.2 }, // 1 About
  { pos: [0.9, -1.2, 0], rotY: -0.4, scale: 1.08, camPos: [-0.8, 0.9, 5.8], camLookX: 0.3 }, // 2 AI
  { pos: [0, -1.2, 0], rotY: 0.2, scale: 1.05, camPos: [0, 1.1, 7.2], camLookX: 0 }, // 3 Data Science
  { pos: [-0.9, -1.2, 0], rotY: 0.7, scale: 1.06, camPos: [1.2, 1.0, 6.4], camLookX: -0.3 }, // 4 Engineering
  { pos: [1.0, -1.2, 0], rotY: -0.5, scale: 1.03, camPos: [-1.2, 1.1, 8.2], camLookX: 0.3 }, // 5 Interior
  { pos: [0, -1.2, 0], rotY: 0, scale: 1.1, camPos: [0, 0.9, 7.2], camLookX: 0 }, // 6 Dance
  { pos: [0, -0.9, 0], rotY: 0.2, scale: 1.1, camPos: [0, 1.6, 10.2], camLookX: 0 }, // 7 Vision
  { pos: [0, -1.2, 0], rotY: 0, scale: 1.04, camPos: [0, 1.0, 6.2], camLookX: 0 }, // 8 Contact
];

export default function CharacterModel() {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [seed, setSeed] = useState(0.5);
  const elapsed = useRef(0);

  const prevSection = useRef<number>(-1);
  const smoothPos    = useRef(new THREE.Vector3(0.3, -1.0, 0));
  const smoothRotY   = useRef(-0.1);
  const smoothScale  = useRef(0.01);           // starts tiny → scales in on load
  const smoothCamPos = useRef(new THREE.Vector3(0, 0.5, 15)); // starts far → pulls in
  const smoothLookX  = useRef(0.2);

  // `character.enc` is not glTF; use its bytes as deterministic motion seed.
  useEffect(() => {
    let active = true;
    fetch(CHARACTER_URL)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (!active) return;
        const bytes = new Uint8Array(buffer);
        const sample = Math.min(bytes.length, 128);
        if (!sample) return;
        let acc = 0;
        for (let i = 0; i < sample; i += 1) acc += bytes[i];
        setSeed((acc % 1000) / 1000);
      })
      .catch(() => {
        setSeed(0.5);
      });
    return () => {
      active = false;
    };
  }, []);

  const coreColor = useMemo(() => {
    const hue = 0.58 + seed * 0.2;
    return new THREE.Color().setHSL(hue % 1, 0.85, 0.62);
  }, [seed]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    const si = Math.max(0, Math.min(8, scrollStore.sectionIndex));
    prevSection.current = si;

    const kf = SECTION_KF[si];
    // Exponential smooth lerp — frame-rate independent
    const lf    = 1 - Math.pow(0.01, delta);
    const camLf = lf * 0.55;

    smoothPos.current.lerp(new THREE.Vector3(...kf.pos), lf);
    groupRef.current.position.copy(smoothPos.current);

    const orbitOffset = Math.sin(elapsed.current * 0.35 + si) * 0.18;
    smoothRotY.current += (kf.rotY + orbitOffset - smoothRotY.current) * lf;
    groupRef.current.rotation.y = smoothRotY.current;

    smoothScale.current += (kf.scale - smoothScale.current) * lf;
    groupRef.current.scale.setScalar(smoothScale.current);
    groupRef.current.position.y += Math.sin(elapsed.current * 1.15 + si * 0.8) * 0.03;
    if (shellRef.current) shellRef.current.rotation.y += delta * (0.35 + seed * 0.5);
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * (0.55 + seed * 0.35);
      ringRef.current.rotation.z += delta * 0.2;
    }

    smoothCamPos.current.lerp(new THREE.Vector3(...kf.camPos), camLf);
    camera.position.copy(smoothCamPos.current);

    smoothLookX.current += (kf.camLookX - smoothLookX.current) * camLf;
    camera.lookAt(smoothLookX.current, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.9, 4]} />
        <meshStandardMaterial
          color={coreColor}
          metalness={0.85}
          roughness={0.2}
          emissive={coreColor.clone().multiplyScalar(0.22)}
          emissiveIntensity={1 + seed * 0.35}
        />
      </mesh>
      <mesh ref={shellRef} scale={[1.38, 1.38, 1.38]}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#9ad9ff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringRef} rotation={[0.9, 0.2, 0]} scale={[1.6, 1.6, 1.6]}>
        <torusGeometry args={[0.86, 0.06, 20, 90]} />
        <meshStandardMaterial color="#b58dff" metalness={1} roughness={0.22} emissive="#9f7cff" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}
