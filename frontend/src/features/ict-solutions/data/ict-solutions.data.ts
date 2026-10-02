import type { IctIndustry, IctProcessStep, IctProject, IctService } from "../types/ict-solutions.types";

export const ictServices: IctService[] = [
  { id:"web",slug:"web-development",title:"Custom Web Development",shortDescription:"Modern, responsive websites built around your organization and audience.",overview:"We design accessible, maintainable public websites that clearly communicate your services and support your digital presence.",icon:"monitor",benefits:["Clear digital presence","Responsive user experience","Maintainable structure"],targetClients:["Businesses","NGOs","Education providers"],useCases:["Corporate websites","Program websites","Information portals"],published:true },
  { id:"apps",slug:"web-applications",title:"Web Applications & Systems",shortDescription:"Purpose-built web applications that simplify operations and improve productivity.",overview:"We turn defined operational requirements into practical browser-based systems with clear workflows and reliable interfaces.",icon:"layout",benefits:["Simpler workflows","Centralized information","Role-appropriate interfaces"],targetClients:["Growing organizations","Operations teams","Service providers"],useCases:["Internal portals","Workflow systems","Service-management tools"],published:true },
  { id:"business",slug:"business-management-solutions",title:"Business Management Solutions",shortDescription:"Complete systems for organizations, schools, NGOs, and service teams.",overview:"We structure connected modules around the daily management needs of your organization.",icon:"briefcase",benefits:["Organized operations","Consistent records","Clearer oversight"],targetClients:["Schools","NGOs","SMEs"],useCases:["Administration systems","Program management","Operations tracking"],published:true },
  { id:"data",slug:"database-data-solutions",title:"Database & Data Solutions",shortDescription:"Efficient database design, management, and data organization solutions.",overview:"We help organizations structure information so records remain useful, consistent, and easier to manage.",icon:"database",benefits:["Structured records","Improved data quality","Reliable retrieval"],targetClients:["Data-driven teams","Institutions","Multi-program organizations"],useCases:["Record systems","Data consolidation","Information registers"],published:true },
  { id:"support",slug:"it-support",title:"IT Support & Maintenance",shortDescription:"Reliable technical support and maintenance to keep systems running.",overview:"We provide agreed technical assistance, maintenance, and improvement support after delivery.",icon:"support",benefits:["Responsive assistance","Planned maintenance","Documented improvements"],targetClients:["Organizations with active systems","Small IT teams","Service operators"],useCases:["System maintenance","Issue resolution","Technical guidance"],published:true },
  { id:"hosting",slug:"hosting-deployment",title:"Hosting & Deployment",shortDescription:"Secure deployment planning and dependable hosting support.",overview:"We prepare applications for their intended environment and support practical release, configuration, and monitoring needs.",icon:"cloud",benefits:["Structured releases","Environment configuration","Operational continuity"],targetClients:["Website owners","Application teams","Digital programs"],useCases:["Website deployment","Application releases","Hosting transitions"],published:true },
  { id:"security",slug:"system-security",title:"System Security",shortDescription:"Practical safeguards that protect systems and organizational data.",overview:"We incorporate sensible access, validation, backup, and operational safeguards based on the solution context.",icon:"shield",benefits:["Reduced exposure","Clear access controls","Safer operations"],targetClients:["Organizations handling records","Public platforms","Internal systems"],useCases:["Access reviews","Security hardening","Backup planning"],published:true },
  { id:"reporting",slug:"data-reporting",title:"Data & Reporting Solutions",shortDescription:"Reports and dashboards that turn data into clearer business insight.",overview:"We organize meaningful measures into practical reports and dashboards that support review and planning.",icon:"chart",benefits:["Clearer reporting","Consistent measures","Better visibility"],targetClients:["Management teams","Programs","Operations leaders"],useCases:["Management dashboards","Program reports","Performance summaries"],published:true },
  { id:"transformation",slug:"digital-transformation",title:"Digital Transformation",shortDescription:"Practical technology adoption that improves processes and service delivery.",overview:"We help teams assess manual processes, prioritize improvements, and introduce suitable digital workflows.",icon:"users",benefits:["Practical modernization","Better workflows","Phased improvement"],targetClients:["Organizations modernizing operations","SMEs","Institutions"],useCases:["Process digitization","Workflow redesign","System planning"],published:true },
  { id:"mobile",slug:"mobile-solutions",title:"Mobile Solutions",shortDescription:"Mobile-friendly solutions that bring services closer to users.",overview:"We plan and build mobile experiences where portable access materially improves the service.",icon:"mobile",benefits:["Mobile access","Focused experiences","Wider reach"],targetClients:["Field teams","Service providers","Community programs"],useCases:["Field data tools","Mobile service interfaces","Responsive applications"],published:true },
];

export const ictValues = [
  ["Improve Efficiency","Automate repetitive tasks, simplify workflows, and save valuable time.","process"],
  ["Reduce Operational Complexity","Use well-designed systems to simplify daily processes and reduce unnecessary manual work.","briefcase"],
  ["Better Decisions","Use structured data, reports, and dashboards to support clearer organizational decisions.","chart"],
  ["Scalable Solutions","Build systems that can evolve as your organization grows and its needs change.","users"],
] as const;

export const ictProcess: IctProcessStep[] = [
  {number:"01",title:"Understand",description:"We learn about your organization, current challenges, and goals."},
  {number:"02",title:"Plan",description:"We define the appropriate solution, scope, and delivery approach."},
  {number:"03",title:"Build",description:"We develop the solution according to agreed requirements."},
  {number:"04",title:"Test",description:"We test functionality, quality, usability, and reliability."},
  {number:"05",title:"Deploy",description:"We prepare and release the solution into its intended environment."},
  {number:"06",title:"Support",description:"We provide agreed maintenance, improvements, and technical assistance."},
];

export const ictIndustries: IctIndustry[] = [
  {name:"Education & Training",icon:"layout"},{name:"NGOs & Non-Profits",icon:"shield"},{name:"Healthcare",icon:"check"},{name:"Retail & Business",icon:"briefcase"},
  {name:"Government & Public Sector",icon:"monitor"},{name:"Finance & Microfinance",icon:"chart"},{name:"Startups & SMEs",icon:"users"},{name:"Professional Services",icon:"database"},
];

export const ictProjects: IctProject[] = [
  {id:"school",name:"School Management System",type:"Education Management Solution",description:"A centralized demo system for student records, staff, classes, attendance, and institutional reporting.",image:"/images/training/computer-basics.jpg",demoOnly:true},
  {id:"ngo",name:"NGO Monitoring & Reporting System",type:"Monitoring & Reporting",description:"A demo solution for program tracking, beneficiary records, activity monitoring, and reporting.",image:"/images/training/data-analysis.jpg",demoOnly:true},
  {id:"training",name:"Training Center Website",type:"Public Website",description:"A demo public website presenting training activities, services, opportunities, and information.",image:"/images/home/academy.jpg",demoOnly:true},
];

export const getPublishedIctServices = () => ictServices.filter((service) => service.published);
export const getIctServiceBySlug = (slug: string) => getPublishedIctServices().find((service) => service.slug === slug);
