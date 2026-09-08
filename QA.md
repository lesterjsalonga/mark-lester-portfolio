# Validation

- `npm run build`: TypeScript and production Vite build pass.
- Resume content checked against the rendered original PDF: all 3 projects, 2 roles / 7 bullets, 4 skill categories, 2 certification categories (8 credentials), and complete education/participation text included. Line wrapping normalized only. Phone and original PDF excluded.
- Headless Microsoft Edge, production preview, 390 × 844 mobile viewport: no canvas, no Hero3D chunk request, no horizontal overflow, no JavaScript errors. First contentful paint: 396 ms in this local run.
- 1440 × 900 desktop viewport: canvas and lazy Hero3D chunk present, no horizontal overflow, no JavaScript errors. Mean requestAnimationFrame interval over 60 samples: 8.2 ms on this host. This is a short local scheduling measurement, not a guaranteed GPU frame time on all laptops.
- 1440 × 900 reduced-motion viewport: static fallback checked by the same performance script.
- No physical phone/device-lab benchmark was performed. Mobile 3D cost is avoided structurally by not loading the renderer.
- The large Three.js chunk is isolated from mobile and initial paint. Scene uses fixed DPR 1, low-power WebGL preference, no antialiasing or postprocessing, simple line geometry, and offscreen/hidden-document rendering suspension.
- GitHub public API can be rate-limited; the UI retains a working contribution-history link and shows an honest unavailable state.

Reproduce the optional local performance check using `perf-check.cjs` while `npm run preview` is serving port 4173. The script uses the workspace's bundled Playwright and installed Edge paths; adjust those two paths for another machine.
