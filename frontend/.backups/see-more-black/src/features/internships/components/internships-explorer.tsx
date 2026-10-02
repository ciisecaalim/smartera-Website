"use client";
import Image from "next/image";import Link from "next/link";import {useMemo,useState} from "react";import {usePathname,useRouter,useSearchParams} from "next/navigation";import type{Internship,InternshipField,InternshipFilters}from"../types/internships.types";import{filterInternships}from"../utils/internships.utils";import{internshipFields}from"../data/internships.data";import{InternshipCard}from"./internship-card";
import{InternshipSuccessStoriesSection}from"../sections/internship-success-stories-section";
import { Pagination } from "@/components/ui/pagination";
import { paginateItems } from "@/lib/pagination";
const initial:InternshipFilters={query:"",location:"",field:"all",duration:"",workMode:"all",eligibility:"",sort:"newest"};
const control="internships-theme-control h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10";
export function InternshipsExplorer({internships,heroImage="/images/internships/internships.jpg",heroAlt="A team sharing ideas during a practical workplace session"}:{internships:Internship[];heroImage?:string;heroAlt?:string}){const params=useSearchParams(),router=useRouter(),pathname=usePathname();const seeded={...initial,query:params.get("q")??"",location:params.get("location")??"",field:(params.get("field") as InternshipField)??"all"};const[filters,setFilters]=useState<InternshipFilters>(seeded);const[saved,setSaved]=useState<string[]>([]);const[currentPage,setCurrentPage]=useState(1);const results=useMemo(()=>filterInternships(internships,filters),[internships,filters]);const paginated=useMemo(()=>paginateItems(results,currentPage,8),[results,currentPage]);const update=<K extends keyof InternshipFilters>(key:K,value:InternshipFilters[K])=>{const next={...filters,[key]:value};setFilters(next);setCurrentPage(1);const p=new URLSearchParams();if(next.query)p.set("q",next.query);if(next.location)p.set("location",next.location);if(next.field!=="all")p.set("field",next.field);router.replace(`${pathname}${p.size?`?${p}`:""}`,{scroll:false})};const clear=()=>{setFilters(initial);setCurrentPage(1);router.replace(pathname,{scroll:false})};const toggle=(id:string)=>setSaved(x=>x.includes(id)?x.filter(v=>v!==id):[...x,id]);const changePage=(page:number)=>{setCurrentPage(page);document.getElementById("all-internships")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})};const locations=[...new Set(internships.map(x=>x.location))],durations=[...new Set(internships.map(x=>x.duration))],modes=[...new Set(internships.map(x=>x.workMode))];
return <>
<section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3F7FC] px-3 py-6 sm:px-5 sm:py-8 lg:h-screen lg:px-6 lg:py-10">
  <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1B519F]/10 blur-3xl"/>
    <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F59223]/15 blur-3xl"/>
    <div className="absolute inset-0 opacity-[.35] [background-image:radial-gradient(#b8cbe3_1px,transparent_1px)] [background-size:24px_24px]"/>
  </div>
  <div className="mx-auto grid max-w-[1420px] items-center gap-10 rounded-[28px] border border-slate-200/80 bg-white/35 p-6 shadow-[0_18px_55px_rgba(9,42,85,.11)] backdrop-blur-[2px] sm:p-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:p-10">
    <div className="relative z-10">
      <div className="smartera-hero-reveal inline-flex items-center gap-2 rounded-full border border-[#1B519F]/15 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[.15em] text-[#1B519F] shadow-sm">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#F59223] text-white">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="m5 10 3 3 7-7"/></svg>
        </span>
        Learn by doing
      </div>
      <h1 className="smartera-hero-reveal smartera-delay-1 mt-6 max-w-[15ch] text-[clamp(2.65rem,4.4vw,4.6rem)] font-black leading-[1.01] tracking-[-.05em] text-[#092A55]">
        Turn potential into <span className="text-[#F59223]">experience.</span>
      </h1>
      <p className="smartera-hero-reveal smartera-delay-2 mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Find practical internships where you can learn from real teams, build workplace confidence, and create proof of what you can do.
      </p>
      <form onSubmit={e=>{e.preventDefault();const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;document.getElementById("all-internships")?.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"})}} className="smartera-hero-reveal smartera-delay-3 mt-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(9,42,85,.13)] sm:grid sm:grid-cols-[1.1fr_.8fr_auto] sm:items-center sm:gap-2">
        <label className="relative block rounded-xl focus-within:bg-[#F7FAFF] focus-within:ring-2 focus-within:ring-[#1B519F]/25" htmlFor="intern-query">
          <span className="sr-only">Internship title, skill or keyword</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
          <input id="intern-query" className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:!outline-none" placeholder="Role, field or skill" value={filters.query} onChange={e=>update("query",e.target.value)}/>
        </label>
        <label className="relative block rounded-xl border border-slate-100 focus-within:bg-[#F7FAFF] focus-within:ring-2 focus-within:ring-[#1B519F]/25" htmlFor="intern-location">
          <span className="sr-only">Location</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          <input id="intern-location" className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:!outline-none" placeholder="Location" value={filters.location} onChange={e=>update("location",e.target.value)}/>
        </label>
        <button className="mt-2 h-12 w-full rounded-xl bg-[#1B519F] px-6 text-xs font-black text-white transition hover:bg-[#143f7d] sm:mt-0 sm:w-auto">Find internships</button>
      </form>
      <div className="smartera-hero-reveal smartera-delay-4 mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[11px] font-semibold text-slate-500">Explore:</span>
        {["Data Analysis","Marketing","Software","Finance"].map(x=><button type="button" key={x} onClick={()=>update("query",x)} className="rounded-full border border-[#1B519F]/15 bg-white/70 px-3 py-1.5 text-[10px] font-bold text-[#1B519F] transition hover:border-[#F59223] hover:bg-white">{x}</button>)}
      </div>
    </div>
    <div className="smartera-hero-reveal smartera-delay-2 relative mx-auto w-full max-w-[640px] lg:mx-0 lg:ml-auto">
      <div className="relative ml-auto w-[95%] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-1 shadow-[0_24px_55px_rgba(9,42,85,.16)] sm:w-[92%]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem]">
          <Image unoptimized src={heroImage} alt={heroAlt} fill priority sizes="(max-width:1024px) 95vw,42vw" className="object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#092A55]/65 via-transparent to-transparent"/>
        </div>
      </div>
      <div className="smartera-floating-card absolute -left-1 top-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(9,42,85,.18)] sm:-left-3 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF2E2] text-[#F59223]"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M4 7h16v12H4zM9 7V5h6v2M4 11h16M10 11v2h4v-2"/></svg></span>
          <span><strong className="block text-sm text-[#092A55]">{internships.length} open paths</strong><span className="text-[10px] text-slate-500">Your experience starts here</span></span>
        </div>
      </div>
      <div className="smartera-floating-card-secondary absolute -bottom-6 right-0 max-w-[245px] rounded-2xl bg-[#F59223] p-4 text-[#092A55] shadow-[0_18px_40px_rgba(245,146,35,.28)] sm:right-3 sm:p-5">
        <p className="text-[10px] font-black uppercase tracking-[.13em]">More than a placement</p>
        <p className="mt-1 text-sm font-black leading-5">Real projects. Useful feedback. Stronger skills.</p>
      </div>
    </div>
  </div>
</section>
<section id="all-internships" className="internships-theme-section scroll-mt-24 bg-[#F5F9FF] py-12 transition-colors"><div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F59223]">Current opportunities</p><h2 className="mt-2 text-3xl font-black text-[#1B519F]">Explore Internships</h2><p aria-live="polite" className="mt-1 text-xs font-bold text-slate-500">{results.length} {results.length===1?"Internship":"Internships"} Found</p></div><select aria-label="Sort internships" value={filters.sort} onChange={e=>update("sort",e.target.value as InternshipFilters["sort"])} className="internships-theme-control h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600"><option value="newest">Newest</option><option value="alphabetical">Title A-Z</option></select></div><div className="internships-theme-panel mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(6,59,134,.05)]"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"><input aria-label="Search internships" className={control} placeholder="Search internships..." value={filters.query} onChange={e=>update("query",e.target.value)}/><select aria-label="Internship location" className={control} value={filters.location} onChange={e=>update("location",e.target.value)}><option value="">All Locations</option>{locations.map(x=><option key={x}>{x}</option>)}</select><select aria-label="Internship field" className={control} value={filters.field} onChange={e=>update("field",e.target.value as InternshipField|"all")}><option value="all">All Fields</option>{internshipFields.map(x=><option key={x}>{x}</option>)}</select><select aria-label="Internship duration" className={control} value={filters.duration} onChange={e=>update("duration",e.target.value)}><option value="">All Durations</option>{durations.map(x=><option key={x}>{x}</option>)}</select><select aria-label="Internship work mode" className={control} value={filters.workMode} onChange={e=>update("workMode",e.target.value as InternshipFilters["workMode"])}><option value="all">All Modes</option>{modes.map(x=><option key={x}>{x}</option>)}</select></div><div className="mt-3 flex justify-end"><button type="button" onClick={clear} className="text-xs font-black text-[#1B519F] hover:text-[#174783]">Clear filters</button></div></div><main className="mt-6">{results.length?<><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{paginated.items.map((x,index)=><InternshipCard key={x.id} internship={x} saved={saved.includes(x.id)} onSave={()=>toggle(x.id)} index={(paginated.page-1)*paginated.pageSize+index}/>)}</div><div className="mt-8 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0"><p className="text-center text-sm font-bold text-slate-500" aria-live="polite">Current {paginated.items.length} / {results.length}</p><Pagination currentPage={paginated.page} totalPages={paginated.totalPages} onPageChange={changePage} ariaLabel="Internships pagination" alwaysShow /></div></>:<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><h3 className="text-lg font-black text-[#1B519F]">No internships match your search.</h3><p className="mt-2 text-sm text-slate-500">Try changing your search or filters.</p><button onClick={clear} className="mt-5 rounded-xl bg-[#1B519F] px-5 py-2.5 text-xs font-black text-white">Clear Filters</button></div>}</main></div></section><InternshipSuccessStoriesSection/><section className="internships-theme-secondary bg-white py-12 transition-colors"><div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-2"><div><h2 className="text-2xl font-black text-[#1B519F]">How Internships Work</h2><ol className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">{["Find an Internship","Apply","Organization Review","Start Internship","Grow Your Career"].map((x,i)=><li key={x} className="text-center"><span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF5FF] font-black text-[#1B519F]">{i+1}</span><strong className="mt-2 block text-xs text-[#1B519F]">{x}</strong></li>)}</ol></div><div><h2 className="text-2xl font-black text-[#1B519F]">What You Gain</h2><div className="mt-6 grid grid-cols-2 gap-3">{["Real Experience","Professional Skills","Build Your Portfolio","Network","Career Readiness","Workplace Confidence"].map(x=><div key={x} className="rounded-xl border border-slate-200 p-4 text-xs font-black text-[#1B519F]"> {x}</div>)}</div></div></div><div className="mx-auto mt-10 flex max-w-[1160px] flex-col items-start justify-between gap-4 rounded-2xl bg-[#EEF5FF] p-6 sm:flex-row sm:items-center"><div><h2 className="text-xl font-black text-[#1B519F]">From Internships to Career</h2><p className="mt-1 text-sm text-slate-600">Build experience today. Become job ready tomorrow.</p></div><Link href="/opportunities/jobs" className="rounded-xl bg-[#1B519F] px-6 py-3 text-xs font-black text-white">Explore Jobs</Link></div></section>
</>}








