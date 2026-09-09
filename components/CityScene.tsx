import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type ComponentRef,
} from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from '@react-three/fiber';
import { Edges, Html } from '@react-three/drei';
import { Vector3, type MeshBasicMaterial } from 'three';
import gsap from 'gsap';
import { Button } from './ui/button';
import { cityDestinations, type CityDestination } from './city-data';
const AMBER = '#ff9b45';
type Props = {
  onNavigate: (id: string) => void;
  onSelect: (id: string | null) => void;
  onReady: () => void;
  onFailure: () => void;
  diagnosticsHost: RefObject<HTMLDivElement | null>;
};
function Building({
  destination,
  hovered,
  selected,
  onHover,
  onSelect,
}: {
  destination: CityDestination;
  hovered: boolean;
  selected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const beacon = useRef<MeshBasicMaterial>(null);
  const outlines = useRef<ComponentRef<typeof Edges>[]>([]);
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
        material.opacity =
          hovered || selected
            ? 0.85 + Math.sin(clock.elapsedTime * 4) * 0.15
            : index === 0
              ? 0.3
              : 0.85;
      });
    });
  });
  function select(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    onSelect(destination.id);
  }
  return (
    <group
      position={destination.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(destination.id);
      }}
      onPointerOut={() => onHover(null)}
      onClick={select}
    >
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[2, 0.1, 1.8]} />
        <meshBasicMaterial color="#1b1712" />
        <Edges
          ref={(edge) => {
            if (edge) outlines.current[0] = edge;
          }}
          color={AMBER}
          transparent
        />
      </mesh>
      {destination.blocks.map((block, index) => (
        <mesh key={index} position={block.offset}>
          <boxGeometry args={block.size} />
          <meshStandardMaterial
            color={hovered || selected ? '#694528' : '#3a3023'}
            roughness={1}
          />
          <Edges
            ref={(edge) => {
              if (edge) outlines.current[index + 1] = edge;
            }}
            color={hovered || selected ? AMBER : '#946439'}
            transparent
            threshold={20}
          />
        </mesh>
      ))}
      <mesh position={[0, destination.height + 0.05, 0]}>
        <boxGeometry args={[0.12, 0.07, 0.12]} />
        <meshBasicMaterial ref={beacon} color={AMBER} transparent />
      </mesh>
      <Html
        center
        position={[0, destination.height + 0.45, 0]}
        zIndexRange={[5, 0]}
      >
        <Button
          type="button"
          className={`city-building-label ${hovered || selected ? 'is-locked' : ''}`}
          aria-label={`Explore ${destination.label}`}
          onFocus={() => onHover(destination.id)}
          onBlur={() => onHover(null)}
          onMouseEnter={() => onHover(destination.id)}
          onMouseLeave={() => onHover(null)}
          onClick={(e) => {
            e.stopPropagation();
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
    </group>
  );
}
function Scene({
  onNavigate,
  onSelect,
  onReady,
  diagnosticsHost,
}: {
  onNavigate: Props['onNavigate'];
  onSelect: Props['onSelect'];
  onReady: Props['onReady'];
  diagnosticsHost: Props['diagnosticsHost'];
}) {
  const { camera, gl, invalidate } = useThree();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const look = useRef(new Vector3(0, 0.35, 0.55));
  const tween = useRef<gsap.core.Timeline | null>(null);
  const navigating = useRef(false);
  const callback = useRef({ onNavigate, onSelect, onReady });
  callback.current = { onNavigate, onSelect, onReady };
  useEffect(() => {
    // A direct section link takes precedence over an unfinished camera approach.
    const cancel = () => {
      if (!navigating.current) return;
      tween.current?.kill();
      navigating.current = false;
      setSelected(null);
      callback.current.onSelect(null);
      camera.position.set(8, 7.2, 10.5);
      look.current.set(0, 0.35, 0.55);
      camera.lookAt(look.current);
    };
    window.addEventListener('portfolio:section-navigation', cancel);
    window.addEventListener('hashchange', cancel);
    return () => {
      window.removeEventListener('portfolio:section-navigation', cancel);
      window.removeEventListener('hashchange', cancel);
    };
  }, [camera]);
  useEffect(() => {
    camera.position.set(10, 10, 13);
    camera.lookAt(look.current);
    tween.current = gsap
      .timeline({ onUpdate: () => camera.lookAt(look.current) })
      .to(camera.position, {
        x: 8,
        y: 7.2,
        z: 10.5,
        duration: 1.05,
        ease: 'power2.out',
      });
    callback.current.onReady();
    return () => {
      tween.current?.kill();
    };
  }, [camera]);
  useEffect(() => {
    gl.domElement.style.cursor = hovered ? 'pointer' : 'default';
    return () => {
      gl.domElement.style.cursor = 'default';
    };
  }, [hovered, gl]);
  useEffect(() => {
    // Demand rendering capped at 30 actual draws/second; all animation stops on unmount.
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
  }, [invalidate]);
  const samples = useRef({
    frames: 0,
    start: 0,
    previous: 0,
    intervals: [] as number[],
  });
  useFrame(() => {
    camera.lookAt(look.current);
    // Development diagnostics count actual R3F render frames, not browser RAF ticks.
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
          cityFrames: String(s.frames),
        });
        s.start = now;
        s.frames = 0;
        s.intervals = [];
      }
    }
  });
  function visit(id: string) {
    if (navigating.current) return;
    const destination = cityDestinations.find((d) => d.id === id);
    if (!destination) return;
    navigating.current = true;
    setSelected(id);
    callback.current.onSelect(id);
    tween.current?.kill();
    const [x, , z] = destination.position;
    tween.current = gsap
      .timeline({
        onUpdate: () => camera.lookAt(look.current),
        onComplete: () => {
          navigating.current = false;
          callback.current.onNavigate(id);
          setSelected(null);
          callback.current.onSelect(null);
          tween.current = gsap
            .timeline({
              delay: 0.5,
              onUpdate: () => camera.lookAt(look.current),
            })
            .to(
              camera.position,
              { x: 8, y: 7.2, z: 10.5, duration: 0.7, ease: 'power2.out' },
              0,
            )
            .to(
              look.current,
              { x: 0, y: 0.35, z: 0.55, duration: 0.7, ease: 'power2.out' },
              0,
            );
        },
      })
      .to(
        camera.position,
        {
          x: x + 3.4,
          y: destination.height + 3.2,
          z: z + 4.2,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        look.current,
        {
          x,
          y: destination.height * 0.45,
          z,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0,
      );
  }
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
          onHover={setHovered}
          onSelect={visit}
        />
      ))}
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
          'Interactive isometric portfolio city',
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
