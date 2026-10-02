/** Remove editorial seed-data markers from public copy without changing stored records. */
export function cleanPublicCopy(value: string): string {
  return value
    .replace(/\s*[([]\s*(?:samples?|demo|placeholder)(?:\s+data)?\s*[)\]]/gi, "")
    .replace(/\bWebsite sample data:\s*/gi, "")
    .replace(/\s*Prepared for administrator review\.?/gi, "")
    .trim();
}
