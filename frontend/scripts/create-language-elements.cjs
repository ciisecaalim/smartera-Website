const fs=require('fs'),path=require('path');
const tags='a abbr article aside b blockquote button caption dd details div dt em fieldset figcaption figure footer h1 h2 h3 h4 h5 h6 header input label legend li main nav ol option p section select small span strong summary table tbody td textarea th thead time tr ul'.split(' ');
const source=`"use client";
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
${tags.map(t=>`export const ${t} = localized("${t}");`).join('\n')}
`;
fs.writeFileSync(path.join(__dirname,'../src/i18n/elements.tsx'),source);
