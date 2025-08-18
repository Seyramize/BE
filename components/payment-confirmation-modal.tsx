"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, X, CreditCard, Lock, Shield, UserRound, BookUser, ShieldPlus, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { loadStripe } from "@stripe/stripe-js"

interface PaymentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
  onPaymentSuccess: (data: any) => void
  bookingDetails: {
    experienceName: string
    experienceImage?: string
    totalAmount: number
    guests: number
    preferredDate: string
    alternateDate: string
    email: string
    fullName: string
    experienceId: string
    experienceSlug: string // Added experienceSlug to the interface
    countryDialCode: string // <-- use dial code
    phoneNumber: string
  }
}

interface PaymentFormData {
  nameOnCard: string
  cardNumber: string
  expiryDate: string
  cvv: string
  paymentMethod: string
  mobileMoneyPhone?: string
  mobileMoneyProvider?: string
}

export function PaymentConfirmationModal({
  isOpen,
  onClose,
  onGoBack,
  onPaymentSuccess,
  bookingDetails,
}: PaymentConfirmationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<PaymentFormData>({
    nameOnCard: bookingDetails.fullName || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit-debit-card",
    mobileMoneyPhone: "",
    mobileMoneyProvider: "",
  })

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !isProcessing) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose, isProcessing])

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value

    // Format card number
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    }

    // Format expiry date
    if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    }

    // Format CVV
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (formData.paymentMethod === "credit-debit-card") {
      if (!formData.nameOnCard.trim()) newErrors.nameOnCard = "Name on card is required"
      if (!formData.cardNumber.replace(/\s/g, "")) newErrors.cardNumber = "Card number is required"
      if (formData.cardNumber.replace(/\s/g, "").length < 13) newErrors.cardNumber = "Invalid card number"
      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
      if (!formData.cvv) newErrors.cvv = "CVV is required"
    } else if (formData.paymentMethod === "mobile-money") {
      if (!formData.mobileMoneyPhone || !/^\d{9,15}$/.test(formData.mobileMoneyPhone)) newErrors.mobileMoneyPhone = "Valid phone number is required"
      if (!formData.mobileMoneyProvider) newErrors.mobileMoneyProvider = "Provider is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    setIsProcessing(true)

    try {
      // Combine country code and phone number from bookingDetails
      const fullPhone = `${bookingDetails.countryDialCode || ""}${bookingDetails.phoneNumber || ""}`;
      // Use mobile money phone if payment method is mobile money, otherwise use the full phone from bookingDetails
      const phoneToSend =
        formData.paymentMethod === "mobile-money"
          ? formData.mobileMoneyPhone
          : fullPhone;

      // Stripe Checkout for both card and mobile money
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingDetails.totalAmount,
          email: bookingDetails.email,
          experienceName: bookingDetails.experienceName,
          phone: phoneToSend, // <-- always send the correct phone
          mobileMoneyProvider: formData.mobileMoneyProvider,
          guests: bookingDetails.guests,
          preferredDate: bookingDetails.preferredDate,
          alternateDate: bookingDetails.alternateDate,
          fullName: bookingDetails.fullName,
          experienceId: bookingDetails.experienceId,
          experienceSlug: bookingDetails.experienceSlug,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
        return
      } else {
        setErrors({ general: "Failed to initiate payment." })
      }
    } catch (error) {
      setErrors({ general: "Payment failed. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={!isProcessing ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <div className="relative flex flex-col lg:flex-row w-full max-w-6xl h-[90vh] sm:h-[95vh] lg:h-[90vh] max-h-[700px] bg-white rounded-lg overflow-hidden shadow-2xl">
          {/* Left Side - Experience Image */}
          <div className="relative w-full lg:w-2/5 h-40 sm:h-48 lg:h-full">
            <Image
              src={bookingDetails.experienceImage || "/placeholder.svg?height=400&width=600"}
              alt={bookingDetails.experienceName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 lg:p-8">
              <div className="text-left text-white w-full">
                <p className="text-xs sm:text-sm font-sans uppercase tracking-wider mb-1 sm:mb-2 lg:mb-4 opacity-90">
                  YOU'RE BOOKING THE
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-serif font-normal leading-tight break-words">
                  {bookingDetails.experienceName}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="flex-1 bg-stone-50 relative flex flex-col min-h-0">
            {/* Header with navigation */}
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-stone-200">
              <button
                onClick={onGoBack}
                disabled={isProcessing}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors disabled:opacity-50"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-sans">Go Back</span>
              </button>

              <button
                onClick={onClose}
                disabled={isProcessing}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors disabled:opacity-50"
                type="button"
                aria-label="Close payment form"
              >
                <span className="text-sm font-sans">Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-normal text-slate-800 mb-1 sm:mb-2">Almost there</h3>
                  <div className="flex items-center justify-center gap-2 text-slate-600 text-xs sm:text-sm mb-1">
                    <Shield className="w-4 h-4" />
                    <span>All payments are protected and encrypted.</span>
                  </div>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm">Your journey is just a step away.</p>
                </div>                {/* Booking Summary */}
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-stone-200">
                  <h4 className="font-sans text-base sm:text-lg text-slate-800 mb-2 sm:mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-600">Experience:</span>
                      <span className="text-slate-800 font-medium break-words">{bookingDetails.experienceName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600">Guest Name:</span>
                      <span className="text-slate-800 font-medium break-words">{bookingDetails.fullName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600">Email:</span>
                      <span className="text-slate-800 break-all">{bookingDetails.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-slate-600">Number of Guests:</span>
                      <span className="text-slate-800">
                        {bookingDetails.guests} person{bookingDetails.guests !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-slate-600">Preferred Date:</span>
                      <span className="text-slate-800">{new Date(bookingDetails.preferredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-slate-600">Alternate Date:</span>
                      <span className="text-slate-800">{new Date(bookingDetails.alternateDate).toLocaleDateString()}</span>
                    </div>
                    <div className="border-t border-stone-200 pt-2 mt-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-serif text-base sm:text-lg">
                        <span className="text-slate-800">Total:</span>
                        <span className="text-slate-800 font-semibold text-2xl">${bookingDetails.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stripe Checkout Button */}
                <Button
                  onClick={async () => {
                    setIsProcessing(true)
                    try {
                      const res = await fetch("/api/create-checkout-session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          amount: bookingDetails.totalAmount,
                          email: bookingDetails.email,
                          experienceName: bookingDetails.experienceName,
                          phone: `${bookingDetails.countryDialCode || ""}${
                            bookingDetails.phoneNumber || ""
                          }`,
                          guests: bookingDetails.guests,
                          preferredDate: bookingDetails.preferredDate,
                          alternateDate: bookingDetails.alternateDate,
                          fullName: bookingDetails.fullName,
                          experienceId: bookingDetails.experienceId,
                          experienceSlug: bookingDetails.experienceSlug,
                        }),
                      })
                      const data = await res.json()
                      if (data.url) {
                        window.location.href = data.url
                      } else {
                        alert("Failed to initiate payment.")
                      }
                    } catch (error) {
                      alert("Payment failed. Please try again.")
                    } finally {
                      setIsProcessing(false)
                    }
                  }}
                  disabled={isProcessing}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 h-12 text-base disabled:opacity-50 mt-4"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Redirecting to Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Proceed to Checkout - ${bookingDetails.totalAmount}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center px-4 mt-6">
                  Your payment information is secure and encrypted. By completing this payment, you agree to our terms
                  and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
