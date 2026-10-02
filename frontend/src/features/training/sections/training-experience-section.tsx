import { Container } from "@/components/ui/container"; import { SectionHeading } from "@/components/ui/section-heading"; import { InteractiveCard } from "@/components/ui/interactive-card";
const points=[['01','Learning by Doing','Casharrada waxaa lagu xiraa exercises iyo projects.'],['02','Clear Progress','Mawduucyada waxaa loo dhisaa si heer-heer ah.'],['03','Career Relevance','Xirfadaha waxaa lagu xiraa workplace iyo mustaqbalka shaqada.'],['04','Support','Hagid iyo feedback ayaa qayb ka ah learning experience-ka.']];
export function TrainingExperienceSection(){return <section className="bg-[#F6FAFF] py-16 lg:py-20"><Container><SectionHeading eyebrow="Learning Experience" title="Waxbarasho ka baxsan theory-ga." description="Qaabka tababarku wuxuu qofka ku dhiirrigeliyaa inuu fahmo, sameeyo, tijaabiyo oo horumariyo."/><div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{points.map(([n,t,d])=><InteractiveCard key={n}><span className="text-xs font-black text-[#F59223]">{n}</span><h3 className="mt-4 text-lg font-black text-[#1B519F]">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{d}</p></InteractiveCard>)}</div></Container></section>}



