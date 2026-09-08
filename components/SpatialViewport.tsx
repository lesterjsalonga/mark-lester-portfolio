import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Crosshair } from 'lucide-react';
const Hero3D=lazy(()=>import('./Hero3D'));
function StaticAnchor(){return <div className="static-anchor" aria-hidden="true"><Crosshair/><span>ANCHOR_01</span><small>PLANE / XZ</small></div>}
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<StaticAnchor/>:this.props.children}
}
export default function SpatialViewport(){
 const [enabled,setEnabled]=useState(false);const [active,setActive]=useState(true);const viewport=useRef<HTMLDivElement>(null);
 useEffect(()=>{
 const media=matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
 let idle:number;let cancelled=false;
 const update=()=>{window.clearTimeout(idle);if(!media.matches){setEnabled(false);return}idle=window.setTimeout(()=>{if(!cancelled)setEnabled(true)},400)};
 update();media.addEventListener('change',update);
 const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting && !document.hidden));
 if(viewport.current)observer.observe(viewport.current);
 const visibility=()=>setActive(!document.hidden && !!viewport.current && viewport.current.getBoundingClientRect().bottom>0);
 document.addEventListener('visibilitychange',visibility);
 return()=>{cancelled=true;window.clearTimeout(idle);media.removeEventListener('change',update);observer.disconnect();document.removeEventListener('visibilitychange',visibility)};
 },[]);
 return <div ref={viewport} className="viewport" role="img" aria-label="AR marker tracking demonstration with an amber anchor above a tracking plane"><div className="viewport-top"><span>SPATIAL VIEWPORT</span><span className="accent">● AR DEMO</span></div><SceneBoundary><Suspense fallback={<StaticAnchor/>}>{enabled?<Hero3D active={active}/>:<StaticAnchor/>}</Suspense></SceneBoundary><div className="viewport-bottom"><span>AR / WORLD SPACE</span><span>X → Y ↑ Z ↗</span></div></div>
}
