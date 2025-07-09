import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { amount, email, experienceName, phone, mobileMoneyProvider, guests, preferredDate, alternateDate, fullName, experienceId, experienceSlug } = await req.json();

  // Supported payment methods
  const paymentMethods = ["card"];

  try {
    const success_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?session_id={CHECKOUT_SESSION_ID}`;
    const session = await stripe.checkout.sessions.create({
      // @ts-expect-error Stripe types do not include all supported payment methods
      payment_method_types: paymentMethods,
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: experienceName,
            },
            unit_amount: Math.round(amount * 100), // amount in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        amount: amount?.toString() || '',
        email: email || '',
        experienceName: experienceName || '',
        experienceId: experienceId?.toString() || '',
        phone: phone || '',
        mobileMoneyProvider: mobileMoneyProvider || '',
        guests: guests?.toString() || '',
        preferredDate: preferredDate || '',
        alternateDate: alternateDate || '',
        fullName: fullName || '',
      },
      success_url: success_url,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session creation error:", err);
    return NextResponse.json({ error: "Stripe session creation failed", details: err instanceof Error ? err.message : err }, { status: 500 });
  }
} 