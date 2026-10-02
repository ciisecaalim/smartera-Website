import type { Metadata } from "next";
import { ExceptionState } from "@/components/shared/exception-state";

export const metadata: Metadata = { title: "Server Error" };

export default function ServerErrorPage() {
  return <ExceptionState code="500" eyebrow="Server error" title="Something went wrong" description="We couldn’t complete your request right now. Please try again later, or return to the homepage." secondaryHref="/contact" secondaryLabel="Contact support" />;
}
