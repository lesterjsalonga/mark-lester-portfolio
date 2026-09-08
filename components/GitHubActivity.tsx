import { useEffect, useState } from 'react';
import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react';
import { profile } from '../app/resume';
type PublicEvent={id:string;type:string;repo:{name:string};created_at:string};
export default function GitHubActivity(){
 const [events,setEvents]=useState<PublicEvent[]>([]);const [status,setStatus]=useState('Loading public activity…');
 useEffect(()=>{const controller=new AbortController();const timeout=window.setTimeout(()=>controller.abort(),8000);
 fetch('https://api.github.com/users/lesterjsalonga/events/public?per_page=5',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Unavailable');return r.json()}).then((data:PublicEvent[])=>{if(!Array.isArray(data))throw Error('Invalid response');setEvents(data);setStatus(data.length?'Recent public activity':'No recent public activity returned. Explore the full contribution history on GitHub.');}).catch(()=>setStatus('Activity is unavailable here. View the live contribution history on GitHub.')).finally(()=>clearTimeout(timeout));
 return()=>{controller.abort();clearTimeout(timeout)};
 },[]);
 return <div className="github-panel"><div className="github-summary"><GitCommitHorizontal size={32} strokeWidth={1}/><h3>Building, one commit at a time.</h3><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">@lesterjsalonga <ArrowUpRight size={16}/></a><p>Public activity, directly from GitHub.</p></div><div className="github-feed"><p className="meta" aria-live="polite">{status}</p>{events.map(event=><a key={event.id} className="event" href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer"><span>{event.type.replace(/Event$/,'').replace(/([a-z])([A-Z])/g,'$1 $2')}<strong>{event.repo.name}</strong></span><time dateTime={event.created_at}>{new Date(event.created_at).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'})}</time><ArrowUpRight size={15}/></a>)}<a className="text-link" href={`${profile.github}?tab=overview`} target="_blank" rel="noreferrer">Full contribution history <ArrowUpRight size={15}/></a></div></div>
}
