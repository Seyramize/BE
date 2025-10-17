import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import sgMail from "@sendgrid/mail"
import { 
  scheduleInstallmentPayments, 
  getInstallmentPaymentById, 
  updateInstallmentPaymentStatus,
  getInstallmentPaymentStatus 
} from "@/lib/payment-scheduler"
import { bookSlots, getSlotData } from "@/lib/slot-manager"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// Email template IDs for installment notifications
const INSTALLMENT_PAYMENT_TEMPLATE_ID = "d-installment-payment-template" // You'll need to create this
const INSTALLMENT_COMPLETION_TEMPLATE_ID = "d-installment-completion-template" // You'll need to create this
const INTERNAL_INSTALLMENT_TEMPLATE_ID = "d-795bb536371048f4af9b10662df83198" // You'll need to create this
const GROUP_BOOKING_INSTALLMENT_TEMPLATE_ID = "d-6b66a3b2928a4b81bec750aed1fe040f" // Your new dynamic group booking template

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
      
      case "invoice.upcoming":
        await handleInvoiceUpcoming(event.data.object as Stripe.Invoice)
        break
      
      case "invoice.created":
        await handleInvoiceCreated(event.data.object as Stripe.Invoice)
        break
      
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
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
  
  // Book slots for group experiences
  await handleSlotBooking(session)
  
  if (isInstallmentPayment) {
    // Handle installment payment setup
    await setupInstallmentPayments(session)
  } else {
    // Handle regular one-time payment
    await handleRegularPayment(session)
  }
}

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

  // Send group booking confirmation email for installment payments
  await sendGroupBookingInstallmentEmail(schedule)

  // Schedule future installment payments
  await scheduleInstallmentPayments(schedule)

  console.log(`Scheduled ${schedule.installmentCount - 1} future installment payments`)
}

async function handleRegularPayment(session: Stripe.Checkout.Session) {
  console.log("Handling regular payment for session:", session.id)
}

async function handleSlotBooking(session: Stripe.Checkout.Session) {
  console.log("Handling slot booking for session:", session.id)
  
  const metadata = session.metadata || {}
  const experienceId = metadata.experienceId
  const numberOfGuests = parseInt(metadata.guests || "1")
  
  if (experienceId && numberOfGuests > 0) {
    try {
      // Check if this is a group experience
      const slotData = getSlotData(experienceId)
      
      if (slotData) {
        const success = bookSlots(experienceId, numberOfGuests)
        
        if (success) {
          console.log(`Successfully booked ${numberOfGuests} slots for experience ${experienceId}. Remaining slots: ${slotData.availableSlots}`)
        } else {
          console.error(`Failed to book ${numberOfGuests} slots for experience ${experienceId}. Available slots: ${slotData.availableSlots}`)
        }
      } else {
        console.log(`Experience ${experienceId} is not a group experience - no slot booking needed`)
      }
    } catch (error) {
      console.error("Error handling slot booking:", error)
    }
  } else {
    console.log("No experience ID or guests count found in metadata - skipping slot booking")
  }
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
      // Send completion notification to client
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
      
      // Send internal team completion notification
      const internalCompletionMsg = {
        to: "concierge@experiencesbybeyond.com",
        from: "concierge@experiencesbybeyond.com",
        templateId: "d-internal-installment-completion-template", // Your internal completion template ID
        dynamic_template_data: {
          customerName: status.installmentPayments[0]?.customerName,
          customerEmail: status.installmentPayments[0]?.customerEmail,
          experienceName: status.installmentPayments[0]?.experienceName,
          bookingId: bookingId,
          totalAmount: status.installmentPayments.reduce((sum, ip) => sum + ip.amount, 0),
          completionDate: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
        },
      }
      
      // Send both emails
      await Promise.all([
        sgMail.send(completionMsg),
        sgMail.send(internalCompletionMsg)
      ])
      
      console.log(`All installments completed for booking ${bookingId} - emails sent to client and team`)
    }
  } catch (error) {
    console.error("Error checking installment completion:", error)
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
  
  // Check if this is the final installment payment
  if (invoice.customer_email && 'subscription' in invoice && invoice.subscription) {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const metadata = subscription.metadata
      
      if (metadata.isInstallmentPayment === "true") {
        // Calculate which installment this is
        const installmentCount = parseInt(metadata.installmentCount || "3")
        const currentPeriodStart = 'current_period_start' in subscription ? Number(subscription.current_period_start) : 0
        const subscriptionStart = 'start_date' in subscription ? Number(subscription.start_date) : 0
        
        // Calculate installment number based on periods elapsed
        const periodsElapsed = Math.floor((currentPeriodStart - subscriptionStart) / (30 * 24 * 60 * 60)) + 1
        
        console.log(`Payment succeeded for installment ${periodsElapsed} of ${installmentCount} for ${metadata.experienceName}`)
        
        // If this is the final installment, send completion email
        if (periodsElapsed >= installmentCount) {
          console.log(`Final installment completed for ${metadata.experienceName} - sending completion email`)
          
          // Send completion notification to client
          const completionMsg = {
            to: invoice.customer_email,
            from: "concierge@experiencesbybeyond.com",
            templateId: INSTALLMENT_COMPLETION_TEMPLATE_ID,
            dynamic_template_data: {
              customerName: metadata.fullName || "Valued Customer",
              experienceName: metadata.experienceName || "Experience",
              totalAmount: metadata.installmentTotal || "0",
              bookingId: subscription.id,
              completionDate: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
            },
          }
          
          // Send internal team completion notification
          const internalCompletionMsg = {
            to: "concierge@experiencesbybeyond.com",
            from: "concierge@experiencesbybeyond.com",
            templateId: "d-internal-installment-completion-template",
            dynamic_template_data: {
              customerName: metadata.fullName || "Valued Customer",
              customerEmail: invoice.customer_email,
              experienceName: metadata.experienceName || "Experience",
              bookingId: subscription.id,
              totalAmount: metadata.installmentTotal || "0",
              completionDate: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
            },
          }
          
          // Send both emails
          await Promise.all([
            sgMail.send(completionMsg),
            sgMail.send(internalCompletionMsg)
          ])
          
          console.log(`Completion emails sent for final installment of ${metadata.experienceName}`)
        } else {
          console.log(`Stripe will handle payment success notification for installment ${periodsElapsed}`)
        }
      }
    } catch (error) {
      console.error("Error processing payment success:", error)
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Invoice payment failed:", invoice.id)
  
  // Stripe handles payment failure notifications automatically
  // No custom email needed - Stripe will send their built-in failure notifications
  if (invoice.customer_email && 'subscription' in invoice && invoice.subscription) {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const metadata = subscription.metadata
      
      if (metadata.isInstallmentPayment === "true") {
        console.log(`Stripe will handle payment failure notification for invoice ${invoice.id} - installment payment for ${metadata.experienceName}`)
      }
    } catch (error) {
      console.error("Error processing payment failure:", error)
    }
  }
}

async function handleInvoiceUpcoming(invoice: Stripe.Invoice) {
  console.log("Invoice upcoming:", invoice.id)
  
  // Stripe handles payment reminders automatically
  // No custom email needed - Stripe will send their built-in reminders
  if (invoice.customer_email && 'subscription' in invoice && invoice.subscription) {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const metadata = subscription.metadata
      
      if (metadata.isInstallmentPayment === "true") {
        console.log(`Stripe will handle payment reminder for invoice ${invoice.id} - installment payment for ${metadata.experienceName}`)
      }
    } catch (error) {
      console.error("Error processing upcoming invoice:", error)
    }
  }
}

async function handleInvoiceCreated(invoice: Stripe.Invoice) {
  console.log("Invoice created:", invoice.id)
  
  // Stripe handles invoice notifications automatically
  // No custom email needed - Stripe will send their built-in invoice emails
  if (invoice.customer_email && 'subscription' in invoice && invoice.subscription) {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const metadata = subscription.metadata
      
      if (metadata.isInstallmentPayment === "true") {
        console.log(`Stripe will handle invoice notification for ${invoice.id} - installment payment for ${metadata.experienceName}`)
      }
    } catch (error) {
      console.error("Error processing invoice creation:", error)
    }
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("Subscription created:", subscription.id)
  
  // Send subscription confirmation to customer
  if (subscription.metadata.isInstallmentPayment === "true") {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      
      if ('email' in customer) {
        const confirmationMsg = {
          to: customer.email || "",
        from: "concierge@experiencesbybeyond.com",
        templateId: GROUP_BOOKING_INSTALLMENT_TEMPLATE_ID,
        dynamic_template_data: {
          firstName: subscription.metadata.fullName?.split(' ')[0] || "Valued Customer",
          experienceName: subscription.metadata.experienceName || "Experience",
          totalAmount: subscription.metadata.installmentTotal || "0",
          installmentCount: subscription.metadata.installmentCount || "3",
          installmentAmount: (parseInt(subscription.metadata.installmentTotal || "0") / parseInt(subscription.metadata.installmentCount || "3")).toFixed(2),
          nextPaymentDate: 'current_period_end' in subscription && subscription.current_period_end ? new Date(Number(subscription.current_period_end) * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : "TBD",
          experienceDates: "TBD - You will be contacted with specific dates",
          supportPhone: "+1 (555) 123-4567",
          supportEmail: "concierge@experiencesbybeyond.com",
        },
      }
      
        await sgMail.send(confirmationMsg)
        console.log(`Subscription confirmation sent for subscription ${subscription.id}`)
      }
    } catch (error) {
      console.error("Error sending subscription confirmation:", error)
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Subscription updated:", subscription.id)
  
  // Handle subscription changes (paused, resumed, etc.)
  if (subscription.metadata.isInstallmentPayment === "true") {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      
      if (subscription.status === "paused" && 'email' in customer) {
        const pauseMsg = {
          to: customer.email || "",
          from: "concierge@experiencesbybeyond.com",
          templateId: "d-subscription-paused-template", // You'll need to create this
          dynamic_template_data: {
            customerName: subscription.metadata.fullName || "Valued Customer",
            experienceName: subscription.metadata.experienceName || "Experience",
            pauseDate: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            supportPhone: "+1 (555) 123-4567",
            supportEmail: "concierge@experiencesbybeyond.com",
          },
        }
        
        await sgMail.send(pauseMsg)
        console.log(`Subscription pause notification sent for subscription ${subscription.id}`)
      }
    } catch (error) {
      console.error("Error sending subscription update notification:", error)
    }
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("Subscription deleted:", subscription.id)
  
  // Send subscription cancellation notification
  if (subscription.metadata.isInstallmentPayment === "true") {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      
      if ('email' in customer) {
        const cancellationMsg = {
          to: customer.email || "",
        from: "concierge@experiencesbybeyond.com",
        templateId: "d-subscription-cancelled-template", // You'll need to create this
        dynamic_template_data: {
          customerName: subscription.metadata.fullName || "Valued Customer",
          experienceName: subscription.metadata.experienceName || "Experience",
          cancellationDate: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          supportPhone: "+1 (555) 123-4567",
          supportEmail: "concierge@experiencesbybeyond.com",
        },
      }
      
        await sgMail.send(cancellationMsg)
        console.log(`Subscription cancellation notification sent for subscription ${subscription.id}`)
      }
    } catch (error) {
      console.error("Error sending subscription cancellation notification:", error)
    }
  }
}

// Helper functions (you'll need to implement these with your database)
async function sendGroupBookingInstallmentEmail(schedule: any) {
  try {
    console.log("Sending group booking installment emails for:", schedule.bookingId)

    // Internal notification
    const internalMsg = {
      to: "concierge@experiencesbybeyond.com",
      from: "concierge@experiencesbybeyond.com",
      templateId: INTERNAL_INSTALLMENT_TEMPLATE_ID, // Use the more specific internal template
      dynamic_template_data: {
        customerName: schedule.customerName,
        customerEmail: schedule.customerEmail,
        experienceName: schedule.experienceName,
        bookingId: schedule.bookingId,
        installmentNumber: 1, // First installment
        installmentCount: schedule.installmentCount,
        installmentTotal: schedule.installmentTotal,
        amount: schedule.installmentTotal / schedule.installmentCount,
        installmentInterval: schedule.installmentInterval,
        remainingInstallments: schedule.installmentCount - 1,
      },
    }

    // Customer confirmation
    const nextPaymentDate = new Date()
    nextPaymentDate.setDate(nextPaymentDate.getDate() + schedule.installmentInterval)

    const customerMsg = {
      to: schedule.customerEmail,
      from: "concierge@experiencesbybeyond.com",
      templateId: GROUP_BOOKING_INSTALLMENT_TEMPLATE_ID,
      dynamic_template_data: {
        firstName: schedule.customerName?.split(' ')[0] || "Valued Customer",
        experienceName: schedule.experienceName,
        totalAmount: schedule.installmentTotal,
        installmentCount: schedule.installmentCount,
        installmentAmount: (schedule.installmentTotal / schedule.installmentCount).toFixed(2),
        nextPaymentDate: nextPaymentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        experienceDates: "TBD - You will be contacted with specific dates",
        supportPhone: "+1 (555) 123-4567",
        supportEmail: "concierge@experiencesbybeyond.com",
      },
    }

    // Send both emails
    await Promise.all([
      sgMail.send(internalMsg),
      sgMail.send(customerMsg)
    ])

    console.log(`Group booking installment emails sent for booking ${schedule.bookingId} to ${schedule.customerEmail} and internal team.`)
  } catch (error) {
    console.error("Error sending group booking installment emails:", error)
  }
}
