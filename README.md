# Mark Lester J. Salonga — Portfolio

An existing Vite + React + TypeScript portfolio revised around an explorable amber AR city. The AR scan hero remains; the five buildings now contain the full Projects, Experience, Skills, Certifications, and Contact content. Education and GitHub activity remain below the city. No backend or credentials are required.

## Run and deploy

Requires Node.js 22.13+ (the content generator uses Node's type-stripping flag).

```sh
npm install
npm run dev
npm run build
npm run preview
```

`predev` and `prebuild` generate `public/readable.html` from `app/resume.ts`. The full text version is always available and works without JavaScript or WebGL. The main HTML document includes a fallback link even if the application script fails to load. Deploy `dist` to Vercel or Netlify using the included configuration.

## Content architecture

- `app/resume.ts`: canonical verbatim resume content. Phone number and the original PDF remain excluded. Every project has commented `image` and `liveUrl` fields for real assets/URLs.
- `components/CityNav.tsx`: independently toggleable city, room selection, deep links, low-power/static view, visibility management, context-failure fallback, and ordinary building links. Set `<CityNav enabled={false} />` to replace it with a link to the full text portfolio.
- `components/CityContent.tsx`: the only interactive-page rendering of the five buildings' full content. Projects and Experience use scrollable cards/timelines; Skills and Certifications keep the resume categories; Contact contains the email and GitHub links. Back to city and Escape restore the overview and keyboard focus. These sections are not duplicated below the city.
- `components/CityScene.tsx`: existing R3F/Drei stack with GSAP camera movement. Selecting a building splits and fades its modular facade, then reveals `CityContent` through Drei `Html`, anchored at that building's interior. HTML stays untransformed for readable text. The renderer pauses after the room opens and resumes on return to the overview.
- `components/city-data.ts`: one geometry model for live and static views. Projects has multiple wings/floors; Experience rises through tiers; Skills uses repeated rack modules; Certifications is a raised gateway monument; Contact is a low entrance pavilion.
- `components/CityMap.tsx`: SVG projection of the same model, used below 768px, for reduced motion, or without WebGL. Selecting a building opens the same complete HTML content in the map viewport.
- `components/SiteMotion.tsx`: Framer Motion scroll reveals using transform/opacity, with an instant reduced-motion path. Project cards, experience entries, the stats strip, Education, and GitHub use the shared reveal behavior. Global CSS applies bracket-corner hover/focus states to interactive elements.
- `scripts/generate-readable.mjs`: produces the separate no-JavaScript full text view, with all canonical content escaped and all section links usable without client-side code.
- `components/SpatialViewport.tsx` and `Hero3D.tsx`: preserved AR hero. The old viewport label and the entire calibration game were removed, including the game's component, state, and CSS.

## Performance and accessibility

The city is imported only when its viewport enters view, and unmounts offscreen or when the document is hidden. It targets 30 renders/second in overview, uses DPR 1, and adds no textures, shadows, or postprocessing. Only the selected room's HTML mounts. The city pauses the hero while active, and stops its own continuous render loop while a room is being read. Hover/focus animation uses the existing amber bracket/reticle language.

Reduced-motion users receive the static map, instant room changes, and visible content without scroll fades. A permanent full-text link bypasses both graphics and client-side interaction. All rooms support keyboard access, a labelled scroll region, Escape, and focus restoration.

For local profiling only, `?city-benchmark=1` enables the live scene at mobile dimensions. Development-only data attributes on `.city-viewport` report actual R3F FPS, p95 frame interval, draw calls, and triangle count. The override and counters are stripped from production. Desktop CPU throttling does not replace a physical phone benchmark. See `QA.md` for measured results and limits.

External services: Google Fonts (system fallback) and GitHub public activity (honest unavailable state and a direct GitHub link). Neither is required to read the portfolio.
