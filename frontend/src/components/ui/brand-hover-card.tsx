"use client";

import type { ReactNode } from "react";

export type BrandHoverDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

interface BrandHoverCardProps {
  children: ReactNode;
  direction?: BrandHoverDirection;
  className?: string;
}

const directionClasses: Record<BrandHoverDirection, string> = {
  top:
    "translate-x-0 -translate-y-full",

  right:
    "translate-x-full translate-y-0",

  bottom:
    "translate-x-0 translate-y-full",

  left:
    "-translate-x-full translate-y-0",

  "top-left":
    "-translate-x-full -translate-y-full",

  "top-right":
    "translate-x-full -translate-y-full",

  "bottom-right":
    "translate-x-full translate-y-full",

  "bottom-left":
    "-translate-x-full translate-y-full",
};

const directions: BrandHoverDirection[] = [
  "top",
  "right",
  "bottom",
  "left",
  "top-left",
  "top-right",
  "bottom-right",
  "bottom-left",
];

export function getBrandHoverDirection(
  index: number,
): BrandHoverDirection {
  return directions[index % directions.length];
}

export function getBrandHoverDirectionClass(
  index: number,
): string {
  return directionClasses[getBrandHoverDirection(index)];
}

export function BrandHoverCard({
  children,
  direction = "top",
  className = "",
}: BrandHoverCardProps) {
  return (
    <div
      className={[
        "smartera-adaptive-card group relative h-full overflow-hidden rounded-2xl",
        "border border-slate-200 bg-white",
        "shadow-[0_5px_18px_rgba(15,23,42,.05)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:-translate-y-1 hover:scale-[1.01]",
        "hover:border-[#1B519F]/35",
        "hover:shadow-[0_18px_38px_rgba(27,81,159,.16)]",
        "motion-reduce:transform-none",
        "motion-reduce:transition-none",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 z-0",
          "bg-[#1B519F]",
          "transition-transform duration-[1000ms]",
          "ease-[cubic-bezier(.22,1,.36,1)]",
          "group-hover:translate-x-0",
          "group-hover:translate-y-0",
          "motion-reduce:transition-none",
          directionClasses[direction],
        ].join(" ")}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
