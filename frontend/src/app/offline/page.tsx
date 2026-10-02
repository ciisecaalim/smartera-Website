import type { Metadata } from "next";
import { ExceptionState } from "@/components/shared/exception-state";

export const metadata: Metadata = { title: "Offline" };

export default function OfflinePage() {
  return <ExceptionState eyebrow="Connection unavailable" title="You appear to be offline" description="Check your internet connection and refresh this page when you’re connected again." />;
}
