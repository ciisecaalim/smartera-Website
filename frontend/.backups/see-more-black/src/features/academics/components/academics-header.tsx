"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { academicsNavGridClassName } from "@/features/academics/components/academics-nav-layout";
import { GlobeIcon, MenuIcon, CloseIcon, SearchIcon } from "@/features/academics/components/icons";
import { ExploreMenu } from "@/features/academics/components/explore-menu";
import { MyLearningMenu } from "@/features/academics/components/my-learning-menu";
import { ProfileMenu } from "@/features/academics/components/profile-menu";
import { SearchBar } from "@/features/academics/components/search-bar";
import { useAcademicsAuth } from "@/features/academics/hooks/use-academics-auth";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** Academics marketplace navigation with guest and authenticated states. */
export function AcademicsHeader() {
  const { isAuthenticated, hydrated, user, logout } = useAcademicsAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const showAuth = hydrated && isAuthenticated;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(11,31,58,0.06)]">
      <div className="border-b border-[#E5EAF1]">
        <div className={`${academicsNavGridClassName} h-[72px]`}>
          {/* Col 1 - brand and course explorer */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/academics"
              className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              <Image src="/images/brand/logo-mark.png" alt="" width={40} height={40} priority className="object-contain" style={{ width: "36px", height: "auto" }} />
              <span className="hidden text-[15px] font-black tracking-tight text-[#1B519F] lg:block">
                Smartera
              </span>
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <div className="hidden lg:block">
              <ExploreMenu />
            </div>
          </div>

          {/* Col 2 - wide search (~45–50% of bar via 1fr); cell stays in grid on mobile */}
          <div className="min-w-0">
            <div className="hidden md:block">
              <SearchBar className="w-full" placeholder="Search for anything" />
            </div>
          </div>

          {/* Col 3 - reserved for future marketplace links */}
          <div className="hidden min-w-0 justify-end xl:flex" />

          {/* Col 4 - My learning + icons / guest CTAs */}
          <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0B1F3A] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              aria-label="Open search"
              onClick={() => setMobileSearchOpen((value) => !value)}
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {showAuth ? <MyLearningMenu /> : null}

            {showAuth ? (
              <>
                <div className="hidden sm:block">
                  <ProfileMenu />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/academics/login"
                  className="hidden min-h-10 items-center justify-center rounded-lg border border-[#1B519F] px-3 text-sm font-bold text-[#1B519F] transition hover:bg-[#EEF5FF] sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
                >
                  Log in
                </Link>
              </>
            )}

            {!showAuth ? (
              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#E5EAF1] text-[#0B1F3A] lg:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
                aria-label="Language"
              >
                <GlobeIcon className="h-5 w-5" />
              </button>
            ) : null}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0B1F3A] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileSearchOpen ? (
          <div className="border-t border-[#E5EAF1] px-4 py-3 md:hidden">
            <SearchBar />
          </div>
        ) : null}

        {mobileOpen ? (
          <div className="border-t border-[#E5EAF1] bg-white px-4 py-4 lg:hidden">
            <nav className="space-y-1" aria-label="Academics mobile">
              <ExploreMenu />
              {showAuth ? (
                <>
                  <Link
                    href="/academics/my-learning"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#0B1F3A] hover:bg-[#F7F9FC]"
                  >
                    My learning
                  </Link>
                  <Link
                    href="/academics/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#0B1F3A] hover:bg-[#F7F9FC]"
                  >
                    {user ? `${user.firstName} ${user.lastName}` : "Profile"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#B42318] hover:bg-[#FEF3F2]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/academics/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#1B519F]"
                  >
                    Log in
                  </Link>
                </>
              )}
            </nav>
          </div>
        ) : null}
      </div>

    </header>
  );
}
