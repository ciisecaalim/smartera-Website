export type CreatePaymentIntentRequest = {
  courseIds: string[];
  country?: string;
};

export type CreatePaymentIntentSuccess = {
  clientSecret: string;
  paymentIntentId?: string;
};

export type CreatePaymentIntentFailure = {
  error: string;
  code?: "not_configured" | "empty_cart" | "invalid_courses" | "already_owned" | "free_checkout" | "network" | "unknown";
};

export type CreatePaymentIntentResult =
  | ({ ok: true } & CreatePaymentIntentSuccess)
  | ({ ok: false } & CreatePaymentIntentFailure);

/**
 * Requests a Stripe PaymentIntent client secret from the application server.
 * Sends course identifiers only - never a client-trusted amount.
 */
export async function createPaymentIntent(
  input: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResult> {
  try {
    const response = await fetch("/api/academics/payments/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseIds: input.courseIds,
        country: input.country,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      clientSecret?: string;
      paymentIntentId?: string;
      error?: string;
      code?: CreatePaymentIntentFailure["code"];
    };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || "We couldn't initialize the payment form.",
        code: data.code ?? "unknown",
      };
    }

    if (!data.clientSecret || typeof data.clientSecret !== "string") {
      return {
        ok: false,
        error: "Secure payment is temporarily unavailable.",
        code: "not_configured",
      };
    }

    return {
      ok: true,
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
    };
  } catch {
    return {
      ok: false,
      error: "We couldn't connect to the payment service. Please try again.",
      code: "network",
    };
  }
}
