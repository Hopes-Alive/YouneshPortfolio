"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
interface PostProcessingProps {
  quality: 0 | 1 | 2;
}

export default function PostProcessingEffects({ quality }: PostProcessingProps) {

  if (quality === 0) return null;

  if (quality === 2) {
    return (
      <EffectComposer multisampling={4}>
        <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={1.2} luminanceThreshold={0.18} luminanceSmoothing={0.9} mipmapBlur />
      <Vignette eskil={false} offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
