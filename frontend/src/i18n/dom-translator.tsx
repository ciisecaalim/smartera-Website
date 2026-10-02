"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { translate, type Language } from "./translate";

const ATTRIBUTES = ["title", "aria-label", "placeholder", "alt"] as const;
const SKIP = 'script, style, noscript, svg, code, pre, textarea, [data-no-translate], [translate="no"], [contenteditable]:not([contenteditable="false"])';
type Source = { original: string; rendered: string };

export function DomTranslator({ language }: { language: Language }) {
  const pathname = usePathname();
  const textSources = useRef(new WeakMap<Text, Source>());
  const attrSources = useRef(new WeakMap<Element, Map<string, Source>>());
  const hasAppliedSomali = useRef(false);

  useEffect(() => {
    // English is rendered by the server and is the default language. Do not
    // mutate the DOM during that first hydration pass: changing attributes
    // such as image alt text before React hydrates causes a mismatch warning.
    // Once Somali has been selected, this effect also restores English when
    // the visitor switches back.
    if (language === "en" && !hasAppliedSomali.current) return;
    if (language === "so") hasAppliedSomali.current = true;

    // Remember source text independently of translated output. This allows exact
    // restoration when several English phrases share the same Somali translation.
    const sources = textSources.current;
    const attributeSources = attrSources.current;
    let frame = 0;
    const observer = new MutationObserver(() => schedule());
    const observe = () => observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: [...ATTRIBUTES, "data-no-translate", "translate"],
    });
    const run = () => {
      observer.disconnect();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (!parent || parent.closest(SKIP)) continue;
        const current = textNode.nodeValue ?? "";
        if (!current.trim()) continue;
        let source = sources.get(textNode);
        if (!source || current !== source.rendered) source = { original: current, rendered: current };
        // Translating an option's label must never change its submitted value.
        if (parent.tagName === "OPTION" && !parent.hasAttribute("value")) {
          parent.setAttribute("value", parent.textContent ?? "");
        }
        source.rendered = translate(source.original, language);
        sources.set(textNode, source);
        if (current !== source.rendered) textNode.nodeValue = source.rendered;
      }
      for (const element of document.body.querySelectorAll<HTMLElement>("[title], [aria-label], [placeholder], [alt]")) {
        if (element.closest(SKIP)) continue;
        let sourcesForElement = attributeSources.get(element);
        if (!sourcesForElement) { sourcesForElement = new Map(); attributeSources.set(element, sourcesForElement); }
        for (const attribute of ATTRIBUTES) {
          const current = element.getAttribute(attribute);
          if (!current) continue;
          let source = sourcesForElement.get(attribute);
          if (!source || current !== source.rendered) source = { original: current, rendered: current };
          source.rendered = translate(source.original, language);
          sourcesForElement.set(attribute, source);
          if (current !== source.rendered) element.setAttribute(attribute, source.rendered);
        }
      }
      observe();
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    };
    schedule();
    observe();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [language, pathname]);

  return null;
}
