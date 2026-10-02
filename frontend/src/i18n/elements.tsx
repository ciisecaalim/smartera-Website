"use client";
import { createElement, type ComponentPropsWithRef, type ReactNode, type JSX } from "react";
import { useLanguage } from "./language-provider";
function textChildren(children: ReactNode, t: (text: string) => string): ReactNode {
  if (typeof children === "string") return t(children);
  if (Array.isArray(children)) return children.map(child => textChildren(child, t));
  return children;
}
function localized<Tag extends keyof JSX.IntrinsicElements>(tag: Tag) {
  function LocalizedElement(props: ComponentPropsWithRef<Tag>) {
    const { t } = useLanguage();
    const next = { ...props } as Record<string, unknown>;
    for (const key of ["placeholder", "title", "aria-label", "alt"]) {
      if (typeof next[key] === "string") next[key] = t(next[key] as string);
    }
    if (tag === "option" && next.value === undefined && typeof next.children === "string") next.value = next.children;
    if ("children" in next) next.children = textChildren(next.children as ReactNode, t);
    return createElement(tag, next);
  }
  return LocalizedElement;
}
export const a = localized("a");
export const abbr = localized("abbr");
export const article = localized("article");
export const aside = localized("aside");
export const b = localized("b");
export const blockquote = localized("blockquote");
export const button = localized("button");
export const caption = localized("caption");
export const dd = localized("dd");
export const details = localized("details");
export const div = localized("div");
export const dt = localized("dt");
export const em = localized("em");
export const fieldset = localized("fieldset");
export const figcaption = localized("figcaption");
export const figure = localized("figure");
export const footer = localized("footer");
export const h1 = localized("h1");
export const h2 = localized("h2");
export const h3 = localized("h3");
export const h4 = localized("h4");
export const h5 = localized("h5");
export const h6 = localized("h6");
export const header = localized("header");
export const input = localized("input");
export const label = localized("label");
export const legend = localized("legend");
export const li = localized("li");
export const main = localized("main");
export const nav = localized("nav");
export const ol = localized("ol");
export const option = localized("option");
export const p = localized("p");
export const section = localized("section");
export const select = localized("select");
export const small = localized("small");
export const span = localized("span");
export const strong = localized("strong");
export const summary = localized("summary");
export const table = localized("table");
export const tbody = localized("tbody");
export const td = localized("td");
export const textarea = localized("textarea");
export const th = localized("th");
export const thead = localized("thead");
export const time = localized("time");
export const tr = localized("tr");
export const ul = localized("ul");
