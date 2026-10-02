"use client";

import { useRef } from "react";

export function VideoPlayer({
  src,
  poster,
  title,
  className,
}: {
  src?: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  if (!src) {
    return (
      <div className={`flex aspect-video items-center justify-center rounded-xl bg-[#0B1F3A] text-sm text-white/80 ${className ?? ""}`}>
        Preview video coming soon
      </div>
    );
  }

  return (
    <video
      ref={ref}
      className={`aspect-video w-full rounded-xl bg-black object-cover ${className ?? ""}`}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={title}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded videos.
    </video>
  );
}
