export type HomeIconName =
  | "education"
  | "career"
  | "shield"
  | "briefcase"
  | "book"
  | "hospitality"
  | "users"
  | "search"
  | "code"
  | "growth"
  | "layers"
  | "rocket";

type HomeIconProps = {
  name: HomeIconName;
  className?: string;
};

export function HomeIcon({
  name,
  className = "h-6 w-6",
}: HomeIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "education") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 12v5c3 2 7 2 10 0v-5" />
        <path d="M21 9v6" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <path d="M3 12h18M10 12v2h4v-2" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 4h6c1.1 0 2 .9 2 2v14c0-1.1-.9-2-2-2H4V4Z" />
        <path d="M20 4h-6c-1.1 0-2 .9-2 2v14c0-1.1.9-2 2-2h6V4Z" />
      </svg>
    );
  }

  if (name === "hospitality") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 8v4" />
        <circle cx="12" cy="6" r="1.5" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c.5-3.5 2.3-6 5.5-6s5 2.5 5.5 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M16 14.5c2.7.1 4.3 2 4.6 5" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 18 9 13l4 3 7-9" />
        <path d="M15 7h5v5" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
      </svg>
    );
  }

  if (name === "rocket") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M14 5c3-3 6-2 6-2s1 3-2 6l-6 6-4-4 6-6Z" />
        <circle cx="16" cy="7" r="1.2" />
        <path d="m8 11-4 1 3 3-1 4 4-3M13 16l-1 4 3-2" />
      </svg>
    );
  }

  if (name === "career") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 20c.7-4.3 3-7 7-7s6.3 2.7 7 7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 3 20 6v5c0 5-3 8.5-8 10-5-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}
