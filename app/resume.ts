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
export type Project = { name:string; date:string; role:string; description:string; tags:string[]; kind:string; image?:string; liveUrl?:string };
export const projects: Project[] = [
 {name:'ARchive — AR Museum Guide, ALAB Museum',date:'Dec 2025',role:'Project Lead & Developer',kind:'AR EXHIBIT GUIDE',description:'Marker-based/marker-less AR exhibit guide built with Unity, AR Foundation, and Vuforia; content platform on ReactJS with Supabase/PostgreSQL, using Huawei Cloud for backend support.',tags:['Unity','AR Foundation','Vuforia','ReactJS','Supabase','PostgreSQL','Huawei Cloud'],
 // Add a real screenshot/GIF path and a verified live project URL here.
 image:undefined,liveUrl:undefined},
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
 {category:'Cloud, AI & Data',items:['Building RAG Apps Using MongoDB (MongoDB, 2026)','IT Specialist — Artificial Intelligence (Certiport, 2026)','HCIA–AI, HCIA–Cloud Computing, HCIA–Cloud Service (Huawei, 2025)']},
 {category:'Business & Professional',items:['Agentblazer Champion Workshop (Salesforce, 2025)','Microsoft Office Specialist – Excel 2019 (2023)','Java Programming (Oracle, 2023)']},
];
export const education = {
 degree:'BS in Information Technology',school:"Dr. Yanga's Colleges Inc., Bocaue, Bulacan",honor:"President's Lister",date:'Jul 2026',also:'Also: Huawei ICT Competition – Cloud Track, APAC Practice (2025) • 4th Regional Cybersecurity Conference, PSITE-CL (2025)',
};
