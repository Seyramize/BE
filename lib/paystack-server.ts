// Paystack Server-Side Integration

import crypto from "crypto"

const PAYSTACK_BASE_URL = "https://api.paystack.co"
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!

interface PaystackInitializeResponse {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

interface PaystackVerifyResponse {
  status: boolean
  message: string
  data?: {
    reference: string
    amount: number
    paid_at: string
    customer: {
      email: string
      customer_code: string
      first_name?: string
      last_name?: string
      phone?: string
    }
    metadata: Record<string, any>
    status: string
    authorization?: {
      authorization_code: string
      bin: string
      last4: string
      exp_month: string
      exp_year: string
      channel: string
      card_type: string
      bank: string
      country_code: string
      brand: string
      should_reauthorize: boolean
    }
  }
}

/**
 * Initialize a payment transaction on Paystack
 */
export async function initializePaystackTransaction({
  email,
  amount,
  reference,
  metadata,
  callbackUrl,
  currency = "GHS",
}: {
  email: string
  amount: number
  reference: string
  metadata: Record<string, any>
  callbackUrl?: string
  currency?: string
}): Promise<PaystackInitializeResponse> {
  try {
    const body: any = {
      email,
      amount: Math.round(amount * 100), // Convert to subunit (pesewa for GHS)
      reference,
      metadata,
      currency,
    }

    if (callbackUrl) {
      body.callback_url = callbackUrl
    }

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Paystack initialize error:", error)
    throw error
  }
}

/**
 * Verify a Paystack transaction
 */
export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  try {
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Paystack verify error:", error)
    throw error
  }
}

/**
 * Verify webhook signature from Paystack
 */
export function verifyPaystackWebhookSignature(
  body: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex")

  return hash === signature
}

/**
 * Create a Paystack customer
 */
export async function createPaystackCustomer({
  email,
  first_name,
  last_name,
  phone,
}: {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
}) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/customer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        phone,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Paystack create customer error:", error)
    throw error
  }
}

/**
 * Generate unique reference for transaction
 */
export function generatePaystackReference(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
