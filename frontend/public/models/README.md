# 3D Assets In Use

Current scene assets:
- `frontend/public/models/character.enc` (seed file driving procedural hero visuals)
- `frontend/public/models/char_enviorment.hdr` (environment lighting)

## Notes
- The character visuals are generated in `frontend/components/home/3d/ModelObject.tsx`.
- The environment HDR is loaded in `frontend/components/home/3d/Experience.tsx`.
- Keep file names stable unless you also update those paths.
