"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

interface PostProcessingEffectsProps {
  quality: 0 | 1 | 2;
}

export default function PostProcessingEffects({ quality }: PostProcessingEffectsProps) {
  if (quality <= 0) return null;

  const bloomIntensity = quality === 2 ? 0.75 : 0.45;
  const noiseOpacity = quality === 2 ? 0.03 : 0.015;

  return (
    <EffectComposer multisampling={quality === 2 ? 4 : 0}>
      <Bloom mipmapBlur intensity={bloomIntensity} luminanceThreshold={0.2} luminanceSmoothing={0.4} />
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
      <Noise opacity={noiseOpacity} />
    </EffectComposer>
  );
}
