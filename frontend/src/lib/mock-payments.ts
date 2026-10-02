/**
 * Frontend-only payment simulator.
 * It is used when explicitly enabled or while no real Stripe publishable key exists.
 * The checkout labels this clearly and never creates or claims a real transaction.
 */
export function isMockPaymentMode(): boolean {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripeConfigured = Boolean(stripeKey && !stripeKey.includes("your_key_here"));
  return process.env.NEXT_PUBLIC_MOCK_PAYMENTS === "true" || !stripeConfigured;
}

export const MOCK_SUCCESS_CARD = "4242424242424242";
export const MOCK_DECLINED_CARD = "4000000000009995";
export const MOCK_AUTH_REQUIRED_CARD = "4000002500003155";
