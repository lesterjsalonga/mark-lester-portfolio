import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ArrowUpRight, Crosshair } from 'lucide-react';
import { Button } from './ui/button';
import CityMap from './CityMap';
import { cityDestinations, navigateToSection } from './city-data';
import './city-nav.css';
const CityScene = lazy(() => import('./CityScene'));
class CityBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function CityNav({ enabled = true }: { enabled?: boolean }) {
  return enabled ? <CityNavigation /> : null;
}
function CityNavigation() {
  const [inView, setInView] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    );
    // Local-only benchmark override; never included as a production option.
    const benchmark =
      import.meta.env.DEV &&
      new URLSearchParams(location.search).has('city-benchmark');
    const update = () =>
      setCanRender(
        media.matches ||
          (benchmark &&
            !matchMedia('(prefers-reduced-motion: reduce)').matches),
      );
    update();
    media.addEventListener('change', update);
    let intersecting = false;
    const visibility = () => setInView(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        visibility();
      },
      { threshold: 0 },
    );
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  const live = inView && canRender && !staticMode && !failed;
  useEffect(() => {
    // Only one animated WebGL view at a time, even when both intersect the screen.
    window.dispatchEvent(
      new CustomEvent('portfolio:city-active', { detail: live }),
    );
    if (!live) {
      setReady(false);
      setSelected(null);
    }
    return () => {
      window.dispatchEvent(
        new CustomEvent('portfolio:city-active', { detail: false }),
      );
    };
  }, [live]);
  const fallback = <CityMap onNavigate={navigateToSection} />;
  return (
    <section
      id="city-navigation"
      className="city-navigation"
      aria-labelledby="city-heading"
    >
      <div className="city-heading">
        <div>
          <span className="eyebrow">SPATIAL INDEX / FIVE DESTINATIONS</span>
          <h2 id="city-heading">Find your way around.</h2>
        </div>
        <a className="text-link" href="#projects">
          Skip to the work <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="city-console">
        <div className="city-toolbar">
          <span>
            <Crosshair size={15} /> PORTFOLIO / SITE MAP
          </span>
          {canRender && !failed ? (
            <Button
              className="city-mode-button"
              onClick={() => setStaticMode((v) => !v)}
              aria-pressed={staticMode}
            >
              {staticMode ? 'Enable 3D' : 'Use static map'}
            </Button>
          ) : (
            <span>{failed ? 'STATIC MAP / 3D UNAVAILABLE' : 'STATIC MAP'}</span>
          )}
        </div>
        <div
          ref={host}
          className="city-viewport"
          data-city-mode={live ? '3d' : 'static'}
          aria-label="Portfolio city navigation"
        >
          {live ? (
            <CityBoundary fallback={fallback} onFailure={() => setFailed(true)}>
              <Suspense fallback={fallback}>
                <CityScene
                  onNavigate={navigateToSection}
                  onSelect={setSelected}
                  onReady={() => setReady(true)}
                  onFailure={() => setFailed(true)}
                  diagnosticsHost={host}
                />
              </Suspense>
            </CityBoundary>
          ) : (
            fallback
          )}
          <div className="city-coordinate" aria-hidden="true">
            WORLD / XZ
            <br />
            ANCHORS: 05
          </div>
        </div>
        <div className="city-status" role="status">
          <span className="status-dot" />
          {selected
            ? `Opening ${cityDestinations.find((d) => d.id === selected)?.label}…`
            : live && ready
              ? 'Select a building to move closer and open its section.'
              : 'Select a building or use the section links below.'}
        </div>
        <nav className="city-links" aria-label="Portfolio section shortcuts">
          {cityDestinations.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(item.id);
              }}
            >
              <span>{item.number}</span>
              {item.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
