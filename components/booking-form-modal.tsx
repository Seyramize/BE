"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Calendar, Users, MapPin, Phone, Mail, User, Settings, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CountrySelector } from "@/components/country-selector"
import { LocationSelector } from "@/components/location-selector"
import { BookingPaymentFlow } from "@/components/booking-payment-flow"
import { TravelPlannerModal } from "@/components/travel-planner-modal-clean"

interface ExperienceData {
  title: string
  startingPrice: number
  minimumGuests: number
  heroImage: string
}

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
  experience: ExperienceData
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

export function BookingFormModal({ isOpen, onClose, experience }: BookingFormModalProps) {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false)
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

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !showPaymentFlow) {
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
  }, [isOpen, onClose, showPaymentFlow])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm()
      setShowPaymentFlow(false)
    }
  }, [isOpen])

  const guestOptions = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
    { label: "Six", value: 6 }
  ]

  // Calculate discount based on number of guests
  const calculateDiscount = (guestCount: number) => {
    if (guestCount >= 6) return 0.15 // 15% off for 6 or more
    if (guestCount >= 4) return 0.10 // 10% off for 4-5 guests
    if (guestCount >= 2) return 0.05 // 5% off for 2-3 guests
    return 0 // no discount for 1 guest
  }

  const getGuestCount = (guestOption: string): number => {
    const option = guestOptions.find(opt => opt.label === guestOption)
    return option ? option.value : 0
  }

  const selectedGuestCount = formData.guests.length > 0 ? getGuestCount(formData.guests[0]) : formData.customGuestCount
  const discount = calculateDiscount(selectedGuestCount)
  const discountedPrice = experience.startingPrice * (1 - discount)
  const totalCost = selectedGuestCount * discountedPrice

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

  const handleGuestSelection = (guest: string) => {
    handleInputChange("guests", [guest]) // Only allow one selection
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email address is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required"
    if (formData.guests.length === 0 && formData.customGuestCount === 0) {
      newErrors.guests = "Please select number of guests"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowPaymentFlow(true)
    }
  }

  const resetForm = () => {
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

  const handlePaymentFlowClose = () => {
    setShowPaymentFlow(false)
    onClose()
  }

  if (!isOpen) return null

  // Show payment flow if form is submitted
  if (showPaymentFlow) {
    return (
      <BookingPaymentFlow
        isOpen={true}
        onClose={handlePaymentFlowClose}
        bookingDetails={{
          experienceName: experience.title,
          experienceImage: experience.heroImage,
          guests: selectedGuestCount,
          date: formData.preferredDate,
          totalAmount: totalCost,
          email: formData.email,
          fullName: formData.fullName,
          includedItems: [
            "Private transportation with fuel",
            "Personal chaperone",
            "Curated lunch and dinner",
            "Restorative waterfall massage",
          ],
        }}
      />
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Modal Content */}
        <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden bg-slate-800 text-white p-4 text-center relative flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              type="button"
              aria-label="Close booking form"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-xs font-helvetica uppercase tracking-wider mb-2 opacity-90">YOU'RE BOOKING THE</p>
            <h2 className="text-xl font-argentt font-normal">{experience.title}</h2>
          </div>

          {/* Left Side - Experience Image (Hidden on mobile) */}
          <div className="relative w-full lg:w-2/5 h-48 lg:h-full hidden lg:block flex-shrink-0">
            <Image
              src={experience.heroImage || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-left text-white">
                <p className="text-sm font-helvetica uppercase tracking-wider mb-4 opacity-90">YOU'RE BOOKING THE</p>
                <h2 className="text-3xl xl:text-4xl font-argenttt font-normal leading-tight" id="booking-modal-title">
                  {experience.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Form Container */}
          <div className="flex-1 bg-stone-100 relative flex flex-col min-h-0">
            {/* Close Button - Desktop only */}
            <button
              onClick={onClose}
              className="hidden lg:flex absolute top-6 right-6 text-slate-600 hover:text-slate-800 transition-colors z-10 items-center gap-2"
              type="button"
              aria-label="Close booking form"
            >
              <span className="text-sm font-helvetica">Close</span>
              <X className="w-4 h-4" />
            </button>

            {/* Fixed Header */}
            <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 pb-4 pt-4 lg:pt-16 border-b border-slate-200">
              <h3 className="text-2xl sm:text-3xl font-argentttttttt font-normal text-slate-800 mb-3">
                Confirm
                <br />
                your booking
              </h3>
              <p className="text-slate-600 font-helvetica text-sm leading-relaxed">
                Complete your reservation and prepare
                <br className="hidden sm:block" />
                for a seamless, indulgent experience.
              </p>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  {/* Your Details Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-slate-600" />
                      <h4 className="text-lg sm:text-xl font-argenttttttttttttttttttt font-normal text-slate-800">Your Details</h4>
                    </div>
                    <p className="text-slate-600 font-helvetica text-sm mb-4 lg:mb-6">
                      Please provide the information of the primary guest
                    </p>

                    <div className="space-y-4 lg:space-y-6">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-slate-800 font-helvetica text-sm font-medium mb-2">
                          Full name
                        </label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="First and last names"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-11 ${
                            errors.fullName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label htmlFor="email" className="block text-slate-800 font-helvetica text-sm font-medium mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-11 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-slate-800 font-helvetica text-sm font-medium mb-2"
                        >
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone number
                        </label>
                        <div className="flex gap-2">
                          <CountrySelector
                            value={formData.countryCode}
                            onChange={(value: string) => handleInputChange("countryCode", value)}
                          />
                          <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className={`flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-11 ${
                              errors.phoneNumber ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                      </div>

                      {/* Location */}
                      <div>
                        <label htmlFor="location" className="block text-slate-800 font-helvetica text-sm font-medium mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
                        </label>
                        <LocationSelector
                          selectedCountry={formData.locationCountry}
                          location={formData.location}
                          onCountryChange={(value) => {
                            handleInputChange("locationCountry", value);
                            handleInputChange("location", ""); // Reset location when country changes
                          }}
                          onLocationChange={(value) => handleInputChange("location", value)}
                          error={errors.location}
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Your Preferences Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-slate-600" />
                      <h4 className="text-lg sm:text-xl font-argenttttttttttttttt font-normal text-slate-800">Your Preferences</h4>
                    </div>
                    <p className="text-slate-600 font-helvetica text-sm mb-4 lg:mb-6">Tailor the finer details</p>

                    <div className="space-y-4 lg:space-y-6">
                      {/* Date Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label
                            htmlFor="preferredDate"
                            className="block text-slate-800 font-helvetica text-sm font-medium mb-2"
                          >
                            Preferred date
                          </label>
                          <Input
                            id="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                            className={`w-50 bg-white border-slate-200 text-slate-800 h-11 ${
                              errors.preferredDate ? "border-red-500" : ""
                            }`}
                          />
                          {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                        </div>

                        <div>
                          <label
                            htmlFor="alternateDate"
                            className="block text-slate-800 font-helvetica text-sm font-medium mb-2"
                          >
                            Alternate Date
                          </label>
                          <Input
                            id="alternateDate"
                            type="date"
                            value={formData.alternateDate}
                            onChange={(e) => handleInputChange("alternateDate", e.target.value)}
                            className="w-50 bg-white border-slate-200 text-slate-800 h-11"
                          />
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-slate-600" />
                            <label className="block text-slate-800 font-helvetica text-sm font-medium">
                              Number of guests
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-8">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 flex-1">
                            {guestOptions.map((guest) => (
                              <div key={guest.label} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={guest.label}
                                  name="guests"
                                  checked={formData.guests.includes(guest.label)}
                                  onChange={() => handleGuestSelection(guest.label)}
                                  className="w-4 h-4 text-slate-900 border-black focus:ring-black"
                                />
                                <label htmlFor={guest.label} className="text-sm font-helvetica text-slate-800">
                                  {guest.label}
                                </label>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col gap-1 text-xs text-slate-600 mb-4">
                            <div className="text-right">
                              <div className="text-slate-800 font-helvetica text-sm">Total Cost</div>
                              <div className="text-2xl sm:text-3xl font-argenttt text-slate-800">${totalCost}</div>
                            </div>
                            <div>Price: ${discountedPrice.toFixed(2)}/person</div>
                          </div>
                        </div>
                        <div className="border-b border-black mb-4"></div>

                        {errors.guests && <p className="text-red-500 text-xs mb-4">{errors.guests}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pb-8">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <button
                          type="button"
                          className="underline hover:text-slate-800 text-slate-600 text-sm"
                          onClick={() => {
                            console.log("More than six guests clicked")
                          }}
                        >
                          More than six guests?
                        </button>
                        <TravelPlannerModal>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-slate-900 text-white hover:bg-slate-800 font-helvetica px-6 py-2 text-sm whitespace-nowrap min-w-[200px]"
                          >
                            Speak to a Travel Planner
                          </Button>
                        </TravelPlannerModal>
                      </div>
                    <Button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-helvetica py-3 h-12 text-sm sm:text-base"
                    >
                      Confirm Booking - ${totalCost}
                    </Button>
                    <p className="text-xs text-slate-500 text-center px-4">
                      By confirming, you agree to our terms and conditions. You'll be redirected to secure payment.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
