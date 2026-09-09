import { cityDestinations, type CityBlock } from './city-data';
// Orthographic projection of the same modular boxes as CityScene; no WebGL.
function project(x: number, y: number, z: number) {
  return [350 + (x - z) * 40, 177 + (x + z) * 18 - y * 48];
}
function face(points: number[][]) {
  return points.map((p) => project(p[0], p[1], p[2]).join(',')).join(' ');
}
function Block({
  block,
  position,
}: {
  block: CityBlock;
  position: [number, number, number];
}) {
  const [x, y, z] = block.offset.map((v, i) => v + position[i]);
  const [w, h, d] = block.size.map((v) => v / 2);
  return (
    <g>
      <polygon
        className="city-face-left"
        points={face([
          [x - w, y - h, z + d],
          [x + w, y - h, z + d],
          [x + w, y + h, z + d],
          [x - w, y + h, z + d],
        ])}
      />
      <polygon
        className="city-face-right"
        points={face([
          [x + w, y - h, z - d],
          [x + w, y - h, z + d],
          [x + w, y + h, z + d],
          [x + w, y + h, z - d],
        ])}
      />
      <polygon
        className="city-face-top"
        points={face([
          [x - w, y + h, z - d],
          [x + w, y + h, z - d],
          [x + w, y + h, z + d],
          [x - w, y + h, z + d],
        ])}
      />
    </g>
  );
}
export default function CityMap({
  onNavigate,
}: {
  onNavigate: (id: string) => void;
}) {
  return (
    <svg
      className="city-map"
      viewBox="0 0 700 410"
      role="group"
      aria-label="Isometric map of portfolio sections"
    >
      <g className="city-map-grid" aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => i - 5).map((n) => (
          <g key={n}>
            <polyline
              points={face([
                [n, 0, -5],
                [n, 0, 5],
              ])}
            />
            <polyline
              points={face([
                [-5, 0, n],
                [5, 0, n],
              ])}
            />
          </g>
        ))}
      </g>
      {[...cityDestinations]
        .sort(
          (a, b) =>
            a.position[0] + a.position[2] - (b.position[0] + b.position[2]),
        )
        .map((destination) => {
          const [x, z] = [destination.position[0], destination.position[2]];
          const label = project(x, destination.height + 0.55, z);
          return (
            <a
              key={destination.id}
              href={`#${destination.id}`}
              aria-label={`Go to ${destination.label}`}
              className="city-map-building"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(destination.id);
              }}
            >
              <title>{destination.label}</title>
              {destination.blocks.map((block, i) => (
                <Block key={i} block={block} position={destination.position} />
              ))}
              <g transform={`translate(${label.join(',')})`}>
                <rect
                  x={-destination.label.length * 3.6 - 21}
                  y="-17"
                  width={destination.label.length * 7.2 + 42}
                  height="29"
                />
                <text textAnchor="middle" y="2">
                  {destination.number} {destination.label.toUpperCase()}
                </text>
              </g>
            </a>
          );
        })}
    </svg>
  );
}
