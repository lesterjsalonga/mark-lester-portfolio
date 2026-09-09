import {
  ArrowDown,
  ArrowUpRight,
  Crosshair,
  CodeXml as Github,
  MapPin,
} from 'lucide-react';
import { profile, education } from './resume';
import SpatialViewport from '../components/SpatialViewport';
import GitHubActivity from '../components/GitHubActivity';
import CityNav from '../components/CityNav';
import Reveal from '../components/SiteMotion';
function Heading({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        <span>{number} —</span> {title}
      </h2>
      {detail && <span>{detail}</span>}
    </div>
  );
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <header className="site-header">
        <a
          className="wordmark"
          href="#"
          aria-label="Mark Lester J. Salonga, back to top"
        >
          <Crosshair size={22} /> Mark Lester J. Salonga
          <span> / PORTFOLIO</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">01 Projects</a>
          <a href="#experience">02 Experience</a>
          <a href="#stack">03 Stack</a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a href={`mailto:${profile.email}`}>
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main className="shell">
        <section className="hero" aria-labelledby="name">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> FULL-STACK / SPATIAL COMPUTING
            </div>
            <h1 id="name">
              MARK LESTER
              <br />
              J. SALONGA
            </h1>
            <p className="exact-title">{profile.title}</p>
            <p className="location">
              <MapPin size={14} />
              {profile.location}
            </p>
            <div className="intro">
              <p>
                I build for the screen—and the space around it. From AR museum
                guides to campus wayfinding, I turn real places into interactive
                experiences.
              </p>
              <p>
                Behind those experiences, I build the web systems that keep
                things moving: content platforms, access controls, and
                workflows.
              </p>
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Explore my work <ArrowDown size={16} />
              </a>
              <a
                className="button"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> GitHub <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <SpatialViewport />
        </section>
        <Reveal>
          <div className="stats">
            <div>
              <strong>03</strong>
              <span>Projects led &amp; developed</span>
            </div>
            <div>
              <strong>02</strong>
              <span>AR applications</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Certifications</span>
            </div>
            <div>
              <strong className="stat-honor">
                President’s
                <br />
                Lister
              </strong>
              <span>Academic honor</span>
            </div>
          </div>
        </Reveal>
        <CityNav enabled />
        <Reveal>
          <section id="education" className="section">
            <Heading number="05" title="Education" />
            <article className="education">
              <div className="flex justify-between gap-4 flex-wrap">
                <h3>{education.degree}</h3>
                <span className="meta">{education.date}</span>
              </div>
              <p>
                {education.school}{' '}
                <span className="education-honor">• {education.honor}</span>
              </p>
              <p className="education-also">{education.also}</p>
            </article>
          </section>
        </Reveal>
        <Reveal>
          <section id="github" className="section">
            <Heading number="06" title="GitHub" detail="CODE IN THE OPEN" />
            <GitHubActivity />
          </section>
        </Reveal>
      </main>
      <footer className="shell site-footer">
        <span>MARK LESTER J. SALONGA</span>
        <a href="#contact">Get in touch ↗</a>
        <a href="/readable.html">Full text portfolio ↗</a>
        <a href="#">Back to top ↑</a>
      </footer>
    </>
  );
}
