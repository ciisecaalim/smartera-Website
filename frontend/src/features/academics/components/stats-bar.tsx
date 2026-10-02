import type { ReactNode } from "react";

const trustItems: Array<{
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  icon: ReactNode;
}> = [
  {
    id: "courses",
    title: "Growing Course Library",
    subtitle: "Practical topics across careers",
    accent: "bg-[#1B519F]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z" stroke="white" strokeWidth="1.7" />
        <path d="M5 18.5h12" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "students",
    title: "Learner-Focused Courses",
    subtitle: "Clear paths for skill building",
    accent: "bg-[#22C55E]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="2.5" stroke="white" strokeWidth="1.7" />
        <circle cx="16.5" cy="9" r="2" stroke="white" strokeWidth="1.7" />
        <path d="M3.8 18c.8-2.6 2.8-4 5.2-4s4.4 1.4 5.2 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M14.5 14.2c1.5-.3 3 .5 3.8 2.3" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "certified",
    title: "Completion Certificates",
    subtitle: "Credentials for finished courses",
    accent: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="10" r="5" stroke="white" strokeWidth="1.7" />
        <path d="m10 14.8-1.3 4.2 3.3-1.5 3.3 1.5L14 14.8" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "access",
    title: "Lifetime Access",
    subtitle: "Learn on your schedule",
    accent: "bg-[#F59223]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="13" r="7" stroke="white" strokeWidth="1.7" />
        <path d="M12 9.5V13l2.4 1.6" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4h6" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Trust/stats strip sitting directly under the Academics hero. */
export function StatsBar() {
  return (
    <section className="bg-[#F5F8FD] px-6 pb-8 pt-3 sm:px-8 lg:px-12 xl:px-16" aria-label="Learning highlights">
      <div className="mx-auto w-full max-w-[1536px]">
        <div className="grid min-h-[88px] overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-3.5 px-7 py-5 transition-colors duration-300 hover:bg-[#F7FAFF] lg:px-8 ${
                index > 0 ? "border-t border-[#E5EAF1] sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l" : ""} ${index >= 2 ? "sm:border-t lg:border-t-0" : ""} ${
                index > 0 ? "lg:border-l" : ""
              }`}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${item.accent}`} aria-hidden="true">
                {item.icon}
              </span>
              <span>
                <span className="block text-sm font-bold text-[#111827]">{item.title}</span>
                <span className="mt-0.5 block text-xs text-[#6B7280]">{item.subtitle}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

