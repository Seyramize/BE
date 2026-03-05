import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/mailtrap"
import {
  verifyPaystackWebhookSignature,
  verifyPaystackTransaction,
} from "@/lib/paystack-server"
import {
  scheduleInstallmentPayments,
  getInstallmentPaymentStatus,
} from "@/lib/payment-scheduler"

// Mailtrap template UUIDs
const USER_CONFIRMATION_TEMPLATE_ID = "27ffbc93-4c12-4664-9ddc-494bbc77e155";
const INTERNAL_TEAM_TEMPLATE_ID = "40519514-3eb4-402f-acfa-a438de284abc";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-paystack-signature") || ""

    // Verify webhook signature
    if (!verifyPaystackWebhookSignature(body, signature)) {
      console.error("Webhook signature verification failed")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        await handleChargeSuccess(event.data)
        break

      case "charge.failed":
        await handleChargeFailed(event.data)
        break

      default:
        console.log(`Unhandled event type: ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

async function handleChargeSuccess(data: any) {
  console.log("Processing successful charge:", data.reference)

  try {
    const reference = data.reference
    const amount = data.amount / 100 // Convert from subunit (pesewa) to main currency (GHS)
    const currency = 'GHS'
    const metadata = data.metadata || {}

    // Verify transaction with Paystack to ensure it's legitimate
    const verification = await verifyPaystackTransaction(reference)

    if (!verification.status || verification.data?.status !== "success") {
      console.error("Transaction verification failed:", reference)
      return
    }

    const isInstallmentPayment = metadata.isInstallmentPayment === "true"

    if (isInstallmentPayment) {
      // Handle installment payment setup
      await setupInstallmentPayments({
        reference,
        amount,
        metadata,
        currency,
      })
    } else {
      // Handle regular one-time payment
      await handleRegularPayment({
        reference,
        amount,
        metadata,
        currency,
      })
    }
  } catch (error) {
    console.error("Error handling charge success:", error)
  }
}

async function handleChargeFailed(data: any) {
  console.log("Processing failed charge:", data.reference)

  try {
    const reference = data.reference
    const metadata = data.metadata || {}

    // Send failure notification
    if (metadata.email) {
      await sendEmail({
        to: metadata.email,
        templateUuid: "YOUR_PAYMENT_FAILURE_TEMPLATE_UUID",
        templateVariables: {
          fullName: metadata.fullName || "Valued Guest",
          experienceName: metadata.experienceName || "Your Experience",
          amount: metadata.amount || "0",
          reference: reference,
          failureReason: "Payment processing failed. Please try again.",
        },
      })
    }

    // Notify team
    const teamEmails = [
      "ronnie@beyondaccra.com",
      "priscilla@beyondaccra.com",
      "concierge@experiencesbybeyond.com",
    ]

    for (const teamEmail of teamEmails) {
      await sendEmail({
        to: teamEmail,
        templateUuid: "YOUR_PAYMENT_FAILURE_TEAM_TEMPLATE_UUID",
        templateVariables: {
          fullName: metadata.fullName || "Unknown",
          email: metadata.email || "Unknown",
          experienceName: metadata.experienceName || "Unknown",
          amount: metadata.amount || "0",
          reference: reference,
          bookingType: "Payment Failed",
        },
      })
    }
  } catch (error) {
    console.error("Error handling charge failed:", error)
  }
}

async function setupInstallmentPayments({
  reference,
  amount,
  metadata,
  currency = 'USD',
}: {
  reference: string
  amount: number
  metadata: any
  currency?: string
}) {
  console.log("Setting up installment payments for reference:", reference)

  const currencySymbol = currency === 'USD' ? '$' : currency === 'NGN' ? '₦' : currency === 'GHS' ? '₵' : currency

  try {
    const installmentCount = parseInt(metadata.installmentCount || "3")
    const installmentInterval = parseInt(metadata.installmentInterval || "30")
    const installmentTotal = parseFloat(metadata.installmentTotal || "0")

    // Create installment schedule
    const schedule = {
      bookingId: reference,
      sessionId: reference,
      customerEmail: metadata.email || "",
      customerName: metadata.fullName || "",
      experienceName: metadata.experienceName || "",
      installmentTotal: installmentTotal || amount * installmentCount,
      installmentCount: installmentCount,
      installmentInterval: installmentInterval,
    }

    // Send group booking confirmation email for installment payments
    await sendEmail({
      to: metadata.email,
      templateUuid: "YOUR_GROUP_BOOKING_INSTALLMENT_TEMPLATE_UUID",
      templateVariables: {
        customerName: metadata.fullName,
        experienceName: metadata.experienceName,
        installmentTotal: `${currencySymbol}${schedule.installmentTotal.toFixed(2)}`,
        installmentCount: installmentCount,
        installmentAmount: `${currencySymbol}${(schedule.installmentTotal / installmentCount).toFixed(2)}`,
        firstPaymentAmount: `${currencySymbol}${amount.toFixed(2)}`,
        reference: reference,
      },
    })

    // Notify team
    const teamEmails = [
      "ronnie@beyondaccra.com",
      "priscilla@beyondaccra.com",
      "concierge@experiencesbybeyond.com",
    ]

    for (const teamEmail of teamEmails) {
      await sendEmail({
        to: teamEmail,
        templateUuid: "YOUR_GROUP_BOOKING_INSTALLMENT_TEAM_TEMPLATE_UUID",
        templateVariables: {
          fullName: metadata.fullName,
          email: metadata.email,
          experienceName: metadata.experienceName,
          installmentTotal: `${currencySymbol}${schedule.installmentTotal.toFixed(2)}`,
          installmentCount: installmentCount,
          reference: reference,
          bookingType: "Installment Booking",
        },
      })
    }

    // Schedule future installment payments
    await scheduleInstallmentPayments(schedule)

    console.log(
      `Scheduled ${installmentCount - 1} future installment payments`
    )
  } catch (error) {
    console.error("Error setting up installment payments:", error)
  }
}

async function handleRegularPayment({
  reference,
  amount,
  metadata,
  currency = 'USD',
}: {
  reference: string
  amount: number
  metadata: any
  currency?: string
}) {
  console.log("Handling regular payment for reference:", reference)

  const currencySymbol = currency === 'USD' ? '$' : currency === 'NGN' ? '₦' : currency === 'GHS' ? '₵' : currency

  try {
    // Send customer confirmation
    if (metadata.email) {
      await sendEmail({
        to: metadata.email,
        templateUuid: USER_CONFIRMATION_TEMPLATE_ID,
        templateVariables: {
          fullName: metadata.fullName,
          experienceName: metadata.experienceName,
          guests: metadata.guests,
          amount: `${currencySymbol}${amount.toFixed(2)}`,
          reference: reference,
          preferredDate: metadata.preferredDate || 'TBD',
          alternateDate: metadata.alternateDate || 'TBD',
        },
      })
    }

    // Send team notification about completed booking
    const teamEmails = [
      "ronnie@beyondaccra.com",
      "priscilla@beyondaccra.com",
      "concierge@experiencesbybeyond.com",
    ]

    for (const teamEmail of teamEmails) {
      await sendEmail({
        to: teamEmail,
        templateUuid: INTERNAL_TEAM_TEMPLATE_ID,
        templateVariables: {
          experienceName: metadata.experienceName,
          fullName: metadata.fullName,
          email: metadata.email,
          phone: metadata.phone,
          guests: metadata.guests,
          preferredDate: metadata.preferredDate || "TBD",
          alternateDate: metadata.alternateDate || "TBD",
          amount: `₦${amount.toFixed(2)}`,
          paymentMethod: metadata.mobileMoneyProvider || metadata.paymentChannel || 'Bank Transfer',
          reference: reference,
          bookingType: "Regular Booking - Payment Completed",
          paymentStatus: "Completed",
        },
      })
    }
  } catch (error) {
    console.error("Error handling regular payment:", error)
  }
}
