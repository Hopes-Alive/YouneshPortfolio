"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function ImageSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: ImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseDown={() => { isDragging.current = true; }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { isDragging.current = true; }}
      onTouchEnd={() => { isDragging.current = false; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image (full width, behind) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
        <span className="absolute bottom-4 right-4 text-xs font-bold px-2 py-1 rounded bg-black/50 text-white">
          {afterLabel}
        </span>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
        />
        <span className="absolute bottom-4 left-4 text-xs font-bold px-2 py-1 rounded bg-black/50 text-white">
          {beforeLabel}
        </span>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2"
        style={{ left: `${sliderPosition}%`, backgroundColor: "var(--accent)" }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
        >
          <span className="text-xs font-bold">&harr;</span>
        </div>
      </div>
    </motion.div>
  );
}
