import type { Metadata } from "next";

export const metadata: Metadata = { title: "About", description: "Learn about Smartera Hub, our mission, values, and approach." };

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
