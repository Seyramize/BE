import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/mailtrap"
import {
  initializePaystackTransaction,
  generatePaystackReference,
} from "@/lib/paystack-server"

export const dynamic = "force-dynamic"

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
    const reference = generatePaystackReference()

    // Initialize Paystack transaction for the first installment or full amount
    const amountToCharge = paymentStyle === "Installment Payment" ? (installmentTotal || amount) / installmentCount : amount

    const paystackResponse = await initializePaystackTransaction({
      email,
      amount: amountToCharge,
      reference,
      metadata: {
        amount: amountToCharge.toString(),
        email: email || "",
        experienceName: experienceName || "",
        experienceId: experienceId?.toString() || "",
        phone: phone || "",
        guests: guests?.toString() || "",
        fullName: fullName || "",
        paymentStyle: paymentStyle || "",
        installmentTotal: installmentTotal?.toString() || "",
        installmentCount: installmentCount.toString(),
        installmentInterval: installmentInterval.toString(),
        isInstallmentPayment: paymentStyle === "Installment Payment" ? "true" : "false",
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
