import { SeeMoreAutoStyle } from "@/components/ui/see-more-auto-style";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ConnectivityGuard } from "@/components/shared/connectivity-guard";
import "./globals.css";
import { WhatsAppFloatingChat } from "@/components/shared/whatsapp-floating-chat";
import { WebAuthProvider } from "@/features/auth/hooks/use-web-auth";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: "Smartera Hub", template: "%s | Smartera Hub" },
  description:
    "Smartera Hub public website for practical learning, career development, and opportunities.",
  icons: {
    icon: "/images/brand/logo-mark.png",
    apple: "/images/brand/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('smartera-theme');var s=!t||t==='system';var d=t==='dark'||(s&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('smartera-dark',d);document.documentElement.classList.toggle('smartera-system-dark',s&&d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-lg bg-[#1B519F] px-4 py-2 text-sm font-bold text-white transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <ConnectivityGuard />
        <WebAuthProvider>
          <SiteShell>{children}</SiteShell>
        </WebAuthProvider>
        <WhatsAppFloatingChat />
              <SeeMoreAutoStyle />
      </body>
    </html>
  );
}
