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

## City navigation checks (September 9, 2026)

The city was tested in headless Microsoft Edge with the development render-loop counters. Unlike the original RAF test, these counters measure actual R3F render-loop frames:

| Scenario | Actual render FPS | p95 frame interval | Calls/frame | Triangles/frame |
| --- | ---: | ---: | ---: | ---: |
| Desktop, 1440 × 900 | 30.0 | 33.5 ms | 38 | 1,404 |
| Mobile-sized live benchmark, 390 × 844, 6× CPU throttle | 30.0 | 34.5 ms | 38 | 1,404 |

The intentional cap is 30 FPS. CPU throttling is not GPU throttling and does not substitute for testing a physical phone. Production mobile uses a static SVG map: zero city canvases, no city/Three.js import, five clickable buildings plus ordinary section links. Reduced-motion mode uses the same static path.

Checks passed for: all five live destinations; repeat navigation; keyboard activation and destination heading focus; direct links cancelling a pending camera approach; static map links; desktop static/live toggle; lazy loading only after the viewport intersects; offscreen canvas unmounting; context-loss fallback to all five static links; no horizontal overflow at 390px and 1440px; no unexpected JavaScript errors. Desktop and mobile map renders were inspected.

The production build contains a roughly 5 KB gzip city-specific chunk and reuses the existing shared Three.js/R3F/Drei/GSAP code rather than downloading a second 3D stack. No textures, shadows, postprocessing, or DPR scaling were added.

An instrumented WebGL draw-call check also passed: the hero's actual draw calls stop while the city is active, then resume when the city unmounts offscreen. Final keyboard controls passed after the UI component integration.
