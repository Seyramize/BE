"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Check, Mail, Calendar, Users, MapPin, ExternalLink, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingConfirmationProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    experienceName: string
    preferredDate: string
    alternateDate: string
    guests: number
    email: string
    bookingId: string
    transactionId?: string
    includedItems?: string[]
  }
}

function shortenId(id: string, length = 8) {
  if (!id) return "";
  if (id.length <= length) return id;
  const half = Math.floor(length / 2);
  return `${id.slice(0, half)}...${id.slice(-half)}`;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-slate-200 transition-colors"
      title="Copy to clipboard"
      type="button"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Clipboard className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
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
        className="fixed inset-0 flex items-center justify-center z-50 p-1 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
      >
        <div
          className="
            relative flex flex-col lg:flex-row w-full
            max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl
            h-screen sm:h-[95dvh] lg:h-[90vh]
            max-h-screen sm:max-h-[95dvh] lg:max-h-[700px]
            bg-white rounded-lg overflow-hidden shadow-2xl
          "
        >
          {/* Left Side - Confirmation Image */}
          <div className="
            relative w-full lg:w-2/5
            h-36 sm:h-56 md:h-64 lg:h-full
            min-h-[100px]
            flex-shrink-0
          ">
            <Image
              src="/images/bookingconfirmation.jpg?height=400&width=600"
              alt="Booking confirmed"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-left p-3 sm:p-6 lg:p-8">
              <div className="text-left text-white">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal leading-tight">
                  Booking
                  <br />
                  Confirmed
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Experience Summary */}
          <div className="flex-1 bg-stone-50 relative flex flex-col min-h-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-2 right-2
                sm:top-4 sm:right-4
                lg:top-6 lg:right-6
                text-slate-600 hover:text-slate-800 transition-colors z-10
                p-2
              "
              type="button"
              aria-label="Close confirmation"
              style={{ touchAction: "manipulation" }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 lg:p-8 pt-10 sm:pt-14 lg:pt-16">
              <div className="max-w-full sm:max-w-lg md:max-w-xl mx-auto">
                {/* Success Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-left mb-4 sm:mb-8">
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-sans font-normal text-slate-800 mb-2 sm:mb-4">
                    Experience Summary
                  </h3>
                </div>

                {/* Booking Details */}
                <div className="space-y-3 sm:space-y-6 mb-4 sm:mb-8">
                  {/* Experience */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">EXPERIENCE</span>
                    </div>
                    <p className="text-base sm:text-lg font-sans text-slate-800">{bookingDetails.experienceName}</p>
                  </div>
                  {/* Guests */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Users className="w-4 h-4 text-slate-600" />
                      <span className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">GUESTS</span>
                    </div>
                    <p className="text-base sm:text-lg font-sans text-slate-800">
                      {bookingDetails.guests} Person{bookingDetails.guests !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {/* Preferred Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">PREFERRED DATE</span>
                    </div>
                    <p className="text-base sm:text-lg font-sans text-slate-800">
                      {new Date(bookingDetails.preferredDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {/* Alternate Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">ALTERNATE DATE</span>
                    </div>
                    <p className="text-base sm:text-lg font-sans text-slate-800">
                      {new Date(bookingDetails.alternateDate).toLocaleDateString("en-US", {
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
                      <span className="text-xs sm:text-sm font-sans font-medium text-slate-600 uppercase tracking-wider mb-2 sm:mb-3 block">
                        WHAT'S INCLUDED?
                      </span>
                      <ul className="space-y-1 sm:space-y-2">
                        {bookingDetails.includedItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-800">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-4 sm:my-8" />

                {/* Email Confirmation */}
                <div className="mb-4 sm:mb-8">
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-4">
                    A detailed confirmation has been sent to{" "}
                    <span className="font-medium text-slate-800 break-all">{bookingDetails.email}</span>.
                    <br />
                    Please check your inbox (and your spam folder just in case).
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-2 sm:mb-4">
                    <span>Didn't receive the email?</span>
                  </div>
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    size="sm"
                    disabled={!emailSent}
                    className="w-full sm:w-auto border-slate-900 text-slate-900 hover:bg-slate-50 font-sans"
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
                <div className="bg-white rounded-lg p-2 sm:p-4 mb-4 sm:mb-8 border border-stone-200">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                      <span className="text-slate-600">Booking ID:</span>
                      <span className="text-slate-800 font-mono flex items-center break-all">
                        {shortenId(bookingDetails.bookingId)}
                        <CopyButton value={bookingDetails.bookingId} />
                      </span>
                    </div>
                    {bookingDetails.transactionId && (
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                        <span className="text-slate-600">Transaction ID:</span>
                        <span className="text-slate-800 font-mono flex items-center break-all">
                          {shortenId(bookingDetails.transactionId)}
                          <CopyButton value={bookingDetails.transactionId} />
                        </span>
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
