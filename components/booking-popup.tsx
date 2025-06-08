"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Users, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ExperienceData {
  title: string
  duration: string
  destinations: string
  maxGuests: string
  startingPrice: number
  minimumGuests: number
  heroImage: string
  overview: string
}

interface BookingPopupProps {
  experience: ExperienceData
  children: React.ReactNode
}

export function BookingPopup({ experience, children }: BookingPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"details" | "confirmation">("details")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    guests: experience.minimumGuests,
    preferredDate: "",
    specialRequests: "",
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirmation")
  }

  const totalPrice = formData.guests * experience.startingPrice

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-full h-[700px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Side - Experience Image and Info */}
          <div className="relative w-2/5 h-full">
            <Image
              src={experience.heroImage || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div>
                <p className="text-sm font-sans uppercase tracking-wider mb-4 opacity-90">YOU'RE BOOKING THE</p>
                <h2 className="text-3xl md:text-4xl font-serif font-normal leading-tight mb-6">{experience.title}</h2>
              </div>

              {/* Experience Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.destinations}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{experience.maxGuests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="w-3/5 bg-stone-50 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-600 hover:text-slate-800 transition-colors z-10"
            >
              <span className="text-sm font-sans mr-2">Close</span>
              <X className="w-4 h-4 inline" />
            </button>

            <div className="p-8 pt-16 h-full flex flex-col">
              {step === "details" ? (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-serif font-normal text-slate-800 mb-3">
                      Confirm
                      <br />
                      your booking
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Complete your reservation and prepare
                      <br />
                      for a seamless, indulgent experience.
                    </p>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-white rounded-lg p-4 mb-6 border border-slate-200">
                    <h4 className="font-serif text-lg text-slate-800 mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Experience:</span>
                        <span className="text-slate-800 font-medium">{experience.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Guests:</span>
                        <span className="text-slate-800">{formData.guests} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Price per person:</span>
                        <span className="text-slate-800">${experience.startingPrice}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-800">Total:</span>
                          <span className="text-slate-800">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">Your Details</h4>
                      <p className="text-slate-600 font-sans text-sm mb-6">
                        Please provide the information of the primary guest
                      </p>

                      <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Full name</label>
                          <Input
                            type="text"
                            placeholder="First and last names"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Email address
                          </label>
                          <Input
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Phone number
                          </label>
                          <Input
                            type="tel"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>

                        {/* Number of Guests */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Number of guests
                          </label>
                          <select
                            value={formData.guests}
                            onChange={(e) => handleInputChange("guests", Number.parseInt(e.target.value))}
                            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-800"
                            required
                          >
                            {Array.from({ length: 10 }, (_, i) => experience.minimumGuests + i).map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "guest" : "guests"}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Preferred Date */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Preferred date
                          </label>
                          <Input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                            className="w-full bg-white border-slate-200 text-slate-800"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-auto">
                      <Button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 text-sm"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                /* Confirmation Step */
                <div className="flex flex-col h-full justify-center items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800 mb-4">Booking Confirmed!</h3>
                  <p className="text-slate-600 font-sans mb-6">
                    Thank you for your booking. You will receive a confirmation email shortly with all the details.
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-sans px-8 py-3"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
