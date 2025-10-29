import Stripe from "stripe"

// In-memory storage for installment payments (replace with database later)
interface InstallmentPayment {
  id: string
  bookingId: string
  sessionId: string
  customerEmail: string
  customerName: string
  experienceName: string
  installmentTotal: number
  installmentCount: number
  installmentInterval: number
  installmentNumber: number
  amount: number
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED"
  scheduledDate: Date
  stripePaymentIntentId?: string
  paymentMethodId?: string
  attemptCount: number
  failureReason?: string
}

// In-memory storage (replace with database)
const installmentPayments = new Map<string, InstallmentPayment>()
const bookingInstallments = new Map<string, string[]>() // bookingId -> installmentIds

export interface InstallmentSchedule {
  bookingId: string
  sessionId: string
  customerEmail: string
  customerName: string
  experienceName: string
  installmentTotal: number
  installmentCount: number
  installmentInterval: number
}

export async function scheduleInstallmentPayments(schedule: InstallmentSchedule) {
  try {
    const installmentIds: string[] = []
    
    // Create installment payment records for remaining payments (2nd and 3rd)
    for (let i = 2; i <= schedule.installmentCount; i++) {
      const installmentId = `installment_${schedule.bookingId}_${i}_${Date.now()}`
      const scheduledDate = new Date()
      scheduledDate.setDate(scheduledDate.getDate() + (schedule.installmentInterval * (i - 1)))
      
      const installmentAmount = schedule.installmentTotal / schedule.installmentCount
      
      const installmentPayment: InstallmentPayment = {
        id: installmentId,
        bookingId: schedule.bookingId,
        sessionId: schedule.sessionId,
        customerEmail: schedule.customerEmail,
        customerName: schedule.customerName,
        experienceName: schedule.experienceName,
        installmentTotal: schedule.installmentTotal,
        installmentCount: schedule.installmentCount,
        installmentInterval: schedule.installmentInterval,
        installmentNumber: i,
        amount: installmentAmount,
        status: "PENDING",
        scheduledDate,
        attemptCount: 0,
      }
      
      installmentPayments.set(installmentId, installmentPayment)
      installmentIds.push(installmentId)
    }
    
    // Store booking-installment mapping
    bookingInstallments.set(schedule.bookingId, installmentIds)
    
    console.log(`Created ${installmentIds.length} installment payment records for booking ${schedule.bookingId}`)
    return installmentIds
  } catch (error) {
    console.error("Error scheduling installment payments:", error)
    throw error
  }
}

export async function processScheduledInstallment(installmentId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const installmentPayment = installmentPayments.get(installmentId)
    
    if (!installmentPayment) {
      throw new Error("Installment payment not found")
    }

    if (installmentPayment.status !== "PENDING") {
      console.log(`Installment payment ${installmentId} is not pending`)
      return
    }

    // Update attempt count
    installmentPayment.attemptCount += 1
    installmentPayment.scheduledDate = new Date()

    // Create Payment Intent for this installment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(installmentPayment.amount * 100),
      currency: "usd",
      customer: installmentPayment.sessionId, // Use session ID as customer reference
      payment_method: installmentPayment.paymentMethodId,
      confirmation_method: "automatic",
      confirm: true,
      metadata: {
        installmentPaymentId: installmentId,
        bookingId: installmentPayment.bookingId,
        installmentNumber: installmentPayment.installmentNumber.toString(),
        experienceName: installmentPayment.experienceName,
      },
    })

    // Update installment payment with Payment Intent ID
    installmentPayment.stripePaymentIntentId = paymentIntent.id
    installmentPayment.status = paymentIntent.status === "succeeded" ? "PAID" : "PENDING"

    console.log(`Processed installment payment ${installmentId}: ${paymentIntent.status}`)
    return paymentIntent
  } catch (error) {
    console.error(`Error processing installment payment ${installmentId}:`, error)
    
    // Update failure status
    const installmentPayment = installmentPayments.get(installmentId)
    if (installmentPayment) {
      installmentPayment.status = "FAILED"
      installmentPayment.failureReason = error instanceof Error ? error.message : "Unknown error"
    }
    
    throw error
  }
}

export function getPendingInstallments() {
  try {
    const pendingInstallments: InstallmentPayment[] = []
    const now = new Date()
    
    for (const installment of installmentPayments.values()) {
      if (installment.status === "PENDING" && installment.scheduledDate <= now) {
        pendingInstallments.push(installment)
      }
    }
    
    // Sort by scheduled date
    pendingInstallments.sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
    
    return pendingInstallments
  } catch (error) {
    console.error("Error fetching pending installments:", error)
    throw error
  }
}

export async function processAllPendingInstallments() {
  try {
    const pendingInstallments = getPendingInstallments()
    
    console.log(`Processing ${pendingInstallments.length} pending installments`)
    
    const results = []
    for (const installment of pendingInstallments) {
      try {
        const result = await processScheduledInstallment(installment.id)
        results.push({ installmentId: installment.id, status: "success", result })
      } catch (error) {
        console.error(`Failed to process installment ${installment.id}:`, error)
        results.push({ installmentId: installment.id, status: "failed", error })
      }
    }
    
    return results
  } catch (error) {
    console.error("Error processing pending installments:", error)
    throw error
  }
}

export function cancelInstallmentPayments(bookingId: string) {
  try {
    const installmentIds = bookingInstallments.get(bookingId) || []
    let cancelledCount = 0
    
    for (const installmentId of installmentIds) {
      const installment = installmentPayments.get(installmentId)
      if (installment && installment.status === "PENDING") {
        installment.status = "CANCELLED"
        cancelledCount++
      }
    }

    console.log(`Cancelled ${cancelledCount} installment payments for booking ${bookingId}`)
    return cancelledCount
  } catch (error) {
    console.error("Error cancelling installment payments:", error)
    throw error
  }
}

export function getInstallmentPaymentStatus(bookingId: string) {
  try {
    const installmentIds = bookingInstallments.get(bookingId) || []
    const installmentPaymentsList: InstallmentPayment[] = []
    
    for (const installmentId of installmentIds) {
      const installment = installmentPayments.get(installmentId)
      if (installment) {
        installmentPaymentsList.push(installment)
      }
    }
    
    // Sort by installment number
    installmentPaymentsList.sort((a, b) => a.installmentNumber - b.installmentNumber)
    
    const totalInstallments = installmentPaymentsList.length
    const paidInstallments = installmentPaymentsList.filter(ip => ip.status === "PAID").length
    const pendingInstallments = installmentPaymentsList.filter(ip => ip.status === "PENDING").length
    const failedInstallments = installmentPaymentsList.filter(ip => ip.status === "FAILED").length

    return {
      totalInstallments,
      paidInstallments,
      pendingInstallments,
      failedInstallments,
      isComplete: paidInstallments === totalInstallments,
      installmentPayments: installmentPaymentsList,
    }
  } catch (error) {
    console.error("Error getting installment payment status:", error)
    throw error
  }
}

export function getInstallmentPaymentById(installmentId: string): InstallmentPayment | undefined {
  return installmentPayments.get(installmentId)
}

export function updateInstallmentPaymentStatus(
  installmentId: string, 
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED", 
  failureReason?: string
) {
  const installment = installmentPayments.get(installmentId)
  if (installment) {
    installment.status = status
    if (failureReason) {
      installment.failureReason = failureReason
    }
    console.log(`Updated installment payment ${installmentId} to status: ${status}`)
  }
}
