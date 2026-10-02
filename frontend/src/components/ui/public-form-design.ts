/**
 * Shared visual contract for public request and application forms.
 * Keep opportunity forms aligned by consuming these tokens instead of
 * introducing feature-specific colors, spacing, or control shapes.
 */
export const publicFormDesign = {
  shell:
    "overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(8,43,87,.08)] lg:grid lg:grid-cols-[.72fr_1.28fr]",
  informationPanel:
    "relative overflow-hidden bg-[#071D3D] p-7 text-white sm:p-9 lg:p-10",
  formPanel: "bg-white p-6 sm:p-8 lg:p-10",
  input:
    "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10",
  textarea:
    "mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10",
  label: "text-xs font-bold text-[#1B519F]",
  eyebrow:
    "text-xs font-black uppercase tracking-[.18em] text-[#F59223]",
  heading: "mt-2 text-2xl font-black text-[#1B519F]",
  description: "mt-3 text-sm leading-6 text-slate-500",
  selected:
    "mt-6 rounded-xl border border-blue-100 bg-[#F5F9FF] p-4",
  primaryButton:
    "mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#F59223] px-6 text-sm font-black text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#e0841c] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none",
} as const;
