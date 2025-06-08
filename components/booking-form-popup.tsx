"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ExperienceData {
  title: string
  startingPrice: number
  minimumGuests: number
  heroImage: string
}

interface BookingFormPopupProps {
  experience: ExperienceData
  children: React.ReactNode
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
  location: string
  locationCountry: string
  preferredDate: string
  alternateDate: string
  guests: string[]
  customGuestCount: number
}

export function BookingFormPopup({ experience, children }: BookingFormPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"details" | "preferences" | "confirmation">("details")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    location: "",
    locationCountry: "GH",
    preferredDate: "",
    alternateDate: "",
    guests: [],
    customGuestCount: 0,
  })

  const guestOptions = ["One", "Two", "Three", "Four", "Five", "Six"]
  const totalGuests = formData.guests.length + (formData.customGuestCount > 0 ? formData.customGuestCount : 0)
  const totalCost = totalGuests * experience.startingPrice

  const handleInputChange = (field: keyof FormData, value: string | string[] | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleGuestSelection = (guest: string, checked: boolean) => {
    if (checked) {
      handleInputChange("guests", [...formData.guests, guest])
    } else {
      handleInputChange(
        "guests",
        formData.guests.filter((g) => g !== guest),
      )
    }
  }

  const validateStep = (currentStep: string): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === "details") {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email address is required"
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
      if (!formData.location.trim()) newErrors.location = "Location is required"
    }

    if (currentStep === "preferences") {
      if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required"
      if (formData.guests.length === 0 && formData.customGuestCount === 0) {
        newErrors.guests = "Please select number of guests"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      if (step === "details") {
        setStep("preferences")
      } else if (step === "preferences") {
        setStep("confirmation")
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      if (step === "details") {
        setStep("preferences")
      } else if (step === "preferences") {
        // Handle final submission
        console.log("Booking submitted:", formData)
        setStep("confirmation")
      }
    }
  }

  const resetForm = () => {
    setStep("details")
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "GH",
      location: "",
      locationCountry: "GH",
      preferredDate: "",
      alternateDate: "",
      guests: [],
      customGuestCount: 0,
    })
    setErrors({})
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          resetForm()
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-full h-[700px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Side - Experience Image */}
          <div className="relative w-2/5 h-full">
            <Image src="/images/zebra-booking-form.png" alt="Zebra safari experience" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-white">
                <p className="text-sm font-sans uppercase tracking-wider mb-4 opacity-90">YOU'RE BOOKING THE</p>
                <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight">
                  Eastern Safari
                  <br />
                  Experience
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-3/5 bg-stone-100 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-600 hover:text-slate-800 transition-colors z-10"
            >
              <span className="text-sm font-sans mr-2">Close</span>
              <X className="w-4 h-4 inline" />
            </button>

            <div className="p-8 pt-16 h-full flex flex-col">
              {step === "details" && (
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

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="mb-8">
                      <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">Your Details</h4>
                      <p className="text-slate-600 font-sans text-sm mb-6">
                        Please provide the information of the primary guest
                      </p>

                      <div className="space-y-6">
                        {/* Full Name */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Full name</label>
                          <Input
                            type="text"
                            placeholder="First and last names"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className={`w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 ${
                              errors.fullName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
                            className={`w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Phone number
                          </label>
                          <div className="flex gap-2">
                            <Select
                              value={formData.countryCode}
                              onValueChange={(value) => handleInputChange("countryCode", value)}
                            >
                              <SelectTrigger className="w-20 bg-white border-slate-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="GH">GH</SelectItem>
                                <SelectItem value="US">US</SelectItem>
                                <SelectItem value="UK">UK</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="tel"
                              placeholder="+1 (123) 000-000"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                              className={`flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 ${
                                errors.phoneNumber ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>

                        {/* Location */}
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Location</label>
                          <div className="flex gap-2">
                            <Select
                              value={formData.locationCountry}
                              onValueChange={(value) => handleInputChange("locationCountry", value)}
                            >
                              <SelectTrigger className="w-20 bg-white border-slate-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="GH">GH</SelectItem>
                                <SelectItem value="US">US</SelectItem>
                                <SelectItem value="UK">UK</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="text"
                              placeholder="Accra"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              className={`flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 ${
                                errors.location ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="mt-auto">
                      <Button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 text-sm"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {step === "preferences" && (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">Your Preferences</h4>
                    <p className="text-slate-600 font-sans text-sm mb-6">Tailor the finer details</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-6 mb-8">
                      {/* Date Selection */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Preferred date
                          </label>
                          <div className="relative">
                            <Input
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                              className={`w-full bg-white border-slate-200 text-slate-800 ${
                                errors.preferredDate ? "border-red-500" : ""
                              }`}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                        </div>

                        <div>
                          <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Alternate Date
                          </label>
                          <div className="relative">
                            <Input
                              type="date"
                              value={formData.alternateDate}
                              onChange={(e) => handleInputChange("alternateDate", e.target.value)}
                              className="w-full bg-white border-slate-200 text-slate-800"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-slate-800 font-sans text-sm font-medium">Number of guests</label>
                          <div className="text-right">
                            <div className="text-slate-800 font-sans text-sm">Cost</div>
                            <div className="text-2xl font-serif text-slate-800">${totalCost}</div>
                            <div className="text-xs text-slate-600">per person</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {guestOptions.map((guest) => (
                            <div key={guest} className="flex items-center space-x-2">
                              <Checkbox
                                id={guest}
                                checked={formData.guests.includes(guest)}
                                onCheckedChange={(checked) => handleGuestSelection(guest, checked as boolean)}
                                className="border-slate-400"
                              />
                              <label htmlFor={guest} className="text-sm font-sans text-slate-800">
                                {guest}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm text-slate-600 mb-4">
                          <button
                            type="button"
                            className="underline hover:text-slate-800"
                            onClick={() => {
                              // Handle "More than six guests" logic
                              console.log("More than six guests clicked")
                            }}
                          >
                            More than six guests?
                          </button>
                        </div>

                        {errors.guests && <p className="text-red-500 text-xs">{errors.guests}</p>}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-slate-900 text-slate-900 hover:bg-slate-50 font-sans py-3 text-sm"
                      >
                        Speak to a Travel Planner
                      </Button>
                      <Button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 text-sm"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {step === "confirmation" && (
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
