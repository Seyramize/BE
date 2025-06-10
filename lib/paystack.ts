// Paystack integration utility

export interface PaystackConfig {
  publicKey: string
  email: string
  amount: number // in kobo (100 = ₦1)
  reference?: string
  currency?: string
  metadata?: Record<string, any>
  onSuccess?: (response: PaystackResponse) => void
  onCancel?: () => void
}

export interface PaystackResponse {
  reference: string
  status: "success" | "failed" | "cancelled"
  transaction: string
  message: string
  transaction_date: string
  amount: number
}

export const initializePaystack = (config: PaystackConfig): Promise<PaystackResponse> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Paystack can only be initialized in browser environment"))
      return
    }

    // Check if PaystackPop is available
    if (!(window as any).PaystackPop) {
      const script = document.createElement("script")
      script.src = "https://js.paystack.co/v1/inline.js"
      script.async = true
      script.onload = () => initializePayment(config, resolve, reject)
      script.onerror = () => reject(new Error("Failed to load Paystack script"))
      document.body.appendChild(script)
    } else {
      initializePayment(config, resolve, reject)
    }
  })
}

const initializePayment = (
  config: PaystackConfig,
  resolve: (value: PaystackResponse) => void,
  reject: (reason: Error) => void,
) => {
  try {
    const handler = (window as any).PaystackPop.setup({
      key: config.publicKey,
      email: config.email,
      amount: config.amount,
      ref: config.reference || generateReference(),
      currency: config.currency || "NGN",
      metadata: config.metadata || {},
      onClose: () => {
        if (config.onCancel) {
          config.onCancel()
        }
        reject(new Error("Payment window closed"))
      },
      callback: (response: PaystackResponse) => {
        if (config.onSuccess) {
          config.onSuccess(response)
        }
        resolve(response)
      },
    })
    handler.openIframe()
  } catch (error) {
    reject(error as Error)
  }
}

const generateReference = (): string => {
  const date = new Date().getTime()
  return `ref-${date}-${Math.floor(Math.random() * 1000000)}`
}

// Server-side verification function (to be used in a server action)
export async function verifyPaystackPayment(reference: string, secretKey: string): Promise<any> {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}
