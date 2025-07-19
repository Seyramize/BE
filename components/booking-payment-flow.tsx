"use client"

import { useState } from "react"
import { PaymentConfirmationModal } from "@/components/payment-confirmation-modal"
import { BookingConfirmation } from "@/components/booking-confirmation"

interface BookingPaymentFlowProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    experienceName: string
    experienceImage?: string
    guests: number
    preferredDate: string
    alternateDate: string
    totalAmount: number
    email: string
    fullName: string
    includedItems?: string[]
    experienceId: string
    experienceSlug: string
    countryDialCode: string // <-- use dial code
    phoneNumber: string
  }
}

export function BookingPaymentFlow({ isOpen, onClose, bookingDetails }: BookingPaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<"payment" | "confirmation">("payment")
  const [paymentData, setPaymentData] = useState<any>(null)

  const handlePaymentSuccess = (data: any) => {
    setPaymentData(data)
    setCurrentStep("confirmation")
  }

  const handleClose = () => {
    // Reset the flow when closing
    setCurrentStep("payment")
    setPaymentData(null)
    onClose()
  }

  const handleGoBack = () => {
    if (currentStep === "confirmation") {
      setCurrentStep("payment")
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {currentStep === "payment" && (
        <PaymentConfirmationModal
          isOpen={isOpen}
          onClose={handleClose}
          onGoBack={handleGoBack}
          onPaymentSuccess={handlePaymentSuccess}
          bookingDetails={{
            experienceName: bookingDetails.experienceName,
            experienceImage: bookingDetails.experienceImage,
            totalAmount: bookingDetails.totalAmount,
            guests: bookingDetails.guests,
            preferredDate: bookingDetails.preferredDate,
            alternateDate: bookingDetails.alternateDate,
            email: bookingDetails.email,
            fullName: bookingDetails.fullName,
            experienceId: bookingDetails.experienceId,
            experienceSlug: bookingDetails.experienceSlug,
            countryDialCode: bookingDetails.countryDialCode, // <-- use dial code
            phoneNumber: bookingDetails.phoneNumber,
          }}
        />
      )}

      {currentStep === "confirmation" && paymentData && (
        <BookingConfirmation
          isOpen={isOpen}
          onClose={handleClose}
          bookingDetails={{
            experienceName: bookingDetails.experienceName,
            preferredDate: bookingDetails.preferredDate,
            alternateDate: bookingDetails.alternateDate,
            guests: bookingDetails.guests,
            email: bookingDetails.email,
            bookingId: paymentData.bookingId || `BK${Date.now()}`,
            transactionId: paymentData.transactionId,
            includedItems: bookingDetails.includedItems || [
              "Private transportation with fuel",
              "Personal chaperone",
              "Curated lunch and dinner",
              "Restorative waterfall massage",
            ],
          }}
        />
      )}
    </>
  )
}
