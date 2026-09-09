export type CityBlock = {
  offset: [number, number, number];
  size: [number, number, number];
};
export type CityDestination = {
  id: string;
  label: string;
  number: string;
  position: [number, number, number];
  height: number;
  blocks: CityBlock[];
};
// The live scene and the static isometric map share this single geometry model.
export const cityDestinations: CityDestination[] = [
  {
    id: 'projects',
    label: 'Projects',
    number: '01',
    position: [-2.1, 0, -1.4],
    height: 1.85,
    blocks: [
      { offset: [0, 0.55, 0], size: [1.65, 1.1, 1.4] },
      { offset: [-0.3, 1.475, -0.2], size: [0.9, 0.75, 0.95] },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    number: '02',
    position: [1.4, 0, -2],
    height: 2.25,
    blocks: [
      { offset: [0, 0.9, 0], size: [1.1, 1.8, 1.1] },
      { offset: [0, 2.025, 0], size: [0.8, 0.45, 0.8] },
    ],
  },
  {
    id: 'stack',
    label: 'Skills',
    number: '03',
    position: [-2, 0, 1.6],
    height: 1.05,
    blocks: [
      { offset: [0, 0.25, 0], size: [1.7, 0.5, 1.3] },
      { offset: [0, 0.775, -0.25], size: [1.2, 0.55, 0.8] },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    number: '04',
    position: [1.55, 0, 0.65],
    height: 1.65,
    blocks: [
      { offset: [-0.4, 0.65, 0], size: [0.5, 1.3, 1] },
      { offset: [0.4, 0.65, 0], size: [0.5, 1.3, 1] },
      { offset: [0, 1.475, 0], size: [1.3, 0.35, 1] },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    number: '↗',
    position: [0.15, 0, 3.35],
    height: 0.95,
    blocks: [
      { offset: [0, 0.3, 0], size: [1.6, 0.6, 0.95] },
      { offset: [0, 0.775, 0], size: [0.85, 0.35, 0.6] },
    ],
  },
];
export function navigateToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  window.dispatchEvent(new Event('portfolio:section-navigation'));
  history.pushState(null, '', `#${id}`);
  section.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
    block: 'start',
  });
  // Transfer keyboard/screen-reader context along with the visual navigation.
  const heading = section.querySelector<HTMLElement>('h2');
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}
