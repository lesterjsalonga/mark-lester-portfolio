import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import type { Group } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const amber='#ff9b45';
function Anchor(){
 const root=useRef<Group>(null);const scan=useRef<Group>(null);const progress=useRef({value:0});
 useEffect(()=>{const animation=gsap.to(progress.current,{value:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:true}});return()=>{animation.scrollTrigger?.kill();animation.kill()}},[]);
 useFrame(({clock,pointer})=>{const t=clock.elapsedTime;if(root.current){root.current.rotation.y=.3+progress.current.value*1.7+pointer.x*.12;root.current.rotation.x=-.08+pointer.y*.07;root.current.position.y=.25+Math.sin(t*.7)*.07-progress.current.value*.2}if(scan.current)scan.current.position.y=Math.sin(t*.8)*.85});
 return <><gridHelper args={[14,28,'#51402d','#28231c']} position={[0,-1.2,0]}/><group ref={root}>
 {[-1,1].flatMap(x=>[-1,1].map(y=><Line key={`${x}${y}`} points={[[x*.68,y*.52,0],[x*.95,y*.52,0],[x*.95,y*.86,0]]} color={amber} lineWidth={2}/>))}
 <Line points={[[-.52,-.48,0],[-.52,.48,0],[.52,.48,0],[.52,-.48,0],[-.52,-.48,0]]} color="#725137" lineWidth={1}/>
 <Line points={[[-.24,0,.02],[.24,0,.02]]} color={amber}/><Line points={[[0,-.24,.02],[0,.24,.02]]} color={amber}/>
 <Line points={[[0,0,-.55],[0,0,.55]]} color={amber}/>
 <group ref={scan}><Line points={[[-1.12,0,.05],[1.12,0,.05]]} color={amber} transparent opacity={.5}/></group>
 <Line points={[[0,-.9,0],[0,-1.45,0]]} color="#725137" dashed dashSize={.04} gapSize={.06}/>
 </group><Line points={[[-1.6,-1.18,1.4],[-.5,-1.18,1.4],[-.5,-1.18,.6],[.5,-1.18,.6],[.5,-1.18,-.3],[1.7,-1.18,-.3]]} color={amber} lineWidth={1.3} transparent opacity={.45}/></>;
}
export default function Hero3D({active}:{active:boolean}){
 return <Canvas camera={{position:[3,2.1,5],fov:42}} dpr={1} frameloop={active?'always':'never'} gl={{antialias:false,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{gl.domElement.setAttribute('aria-hidden','true')}}><Anchor/></Canvas>
}
