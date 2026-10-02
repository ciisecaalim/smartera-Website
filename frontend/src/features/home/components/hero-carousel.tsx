"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { homeHeroSlides } from "@/features/home/data/home.data";

const SLIDE_DURATION = 500;
const SLIDE_INTERVAL = 3000;

/** A two-slide track prevents the image jump that CSS keyframe loops can create. */
export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => setIsMoving(true), SLIDE_INTERVAL);
    return () => window.clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    if (!isMoving) return;

    const transition = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % homeHeroSlides.length);
      setIsMoving(false);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(transition);
  }, [isMoving]);

  const activeSlide = homeHeroSlides[activeIndex];
  const nextSlide = homeHeroSlides[(activeIndex + 1) % homeHeroSlides.length];
  const transitionClass = isMoving
    ? "transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
    : "transition-none";

  return (
    <>
      <Image src={activeSlide.src} alt={activeSlide.alt} fill priority sizes="(max-width: 1279px) 100vw, 55vw" className={`object-cover ${transitionClass} motion-reduce:transition-none ${isMoving ? "-translate-x-full" : "translate-x-0"}`} />
      <Image src={nextSlide.src} alt="" fill aria-hidden sizes="(max-width: 1279px) 100vw, 55vw" className={`object-cover ${transitionClass} motion-reduce:transition-none ${isMoving ? "translate-x-0" : "translate-x-full"}`} />
    </>
  );
}
