"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BellIcon } from "@/features/academics/components/icons";
import { useAcademicsAuth } from "@/features/academics/hooks/use-academics-auth";

export function NotificationMenu() {
  const { notifications, markNotificationsRead } = useAcademicsAuth();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((item) => !item.read).length;

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        onClick={() => {
          setOpen((value) => !value);
          markNotificationsRead();
        }}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0B1F3A] transition hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
      >
        <BellIcon className="h-5 w-5" />
        {unread > 0 ? (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1B519F] px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(92vw,320px)] overflow-hidden rounded-xl border border-[#E5EAF1] bg-white shadow-[0_20px_48px_rgba(11,31,58,0.16)]"
        >
          <div className="border-b border-[#E5EAF1] px-4 py-3">
            <p className="text-sm font-bold text-[#0B1F3A]">Notifications</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Demo only</p>
          </div>
          <ul className="divide-y divide-[#E5EAF1]">
            {notifications.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <p className="text-sm font-semibold text-[#0B1F3A]">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

