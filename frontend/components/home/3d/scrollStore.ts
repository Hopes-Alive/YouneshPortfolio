/**
 * Mutable scroll store — shared between the React tree and R3F's useFrame loop.
 * Plain object (not React state) keeps the canvas at a stable 60 fps.
 */
export const scrollStore = {
  /** Normalized scroll progress: 0 (top) → 1 (bottom) */
  progress: 0,
  /** Active section index: 0–8 */
  sectionIndex: 0,
  /** Progress within the current section: 0→1 */
  sectionProgress: 0,
  /** Quality tier — set once on mount */
  quality: 1 as 0 | 1 | 2,
};

// Expose on window so non-R3F components (e.g. Navbar) can read it
if (typeof window !== "undefined") {
  (window as any).__scrollStore = scrollStore;
}
