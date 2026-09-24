// Resume content is transcribed verbatim. PDF line wraps are joined; punctuation
// was checked against the rendered original. Phone is intentionally omitted:
// the owner has not confirmed that it should be public. Do not publish the PDF.
export const profile = {
 name: 'MARK LESTER J. SALONGA',
 title: 'Full-Stack Developer • AR/VR Systems • Cloud & AI Fundamentals • IT Support',
 location: 'Bocaue, Bulacan, Philippines',
 email: 'marklestersalonga26@gmail.com',
 github: 'https://github.com/lesterjsalonga',
};
export type Project = { name:string; date:string; role:string; description:string; tags:string[]; kind:string; image?:string; liveUrl?:string; featured?:boolean; screenshots?:{src:string;caption:string}[] };
export const projects: Project[] = [
 {name:'pc-atlas — Interactive Computer Explorer',date:'Personal project',role:'Developer',kind:'INTERACTIVE 3D / WEB',featured:true,description:'An interactive 3D desktop computer explorer with selectable hardware components, assembled and exploded views, system filters, search, and component isolation. Inspect example specifications and trace connections between parts.',tags:['React','TypeScript','Three.js','Vite'],image:'/projects/pc-atlas.png',liveUrl:'https://pc-atlas-leztr.vercel.app/'},
 {name:'View3D — Desktop Model Viewer',date:'Local desktop app',role:'Developer',kind:'VB.NET / 3D TOOLS',description:'A Windows desktop viewer built with VB.NET, OpenTK, and AssimpNet. Import 3D models, adjust studio lighting, inspect mesh and material statistics, switch between shading and wireframe views, and control animation playback.',tags:['VB.NET','Windows Forms','OpenTK','AssimpNet','OpenGL'],screenshots:[{src:'/projects/view3d-material.png',caption:'Material view and studio lighting — Kawasaki Ninja H2R'},{src:'/projects/view3d-wireframe.png',caption:'Wireframe overlay and mesh inspection — Kawasaki Ninja H2R'}]},
 {name:'ARchive — AR Museum Guide, ALAB Museum',date:'Dec 2025',role:'Project Lead & Developer',kind:'AR EXHIBIT GUIDE',description:'Marker-based/marker-less AR exhibit guide built with Unity, AR Foundation, and Vuforia; content platform on ReactJS with Supabase/PostgreSQL, using Huawei Cloud for backend support.',tags:['Unity','AR Foundation','Vuforia','ReactJS','Supabase','PostgreSQL','Huawei Cloud'],
 // Add a real screenshot/GIF path and a verified live project URL here.
 image:undefined,liveUrl:'https://archive-web.vercel.app/'},
 {name:'Outsight — AR Campus Navigation',date:'Mar 2025',role:'Project Lead & Developer',kind:'AR WAYFINDING',description:'Real-time AR wayfinding app built with Unity and AR Foundation, with Firebase for data and authentication; led a team through planning, asset creation, and deployment.',tags:['Unity','AR Foundation','Firebase'],
 // Add a real screenshot/GIF path and a verified live project URL here.
 image:undefined,liveUrl:undefined},
 {name:'TrainTrack — Student Training Management System',date:'Mar 2025',role:'Project Lead & Developer',kind:'WEB APPLICATION',description:'Full-stack PHP/MySQL system with hashed-password authentication and RBAC; built a resume submission and approval workflow with admin feedback and status tracking.',tags:['PHP','MySQL','RBAC'],
 // Add a real screenshot/GIF path and a verified live project URL here.
 image:undefined,liveUrl:undefined},
];
export const experience = [
 {role:'IT Intern / Junior Developer',date:'Jan – Apr 2026',company:'St. Martin of Tours Credit and Development Cooperative',bullets:[
 "Built and deployed a multi-tier IT Service Request System within the cooperative's employee portal ticketing, approval workflows, and role-based access control across management levels",
 'Added scanner-integrated image uploads, server-side file compression (2MB cap), and CSV export for ticket metrics reporting',
 'Delivered on-site IT support during the SMTCDC General Assembly, resolving live hardware and network issues',
 'Documented the system and presented prototypes to the IT department; applied SQL optimization and security practices (input sanitization, RBAC)',
 ]},
 {role:'Freelance Web Developer',date:'Dec 2024',company:'Independent',bullets:[
 'Designed, built, and deployed a dynamic city tourism website to improve public access to local attractions and events',
 'Implemented CMS features, user authentication, and a responsive UI/UX in HTML, CSS, and JavaScript',
 'Managed the project end-to-end timeline, client communication, and requirements as sole developer',
 ]},
];
export const skills = [
 {category:'Languages & Frameworks',items:['PHP','JavaScript','SQL','HTML/CSS','ReactJS']},
 {category:'Platforms & Tools',items:['Unity','AR Foundation','Vuforia','Git/GitHub']},
 {category:'Databases & Cloud',items:['MySQL','PostgreSQL','Supabase','Firebase','Huawei Cloud']},
 {category:'Practices',items:['RBAC & Web Security','Project Leadership','Team Collaboration']},
];
export const certifications = [
 {category:'Additional Learning',items:['AI for Business (HP LIFE)','Cybersecurity (HP LIFE)']},
 {category:'Cloud, AI & Data',items:['Building RAG Apps Using MongoDB (MongoDB, 2026)','IT Specialist — Artificial Intelligence (Certiport, 2026)','HCIA–AI, HCIA–Cloud Computing, HCIA–Cloud Service (Huawei, 2025)']},
 {category:'Business & Professional',items:['Agentblazer Champion Workshop (Salesforce, 2025)','Microsoft Office Specialist – Excel 2019 (2023)','Java Programming (Oracle, 2023)']},
];
// Only attach documents supplied in public/certs; unprovided certificates stay text-only.
export const certificateDocuments: Record<string, { label: string; href: string }[]> = {
 'Java Programming (Oracle, 2023)': [{label:'Java Programming',href:'/certs/Java_Programming.pdf'}],
 'Building RAG Apps Using MongoDB (MongoDB, 2026)': [{label:'Building RAG Apps Using MongoDB',href:'/certs/Building_RAG_MongoDB.pdf'}],
 'IT Specialist — Artificial Intelligence (Certiport, 2026)': [{label:'IT Specialist — Artificial Intelligence',href:'/certs/it-specialist-artificial-intelligence.png'}],
 'HCIA–AI, HCIA–Cloud Computing, HCIA–Cloud Service (Huawei, 2025)': [
  {label:'HCIA–AI',href:'/certs/Huawei_HCIA_AI.png'},
  {label:'HCIA–Cloud Computing',href:'/certs/Huawei_HCIA_Cloud_Computing.png'},
  {label:'HCIA–Cloud Service',href:'/certs/Huawei_HCIA_Cloud_Service.png'},
 ],
 'Agentblazer Champion Workshop (Salesforce, 2025)': [{label:'Agentblazer Champion',href:'/certs/Salesforce_Agentblazer_Champion.pdf'}],
 'Microsoft Office Specialist – Excel 2019 (2023)': [{label:'Microsoft Excel 2019',href:'/certs/Microsoft_Excel_2019.pdf'}],
 'AI for Business (HP LIFE)': [{label:'AI for Business',href:'/certs/HP_Life_AI_Business.pdf'}],
 'Cybersecurity (HP LIFE)': [{label:'Cybersecurity',href:'/certs/HP_Life_Cybersecurity.pdf'}],
};
export const education = {
 degree:'BS in Information Technology',school:"Dr. Yanga's Colleges Inc., Bocaue, Bulacan",date:'Jul 2026',also:'Also: Huawei ICT Competition – Cloud Track, APAC Practice (2025) • 4th Regional Cybersecurity Conference, PSITE-CL (2025)',
};
