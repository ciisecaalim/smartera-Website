import Image from "next/image";
import { jobAsset } from "../data/jobs.data";

const colors = [
  "bg-[#E8F2FF] text-[#1B519F]",
  "bg-[#FFF3DF] text-[#F59223]",
  "bg-emerald-50 text-emerald-700",
  "bg-violet-50 text-violet-700",
];

export function EmployerAvatar({
  company,
  logo,
  logoAlt,
  index = 0,
  large = false,
}: {
  company: string;
  logo?: string | null;
  logoAlt?: string | null;
  index?: number;
  large?: boolean;
}) {
  const size = large ? "h-14 w-14" : "h-10 w-10";

  return logo ? (
    <span className={`relative block shrink-0 overflow-hidden rounded-lg bg-slate-100 ${size}`}>
      <Image
        unoptimized
        src={jobAsset(logo)}
        alt={logoAlt || `${company} logo`}
        fill
        sizes={large ? "56px" : "40px"}
        className="object-cover object-center"
      />
    </span>
  ) : (
    <span
      aria-hidden="true"
      className={`employer-avatar flex shrink-0 items-center justify-center rounded-lg font-black ${size} ${large ? "text-lg" : "text-base"} ${colors[index % colors.length]}`}
    >
      {company.charAt(0).toUpperCase()}
    </span>
  );
}
