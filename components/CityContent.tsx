import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { profile, projects, skills, certifications, certificateDocuments } from '../app/resume';
import ProjectCard from './ProjectCard';
import Timeline from './Timeline';
import { cityDestinations } from './city-data';
export default function CityContent({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  function closeRoom() {
    if (closing) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    setClosing(true);
    closeTimer.current = window.setTimeout(onClose, 160);
  }
  const destination = cityDestinations.find((item) => item.id === id)!;
  useEffect(() => {
    panel.current?.focus({ preventScroll: true });
  }, [id]);
  return (
    <div
      ref={panel}
      className={`city-content ${closing ? 'is-closing' : ''}`}
      tabIndex={-1}
      role="region"
      aria-labelledby={`room-title-${id}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          closeRoom();
        }
      }}
    >
      <div className="city-content-header">
        <div>
          <span className="eyebrow">
            {destination.number} /{' '}
            {destination.label === 'Skills'
              ? 'CAPABILITIES'
              : destination.label.toUpperCase()}
          </span>
          <h2 id={`room-title-${id}`}>{destination.label}</h2>
          {id !== 'contact' && (
            <p className="room-reading-hint">
              Scroll inside to read all{' '}
              {id === 'projects'
                ? '3 projects'
                : id === 'experience'
                  ? '2 roles'
                  : id === 'stack'
                    ? '4 skill groups'
                    : 'certifications'}
              .
            </p>
          )}
        </div>
        <Button className="button room-back" onClick={closeRoom}>
          <ArrowLeft size={16} /> Back to city
        </Button>
      </div>
      <div
        className="city-content-scroll"
        tabIndex={0}
        aria-label={`${destination.label} content`}
      >
        {id === 'projects' && (
          <div className="room-projects">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        )}
        {id === 'experience' && <Timeline />}
        {id === 'stack' && (
          <div className="skills-grid">
            {skills.map((group) => (
              <div className="skill-group" key={group.category}>
                <h3>{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {id === 'certifications' && (
          <div className="room-certifications">
            {certifications.map((group) => (
              <div className="cert-group" key={group.category}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="cert-mark" aria-hidden="true">
                        ↗
                      </span>
                      <div className="certificate-entry">
                        <span>{item}</span>
                        {certificateDocuments[item]?.map((document, _, documents) => (
                          <a
                            key={document.href}
                            className="text-link certificate-link"
                            href={document.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View certificate: ${document.label} (opens in a new tab)`}
                          >
                            {documents.length > 1 ? `View ${document.label} certificate` : 'View certificate'}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {id === 'contact' && (
          <div className="room-contact">
            <p>Have something in mind?</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              <Mail size={20} />
              <span>{profile.email}</span>
              <ArrowUpRight size={20} />
            </a>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              github.com/lesterjsalonga <ArrowUpRight size={16} />
            </a>
            <p className="location">{profile.location}</p>
          </div>
        )}
      </div>
      <a className="room-readable text-link" href={`/readable.html#${id}`}>
        Read this in the plain-text version <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
