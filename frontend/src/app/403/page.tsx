import type { Metadata } from "next";
import { ExceptionState } from "@/components/shared/exception-state";

export const metadata: Metadata = { title: "Access Denied" };

export default function ForbiddenPage() {
  return <ExceptionState code="403" eyebrow="Access denied" title="You don’t have access to this page" description="This area is restricted. If you believe this is a mistake, contact Smartera Hub for help." secondaryHref="/contact" secondaryLabel="Contact support" />;
}
