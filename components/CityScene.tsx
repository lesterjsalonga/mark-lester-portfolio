import { useEffect, useRef, useState, useMemo, type RefObject } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from '@react-three/fiber';
import { Html } from '@react-three/drei';
import {
  Vector3,
  BoxGeometry,
  EdgesGeometry,
  type LineSegments,
  type Mesh,
  type MeshStandardMaterial,
  type MeshBasicMaterial,
} from 'three';
import gsap from 'gsap';
import { Button } from './ui/button';
import { cityDestinations, type CityDestination } from './city-data';
import CityContent from './CityContent';
const AMBER = '#ff9b45';
// Native line segments avoid the triangle expansion needed for thick outlines.
function WireEdges({
  size,
  color,
  onRef,
}: {
  size: [number, number, number];
  color: string;
  onRef: (edge: LineSegments | null) => void;
}) {
  const [width, height, depth] = size;
  const geometry = useMemo(() => {
    const box = new BoxGeometry(width, height, depth);
    const edges = new EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [width, height, depth]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <lineSegments geometry={geometry} ref={onRef}>
      <lineBasicMaterial color={color} transparent />
    </lineSegments>
  );
}
type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  onSettled: (value: boolean) => void;
  onFailure: () => void;
  diagnosticsHost: RefObject<HTMLDivElement | null>;
};
function Building({
  destination,
  hovered,
  selected,
  hasSelection,
  onHover,
  onSelect,
}: {
  destination: CityDestination;
  hovered: boolean;
  selected: boolean;
  hasSelection: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const beacon = useRef<MeshBasicMaterial>(null);
  const outlines = useRef<LineSegments[]>([]);
  const pieces = useRef<Mesh[]>([]);
  const opening = useRef({ value: 0 });
  useEffect(() => {
    const tween = gsap.to(opening.current, {
      value: selected ? 1 : 0,
      duration: 0.7,
      ease: 'power2.inOut',
    });
    return () => {
      tween.kill();
    };
  }, [selected]);
  useFrame(({ clock }) => {
    if (beacon.current)
      beacon.current.opacity =
        0.45 +
        Math.sin(clock.elapsedTime * 1.5 + destination.position[0]) * 0.15;
    outlines.current.forEach((edge, index) => {
      const materials = Array.isArray(edge.material)
        ? edge.material
        : [edge.material];
      materials.forEach((material) => {
        material.opacity = selected
          ? 0.55
          : hovered
            ? 0.85 + Math.sin(clock.elapsedTime * 4) * 0.15
            : index === 0
              ? 0.3
              : 0.75;
      });
    });
    pieces.current.forEach((piece, index) => {
      piece.position.x =
        destination.blocks[index].offset[0] +
        (index % 2 ? 1 : -1) * opening.current.value * 2;
      piece.position.y =
        destination.blocks[index].offset[1] + opening.current.value * 0.3;
      const material = piece.material as MeshStandardMaterial;
      material.opacity = selected
        ? 1 - opening.current.value * 0.76
        : hasSelection
          ? 0.35
          : 1;
    });
  });
  function select(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (!hasSelection) onSelect(destination.id);
  }
  return (
    <group
      position={destination.position}
      onPointerOver={(event) => {
        event.stopPropagation();
        if (!hasSelection) onHover(destination.id);
      }}
      onPointerOut={() => onHover(null)}
      onClick={select}
    >
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[2.2, 0.1, 1.8]} />
        <meshBasicMaterial color="#1b1712" />
        <WireEdges
          size={[2.2, 0.1, 1.8]}
          color={AMBER}
          onRef={(edge) => {
            if (edge) outlines.current[0] = edge;
          }}
        />
      </mesh>
      {destination.blocks.map((block, index) => (
        <mesh
          key={index}
          position={block.offset}
          ref={(piece) => {
            if (piece) pieces.current[index] = piece;
          }}
        >
          <boxGeometry args={block.size} />
          <meshStandardMaterial
            color={hovered || selected ? '#694528' : '#3a3023'}
            roughness={1}
            transparent
          />
          <WireEdges
            size={block.size}
            color={hovered || selected ? AMBER : '#946439'}
            onRef={(edge) => {
              if (edge) outlines.current[index + 1] = edge;
            }}
          />
        </mesh>
      ))}
      <mesh position={[0, destination.height + 0.05, 0]}>
        <boxGeometry args={[0.12, 0.07, 0.12]} />
        <meshBasicMaterial ref={beacon} color={AMBER} transparent />
      </mesh>
      {!hasSelection && (
        <Html
          center
          position={[0, destination.height + 0.45, 0]}
          zIndexRange={[5, 0]}
        >
          <Button
            className={`city-building-label ${hovered ? 'is-locked' : ''}`}
            aria-label={`Open ${destination.label} building`}
            onFocus={() => onHover(destination.id)}
            onBlur={() => onHover(null)}
            onMouseEnter={() => onHover(destination.id)}
            onMouseLeave={() => onHover(null)}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(destination.id);
            }}
          >
            <span>{destination.number}</span>
            {destination.label}
            <span className="city-label-lock" aria-hidden="true">
              ⌖
            </span>
          </Button>
        </Html>
      )}
    </group>
  );
}
function Scene({
  selected,
  onSelect,
  onClose,
  onSettled,
  diagnosticsHost,
}: Props) {
  const { camera, gl, invalidate, size } = useThree();
  const [hovered, setHovered] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);
  const look = useRef(new Vector3(0, 0.45, 0.55));
  const callback = useRef({ onSettled });
  useEffect(() => {
    callback.current = { onSettled };
  }, [onSettled]);
  const first = useRef(true);
  useEffect(() => {
    setSettled(false);
    callback.current.onSettled(false);
    const building = cityDestinations.find((d) => d.id === selected);
    const [x, , z] = building?.position || [0, 0, 0.55];
    const y = building ? building.height * 0.6 : 0.45;
    if (first.current) {
      camera.position.set(10, 10, 13);
      first.current = false;
    }
    const target = building
      ? { x: x + 4.3, y: y + 3.1, z: z + 5.7 }
      : { x: 8, y: 8.6, z: 10.5 };
    const timeline = gsap
      .timeline({
        onUpdate: () => camera.lookAt(look.current),
        onComplete: () => {
          setSettled(true);
          callback.current.onSettled(true);
          invalidate();
        },
      })
      .to(
        camera.position,
        { ...target, duration: 0.85, ease: 'power2.inOut' },
        0,
      )
      .to(look.current, { x, y, z, duration: 0.85, ease: 'power2.inOut' }, 0);
    return () => {
      timeline.kill();
    };
  }, [selected, camera, invalidate]);
  const reading = !!selected && settled;
  useEffect(() => {
    // While reading, HTML stays interactive but WebGL draws only on demand.
    if (reading) {
      invalidate();
      return;
    }
    let frame = 0;
    let last = 0;
    const tick = (time: number) => {
      if (time - last >= 1000 / 30 - 1) {
        last = time;
        invalidate();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [invalidate, reading]);
  useEffect(() => {
    gl.domElement.style.cursor = hovered && !selected ? 'pointer' : 'default';
    return () => {
      gl.domElement.style.cursor = 'default';
    };
  }, [hovered, selected, gl]);
  const samples = useRef({
    frames: 0,
    start: 0,
    previous: 0,
    intervals: [] as number[],
  });
  useFrame(() => {
    camera.lookAt(look.current);
    if (import.meta.env.DEV && diagnosticsHost.current) {
      const now = performance.now();
      const s = samples.current;
      if (!s.start) s.start = now;
      if (s.previous) s.intervals.push(now - s.previous);
      s.previous = now;
      s.frames++;
      if (now - s.start > 1500) {
        const sorted = [...s.intervals].sort((a, b) => a - b);
        Object.assign(diagnosticsHost.current.dataset, {
          cityFps: ((s.frames * 1000) / (now - s.start)).toFixed(1),
          cityP95Ms: (sorted[Math.floor(sorted.length * 0.95)] || 0).toFixed(1),
          cityDrawCalls: String(gl.info.render.calls),
          cityTriangles: String(gl.info.render.triangles),
        });
        s.start = now;
        s.frames = 0;
        s.intervals = [];
      }
    }
  });
  const building = cityDestinations.find((d) => d.id === selected);
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[-4, 8, 5]} intensity={2} color="#ffe1ba" />
      <gridHelper
        args={[11, 22, '#51402d', '#29241c']}
        position={[0, -0.12, 0]}
      />
      {cityDestinations.map((destination) => (
        <Building
          key={destination.id}
          destination={destination}
          hovered={hovered === destination.id}
          selected={selected === destination.id}
          hasSelection={!!selected}
          onHover={setHovered}
          onSelect={onSelect}
        />
      ))}
      {building && settled && (
        <Html
          key={building.id}
          center
          position={[
            building.position[0],
            building.height * 0.6,
            building.position[2],
          ]}
          zIndexRange={[15, 10]}
        >
          <div
            className="city-interior"
            style={{ width: Math.min(680, size.width - 36) }}
          >
            <CityContent id={building.id} onClose={onClose} />
          </div>
        </Html>
      )}
    </>
  );
}
export default function CityScene(props: Props) {
  const cleanup = useRef<() => void>(() => {});
  useEffect(() => () => cleanup.current(), []);
  return (
    <Canvas
      camera={{ position: [10, 10, 13], fov: 43, near: 0.1, far: 60 }}
      dpr={1}
      frameloop="demand"
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.setAttribute(
          'aria-label',
          'Interactive portfolio city with content inside its buildings',
        );
        const lost = (event: Event) => {
          event.preventDefault();
          props.onFailure();
        };
        canvas.addEventListener('webglcontextlost', lost);
        cleanup.current = () =>
          canvas.removeEventListener('webglcontextlost', lost);
      }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
