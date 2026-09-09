import Reveal from './SiteMotion';
import { experience } from '../app/resume';
export default function Timeline() {
  return (
    <div className="timeline">
      {experience.map((job) => (
        <Reveal key={job.role}>
          <article className="job">
            <div className="job-date">
              <span className="timeline-node" />
              {job.date}
            </div>
            <div>
              <h3>{job.role}</h3>
              <p className="company">{job.company}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
