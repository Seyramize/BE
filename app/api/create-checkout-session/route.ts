export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { experiences } from "@/lib/experiences-data"
import { sendEmail } from "@/lib/mailtrap"

export async function POST(req: NextRequest) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
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
		const cancel_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?cancel=1`
		const mastercard_bounce_url = `${process.env.NEXT_PUBLIC_BASE_URL}/book-experience/${experienceSlug}?mastercard-bounce=1`

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
			cancel_url: cancel_url,
		}

		if (experience && experience.tags.includes("Priceless")) {
			sessionOptions.payment_intent_data = {
				metadata: {
					is_priceless_experience: "true",
				},
			}
			sessionOptions.cancel_url = mastercard_bounce_url
		}

		const session = await stripe.checkout.sessions.create(sessionOptions)

		// Send team notification about new booking attempt
		try {
			const teamEmails = [
				'ronnie@beyondaccra.com',
				'priscilla@beyondaccra.com',
				'concierge@experiencesbybeyond.com'
			];

			for (const teamEmail of teamEmails) {
				await sendEmail({
					to: teamEmail,
					templateUuid: "YOUR_BOOKING_ATTEMPT_TEAM_TEMPLATE_UUID", // TODO: Replace with actual Mailtrap template UUID
					templateVariables: {
						experienceName: experienceName || "Unknown Experience",
						fullName: fullName || "Not provided",
						email: email || "Not provided",
						phone: phone || "Not provided",
						guests: guests?.toString() || "Not provided",
						preferredDate: preferredDate || "Not provided",
						alternateDate: alternateDate || "Not provided",
						amount: amount?.toString() || "Not provided",
						sessionId: session.id,
						bookingType: "Regular Booking",
					},
				});
			}
		} catch (emailError) {
			console.error('Error sending team notification for booking attempt:', emailError);
			// Don't fail the request if email fails
		}

		return NextResponse.json({ url: session.url })
	} catch (err) {
		console.error("Stripe session creation error:", err)
		return NextResponse.json(
			{ error: "Stripe session creation failed", details: err instanceof Error ? err.message : err },
			{ status: 500 }
		)
	}
} 