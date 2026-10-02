import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PartnershipRequestForm } from "@/features/partners";
import { getPublishedPartnerBySlug, partnerAssetUrl } from "@/features/partners/data/partners.data";

type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const partner=await getPublishedPartnerBySlug((await params).slug);return partner?{title:partner.name,description:partner.shortDescription}:{title:"Partner Not Found"};}
export default async function PartnerPage({params}:Props){
 const partner=await getPublishedPartnerBySlug((await params).slug); if(!partner)notFound();
 const hasPublicInfo=Boolean(partner.publicPhone||partner.publicEmail||partner.publicLocation||partner.website);
 return <main>
  <section className="bg-[#F7FAFF] py-12 sm:py-16"><Container>
   <div className={`group overflow-hidden bg-white shadow-[0_18px_55px_rgba(8,43,87,.08)] ${partner.coverImage?"lg:grid lg:grid-cols-[1.05fr_.95fr]":""}`}>
    {partner.coverImage?<div className="relative min-h-[320px] overflow-hidden sm:min-h-[440px]"><Image unoptimized src={partnerAssetUrl(partner.coverImage)} alt={partner.coverImageAlt||`${partner.name} partnership`} fill priority sizes="(max-width:1024px) 100vw,52vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/></div>:null}
    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
     {partner.logo?<div className="flex h-24 w-52 items-center rounded-xl border border-slate-200 bg-slate-50 p-4"><Image unoptimized src={partnerAssetUrl(partner.logo)} alt={partner.logoAlt||`${partner.name} logo`} width={180} height={80} className="max-h-16 w-full object-contain"/></div>:null}
     <p className="mt-7 text-xs font-black uppercase tracking-[.16em] text-[#F59223]">Partner Profile · {partner.type.replaceAll("_"," ")}</p>
     <h1 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-black leading-tight text-[#1B519F]">{partner.name}</h1>
     <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{partner.shortDescription}</p>
     {hasPublicInfo?<dl className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">{partner.publicPhone?<div><dt className="sr-only">Phone</dt><dd>{partner.publicPhone}</dd></div>:null}{partner.publicEmail?<div><dt className="sr-only">Email</dt><dd><a href={`mailto:${partner.publicEmail}`} className="hover:text-[#1B519F]">{partner.publicEmail}</a></dd></div>:null}{partner.publicLocation?<div><dt className="sr-only">Location</dt><dd>{partner.publicLocation}</dd></div>:null}{partner.website?<div><dt className="sr-only">Website</dt><dd><a href={partner.website} target="_blank" rel="noreferrer" className="font-bold text-[#1B519F]">Visit website</a></dd></div>:null}</dl>:null}
     <div className="mt-7 flex flex-wrap gap-3">{partner.partnershipFormOpen?<a href="#partnership-request" className="inline-flex min-h-11 items-center rounded-xl bg-[#1B519F] px-5 text-sm font-black text-white hover:bg-[#174783]">Partnership Request</a>:null}<Link href="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-black px-5 text-sm font-black text-[#1B519F]">Contact Smartera</Link></div>
    </div>
   </div>
  </Container></section>
  {(partner.aboutPartnership||partner.keyActivities.length||partner.collaborationFocus.length)?<section className="bg-white py-12 sm:py-14"><Container className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
   <div>{partner.aboutPartnership?<><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#F59223]">About the Partnership</p><h2 className="mt-2 text-3xl font-black text-[#1B519F]">Working Together for Practical Impact</h2><p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{partner.aboutPartnership}</p></>:null}
   {partner.keyActivities.length?<><h3 className="mt-9 text-xl font-black text-[#1B519F]">Key Activities</h3><ul className="mt-4 space-y-3">{partner.keyActivities.map(x=><li key={x} className="flex gap-3 text-sm leading-7 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 bg-[#F59223]"/>{x}</li>)}</ul></>:null}</div>
   {partner.collaborationFocus.length?<aside className="self-start rounded-2xl border border-slate-200 bg-[#F7FAFF] p-6 sm:p-8"><h2 className="text-xl font-black text-[#1B519F]">Collaboration Focus</h2><div className="mt-5 flex flex-wrap gap-2">{partner.collaborationFocus.map(x=><span key={x} className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#1B519F] shadow-sm">{x}</span>)}</div>{partner.partnershipFormOpen?<a href="#partnership-request" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#1B519F] px-5 text-sm font-extrabold text-white">Start Partnership Request</a>:null}</aside>:null}
  </Container></section>:null}
  {partner.partnershipFormOpen?<PartnershipRequestForm partnerProfileId={partner.id} partnerId={partner.partnerId} partnerName={partner.name} partnerSlug={partner.slug}/>:null}
  {partner.gallery.length?<section className="bg-[#F7FAFF] py-12 sm:py-14"><Container><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#F59223]">Gallery</p><h2 className="mt-2 text-3xl font-black text-[#1B519F]">Collaboration Highlights</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{partner.gallery.map(image=><div key={image.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm"><Image unoptimized src={partnerAssetUrl(image.image)} alt={image.alt||`${partner.name} collaboration`} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/></div>)}</div></Container></section>:null}
 </main>;
}