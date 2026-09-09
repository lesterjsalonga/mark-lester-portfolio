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
// Shared live/static geometry. Each silhouette expresses the building's purpose.
export const cityDestinations: CityDestination[] = [
  {
    id: 'projects',
    label: 'Projects',
    number: '01',
    position: [-2.3, 0, -1.5],
    height: 1.9,
    blocks: [
      { offset: [-0.5, 0.4, 0], size: [0.9, 0.8, 1.4] },
      { offset: [0.5, 0.55, 0.25], size: [0.9, 1.1, 0.9] },
      { offset: [-0.5, 1.05, -0.15], size: [0.9, 0.4, 1.1] },
      { offset: [-0.65, 1.6, -0.3], size: [0.6, 0.6, 0.75] },
      { offset: [0.45, 1.45, 0.25], size: [1, 0.35, 1] },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    number: '02',
    position: [1.4, 0, -2.1],
    height: 2.75,
    blocks: [
      { offset: [0, 0.3, 0], size: [1.55, 0.6, 1.3] },
      { offset: [0.1, 0.95, -0.1], size: [1.2, 0.6, 1.1] },
      { offset: [0.2, 1.6, -0.2], size: [0.9, 0.6, 0.85] },
      { offset: [0.3, 2.275, -0.3], size: [0.6, 0.75, 0.6] },
      { offset: [0.3, 2.7, -0.3], size: [0.2, 0.1, 0.2] },
    ],
  },
  {
    id: 'stack',
    label: 'Skills',
    number: '03',
    position: [-2.2, 0, 1.6],
    height: 1.3,
    blocks: [
      { offset: [0, 0.1, 0], size: [1.9, 0.2, 1.5] },
      ...Array.from({ length: 6 }, (_, i) => ({
        offset: [((i % 3) - 1) * 0.58, 0.3 + Math.floor(i / 3) * 0.65, 0] as [
          number,
          number,
          number,
        ],
        size: [0.42, 0.6, 0.95] as [number, number, number],
      })),
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    number: '04',
    position: [1.6, 0, 0.65],
    height: 2.1,
    blocks: [
      { offset: [0, 0.12, 0], size: [1.8, 0.24, 1.5] },
      { offset: [0, 0.37, 0], size: [1.35, 0.26, 1.1] },
      { offset: [-0.53, 1.1, 0], size: [0.25, 1.2, 0.45] },
      { offset: [0.53, 1.1, 0], size: [0.25, 1.2, 0.45] },
      { offset: [0, 1.75, 0], size: [1.55, 0.3, 0.6] },
      { offset: [0, 2.025, 0], size: [0.5, 0.25, 0.4] },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    number: '↗',
    position: [0.05, 0, 3.55],
    height: 0.85,
    blocks: [
      { offset: [0, 0.2, 0], size: [1.45, 0.4, 0.85] },
      { offset: [-0.5, 0.55, -0.2], size: [0.14, 0.3, 0.3] },
      { offset: [0.5, 0.55, -0.2], size: [0.14, 0.3, 0.3] },
      { offset: [0, 0.78, -0.05], size: [1.6, 0.14, 1] },
    ],
  },
];
