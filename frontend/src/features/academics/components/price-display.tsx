import { formatPrice } from "@/features/academics/services/course.service";
import { cn } from "@/lib/cn";

export function PriceDisplay({
  price,
  originalPrice,
  className,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const currentClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-black text-[#0B1F3A]", currentClass)}>{formatPrice(price)}</span>
      {originalPrice && originalPrice > price ? (
        <span className="text-sm text-slate-400 line-through">{formatPrice(originalPrice)}</span>
      ) : null}
    </div>
  );
}
