import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../app/resume';
export default function ProjectCard({project,index}:{project:Project;index:number}) {
 return <article className="project"><div className="project-top"><span className="project-index">0{index+1} / {project.kind}</span><span className="meta">{project.date}</span></div><h3>{project.name}</h3><p className="meta">{project.role}</p>{project.image && <img className="project-image" src={project.image} alt={`${project.name} interface`} loading="lazy"/>}<p>{project.description}</p><div className="flex flex-wrap gap-2 mt-6">{project.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div>{project.liveUrl && <a className="button mt-5" href={project.liveUrl} target="_blank" rel="noreferrer">View project <ArrowUpRight size={16}/></a>}</article>;
}
