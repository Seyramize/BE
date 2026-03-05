export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { experiences } from "@/lib/experiences-data"
import {
  initializePaystackTransaction,
  generatePaystackReference,
} from "@/lib/paystack-server"

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
		const reference = generatePaystackReference()

		// Construct callback URL with reference parameter so page can fetch booking details
		const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book-experience/${experienceSlug}?session_id=${reference}`

		// Amount is already in GHS from frontend pricing
		const ghsAmount = Number(amount)

		// Initialize Paystack transaction with callback URL
		const paystackResponse = await initializePaystackTransaction({
			email,
			amount: ghsAmount,
			reference,
			callbackUrl,
			currency: "GHS",
			metadata: {
				originalUsdAmount: amount?.toString() || "",
				convertedGhsAmount: ghsAmount.toString(),
				amount: ghsAmount.toString(),
				email: email || "",
				experienceName: experienceName || "",
				experienceId: experienceId?.toString() || "",
				phone: phone || "",
				mobileMoneyProvider: mobileMoneyProvider || "",
				guests: guests?.toString() || "",
				preferredDate: preferredDate || "",
				alternateDate: alternateDate || "",
				fullName: fullName || "",
				isPricelessExperience: experience?.tags.includes("Priceless") ? "true" : "false",
			},
		})

		if (!paystackResponse.status) {
			throw new Error(paystackResponse.message)
		}

		return NextResponse.json({ url: paystackResponse.data?.authorization_url })
	} catch (err) {
		console.error("Paystack session creation error:", err)
		return NextResponse.json(
			{ error: "Payment initialization failed", details: err instanceof Error ? err.message : err },
			{ status: 500 }
		)
	}
} 