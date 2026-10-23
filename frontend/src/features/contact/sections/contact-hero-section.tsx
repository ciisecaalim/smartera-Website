
import { div as Ldiv, h1 as Lh1, p as Lp, section as Lsection } from "@/i18n/elements";
import { Badge } from "@/components/ui/badge"; import { Container } from "@/components/ui/container"; import { ImageFrame } from "@/components/ui/image-frame";
export function ContactHeroSection(){return <Lsection className="hero-glow py-14 lg:py-20"><Container className="grid items-center gap-10 xl:grid-cols-[.9fr_1.1fr]"><Ldiv><Badge>Contact</Badge><Lh1 className="mt-5 max-w-[13ch] text-[clamp(2.5rem,4.4vw,4.6rem)] font-black leading-[1.03] text-[#1B519F]">Aan ka hadalno tallaabadaada xigta.</Lh1><Lp className="mt-6 max-w-xl text-base leading-8 text-slate-600">Su&apos;aal ku saabsan Training, Academy, Employment, Hospitality, Internships ama ICT Solutions? Contact page-kan waxaa loo dhisay inuu noqdo meel cad oo professional ah.</Lp></Ldiv><ImageFrame src="/images/home/men-learning-v3.png" alt="Xirfadlayaal kulan iyo wadahadal ku jira" priority className="aspect-[4/3]" badge="We listen. We guide. We connect."/></Container></Lsection>}



