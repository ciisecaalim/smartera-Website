import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCoursesByIds } from "@/features/academics/services/course.service";

export const runtime = "nodejs";

type CreateIntentBody = {
  courseIds?: string[];
  country?: string;
};

/**
 * Creates a Stripe PaymentIntent for Academics checkout (test or live via secret key).
 * Amount is calculated server-side from course catalog data - client amounts are ignored.
 *
 * Temporary Next.js bridge until a Spring Boot PaymentIntent endpoint replaces this route.
 */
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json(
      {
        code: "not_configured",
        error: "Stripe payment is waiting for backend connection.",
      },
      { status: 503 },
    );
  }

  if (secretKey.startsWith("pk_")) {
    return NextResponse.json(
      {
        code: "not_configured",
        error: "Secure payment is temporarily unavailable.",
      },
      { status: 500 },
    );
  }

  let body: CreateIntentBody;
  try {
    body = (await request.json()) as CreateIntentBody;
  } catch {
    return NextResponse.json({ code: "unknown", error: "Invalid request." }, { status: 400 });
  }

  const courseIds = Array.isArray(body.courseIds)
    ? Array.from(new Set(body.courseIds.filter((id): id is string => typeof id === "string" && id.length > 0)))
    : [];

  if (!courseIds.length) {
    return NextResponse.json({ code: "empty_cart", error: "Your cart is empty." }, { status: 400 });
  }

  const courses = getCoursesByIds(courseIds);
  if (courses.length !== courseIds.length) {
    return NextResponse.json(
      { code: "invalid_courses", error: "One or more courses are no longer available." },
      { status: 400 },
    );
  }

  const amountCents = courses.reduce((sum, course) => sum + Math.round(course.price * 100), 0);
  if (amountCents <= 0) {
    return NextResponse.json(
      {
        code: "free_checkout",
        error: "These courses are free and do not require Stripe payment.",
      },
      { status: 400 },
    );
  }

  try {
    const stripe = new Stripe(secretKey);
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amountCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          courseIds: courseIds.join(","),
          country: typeof body.country === "string" ? body.country.slice(0, 64) : "",
          source: "academics-checkout",
        },
      },
      {
        // Unique per request so abandoned checkouts do not reuse a settled intent.
        idempotencyKey: `academics-pi-${crypto.randomUUID()}`,
      },
    );

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { code: "unknown", error: "We couldn't initialize the payment form." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch {
    return NextResponse.json(
      {
        code: "unknown",
        error: "We couldn't initialize the payment form.",
      },
      { status: 502 },
    );
  }
}
