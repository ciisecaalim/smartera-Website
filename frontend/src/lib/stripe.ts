import { loadStripe, type Stripe } from "@stripe/stripe-js";

/**
 * Centralized Stripe.js loader.
 * Only the publishable key may be used in the browser - never a secret key.
 */
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";

export const isStripePublishableConfigured = Boolean(publishableKey);
export const isStripeTestMode = publishableKey.startsWith("pk_test_");

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripePromise(): Promise<Stripe | null> | null {
  if (!publishableKey) return null;
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

/** Appearance aligned with Smartera Hub checkout (navy text, blue focus). */
export const stripeElementsAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#1B519F",
    colorBackground: "#ffffff",
    colorText: "#0B1F3A",
    colorDanger: "#B42318",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    borderRadius: "8px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #D0D5DD",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #1B519F",
      boxShadow: "0 0 0 1px #1B519F",
    },
  },
};


