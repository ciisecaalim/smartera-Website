"use client";

import { useEffect } from "react";

type Rgb = {
  r: number;
  g: number;
  b: number;
  a: number;
};

function parseRgb(value: string): Rgb | null {
  const match = value.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );

  if (!match) {
    return null;
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function getEffectiveBackground(
  element: HTMLElement,
): Rgb {
  let current: HTMLElement | null =
    element.parentElement;

  while (current) {
    const style =
      window.getComputedStyle(current);

    const image =
      style.backgroundImage;

    if (
      image &&
      image !== "none"
    ) {
      return {
        r: 30,
        g: 30,
        b: 30,
        a: 1,
      };
    }

    const color =
      parseRgb(
        style.backgroundColor,
      );

    if (
      color &&
      color.a > 0.05
    ) {
      return color;
    }

    current =
      current.parentElement;
  }

  return {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };
}

function isLightBackground(
  color: Rgb,
) {
  /*
   * White / near-white only -> black text.
   * Any clearly colored or dark background -> white text.
   */
  return (
    color.r >= 245 &&
    color.g >= 245 &&
    color.b >= 245
  );
}

function styleReadMore(
  element: HTMLElement,
) {
  const text =
    element.textContent
      ?.replace(/\s+/g, " ")
      .trim() ?? "";

  if (
    text !== "Read More..."
  ) {
    return;
  }

  const background =
    getEffectiveBackground(
      element,
    );

  const textColor =
    isLightBackground(background)
      ? "#000000"
      : "#FFFFFF";

  element.style.setProperty(
    "color",
    textColor,
    "important",
  );

  element.style.setProperty(
    "border",
    "none",
    "important",
  );

  element.style.setProperty(
    "border-width",
    "0",
    "important",
  );

  element.style.setProperty(
    "border-color",
    "transparent",
    "important",
  );

  element.style.setProperty(
    "background",
    "transparent",
    "important",
  );

  element.style.setProperty(
    "box-shadow",
    "none",
    "important",
  );

  element.setAttribute(
    "data-read-more-auto",
    "true",
  );
}

function applyReadMoreStyles() {
  document
    .querySelectorAll<HTMLElement>(
      'a, button, [role="button"]',
    )
    .forEach(styleReadMore);
}

export function SeeMoreAutoStyle() {
  useEffect(() => {
    let observer:
      MutationObserver | null =
      null;

    const refresh = () => {
      window.requestAnimationFrame(
        applyReadMoreStyles,
      );
    };

    const timer =
      window.setTimeout(() => {
        applyReadMoreStyles();

        observer =
          new MutationObserver(
            refresh,
          );

        observer.observe(
          document.body,
          {
            childList: true,
            subtree: true,
          },
        );
      }, 500);

    document.addEventListener(
      "pointerover",
      refresh,
      true,
    );

    document.addEventListener(
      "pointerout",
      refresh,
      true,
    );

    document.addEventListener(
      "focusin",
      refresh,
      true,
    );

    document.addEventListener(
      "focusout",
      refresh,
      true,
    );

    window.addEventListener(
      "resize",
      refresh,
    );

    return () => {
      window.clearTimeout(timer);

      observer?.disconnect();

      document.removeEventListener(
        "pointerover",
        refresh,
        true,
      );

      document.removeEventListener(
        "pointerout",
        refresh,
        true,
      );

      document.removeEventListener(
        "focusin",
        refresh,
        true,
      );

      document.removeEventListener(
        "focusout",
        refresh,
        true,
      );

      window.removeEventListener(
        "resize",
        refresh,
      );
    };
  }, []);

  return (
    <style jsx global>{`
      [data-read-more-auto="true"] {
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      [data-read-more-auto="true"]:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    `}</style>
  );
}