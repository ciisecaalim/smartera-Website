"use client";
import Link from "next/link";
export function AcademicsProfilePageClient() { return <div className="mx-auto max-w-xl px-4 py-16 text-center"><h1 className="text-3xl font-black text-[#1B519F]">Student Profile</h1><p className="mt-3 text-slate-600">Manage your real profile, avatar, phone, and address from the central profile page.</p><Link href="/profile" className="mt-6 inline-flex rounded-xl bg-[#1B519F] px-5 py-3 font-black text-white">Open My Profile</Link></div>; }
