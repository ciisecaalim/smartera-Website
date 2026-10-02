"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPaymentIntent } from "@/features/academics/services/payment.service";
import { isStripePublishableConfigured } from "@/lib/stripe";

export type CheckoutPaymentStatus =
  | "idle"
  | "loading"
  | "ready"
  | "unavailable"
  | "error";

type UseCheckoutPaymentOptions = {
  courseIds: string[];
  country: string;
  enabled: boolean;
};

/**
 * Loads a PaymentIntent client secret for Stripe Elements.
 * Client secret stays in memory only - never logged or persisted.
 */
export function useCheckoutPayment({ courseIds, country, enabled }: UseCheckoutPaymentOptions) {
  const [status, setStatus] = useState<CheckoutPaymentStatus>(() => {
    if (!enabled) return "idle";
    if (!isStripePublishableConfigured) return "unavailable";
    return "loading";
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(() =>
    enabled && !isStripePublishableConfigured
      ? "Stripe test payment is ready for backend connection."
      : null,
  );
  const requestIdRef = useRef(0);
  const countryRef = useRef(country);
  const courseIdsKey = courseIds.join("|");

  useEffect(() => {
    countryRef.current = country;
  }, [country]);

  const load = useCallback(async () => {
    if (!enabled) {
      setStatus("idle");
      setClientSecret(null);
      setError(null);
      return;
    }

    if (!isStripePublishableConfigured) {
      setClientSecret(null);
      setStatus("unavailable");
      setError("Stripe test payment is ready for backend connection.");
      return;
    }

    const ids = courseIdsKey ? courseIdsKey.split("|") : [];
    if (!ids.length) {
      setClientSecret(null);
      setStatus("unavailable");
      setError("Your cart is empty.");
      return;
    }

    const requestId = ++requestIdRef.current;
    setStatus("loading");
    setError(null);
    setClientSecret(null);

    const result = await createPaymentIntent({ courseIds: ids, country: countryRef.current });
    if (requestId !== requestIdRef.current) return;

    if (!result.ok) {
      setClientSecret(null);
      setError(result.error);
      setStatus(result.code === "not_configured" ? "unavailable" : "error");
      return;
    }

    setClientSecret(result.clientSecret);
    setStatus("ready");
  }, [courseIdsKey, enabled]);

  useEffect(() => {
    // Defer so status updates are not synchronous inside the effect body.
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => {
      window.clearTimeout(timer);
      requestIdRef.current += 1;
    };
  }, [load]);

  return {
    status,
    clientSecret,
    error,
    retry: load,
    isReady: status === "ready" && Boolean(clientSecret),
  };
}
