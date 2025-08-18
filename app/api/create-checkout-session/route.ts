import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { experiences } from "@/lib/experiences-data"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
	const {
		amount,
		email,
		experienceName,
		phone,
		mobileMoneyProvider,
		guests,
		preferredDate,
		alternateDate,
		fullName,
		experienceId,
		experienceSlug,
	} = await req.json()

	const experience = experiences.find(exp => exp.id.toString() === experienceId)

	try {
		const success_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?session_id={CHECKOUT_SESSION_ID}`

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
				amount: amount?.toString() || "",
				email: email || "",
				experienceName: experienceName || "",
				experienceId: experienceId?.toString() || "",
				phone: phone || "",
				mobileMoneyProvider: mobileMoneyProvider || "",
				guests: guests?.toString() || "",
				preferredDate: preferredDate || "",
				alternateDate: alternateDate || "",
				fullName: fullName || "",
			},
			success_url,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?cancel=1`,
		}

		if (experience && experience.tags.includes("Priceless")) {
			sessionOptions.payment_intent_data = {
				metadata: {
					restrict_to_mastercard: "true",
					experience_id: experienceId?.toString() || "",
					experience_slug: experienceSlug || "",
				},
			}
		}

		// Note: Mastercard-only restriction removed to avoid Stripe API error.
		// Enforce Mastercard-only post-payment via webhook or session validation.

		const session = await stripe.checkout.sessions.create(sessionOptions)

		return NextResponse.json({ url: session.url })
	} catch (err) {
		console.error("Stripe session creation error:", err)
		return NextResponse.json(
			{ error: "Stripe session creation failed", details: err instanceof Error ? err.message : err },
			{ status: 500 }
		)
	}
} 