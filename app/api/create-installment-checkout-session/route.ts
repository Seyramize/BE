import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    // Create or retrieve customer
    let customer: Stripe.Customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    })
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: fullName,
        phone: phone,
        metadata: {
          experienceId: experienceId,
          installmentCount: installmentCount.toString(),
          installmentInterval: installmentInterval.toString(),
        },
      })
    }

    // Create product for the experience
    const product = await stripe.products.create({
      name: `${experienceName} - Installment Plan`,
      description: `${installmentCount} installment payments for ${experienceName}`,
      metadata: {
        experienceId: experienceId,
        installmentCount: installmentCount.toString(),
        installmentInterval: installmentInterval.toString(),
      },
    })

    // Create price for each installment
    const installmentAmount = installmentTotal / installmentCount
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(installmentAmount * 100),
      currency: "usd",
      recurring: {
        interval: "month",
        interval_count: Math.ceil(installmentInterval / 30), // Convert days to months
      },
      metadata: {
        installmentAmount: installmentAmount.toString(),
        installmentCount: installmentCount.toString(),
      },
    })

    // Create subscription for installment payments
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
        payment_method_types: ["card"],
      },
      expand: ["latest_invoice.payment_intent"],
      // Enable Stripe-hosted email notifications
      collection_method: "charge_automatically",
      metadata: {
        experienceId: experienceId,
        experienceName: experienceName,
        installmentTotal: installmentTotal.toString(),
        installmentCount: installmentCount.toString(),
        installmentInterval: installmentInterval.toString(),
        guests: guests.toString(),
        fullName: fullName,
        phone: phone,
        isInstallmentPayment: "true",
      },
    })

    // Create Checkout Session for subscription setup
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        metadata: {
          experienceId: experienceId,
          experienceName: experienceName,
          installmentTotal: installmentTotal.toString(),
          installmentCount: installmentCount.toString(),
          installmentInterval: installmentInterval.toString(),
          guests: guests.toString(),
          fullName: fullName,
          phone: phone,
          isInstallmentPayment: "true",
        },
      },
      success_url,
      cancel_url,
      metadata: {
        subscriptionId: subscription.id,
        customerId: customer.id,
        experienceId: experienceId,
        experienceName: experienceName,
        installmentTotal: installmentTotal.toString(),
        installmentCount: installmentCount.toString(),
        installmentInterval: installmentInterval.toString(),
        guests: guests.toString(),
        fullName: fullName,
        phone: phone,
        isInstallmentPayment: "true",
        email: email,
      },
    })

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      subscriptionId: subscription.id,
      customerId: customer.id,
      type: "installment"
    })
  } catch (error) {
    console.error("Error creating installment checkout session:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error instanceof Error ? error.message : error },
      { status: 500 }
    )
  }
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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
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
