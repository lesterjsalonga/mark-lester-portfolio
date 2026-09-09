# Mark Lester J. Salonga — Portfolio

A static Vite + React + TypeScript portfolio with a thermal amber AR tracking interface. Tailwind CSS handles utility layout, React Three Fiber / Drei render the desktop scene, GSAP ScrollTrigger connects the anchor to scrolling, and Framer Motion handles only the calibration status micro-interaction.

## Run locally

Requires Node.js 22.13+.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Deploy the `dist` folder to Vercel or Netlify. Included configuration files select the build command and output directory. No backend, secrets, or environment variables are required.

## Content and extension

- `app/resume.ts`: exact resume experience bullets, project descriptions, skills, certifications, and education. Only PDF line wraps have been joined. Three Huawei credentials share the original single grouped entry; eight certifications total.
- `components/ProjectCard.tsx`: every project is fully visible. Set `image` and `liveUrl` on the corresponding record in `app/resume.ts` once real assets/URLs are available. No fake screenshots or dead links are rendered.
- `components/Hero3D.tsx`: low-complexity anchor, tracking floor, and scan line; fixed pixel ratio of 1 and no lights, textures, shadows, or postprocessing.
- `components/SpatialViewport.tsx`: lazy-loads the 3D module only above 767px when reduced motion is off; static fallback for mobile, loading, and rendering errors. Rendering pauses offscreen and when the document is hidden.
- `components/Timeline.tsx`: full experience in reverse chronological order.
- `components/MarkerGame.tsx`: skippable three-marker calibration with pointer, touch, and keyboard controls. It runs only after Start and can be stopped anytime. Reduced motion freezes the moving marker.
- `components/GitHubActivity.tsx`: fetches recent real public GitHub events. Handles empty activity, rate limiting, and failures without invented contribution data. Links to the full contribution history.
- `app/globals.css`: palette, typography, responsive rules, bracket interactions, and reduced-motion styles.

Phone number and original resume PDF are intentionally excluded from public files pending the owner's confirmation. The photo is not needed for the requested AR interface. Hero framing is newly written in first person, based only on the supplied experience. Competition participation is not presented as a placement or award.

External services: Google Fonts for Space Grotesk and IBM Plex Sans (local system fallback); GitHub's public events endpoint (graceful failure state). The site works without either service.

## Performance checks

Mobile and reduced-motion visitors receive the static anchor and do not request the Hero3D/Three.js chunk. Desktop 3D loads after initial paint, uses pixel ratio 1, and stops when outside the viewport. Production build separates 3D from the initial page bundle. See `QA.md` for checks performed in this workspace and their limits.

## Spatial city navigation

`components/CityNav.tsx` is independently toggleable: set `<CityNav enabled={false} />` in `app/page.tsx`, or remove that component. It sits immediately after the hero stats, before Projects, as an optional visual table of contents. The AR scan hero is preserved.

- Five modular buildings map to Projects, Experience, Skills (`#stack`), Certifications, and Contact. `components/city-data.ts` is their shared geometry/route model.
- `components/CityScene.tsx` uses the existing R3F/Drei/GSAP dependencies. It settles into an angled overview, pulses amber edges on hover/focus, and moves the camera toward a selected building for 0.8 seconds before navigating. Heading focus and URL fragments update with navigation. Direct section links cancel an unfinished camera approach.
- The scene is lazy-loaded only when its viewport intersects the screen, and unmounts when offscreen or the document is hidden. Demand rendering targets 30 draws/second at DPR 1. A small coordination event pauses hero animation while the city is live, so the scenes do not animate concurrently.
- Desktop users can switch to the static map at any time. Below 768px and with reduced motion, `components/CityMap.tsx` renders a clickable SVG projection of the same building geometry. No 3D chunk or WebGL canvas is loaded for mobile. The five ordinary links remain available independently of the scene, including after loading errors or context loss.
- `components/city-nav.css` contains the city-specific styling.
- A development-only `?city-benchmark=1` option allows measuring the live scene at a mobile viewport. Development diagnostics on `.city-viewport` report measured render-loop FPS, p95 frame interval, draw calls, and triangle count. This override and measurement code are excluded from production.

The live city reached its 30 FPS target in a 6× CPU-throttled mobile-sized browser test. The production mobile choice remains static to save continuous GPU work and provide clearer, stable touch targets; desktop emulation does not establish performance on a physical phone.
