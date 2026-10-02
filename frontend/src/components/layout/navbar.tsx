"use client";
import { button as Lbutton, div as Ldiv, header as Lheader, nav as Lnav, span as Lspan } from "@/i18n/elements";


import Link from "@/i18n/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSelector } from "@/i18n/language-selector";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { opportunityNavigation, primaryNavigation } from "@/config/navigation";
import { resolveAvatarUrl } from "@/features/auth/services/web-auth.service";
import { useWebAuth } from "@/features/auth/hooks/use-web-auth";

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  );
}

const trainingNavigation = [
  {
    label: "SWE Activity",
    href: "/opportunities/training",
    description:
      "Explore Smartera training activities, topics, events, and highlights.",
  },
  {
    label: "Smartera Trainers",
    href: "/trainers",
    description:
      "Browse experienced professionals and request a trainer through Smartera Hub.",
  },
];

/** Fixed, accessible global navigation with desktop and mobile dropdowns. */
export function Navbar() {
  const pathname = usePathname();
  const { user, resolving, logout } = useWebAuth();

  const [trainingOpen, setTrainingOpen] = useState(false);

  const [opportunitiesOpen, setOpportunitiesOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);

  const [mobileOppOpen, setMobileOppOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const trainingRef = useRef<HTMLDivElement>(null);

  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const trainingActive =
    pathname.startsWith("/trainers") ||
    pathname.startsWith("/opportunities/training");

  const opportunitiesActive = [
    "/opportunities/jobs",
    "/opportunities/hospitality",
    "/opportunities/internships",
    "/opportunities/seekers",
  ].some((href) => pathname.startsWith(href));

  const dropdownOrder = [
    "/opportunities/internships",
    "/opportunities/jobs",
    "/opportunities/seekers",
  ];

  const dropdownOpportunities = opportunityNavigation
    .filter((item) => dropdownOrder.includes(item.href))
    .toSorted(
      (a, b) => dropdownOrder.indexOf(a.href) - dropdownOrder.indexOf(b.href),
    );

  const closeMenus = () => {
    setTrainingOpen(false);
    setOpportunitiesOpen(false);
    setMobileOpen(false);
    setMobileTrainingOpen(false);
    setMobileOppOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTrainingOpen(false);
        setOpportunitiesOpen(false);
        setMobileOpen(false);
        setMobileTrainingOpen(false);
        setMobileOppOpen(false);
        setProfileOpen(false);
      }
    };

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;

      if (trainingRef.current && !trainingRef.current.contains(target)) {
        setTrainingOpen(false);
      }

      if (
        opportunitiesRef.current &&
        !opportunitiesRef.current.contains(target)
      ) {
        setOpportunitiesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target))
        setProfileOpen(false);
    };

    document.addEventListener("keydown", onKey);

    document.addEventListener("mousedown", onPointer);

    return () => {
      document.removeEventListener("keydown", onKey);

      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const homeItem = primaryNavigation.find((item) => item.href === "/");
  const aboutItem = primaryNavigation.find((item) => item.href === "/about");

  const afterBase = primaryNavigation.filter((item) => item.href !== "/" && item.href !== "/about");

  // Academic is intentionally outside the public navigation scope.
  const after = afterBase;

  return (
    <Lheader className="site-navbar fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_4px_14px_rgba(8,43,87,.09)] backdrop-blur-xl">
      <Ldiv className="mx-auto grid h-20 w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Ldiv className="justify-self-start">
          <BrandLogo />
        </Ldiv>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}
        <Lnav
          className="hidden h-16 min-w-0 w-full items-center justify-center gap-1 justify-self-stretch bg-transparent px-3 py-1.5 lg:flex"
          aria-label="Primary navigation"
        >
          {homeItem ? (
            <Link
              href={homeItem.href}
              onClick={closeMenus}
              className={`relative whitespace-normal px-1.5 py-2 text-center text-[11px] leading-4 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${
                active(homeItem.href)
                  ? "text-[#1B519F]"
                  : "text-slate-700 hover:text-[#1B519F]"
              }`}
            >
              {homeItem.label}

              {active(homeItem.href) ? (
                <Lspan className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#F59223]" />
              ) : null}
            </Link>
          ) : null}

          {aboutItem ? (
            <Link href={aboutItem.href} onClick={closeMenus} className="relative whitespace-nowrap px-1.5 py-2 text-center text-[11px] leading-4 font-semibold text-slate-700 hover:text-[#1B519F]">
              {aboutItem.label}
            </Link>
          ) : null}

          {/* ===============================================
              TRAINING DROPDOWN
          =============================================== */}
          <Ldiv
            ref={trainingRef}
            className="relative"
            onMouseEnter={() => {
              setTrainingOpen(true);
              setOpportunitiesOpen(false);
            }}
            onMouseLeave={() => setTrainingOpen(false)}
          >
            <Lbutton
              type="button"
              onClick={() => {
                setTrainingOpen((current) => !current);

                setOpportunitiesOpen(false);
              }}
              aria-expanded={trainingOpen}
              aria-controls="training-menu"
              className={`relative flex items-center justify-center gap-1 whitespace-normal bg-transparent px-1.5 py-2 text-center text-[11px] leading-4 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${
                trainingActive || trainingOpen
                  ? "text-[#1B519F]"
                  : "text-slate-700 hover:text-[#1B519F]"
              }`}
            >
              SWE Program
              <Chevron open={trainingOpen} />
              {trainingActive ? (
                <Lspan className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#F59223]" />
              ) : null}
            </Lbutton>

            {trainingOpen ? (
              <Ldiv
                id="training-menu"
                className="absolute left-1/2 top-[calc(100%+10px)] z-[70] w-[350px] -translate-x-1/2 rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(8,43,87,.14)] before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']"
              >
                {trainingNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="group flex items-start gap-4 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-[#F4F8FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
                  >
                    <Lspan className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F59223] transition-transform duration-200 group-hover:scale-125" />

                    <Lspan>
                      <Lspan className="block text-[13px] font-bold text-[#1B519F]">
                        {item.label}
                      </Lspan>

                      <Lspan className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </Lspan>
                    </Lspan>
                  </Link>
                ))}
              </Ldiv>
            ) : null}
          </Ldiv>

          {/* ===============================================
              OPPORTUNITIES DROPDOWN
          =============================================== */}
          <Ldiv
            ref={opportunitiesRef}
            className="relative"
            onMouseEnter={() => {
              setOpportunitiesOpen(true);
              setTrainingOpen(false);
            }}
            onMouseLeave={() => setOpportunitiesOpen(false)}
          >
            <Lbutton
              type="button"
              onClick={() => {
                setOpportunitiesOpen((current) => !current);

                setTrainingOpen(false);
              }}
              aria-expanded={opportunitiesOpen}
              aria-controls="opportunities-menu"
              className={`relative flex items-center justify-center gap-1 whitespace-normal bg-transparent px-1.5 py-2 text-center text-[11px] leading-4 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${
                opportunitiesActive || opportunitiesOpen
                  ? "text-[#1B519F]"
                  : "text-slate-700 hover:text-[#1B519F]"
              }`}
            >
              Opportunities
              <Chevron open={opportunitiesOpen} />
              {opportunitiesActive ? (
                <Lspan className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#F59223]" />
              ) : null}
            </Lbutton>

            {opportunitiesOpen ? (
              <Ldiv
                id="opportunities-menu"
                className="absolute left-1/2 top-[calc(100%+10px)] z-[70] w-[360px] -translate-x-1/2 rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(8,43,87,.14)] before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']"
              >
                {dropdownOpportunities.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="flex items-start gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-[#F4F8FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
                  >
                    <Lspan>
                      <Lspan className="block text-[13px] font-bold text-[#1B519F]">
                        {item.label}
                      </Lspan>

                      <Lspan className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </Lspan>
                    </Lspan>
                  </Link>
                ))}
              </Ldiv>
            ) : null}
          </Ldiv>

          {after.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className={`relative whitespace-normal px-1.5 py-2 text-center text-[11px] leading-4 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${
                active(item.href)
                  ? "text-[#1B519F]"
                  : "text-slate-700 hover:text-[#1B519F]"
              }`}
            >
              {item.label}

              {active(item.href) ? (
                <Lspan className="absolute inset-x-3 bottom-0 h-0.5 bg-[#F59223]" />
              ) : null}
            </Link>
          ))}
        </Lnav>

        <Ldiv className="flex min-w-0 items-center gap-2 justify-self-end">
          <LanguageSelector className="hidden lg:block" />
          <ThemeToggle className="h-9 w-9" />

          {resolving ? (
            <Lspan
              className="hidden h-9 w-20 animate-pulse rounded-lg bg-slate-100 lg:block"
              aria-label="Checking account"
            />
          ) : user ? (
            <Ldiv ref={profileRef} className="relative hidden lg:block">
              <Lbutton
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                <WebAvatar
                  avatarUrl={user.profile?.avatarUrl}
                  name={user.profile?.fullName || user.email}
                />
              </Lbutton>
              {profileOpen ? (
                <Ldiv className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  {user.capabilities.includes("STUDENT") ? (
                    <>
                      <Link
                        href="/student"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Student Dashboard
                      </Link>
                      {user.studentProfile?.status === "ACTIVE" ? (
                        <Link
                          href="/student/academics"
                          onClick={closeMenus}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          My Academics
                        </Link>
                      ) : (
                        <Link
                          href="/student/registration"
                          onClick={closeMenus}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Verification Status
                        </Link>
                      )}
                    </>
                  ) : null}
                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    My Profile
                  </Link>
                  <Lbutton
                    type="button"
                    onClick={() => {
                      closeMenus();
                      void logout();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </Lbutton>
                </Ldiv>
              ) : null}
            </Ldiv>
          ) : null}

          <Lbutton
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1B519F] transition-colors hover:border-[#F59223] hover:text-[#F59223] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] lg:hidden"
          >
            <MenuIcon open={mobileOpen} />
          </Lbutton>
        </Ldiv>
      </Ldiv>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      {mobileOpen ? (
        <Lnav
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-4 py-4 shadow-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <Ldiv className="mx-auto max-w-[1400px] space-y-1">
            <LanguageSelector className="mb-3 w-full" />
            {homeItem ? (
              <Link
                href={homeItem.href}
                onClick={closeMenus}
                className={`block rounded-xl px-4 py-3 text-sm font-bold ${
                  active(homeItem.href)
                    ? "bg-[#EEF5FF] text-[#1B519F]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                {homeItem.label}
              </Link>
            ) : null}

            {aboutItem ? (
              <Link href={aboutItem.href} onClick={closeMenus} className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">
                {aboutItem.label}
              </Link>
            ) : null}

            {/* MOBILE TRAINING */}
            <Lbutton
              type="button"
              onClick={() => {
                setMobileTrainingOpen((current) => !current);

                setMobileOppOpen(false);
              }}
              aria-expanded={mobileTrainingOpen}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold ${
                trainingActive
                  ? "bg-[#EEF5FF] text-[#1B519F]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              SWE Program
              <Chevron open={mobileTrainingOpen} />
            </Lbutton>

            {mobileTrainingOpen ? (
              <Ldiv className="ml-4 space-y-1 border-l-2 border-[#F59223]/35 pl-3">
                {trainingNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      active(item.href)
                        ? "bg-[#EEF5FF] text-[#1B519F]"
                        : "text-slate-700 hover:bg-[#EEF5FF] hover:text-[#1B519F]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </Ldiv>
            ) : null}

            {/* MOBILE OPPORTUNITIES */}
            <Lbutton
              type="button"
              onClick={() => {
                setMobileOppOpen((current) => !current);

                setMobileTrainingOpen(false);
              }}
              aria-expanded={mobileOppOpen}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold ${
                opportunitiesActive
                  ? "bg-[#EEF5FF] text-[#1B519F]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Opportunities
              <Chevron open={mobileOppOpen} />
            </Lbutton>

            {mobileOppOpen ? (
              <Ldiv className="ml-4 space-y-1 border-l-2 border-[#F59223]/35 pl-3">
                {dropdownOpportunities.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                      active(item.href)
                        ? "bg-[#EEF5FF] text-[#1B519F]"
                        : "text-slate-700 hover:bg-[#EEF5FF] hover:text-[#1B519F]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </Ldiv>
            ) : null}

            {after.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`block rounded-xl px-4 py-3 text-sm font-bold ${
                  active(item.href)
                    ? "bg-[#EEF5FF] text-[#1B519F]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {!resolving && user ? (
              <>
                {user.capabilities.includes("STUDENT") ? (
                  <Link
                    href="/student"
                    onClick={closeMenus}
                    className="mt-3 block rounded-xl px-4 py-3 text-sm font-bold text-[#1B519F] hover:bg-[#EEF5FF]"
                  >
                    Student Dashboard
                  </Link>
                ) : null}
                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl bg-[#EEF5FF] px-4 py-3 text-sm font-bold text-[#1B519F]"
                >
                  <WebAvatar
                    avatarUrl={user.profile?.avatarUrl}
                    name={user.profile?.fullName || user.email}
                  />{" "}
                  My Profile
                </Link>
                <Lbutton
                  type="button"
                  onClick={() => {
                    closeMenus();
                    void logout();
                  }}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Logout
                </Lbutton>
              </>
            ) : null}
          </Ldiv>
        </Lnav>
      ) : null}
    </Lheader>
  );
}

function WebAvatar({
  avatarUrl,
  name,
}: {
  avatarUrl?: string | null;
  name: string;
}) {
  const resolved = resolveAvatarUrl(avatarUrl);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Lspan className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1B519F] text-xs font-black text-white">
      {resolved ? (
        <Lspan
          role="img"
          aria-label="Profile photo"
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${resolved})` }}
        />
      ) : (
        initials
      )}
    </Lspan>
  );
}
