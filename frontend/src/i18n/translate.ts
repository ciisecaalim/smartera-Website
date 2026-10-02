import messages from "./messages.json";
import sourceAliases from "./source-aliases.json";

export type Language = "en" | "so";
// Normalize typographic punctuation as well as whitespace so API text and JSX
// fragments can use the same translation without requiring duplicate entries.
const normalize = (text: string) => text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\u2026/g, "...").replace(/\s+/g, " ").trim();
const dictionary = new Map(Object.entries(messages).map(([en, so]) => [normalize(en), so]));
const reverse = new Map(Object.entries(messages).map(([en, so]) => [normalize(so), en]));
const aliases = new Map(Object.entries(sourceAliases).map(([source, en]) => [normalize(source), en]));
const folded = new Map([...dictionary.keys()].map(key => [key.toLowerCase(), key]));

function lookup(text: string, language: Language): string | undefined {
  const key = normalize(text);
  const english = dictionary.has(key) ? key : aliases.get(key) ?? reverse.get(key) ?? folded.get(key.toLowerCase());
  if (!english) return undefined;
  return language === "so" ? dictionary.get(normalize(english)) : english;
}

export function translate(text: string, language: Language): string {
  const key = normalize(text);
  if (!key) return text;
  let result = lookup(key, language);
  // Labels with required markers, punctuation, and counts share their base key.
  if (!result) {
    const label = key.match(/^(.*?)(\s*[:*])$/);
    if (label) { const value = lookup(label[1], language); if (value) result = value + label[2]; }
  }
  if (!result) {
    const count = key.match(/^(\d[\d,.+–-]*\s+)(.+)$/);
    if (count) { const value = lookup(count[2], language); if (value) result = count[1] + value; }
  }
  return result ? text.replace(text.trim(), result) : text;
}
