import type { ReactNode } from "react";
import { AcademicsAuthProvider } from "@/features/academics/hooks/use-academics-auth";
import { AcademicsStoreProvider } from "@/features/academics/hooks/use-academics-store";

export default function AcademicsRootLayout({ children }: { children: ReactNode }) {
  return (
    <AcademicsStoreProvider>
      <AcademicsAuthProvider>{children}</AcademicsAuthProvider>
    </AcademicsStoreProvider>
  );
}
