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
import CityContent from './CityContent';
import { cityDestinations } from './city-data';
import { supportsWebGL2 } from '../lib/webgl';
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
  return enabled ? (
    <CityNavigation />
  ) : (
    <a className="button" href="/readable.html">
      Read the full portfolio
    </a>
  );
}
function CityNavigation() {
  const [inView, setInView] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const valid = (id: string) => cityDestinations.some((d) => d.id === id);
  function open(id: string, scroll = false) {
    if (!valid(id)) return;
    setSelected(id);
    history.replaceState(null, '', `#${id}`);
    if (scroll)
      section.current?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      });
  }
  function close() {
    const previous = selected;
    setSelected(null);
    history.replaceState(null, '', '#city-navigation');
    requestAnimationFrame(() =>
      section.current
        ?.querySelector<HTMLElement>(
          `.city-links [data-building="${previous}"]`,
        )
        ?.focus({ preventScroll: true }),
    );
  }
  useEffect(() => {
    const media = matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    );
    const benchmark =
      import.meta.env.DEV &&
      new URLSearchParams(location.search).has('city-benchmark');
    const update = () => {
      const eligible = media.matches ||
          (benchmark &&
            !matchMedia('(prefers-reduced-motion: reduce)').matches);
      const available = eligible && supportsWebGL2();
      setCanRender(available);
      if (eligible && !available) setFailed(true);
    };
    update();
    media.addEventListener('change', update);
    let intersecting = false;
    const visibility = () => setInView(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      visibility();
    });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', visibility);
    const fromHash = () => {
      const id = location.hash.slice(1);
      if (valid(id)) open(id, true);
      else setSelected(null);
    };
    const link = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = anchor?.getAttribute('href')?.slice(1);
      if (id && valid(id)) {
        event.preventDefault();
        open(id, true);
      }
    };
    document.addEventListener('click', link);
    window.addEventListener('hashchange', fromHash);
    fromHash();
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('click', link);
      window.removeEventListener('hashchange', fromHash);
    };
  }, []);
  const live = inView && canRender && !staticMode && !failed;
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio:city-active', { detail: live }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent('portfolio:city-active', { detail: false }),
      );
    };
  }, [live]);
  const fallback = (
    <>
      <CityMap onNavigate={open} />
      {selected && (
        <div className="city-static-content">
          <CityContent id={selected} onClose={close} />
        </div>
      )}
    </>
  );
  return (
    <section
      ref={section}
      id="city-navigation"
      className="city-navigation reveal"
      aria-labelledby="city-heading"
    >
      <div className="city-heading">
        <div>
          <span className="eyebrow">FIVE BUILDINGS / ONE PORTFOLIO</span>
          <h2 id="city-heading">Step inside the work.</h2>
        </div>
        <a className="text-link" href="/readable.html">
          Read the full text version <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="city-console">
        <div className="city-toolbar">
          <span>
            <Crosshair size={15} /> PORTFOLIO / CITY
          </span>
          {canRender && !failed ? (
            <Button
              className="city-mode-button"
              onClick={() => setStaticMode((v) => !v)}
              aria-pressed={staticMode}
            >
              {staticMode ? 'Enable 3D' : 'Use static view'}
            </Button>
          ) : (
            <span>
              {failed ? 'STATIC VIEW / 3D UNAVAILABLE' : 'STATIC VIEW'}
            </span>
          )}
        </div>
        <div
          ref={host}
          className={`city-viewport ${selected ? 'has-content' : ''}`}
          data-city-mode={live ? '3d' : 'static'}
          data-city-room={selected || 'overview'}
          data-city-paused={live && !!selected && settled}
          aria-label="Interactive portfolio city"
        >
          {live ? (
            <CityBoundary onFailure={() => setFailed(true)} fallback={fallback}>
              <Suspense fallback={fallback}>
                <CityScene
                  selected={selected}
                  onSelect={open}
                  onClose={close}
                  onSettled={setSettled}
                  onFailure={() => setFailed(true)}
                  diagnosticsHost={host}
                />
              </Suspense>
            </CityBoundary>
          ) : (
            fallback
          )}
          {!selected && (
            <div className="city-coordinate" aria-hidden="true">
              WORLD / XZ
              <br />
              BUILDINGS: 05
            </div>
          )}
        </div>
        <div className="city-status" role="status">
          <span className="status-dot" />
          {selected
            ? `${cityDestinations.find((d) => d.id === selected)?.label} — full content inside. Escape or Back to city returns to the overview.`
            : 'Select a building to open its contents. You can also use the building links below.'}
        </div>
        <nav className="city-links" aria-label="Open a portfolio building">
          {cityDestinations.map((item) => (
            <a
              key={item.id}
              data-building={item.id}
              href={`#${item.id}`}
              aria-current={selected === item.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault();
                open(item.id);
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
