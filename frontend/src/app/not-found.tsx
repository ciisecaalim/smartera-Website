import type { Metadata } from "next";
import { ExceptionState } from "@/components/shared/exception-state";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return <ExceptionState code="404" eyebrow="Page not found" title="We couldn’t find that page" description="The address may be incorrect, or the page may have moved. Return home or explore the opportunities currently available." secondaryHref="/opportunities" secondaryLabel="Explore opportunities" />;
}
