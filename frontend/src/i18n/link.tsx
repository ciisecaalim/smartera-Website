"use client";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useLanguage } from "./language-provider";
export default function Link(props: ComponentProps<typeof NextLink>) {
  const { t } = useLanguage();
  const text = (child: ReactNode): ReactNode => typeof child === "string" ? t(child) : Array.isArray(child) ? child.map(text) : child;
  return <NextLink {...props} title={props.title ? t(props.title) : undefined} aria-label={props["aria-label"] ? t(props["aria-label"]) : undefined}>{text(props.children)}</NextLink>;
}
