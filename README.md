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
