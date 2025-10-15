"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, X, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentConfirmationGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
  onPaymentSuccess: (data: any) => void
  bookingDetails: {
    experienceName: string
    experienceImage?: string
    totalAmount: number
    guests: number
    email: string
    fullName: string
    experienceId: string
    experienceSlug: string
    countryDialCode: string
    phoneNumber: string
    paymentStyle: string
    installmentTotal?: number
  }
}

export function PaymentConfirmationGroupModal({
  isOpen,
  onClose,
  onGoBack,
  onPaymentSuccess,
  bookingDetails,
}: PaymentConfirmationGroupModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleSubmit = async () => {
    setIsProcessing(true)

    try {
      // Determine if this is an installment payment
      const isInstallmentPayment = bookingDetails.paymentStyle === "Installment Payment"
      const installmentTotal = isInstallmentPayment ? bookingDetails.installmentTotal || 0 : 0

      // Create Stripe checkout session
      const res = await fetch("/api/create-installment-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingDetails.totalAmount,
          email: bookingDetails.email,
          experienceName: bookingDetails.experienceName,
          phone: `${bookingDetails.countryDialCode || ""}${bookingDetails.phoneNumber || ""}`,
          guests: bookingDetails.guests,
          fullName: bookingDetails.fullName,
          experienceId: bookingDetails.experienceId,
          experienceSlug: bookingDetails.experienceSlug,
          paymentStyle: bookingDetails.paymentStyle,
          installmentTotal: installmentTotal,
          installmentCount: 3,
          installmentInterval: 30, // 30 days between installments
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
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
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
                </div>

                {/* Booking Summary */}
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
                      <span className="text-slate-600">Experience Dates:</span>
                      <span className="text-slate-800">28th Dec 2025 - 2nd Jan 2026</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-slate-600">Payment Style:</span>
                      <span className="text-slate-800">{bookingDetails.paymentStyle}</span>
                    </div>
                    {bookingDetails.paymentStyle === "Installment Payment" && (
                      <>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="text-slate-600">Total Experience Cost:</span>
                          <span className="text-slate-800">${bookingDetails.installmentTotal}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="text-slate-600">Payment Plan:</span>
                          <span className="text-slate-800">3 installments (30 days apart)</span>
                        </div>
                      </>
                    )}
                    <div className="border-t border-stone-200 pt-2 mt-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-serif text-base sm:text-lg">
                        <span className="text-slate-800">
                          {bookingDetails.paymentStyle === "Installment Payment" ? "First Payment:" : "Total:"}
                        </span>
                        <span className="text-slate-800 font-semibold font-sans text-2xl">${bookingDetails.totalAmount}</span>
                      </div>
                      {bookingDetails.paymentStyle === "Installment Payment" && (
                        <div className="text-xs text-slate-500 mt-1 text-right">
                          Remaining: ${((bookingDetails.installmentTotal || 0) - bookingDetails.totalAmount).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {errors.general && (
                  <div className="text-red-500 text-sm text-center px-4 mb-4">
                    {errors.general}
                  </div>
                )}

                {/* Stripe Checkout Button */}
                <Button
                  onClick={handleSubmit}
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
