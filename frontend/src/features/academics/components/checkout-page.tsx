"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useId, useMemo, useState } from "react";
import { ChevronIcon, GlobeIcon, LockIcon } from "@/features/academics/components/icons";
import {
  getCheckoutPaymentFormId,
  StripePaymentSection,
} from "@/features/academics/components/stripe-payment-section";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { useCheckoutPayment } from "@/features/academics/hooks/use-checkout-payment";
import {
  calculateCartTotals,
  formatMoney,
  getCartCourses,
  initializeCheckoutPayment,
} from "@/features/academics/services/cart.service";
import { formatPrice } from "@/features/academics/services/course.service";
import { isMockPaymentMode } from "@/lib/mock-payments";

const COUNTRIES = [
  "Somalia",
  "Kenya",
  "Ethiopia",
  "Djibouti",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Other",
] as const;

/**
 * Checkout UI for Academics (Udemy-style two-column layout, Smartera branding).
 * Paid checkout uses Stripe Payment Element when a PaymentIntent client secret is available.
 */
export function CheckoutPageClient() {
  const router = useRouter();
  const { state, hydrated, enrollCourses, isEnrolled } = useAcademicsStore();
  const [country, setCountry] = useState<string>("Somalia");
  const [freeSubmitting, setFreeSubmitting] = useState(false);
  const [stripeProcessing, setStripeProcessing] = useState(false);
  const [freeError, setFreeError] = useState<string | null>(null);
  const countryId = useId();
  const errorId = useId();

  const courses = useMemo(() => getCartCourses(state.cartIds), [state.cartIds]);
  const purchasable = useMemo(
    () => courses.filter((course) => !state.enrolledIds.includes(course.id)),
    [courses, state.enrolledIds],
  );
  const ownedInCart = useMemo(
    () => courses.filter((course) => state.enrolledIds.includes(course.id)),
    [courses, state.enrolledIds],
  );
  const totals = calculateCartTotals(purchasable);
  const allFree = purchasable.length > 0 && purchasable.every((course) => course.price <= 0);
  const courseIdsKey = purchasable.map((course) => course.id).join("|");
  const courseIds = useMemo(
    () => (courseIdsKey ? courseIdsKey.split("|") : []),
    [courseIdsKey],
  );

  const mockMode = isMockPaymentMode();
  const payment = useCheckoutPayment({
    courseIds,
    country,
    // Skip PaymentIntent fetch while the frontend mock simulator is active.
    enabled: hydrated && !allFree && purchasable.length > 0 && !mockMode,
  });

  const handleMockPaymentSuccess = useCallback(() => {
    // Local UX only: unlock purchased demo courses so My Learning matches post-checkout flow.
    enrollCourses(courseIds);
  }, [courseIds, enrollCourses]);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10" aria-busy="true" aria-label="Loading checkout">
        <div className="h-10 w-48 animate-pulse rounded bg-slate-100" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="h-80 animate-pulse rounded bg-slate-100" />
          <div className="h-72 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!state.cartIds.length) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-[#2D2F31]">Your cart is empty</h1>
        <p className="mt-3 text-slate-500">Add a course before starting checkout.</p>
        <Link
          href="/academics"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white hover:bg-[#174783]"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  if (!purchasable.length && ownedInCart.length) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-[#2D2F31]">You already own these courses</h1>
        <p className="mt-3 text-slate-500">Remove them from your cart or continue learning.</p>
        <Link
          href="/academics/my-learning"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white hover:bg-[#174783]"
        >
          Go to My Learning
        </Link>
      </div>
    );
  }

  async function handleFreeEnroll() {
    if (freeSubmitting) return;
    setFreeSubmitting(true);
    setFreeError(null);

    const result = initializeCheckoutPayment({
      cartIds: purchasable.map((course) => course.id),
      enrolledIds: state.enrolledIds,
    });

    if (result.status === "already_owned") {
      setFreeError("You already own the selected course(s).");
      setFreeSubmitting(false);
      return;
    }

    if (result.status === "free_enroll") {
      enrollCourses(result.courseIds);
      router.push("/academics/order/success?type=free");
      return;
    }

    setFreeError(result.message);
    setFreeSubmitting(false);
  }

  const payLabel = allFree ? "Enroll for Free" : `Pay ${formatMoney(totals.currentSubtotal)}`;
  const paymentFormId = getCheckoutPaymentFormId(mockMode);
  const paymentReady = !allFree && (mockMode || payment.isReady);
  const summaryError = allFree
    ? freeError
    : !mockMode && payment.status === "error"
      ? payment.error
      : null;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.9fr)] lg:items-start lg:gap-12 lg:px-6 lg:py-10">
      <div className="min-w-0 space-y-10">
        <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#2D2F31]">Checkout</h1>

        <section>
          <h2 className="text-lg font-bold text-[#2D2F31]">Billing address</h2>
          <label htmlFor={countryId} className="mt-4 block text-sm font-bold text-[#2D2F31]">
            Country
          </label>
          <div className="relative mt-2 max-w-md">
            <GlobeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#6A6F73]" />
            <select
              id={countryId}
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="w-full appearance-none rounded-md border border-[#1C1D1F] bg-white py-3 pl-10 pr-10 text-sm text-[#2D2F31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              {COUNTRIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D2F31]" />
          </div>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#6A6F73]">
            Smartera Hub is required by law to collect applicable transaction taxes for purchases made in
            certain tax jurisdictions.
          </p>
        </section>

        {allFree ? (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-[#2D2F31]">Payment method</h2>
              <p className="inline-flex items-center gap-1.5 text-sm text-[#6A6F73]">
                <LockIcon className="h-3.5 w-3.5" />
                Secure and encrypted
              </p>
            </div>
            <div className="mt-4 rounded border border-[#d1d7dc] bg-[#F7F9FA] p-4 text-sm text-[#6A6F73]">
              These courses are free. No payment method is required.
            </div>
          </section>
        ) : (
          <StripePaymentSection
            status={payment.status}
            clientSecret={payment.clientSecret}
            error={payment.error}
            payLabel={payLabel}
            onRetry={payment.retry}
            onProcessingChange={setStripeProcessing}
            mockMode={mockMode}
            onMockSuccess={handleMockPaymentSuccess}
          />
        )}

        <section>
          <h2 className="text-lg font-bold text-[#2D2F31]">
            Order details ({purchasable.length} {purchasable.length === 1 ? "course" : "courses"})
          </h2>
          <ul className="mt-5 divide-y divide-[#d1d7dc] border-t border-[#d1d7dc]">
            {purchasable.map((course) => (
              <li key={course.id} className="flex items-start gap-4 py-4">
                <div className="relative aspect-video w-[72px] shrink-0 overflow-hidden bg-slate-100 sm:w-20">
                  <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-[#2D2F31]">{course.title}</p>
                  {isEnrolled(course.id) ? (
                    <p className="mt-1 text-xs font-semibold text-emerald-600">You already own this course.</p>
                  ) : null}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-base font-bold text-[#2D2F31]">{formatPrice(course.price)}</p>
                  {course.originalPrice && course.originalPrice > course.price ? (
                    <p className="mt-0.5 text-sm text-[#6A6F73] line-through">
                      {formatPrice(course.originalPrice)}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          {ownedInCart.length ? (
            <p className="mt-3 text-sm text-amber-700">
              {ownedInCart.length} course{ownedInCart.length === 1 ? "" : "s"} in your cart are already owned
              and excluded from this total.
            </p>
          ) : null}
        </section>
      </div>

      <aside className="h-fit bg-[#F7F9FA] p-6 lg:sticky lg:top-8 lg:p-8">
        <h2 className="text-lg font-bold text-[#2D2F31]">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[#2D2F31]">Original Price:</dt>
            <dd className="text-[#2D2F31]">{formatMoney(totals.originalSubtotal)}</dd>
          </div>
          {totals.discountAmount > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#2D2F31]">Discounts ({totals.discountPercentage}% Off):</dt>
              <dd className="text-[#2D2F31]">-{formatMoney(totals.discountAmount)}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#d1d7dc] pt-4">
          <p className="text-base font-bold text-[#2D2F31]">
            Total ({totals.itemCount} {totals.itemCount === 1 ? "course" : "courses"}):
          </p>
          <p className="text-2xl font-bold text-[#2D2F31]">{formatMoney(totals.currentSubtotal)}</p>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[#6A6F73]">
          By completing your purchase, you agree to these{" "}
          <Link href="/terms-and-conditions" className="font-bold text-[#1B519F] underline-offset-2 hover:underline">
            Terms of Use
          </Link>
          .
        </p>

        {allFree ? (
          <button
            type="button"
            onClick={handleFreeEnroll}
            disabled={freeSubmitting || !purchasable.length}
            aria-describedby={summaryError ? errorId : undefined}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#1B519F] px-4 text-base font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {freeSubmitting ? "Processing..." : payLabel}
          </button>
        ) : (
          <button
            type="submit"
            form={paymentFormId}
            disabled={!paymentReady || stripeProcessing}
            aria-describedby={summaryError ? errorId : undefined}
            className="mt-4 hidden min-h-12 w-full items-center justify-center gap-2 bg-[#1B519F] px-4 text-base font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] disabled:cursor-not-allowed disabled:opacity-60 lg:inline-flex"
          >
            {stripeProcessing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Processing...
              </>
            ) : (
              <>
                <LockIcon className="h-4 w-4" />
                {payLabel}
              </>
            )}
          </button>
        )}

        {summaryError ? (
          <p id={errorId} role="alert" className="mt-3 text-sm text-[#B42318]">
            {summaryError}
          </p>
        ) : null}

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-[#2D2F31]">30-Day Money-Back Guarantee</p>
          <p className="mt-2 text-xs leading-relaxed text-[#6A6F73]">
            Not satisfied? Get a full refund within 30 days. Simple and straightforward!
          </p>
        </div>
      </aside>
    </div>
  );
}

