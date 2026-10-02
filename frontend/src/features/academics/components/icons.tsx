import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function base({ title, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...props}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return base({ ...props, children: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> });
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return base({ ...props, children: <><path d="M3 5h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H7" /><circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></> });
}

export function GlobeIcon(props: IconProps) {
  return base({ ...props, children: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></> });
}

export function ChevronIcon({ open = false, ...props }: IconProps & { open?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return base({ ...props, children: <path d="M9 7.5v9l8-4.5-8-4.5Z" fill="currentColor" stroke="none" /> });
}

export function StarIcon({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      <path d="m10 2.5 2.3 4.7 5.2.8-3.8 3.6.9 5.2L10 14.4 5.4 16.8l.9-5.2L2.5 8l5.2-.8L10 2.5Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return base({ ...props, children: <path d="m6 6 12 12M18 6 6 18" /> });
}

export function MenuIcon(props: IconProps) {
  return base({ ...props, children: <path d="M4 7h16M4 12h16M4 17h16" /> });
}

export function CheckIcon(props: IconProps) {
  return base({ ...props, children: <path d="m5 12 4.5 4.5L19 7" /> });
}

export function LockIcon(props: IconProps) {
  return base({
    ...props,
    children: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  });
}

export function ArrowRightIcon(props: IconProps) {
  return base({ ...props, children: <path d="M5 12h14M13 6l6 6-6 6" /> });
}

export function BellIcon(props: IconProps) {
  return base({
    ...props,
    children: (
      <>
        <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 7H4c.5-1.5 2-3 2-7Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </>
    ),
  });
}
