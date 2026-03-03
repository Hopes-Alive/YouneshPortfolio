/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "./scrollStore";

const ROBOT_URL = "/models/robot.glb";

// Kick off model download as early as possible
useGLTF.preload(ROBOT_URL);

// Animation clip names (Soldier.glb clips: Idle, Run, Walk, TPose)
const SECTION_ANIMS: string[] = [
  "Idle",  // 0 Hero        — standing confidently
  "Walk",  // 1 About       — the journey
  "Idle",  // 2 AI          — focused, with green light
  "Walk",  // 3 Data Science — walking through data
  "Walk",  // 4 Engineering  — moving through blueprints
  "Idle",  // 5 Interior    — contemplating the space
  "Run",   // 6 Dance       — energetic movement
  "Run",   // 7 Vision      — running toward the future
  "Idle",  // 8 Contact     — ready to connect
];

interface SectionKF {
  pos: [number, number, number];
  rotY: number;
  scale: number;
  camPos: [number, number, number];
  camLookX: number;
}

// One keyframe per section — tuned for the Soldier model (~1.8m realistic human)
const SECTION_KF: SectionKF[] = [
  { pos: [0.4,  -1.0,  0], rotY: -0.15, scale: 0.78, camPos: [0,    0.8, 8  ], camLookX:  0.2 }, // 0 Hero
  { pos: [-1.1, -1.0,  0], rotY:  0.5,  scale: 0.78, camPos: [1.5,  0.8, 7  ], camLookX: -0.2 }, // 1 About
  { pos: [0.9,  -1.0,  0], rotY: -0.4,  scale: 0.78, camPos: [-0.8, 0.6, 5.5], camLookX:  0.3 }, // 2 AI
  { pos: [0,    -1.0,  0], rotY:  0.2,  scale: 0.78, camPos: [0,    0.8, 7  ], camLookX:  0   }, // 3 Data Science
  { pos: [-0.9, -1.0,  0], rotY:  0.7,  scale: 0.78, camPos: [1.2,  0.8, 6  ], camLookX: -0.3 }, // 4 Engineering
  { pos: [1.0,  -1.0,  0], rotY: -0.5,  scale: 0.78, camPos: [-1.2, 0.8, 8  ], camLookX:  0.3 }, // 5 Interior
  { pos: [0,    -1.0,  0], rotY:  0,    scale: 0.82, camPos: [0,    0.6, 7  ], camLookX:  0   }, // 6 Dance
  { pos: [0,    -0.7,  0], rotY:  0.2,  scale: 0.78, camPos: [0,    1.4, 10 ], camLookX:  0   }, // 7 Vision
  { pos: [0,    -1.0,  0], rotY:  0,    scale: 0.78, camPos: [0,    0.8, 6  ], camLookX:  0   }, // 8 Contact
];

export default function RobotModel() {
  const { scene, animations } = useGLTF(ROBOT_URL) as any;
  const groupRef = useRef<any>(null);
  const { actions, mixer } = useAnimations(animations, groupRef);
  const { camera } = useThree();

  const prevSection = useRef<number>(-1);
  const smoothPos    = useRef(new THREE.Vector3(0.3, -0.9, 0));
  const smoothRotY   = useRef(-0.1);
  const smoothScale  = useRef(0.01);           // starts tiny → scales in on load
  const smoothCamPos = useRef(new THREE.Vector3(0, 0.5, 15)); // starts far → pulls in
  const smoothLookX  = useRef(0.2);

  // Play Idle on first load
  useEffect(() => {
    const idle = actions["Idle"];
    if (idle) {
      idle.reset().play();
      prevSection.current = 0;
    }
  }, [actions]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    mixer.update(delta);

    const si = Math.max(0, Math.min(8, scrollStore.sectionIndex));

    // Switch animation when section changes
    if (si !== prevSection.current) {
      const fromA = SECTION_ANIMS[Math.max(0, prevSection.current)] ?? "Idle";
      const toA   = SECTION_ANIMS[si] ?? "Idle";
      if (fromA !== toA) {
        actions[fromA]?.fadeOut(0.5);
        actions[toA]?.reset().fadeIn(0.5).play();
      }
      prevSection.current = si;
    }

    const kf = SECTION_KF[si];
    // Exponential smooth lerp — frame-rate independent
    const lf    = 1 - Math.pow(0.01, delta);
    const camLf = lf * 0.55;

    smoothPos.current.lerp(new THREE.Vector3(...kf.pos), lf);
    groupRef.current.position.copy(smoothPos.current);

    smoothRotY.current += (kf.rotY - smoothRotY.current) * lf;
    groupRef.current.rotation.y = smoothRotY.current;

    smoothScale.current += (kf.scale - smoothScale.current) * lf;
    groupRef.current.scale.setScalar(smoothScale.current);

    smoothCamPos.current.lerp(new THREE.Vector3(...kf.camPos), camLf);
    camera.position.copy(smoothCamPos.current);

    smoothLookX.current += (kf.camLookX - smoothLookX.current) * camLf;
    camera.lookAt(smoothLookX.current, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
