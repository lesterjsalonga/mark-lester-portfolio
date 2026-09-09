# Validation — city content revision

Validated September 10, 2026. The original menu-only city has been revised in place; these results supersede its earlier navigation-only measurements.

## Content and interaction

- Full Projects, Experience, Skills, Certifications, and Contact content is rendered only inside the selected city room on the interactive page. No duplicate flat sections remain below the city. Education and GitHub activity remain on the page.
- Automated checks compared every project description, all seven experience bullets, all skill items, every certification entry/group, education mentions, and contact information against `app/resume.ts`.
- All five rooms passed opening/closing and repeated navigation checks on desktop, mobile static view, reduced motion, and the development-only mobile live benchmark.
- Live building selection stays within the city viewport. Back to city, keyboard activation, Escape, labelled scroll regions, and focus restoration work.
- Full descriptions are present in scrollable HTML panels; the scroll hint makes additional content explicit.
- Context loss while a room is open falls back to the same complete content. A separate Edge run with WebGL disabled at startup also passed: the full Experience room opens with no city canvas. Both scenes check WebGL2 support before mounting their renderer.
- With JavaScript disabled, the home page's fallback link opens `readable.html`. All canonical resume content remains present and reachable with ordinary links. The generator runs automatically before development and production builds.
- No unexpected JavaScript errors or horizontal page overflow in the checked 390px and 1440px views. Desktop and mobile room renders were inspected.
- Removed the viewport label and the entire calibration game, including its component, state, imports, and CSS. Source search found no remaining game code or removed labels.

## Final performance profile

Measured actual R3F render-loop frames in headless Microsoft Edge. FPS was sampled before adding draw-call instrumentation; the latter was used separately to verify reading-room pause behavior.

| Scenario | FPS | p95 frame interval | Draw calls/frame | Triangles/frame |
| --- | ---: | ---: | ---: | ---: |
| Desktop, 1440 × 1000 | 30.0 | 33.9 ms | 70 | 444 |
| Mobile live benchmark, 390 × 844, 6× CPU throttle | 19.0 | 153.5 ms | 70 | 444 |
| Production mobile static view | No WebGL | — | 0 | 0 |
| Reduced-motion static view | No WebGL | — | 0 | 0 |

The live overview intentionally targets 30 FPS. The larger city did not sustain that target under the mobile CPU-throttle test, so production mobile uses the static SVG city with the same complete HTML rooms. CPU throttling is not GPU throttling, and this is not a physical-phone benchmark.

Native line outlines replaced triangle-expanded outlines, reducing the city from 2,748 to 444 triangles. The live scene remains lazy-loaded, unmounts offscreen/when hidden, pauses the hero while active, and stops its continuous loop once the camera settles into a room. Instrumented checks found no additional WebGL draw calls while reading. No textures, shadows, or postprocessing were added.

## Build and services

`npm run build` runs the full-text generator, TypeScript checking, and the Vite production build. The 3D libraries remain shared and lazy-loaded. GitHub public activity and Google Fonts are optional network resources with usable fallbacks.

The production build passes. The repository-wide `npm run lint` does not pass: it includes existing UI-template accessibility/type findings, Next.js rules applied to this Vite app, and React Compiler restrictions on imperative Three.js camera/rendering code. Keyboard-focusable scroll regions also trigger its generic noninteractive-element rules. Browser accessibility interactions were checked independently; a clean repository-wide lint result is not claimed.

Local diagnostic scripts and images are in ignored `work/`; they are not published or uploaded to GitHub. No original resume PDF, phone number, or temporary build archive is included in the public output.
