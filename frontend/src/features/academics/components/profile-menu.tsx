"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useAcademicsAuth } from "@/features/academics/hooks/use-academics-auth";

export function ProfileMenu() {
  const { user, logout, notifications } = useAcademicsAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const hasUnread = notifications.some((item) => !item.read);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white transition hover:bg-[#16325A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
        aria-label="Account menu"
      >
        {user.avatarDataUrl ? (
          <Image src={user.avatarDataUrl} alt="" fill unoptimized className="rounded-full object-cover" sizes="36px" />
        ) : user.initials.slice(0, 1)}
        {hasUnread ? (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#1B519F]" aria-hidden="true" />
        ) : null}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-xl border border-[#E5EAF1] bg-white shadow-[0_20px_48px_rgba(11,31,58,0.16)]"
        >
          <div className="border-b border-[#E5EAF1] px-4 py-3">
            <p className="text-sm font-bold text-[#0B1F3A]">
              {user.firstName} {user.lastName}
            </p>
            <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[#1B519F]">{user.studentStatus || "STUDENT"}</p>
          </div>
          <div className="py-1">
            {[
              { href: "/student", label: "Student Dashboard" },
              ...(user.studentStatus === "ACTIVE" ? [{ href: "/student/academics", label: "My Academics" }] : [{ href: "/student/registration", label: "Verification Status" }]),
              { href: "/profile", label: "My Profile" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] hover:bg-[#F7F9FC]"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                logout();
                setOpen(false);
                router.push("/academics");
              }}
              className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-[#B42318] hover:bg-[#FEF3F2]"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
