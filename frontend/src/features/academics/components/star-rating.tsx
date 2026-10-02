import { StarIcon } from "@/features/academics/components/icons";
import { cn } from "@/lib/cn";

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className={cn("flex items-center gap-1.5 text-[#F59223]", className)}>
      <span className={cn("font-bold text-[#F59223]", size === "sm" ? "text-xs" : "text-sm")}>{rating.toFixed(1)}</span>
      <span className="flex items-center gap-0.5 text-[#F59223]" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < Math.round(rating)} className={iconClass} />
        ))}
      </span>
      {typeof reviewCount === "number" ? (
        <span className={cn("text-slate-500", size === "sm" ? "text-xs" : "text-sm")}>({reviewCount.toLocaleString()})</span>
      ) : null}
      <span className="sr-only">{`${rating.toFixed(1)} out of 5 stars${typeof reviewCount === "number" ? `, ${reviewCount} reviews` : ""}`}</span>
    </div>
  );
}

