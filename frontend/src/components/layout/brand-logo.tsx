
import { span as Lspan } from "@/i18n/elements";
import Image from "next/image";
import Link from "@/i18n/link";
import { siteConfig } from "@/config/site";

export function BrandLogo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2" aria-label="Smartera Hub home">
      <Lspan className="-mr-4 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full sm:-mr-5 sm:h-20 sm:w-20">
        <Image src="/images/brand/logo-mark.png" alt="" width={432} height={432} priority className="max-w-none shrink-0 object-contain" style={{ width: "432px", height: "auto" }} />
      </Lspan>
      <Lspan className="hidden min-w-0 sm:block">
        <Lspan className="block truncate text-[18px] font-black tracking-tight"><Lspan className="text-brand-blue">SMARTERA</Lspan><Lspan className="text-[#FF9418]"> HUB</Lspan></Lspan>
        <Lspan className="block truncate text-[10px] font-semibold text-slate-500">
          {siteConfig.tagline.split(" • ").map((word, index) => (
            <Lspan key={word}>
              {index > 0 && " • "}
              <Lspan className={word === "Career" ? "text-[#FF9418]" : word === "Impact" ? "text-brand-blue" : undefined}>{word}</Lspan>
            </Lspan>
          ))}
        </Lspan>
      </Lspan>
    </Link>
  );
}
