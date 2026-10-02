import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partners", description: "Explore organizations collaborating with Smartera Hub." };

export default function PartnersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
