import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const {
    amount,
    email,
    experienceName,
    phone,
    guests,
    fullName,
    experienceId,
    experienceSlug,
    paymentStyle,
    installmentTotal,
    installmentCount = 3,
    installmentInterval = 30, // days
  } = await req.json()

  try {
    const success_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?session_id={CHECKOUT_SESSION_ID}&installment=true`
    const cancel_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?cancel=1`

    if (paymentStyle === "Installment Payment") {
      // Create installment payment plan
      return await createInstallmentCheckoutSession({
        amount,
        email,
        experienceName,
        phone,
        guests,
        fullName,
        experienceId,
        experienceSlug,
        installmentTotal,
        installmentCount,
        installmentInterval,
        success_url,
        cancel_url,
      })
    } else {
      // Create regular one-time payment
      return await createRegularCheckoutSession({
        amount,
        email,
        experienceName,
        phone,
        guests,
        fullName,
        experienceId,
        experienceSlug,
        success_url,
        cancel_url,
      })
    }
  } catch (err) {
    console.error("Checkout session creation error:", err)
    return NextResponse.json(
      { error: "Checkout session creation failed", details: err instanceof Error ? err.message : err },
      { status: 500 }
    )
  }
}

async function createInstallmentCheckoutSession({
  amount,
  email,
  experienceName,
  phone,
  guests,
  fullName,
  experienceId,
  experienceSlug,
  installmentTotal,
  installmentCount,
  installmentInterval,
  success_url,
  cancel_url,
}: {
  amount: number
  email: string
  experienceName: string
  phone: string
  guests: number
  fullName: string
  experienceId: string
  experienceSlug: string
  installmentTotal: number
  installmentCount: number
  installmentInterval: number
  success_url: string
  cancel_url: string
}) {
  // Create Stripe Checkout Session for first installment
  const sessionOptions: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${experienceName} - First Installment (${installmentCount} payments)`,
            description: `First payment of ${installmentCount} installments for ${experienceName}`,
          },
          unit_amount: Math.round(amount * 100), // First installment amount
        },
        quantity: 1,
      },
    ],
    metadata: {
      amount: amount.toString(),
      email: email,
      experienceName: experienceName,
      experienceId: experienceId,
      phone: phone,
      guests: guests.toString(),
      fullName: fullName,
      isInstallmentPayment: "true",
      installmentTotal: installmentTotal.toString(),
      installmentCount: installmentCount.toString(),
      installmentInterval: installmentInterval.toString(),
      installmentNumber: "1",
    },
    success_url,
    cancel_url,
    // Enable saving payment method for future installments
    payment_intent_data: {
      setup_future_usage: "off_session",
    },
  }

  const session = await stripe.checkout.sessions.create(sessionOptions)

  return NextResponse.json({ 
    url: session.url,
    sessionId: session.id,
    type: "installment"
  })
}

async function createRegularCheckoutSession({
  amount,
  email,
  experienceName,
  phone,
  guests,
  fullName,
  experienceId,
  experienceSlug,
  success_url,
  cancel_url,
}: {
  amount: number
  email: string
  experienceName: string
  phone: string
  guests: number
  fullName: string
  experienceId: string
  experienceSlug: string
  success_url: string
  cancel_url: string
}) {
  // Create regular one-time payment session
  const sessionOptions: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: experienceName,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      amount: amount.toString(),
      email: email,
      experienceName: experienceName,
      experienceId: experienceId,
      phone: phone,
      guests: guests.toString(),
      fullName: fullName,
      isInstallmentPayment: "false",
    },
    success_url,
    cancel_url,
  }

  const session = await stripe.checkout.sessions.create(sessionOptions)

  return NextResponse.json({ 
    url: session.url,
    sessionId: session.id,
    type: "regular"
  })
}
