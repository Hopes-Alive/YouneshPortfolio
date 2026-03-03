# 3D Model Asset

Place your hero model at:
  `frontend/public/models/hero.glb`

## Requirements
- Format: `.glb` (preferred) or `.gltf`
- Target poly count: < 300k triangles
- PBR textures (baseColor, normal, roughness, metallic)
- Draco compressed recommended

## Sources
- [Sketchfab](https://sketchfab.com) — search "abstract crystal", "geometric humanoid", "fractured orb"
- [Poly Haven](https://polyhaven.com) — free CC0 models/props
- [CGTrader](https://www.cgtrader.com/free-3d-models) — many free options

## Enabling the GLB model
Once you have the file, uncomment the GLB loader code in:
  `frontend/components/home/3d/ModelObject.tsx`

Until then, the site uses the built-in procedural crystal geometry.
