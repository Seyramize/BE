"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Check, Mail, Calendar, Users, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingConfirmationProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    experienceName: string
    date: string
    guests: number
    email: string
    bookingId: string
    transactionId?: string
    includedItems?: string[]
  }
}

export function BookingConfirmation({ isOpen, onClose, bookingDetails }: BookingConfirmationProps) {
  const [emailSent, setEmailSent] = useState(true)

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
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
  }, [isOpen, onClose])

  const handleResendEmail = async () => {
    // Simulate email resend
    setEmailSent(false)
    setTimeout(() => setEmailSent(true), 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
      >
        <div className="relative flex flex-col lg:flex-row w-full max-w-6xl h-[95vh] lg:h-[90vh] max-h-[700px] bg-white rounded-lg overflow-hidden shadow-2xl">
          {/* Left Side - Confirmation Image */}
          <div className="relative w-full lg:w-2/5 h-48 lg:h-full">
            <Image src="/placeholder.svg?height=400&width=600" alt="Booking confirmed" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-left p-4 lg:p-8">
              <div className="text-left text-white">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal leading-tight">
                  Booking
                  <br />
                  Confirmed
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Experience Summary */}
          <div className="flex-1 bg-stone-50 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 text-slate-600 hover:text-slate-800 transition-colors z-10"
              type="button"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-12 lg:pt-16">
              <div className="max-w-md mx-auto">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-left mb-8">
                  <h3 className="text-2xl lg:text-3xl font-serif font-normal text-slate-800 mb-4">
                    Experience Summary
                  </h3>
                </div>

                {/* Booking Details */}
                <div className="space-y-6 mb-8">
                  {/* Experience */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">EXPERIENCE</span>
                    </div>
                    <p className="text-lg font-serif text-slate-800">{bookingDetails.experienceName}</p>
                  </div>

                  {/* Guests */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">GUESTS</span>
                    </div>
                    <p className="text-lg font-serif text-slate-800">
                      {bookingDetails.guests} Person{bookingDetails.guests !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">DATE</span>
                    </div>
                    <p className="text-lg font-serif text-slate-800">
                      {new Date(bookingDetails.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* What's Included */}
                  {bookingDetails.includedItems && bookingDetails.includedItems.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-3 block">
                        WHAT'S INCLUDED?
                      </span>
                      <ul className="space-y-2">
                        {bookingDetails.includedItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-800">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-8" />

                {/* Email Confirmation */}
                <div className="mb-8">
                  <p className="text-sm text-slate-600 mb-4">
                    A detailed confirmation has been sent to{" "}
                    <span className="font-medium text-slate-800">{bookingDetails.email}</span>.
                    <br />
                    Please check your inbox (and your spam folder just in case).
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <span>Didn't receive the email?</span>
                  </div>

                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    size="sm"
                    disabled={!emailSent}
                    className="border-slate-900 text-slate-900 hover:bg-slate-50 font-sans"
                  >
                    {emailSent ? (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Confirmation Email
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </>
                    ) : (
                      "Sending..."
                    )}
                  </Button>
                </div>

                {/* Booking Reference */}
                <div className="bg-white rounded-lg p-4 mb-8 border border-stone-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Booking ID:</span>
                      <span className="text-slate-800 font-mono">{bookingDetails.bookingId}</span>
                    </div>
                    {bookingDetails.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Transaction ID:</span>
                        <span className="text-slate-800 font-mono">{bookingDetails.transactionId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="space-y-3">
                  <Button
                    onClick={onClose}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 h-12"
                  >
                    View My Bookings
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full border-slate-900 text-slate-900 hover:bg-slate-50 font-sans py-3 h-12"
                  >
                    Browse More Experiences
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
