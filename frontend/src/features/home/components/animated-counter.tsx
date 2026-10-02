"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
};

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1500,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const [started, setStarted] =
    useState(false);

  const [value, setValue] =
    useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node || started) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          setStarted(true);
          observer.disconnect();
        },
        {
          threshold: 0.4,
        },
      );

    observer.observe(node);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      const frame =
        requestAnimationFrame(() => {
          setValue(target);
        });

      return () =>
        cancelAnimationFrame(frame);
    }

    let animationFrame = 0;

    const timeout =
      window.setTimeout(() => {
        const start =
          performance.now();

        const animate = (now: number) => {
          const progress =
            Math.min(
              (now - start) / duration,
              1,
            );

          const eased =
            1 -
            Math.pow(
              1 - progress,
              3,
            );

          setValue(
            Math.round(
              target * eased,
            ),
          );

          if (progress < 1) {
            animationFrame =
              requestAnimationFrame(
                animate,
              );
          }
        };

        animationFrame =
          requestAnimationFrame(
            animate,
          );
      }, delay);

    return () => {
      window.clearTimeout(timeout);

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame,
        );
      }
    };
  }, [
    delay,
    duration,
    started,
    target,
  ]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      aria-label={`${target}${suffix}`}
    >
      {value}
      {suffix}
    </span>
  );
}
