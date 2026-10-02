"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import { LockIcon } from "@/features/academics/components/icons";

type StripePaymentFormProps = {
  payLabel: string;
  formId: string;
  onProcessingChange?: (processing: boolean) => void;
};

/** Stripe Payment Element + confirmPayment. Does not grant enrollment on its own. */
export function StripePaymentForm({ payLabel, formId, onProcessingChange }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    onProcessingChange?.(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Please check your payment details and try again.");
      setProcessing(false);
      onProcessingChange?.(false);
      return;
    }

    const returnUrl = `${window.location.origin}/academics/payment/result`;
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    // confirmPayment redirects on success; reaching here means an immediate error.
    if (confirmError) {
      setError(
        confirmError.message ||
          "Your payment could not be completed. Please check your payment details and try again.",
      );
      setProcessing(false);
      onProcessingChange?.(false);
    }
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {error ? (
        <p role="alert" className="text-sm text-[#B42318]">
          {error}
        </p>
      ) : null}

      {/* Mobile-friendly duplicate CTA; desktop summary uses form={formId}. */}
      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
      >
        <LockIcon className="h-4 w-4" />
        {processing ? "Processing payment..." : payLabel}
      </button>
    </form>
  );
}


