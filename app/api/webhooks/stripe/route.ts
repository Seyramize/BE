import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import sgMail from "@sendgrid/mail"
import { 
  scheduleInstallmentPayments, 
  getInstallmentPaymentById, 
  updateInstallmentPaymentStatus,
  getInstallmentPaymentStatus 
} from "@/lib/payment-scheduler"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// Email template IDs for installment notifications
const INSTALLMENT_PAYMENT_TEMPLATE_ID = "d-installment-payment-template" // You'll need to create this
const INSTALLMENT_COMPLETION_TEMPLATE_ID = "d-installment-completion-template" // You'll need to create this
const INTERNAL_INSTALLMENT_TEMPLATE_ID = "d-internal-installment-template" // You'll need to create this

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
      
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout session completed:", session.id)
  
  // Extract metadata
  const metadata = session.metadata || {}
  const isInstallmentPayment = metadata.isInstallmentPayment === "true"
  
  if (isInstallmentPayment) {
    // Handle installment payment setup
    await setupInstallmentPayments(session)
  } else {
    // Handle regular one-time payment
    await handleRegularPayment(session)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment intent succeeded:", paymentIntent.id)
  
  // Find the installment payment record
  const installmentPayment = await findInstallmentPaymentByPaymentIntent(paymentIntent.id)
  
  if (installmentPayment) {
    await updateInstallmentPaymentStatus(installmentPayment.id, "PAID")
    await sendInstallmentPaymentNotification(installmentPayment, "success")
    
    // Check if all installments are complete
    await checkInstallmentCompletion(installmentPayment.bookingId)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment intent failed:", paymentIntent.id)
  
  const installmentPayment = await findInstallmentPaymentByPaymentIntent(paymentIntent.id)
  
  if (installmentPayment) {
    await updateInstallmentPaymentStatus(installmentPayment.id, "FAILED", paymentIntent.last_payment_error?.message)
    await sendInstallmentPaymentNotification(installmentPayment, "failed")
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Invoice payment succeeded:", invoice.id)
  // Handle subscription-based installment payments if needed
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Invoice payment failed:", invoice.id)
  // Handle failed subscription payments
}

// Helper functions (you'll need to implement these with your database)
async function setupInstallmentPayments(session: Stripe.Checkout.Session) {
  console.log("Setting up installment payments for session:", session.id)
  
  const metadata = session.metadata || {}
  
  // Create installment schedule
  const schedule = {
    bookingId: session.id, // Use session ID as booking ID
    sessionId: session.id,
    customerEmail: metadata.email || "",
    customerName: metadata.fullName || "",
    experienceName: metadata.experienceName || "",
    installmentTotal: parseFloat(metadata.installmentTotal || "0"),
    installmentCount: parseInt(metadata.installmentCount || "3"),
    installmentInterval: parseInt(metadata.installmentInterval || "30"),
  }
  
  // Schedule future installment payments
  await scheduleInstallmentPayments(schedule)
  
  console.log(`Scheduled ${schedule.installmentCount - 1} future installment payments`)
}

async function handleRegularPayment(session: Stripe.Checkout.Session) {
  console.log("Handling regular payment for session:", session.id)
}

async function findInstallmentPaymentByPaymentIntent(paymentIntentId: string) {
  // Find installment payment record by Stripe Payment Intent ID
  for (const installment of getInstallmentPaymentStatus("").installmentPayments) {
    if (installment.stripePaymentIntentId === paymentIntentId) {
      return installment
    }
  }
  return null
}

async function sendInstallmentPaymentNotification(
  installmentPayment: any, 
  type: "success" | "failed"
) {
  try {
    if (type === "success") {
      // Send success notification to customer
      const customerMsg = {
        to: installmentPayment.customerEmail,
        from: "concierge@experiencesbybeyond.com",
        templateId: INSTALLMENT_PAYMENT_TEMPLATE_ID,
        dynamic_template_data: {
          customerName: installmentPayment.customerName,
          installmentNumber: installmentPayment.installmentNumber,
          amount: installmentPayment.amount,
          totalInstallments: installmentPayment.installmentCount,
          remainingInstallments: installmentPayment.installmentCount - installmentPayment.installmentNumber,
          experienceName: installmentPayment.experienceName,
        },
      }
      
      // Send internal notification
      const internalMsg = {
        to: "concierge@experiencesbybeyond.com",
        from: "concierge@experiencesbybeyond.com",
        templateId: INTERNAL_INSTALLMENT_TEMPLATE_ID,
        dynamic_template_data: {
          customerName: installmentPayment.customerName,
          customerEmail: installmentPayment.customerEmail,
          installmentNumber: installmentPayment.installmentNumber,
          amount: installmentPayment.amount,
          experienceName: installmentPayment.experienceName,
          bookingId: installmentPayment.bookingId,
        },
      }
      
      await Promise.all([
        sgMail.send(customerMsg),
        sgMail.send(internalMsg)
      ])
    } else {
      // Send failure notification
      const failureMsg = {
        to: installmentPayment.customerEmail,
        from: "concierge@experiencesbybeyond.com",
        templateId: "d-payment-failure-template", // You'll need to create this
        dynamic_template_data: {
          customerName: installmentPayment.customerName,
          installmentNumber: installmentPayment.installmentNumber,
          amount: installmentPayment.amount,
          failureReason: installmentPayment.failureReason,
          experienceName: installmentPayment.experienceName,
        },
      }
      
      await sgMail.send(failureMsg)
    }
  } catch (error) {
    console.error("Error sending installment notification:", error)
  }
}

async function checkInstallmentCompletion(bookingId: string) {
  console.log("Checking installment completion for booking:", bookingId)
  
  try {
    const status = getInstallmentPaymentStatus(bookingId)
    
    if (status.isComplete) {
      // Send completion notification
      const completionMsg = {
        to: status.installmentPayments[0]?.customerEmail,
        from: "concierge@experiencesbybeyond.com",
        templateId: INSTALLMENT_COMPLETION_TEMPLATE_ID,
        dynamic_template_data: {
          customerName: status.installmentPayments[0]?.customerName,
          experienceName: status.installmentPayments[0]?.experienceName,
          totalAmount: status.installmentPayments.reduce((sum, ip) => sum + ip.amount, 0),
          bookingId: bookingId,
        },
      }
      
      await sgMail.send(completionMsg)
      console.log(`All installments completed for booking ${bookingId}`)
    }
  } catch (error) {
    console.error("Error checking installment completion:", error)
  }
}
