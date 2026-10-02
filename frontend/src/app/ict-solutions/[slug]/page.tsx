import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIctServiceBySlug, getPublishedIctServices, IctServiceDetails } from "@/features/ict-solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedIctServices().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getIctServiceBySlug((await params).slug);
  return service ? { title: service.title, description: service.shortDescription } : { title: "ICT Service Not Found" };
}

export default async function IctServicePage({ params }: Props) {
  const service = getIctServiceBySlug((await params).slug);
  if (!service) notFound();
  return <IctServiceDetails service={service} />;
}
