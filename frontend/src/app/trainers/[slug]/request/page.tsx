import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrainerBySlug } from "@/features/trainers";
import { TrainerRequestForm } from "@/features/trainers/components/trainer-request-form";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);
  return trainer
    ? { title: `Request ${trainer.fullName} | Smartera Hub` }
    : { title: "Trainer Not Found | Smartera Hub" };
}

export default async function TrainerRequestPage({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);
  if (!trainer || trainer.messageFormOpen === false) notFound();

  return (
    <main className="bg-[#F6F9FD] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/trainers/${trainer.slug}`}
          className="text-sm font-bold text-[#1B519F] hover:underline"
        >
           Back to {trainer.fullName}
        </Link>
        <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(8,43,87,.08)] lg:grid lg:grid-cols-[.72fr_1.28fr]">
          <section className="bg-[#071D3D] p-7 text-white sm:p-9 lg:p-10">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#F59223]">
              Trainer Request
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Learn with an experienced professional.
            </h1>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-blue-100/50">
                Selected Trainer
              </p>
              <p className="mt-2 text-lg font-black leading-7 text-white">
                {trainer.fullName}
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-100/75">
                {trainer.professionalTitle}
              </p>
            </div>
            <p className="mt-6 text-sm leading-7 text-blue-100/75">
              Tell us about your learning goals, training requirements, or the
              support you need. Smartera Hub will review your request and get
              back to you.
            </p>
          </section>
          <section className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#F59223]">
              Send a request
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#1B519F]">
              Request This Trainer
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Complete the form below and we will contact you about your
              request.
            </p>
            <div className="mt-7">
              <TrainerRequestForm
                trainerName={trainer.fullName}
                trainerSlug={trainer.slug}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
