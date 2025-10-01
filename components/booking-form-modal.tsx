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
import { BookingConfirmation } from "@/components/booking-confirmation"

interface ExperienceData {
  title: string
  totalPrice: number
  minimumGuests: number
  heroImage: string
  id: string
  slug: string
  pricing: {
    oneGuest: number
    twoGuests: number
    threeOrMoreGuests: number
  }
  numberOfGuests?: number
}

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
  experience: ExperienceData
  showConfirmation?: boolean
  bookingDetails?: any
  onBookingConfirmed?: (guests: number) => void // Callback for group experiences
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string // ISO code, e.g. 'GH'
  countryDialCode: string // Dial code, e.g. '+233'
  location: string
  locationCountry: string
  preferredDate: string
  alternateDate: string
  guests: string[]
  customGuestCount: number
}

export function BookingFormModal({ isOpen, onClose, experience, showConfirmation = false, bookingDetails, onBookingConfirmed }: BookingFormModalProps) {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    countryDialCode: "+233",
    location: "",
    locationCountry: "GH",
    preferredDate: "",
    alternateDate: "",
    guests: [],
    customGuestCount: 0,
  })

  useEffect(() => {
    if (experience.numberOfGuests) {
      const guestLabel = guestOptions.find(opt => opt.value === experience.numberOfGuests)?.label;
      if (guestLabel) {
        handleGuestSelection(guestLabel);
      }
    }
  }, [experience.numberOfGuests]);


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

  // Check if this is one of the special experiences that allows up to 10 guests
  const isSpecialExperience = experience.slug === "a-date-with-fashion" || experience.slug === "afrofuture";
  const maxGuests = isSpecialExperience ? 10 : 6;
  
  const guestOptions = Array.from({ length: maxGuests }, (_, i) => ({
    label: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"][i],
    value: i + 1
  }))

  const getGuestCount = (guestOption: string): number => {
    const option = guestOptions.find(opt => opt.label === guestOption)
    return option ? option.value : 0
  }

  const [totalCost, setTotalCost] = useState(experience.totalPrice)

  useEffect(() => {
    const guestCount =
      formData.guests.length > 0
        ? getGuestCount(formData.guests[0])
        : formData.customGuestCount

    if (guestCount > 0) {
      let pricePerGuest
      if (guestCount === 1) {
        pricePerGuest = experience.pricing.oneGuest
      } else if (guestCount === 2) {
        pricePerGuest = experience.pricing.twoGuests
      } else {
        pricePerGuest = experience.pricing.threeOrMoreGuests
      }
      const newTotalCost = pricePerGuest * guestCount
      setTotalCost(parseFloat(newTotalCost.toFixed(2)))
    } else {
      // If no guests are selected yet, use the initial total price from the prop
      setTotalCost(experience.totalPrice);
    }
  }, [formData.guests, formData.customGuestCount, experience.pricing, experience.totalPrice])

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
    if (!formData.alternateDate) newErrors.alternateDate = "Alternate date is required"
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
      countryDialCode: "+233",
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

  const handleBookingConfirmed = (guests: number) => {
    if (onBookingConfirmed) {
      onBookingConfirmed(guests)
    }
  }

  if (!isOpen) return null

  // Show payment flow if form is submitted
  if (showPaymentFlow) {
    return (
      <BookingPaymentFlow
        isOpen={true}
        onClose={handlePaymentFlowClose}
        {...(onBookingConfirmed && { onBookingConfirmed: handleBookingConfirmed })}
        bookingDetails={{
          experienceName: experience.title,
          experienceImage: experience.heroImage,
          guests: getGuestCount(formData.guests[0]) || formData.customGuestCount,
          preferredDate: formData.preferredDate,
          alternateDate: formData.alternateDate,
          totalAmount: totalCost,
          email: formData.email,
          fullName: formData.fullName,
          includedItems: [
            "Private transportation with fuel",
            "Personal chaperone",
            "Curated lunch and dinner",
            "Restorative waterfall massage",
          ],
          experienceId: experience.id,
          experienceSlug: experience.slug,
          countryDialCode: formData.countryDialCode, // <-- use dial code
          phoneNumber: formData.phoneNumber,
        }}
      />
    )
  }

  if (showConfirmation && bookingDetails) {
    // Show confirmation modal directly after payment
    return (
      <BookingConfirmation
        isOpen={isOpen}
        onClose={onClose}
        bookingDetails={bookingDetails}
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
          {/* Left Side - Experience Image (Now visible on mobile) */}
          <div className="relative w-full lg:w-2/5 h-48 lg:h-full flex-shrink-0">
            <Image
              src={experience.heroImage || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-end justify-start lg:p-8 p-6 pb-8 lg:items-center lg:justify-center">
              <div className="text-left text-white">
                <p className="text-sm font-sans uppercase tracking-wider mb-2 opacity-90">YOU'RE BOOKING THE</p>
                <h2 className="text-3xl lg:text-6xl xl:text-6xl font-serif font-normal leading-tight" id="booking-modal-title">
                  {experience.title} Experience
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
              <span className="text-sm font-sans">Close</span>
              <X className="w-4 h-4" />
            </button>

            {/* Mobile Close Overlay - content scrolls underneath */}
            <div className="lg:hidden absolute top-0 left-0 right-0 z-20 p-4 flex justify-end pointer-events-none">
              <div className="pointer-events-auto">
                <button
                  onClick={onClose}
                  className="text-black hover:text-gray-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                  type="button"
                  aria-label="Close booking form"
                >
                  <span className="text-xs font-sans">Close</span>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Close Button will be rendered inside scroll area above the header */}

            {/* Header moved into scrollable area for mobile as requested */}

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Spacer to avoid content hiding under absolute close overlay */}
                <div className="lg:hidden h-8" />
                <div className="pb-4 border-b border-slate-200">
                  <h3 className="text-2xl sm:text-3xl font-sans font-normal text-slate-800 mb-3">
                    Confirm
                    <br />
                    your booking
                  </h3>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    Complete your reservation and prepare 
                    <br className="sm:block" />
                    for a seamless, indulgent experience.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  {/* Your Details Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-slate-600" />
                      <h4 className="text-lg sm:text-xl font-sans font-normal text-slate-800">Your Details</h4>
                    </div>
                    <p className="text-slate-600 font-sans text-sm mb-4 lg:mb-6">
                      Please provide the information of the primary guest
                    </p>

                    <div className="space-y-4 lg:space-y-6">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-slate-800 font-sans text-sm font-medium mb-2">
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
                        <label htmlFor="email" className="block text-slate-800 font-sans text-sm font-medium mb-2">
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
                          className="block text-slate-800 font-sans text-sm font-medium mb-2"
                        >
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone number
                        </label>
                        <div className="flex gap-2">
                          <CountrySelector
                            value={formData.countryCode}
                            onChange={(country) => {
                              handleInputChange("countryCode", country.code);
                              handleInputChange("countryDialCode", country.dialCode);
                            }}
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
                        <label htmlFor="location" className="block text-slate-800 font-sans text-sm font-medium mb-2">
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
                      <h4 className="text-lg sm:text-xl font-sans font-normal text-slate-800">Your Preferences</h4>
                    </div>
                    <p className="text-slate-600 font-sans text-sm mb-4 lg:mb-6">Tailor the finer details</p>

                    <div className="space-y-4 lg:space-y-6">
                      {/* Date Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label
                            htmlFor="preferredDate"
                            className="block text-slate-800 font-sans text-sm font-medium mb-2"
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
                            className="block text-slate-800 font-sans text-sm font-medium mb-2"
                          >
                            Alternate Date
                          </label>
                          <Input
                            id="alternateDate"
                            type="date"
                            value={formData.alternateDate}
                            onChange={(e) => handleInputChange("alternateDate", e.target.value)}
                            className={`w-50 bg-white border-slate-200 text-slate-800 h-11${errors.alternateDate ? " border-red-500" : ""}`}
                          />
                          {errors.alternateDate && <p className="text-red-500 text-xs mt-1">{errors.alternateDate}</p>}
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-slate-600" />
                            <label className="block text-slate-800 font-sans text-sm font-medium">
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
                                  className="w-4 h-4 text-slate-900 border border-slate-400 focus:ring-black appearance-none rounded-none outline outline-1 outline-slate-400 checked:bg-slate-900 checked:border-white checked:outline-2 checked:outline-white"
                                />
                                <label htmlFor={guest.label} className="text-sm font-sans text-slate-800">
                                  {guest.label}
                                </label>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col gap-1 text-xs text-slate-600 mb-4">
                            <div className="text-right">
                              <div className="text-slate-800 font-sans text-sm">Total Cost</div>
                              <div className="text-2xl sm:text-3xl font-sans text-slate-800">${totalCost}</div>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-black mb-4"></div>

                        {errors.guests && <p className="text-red-500 text-xs mb-4">{errors.guests}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pb-8">
                      <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4 mb-4 w-full">
                        <button
                          type="button"
                          className="underline hover:text-slate-800 text-slate-600 text-sm self-start text-left"
                          onClick={() => {
                            console.log("More than six guests clicked")
                          }}
                        >
                          More than six guests?
                        </button>
                        <div className="flex-1 flex justify-end">
                          <TravelPlannerModal>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border border-slate-900 text-slate-900 bg-white  font-sans px-6 py-2 text-sm whitespace-nowrap min-w-[200px]"
                            >
                              Speak to a Travel Planner
                            </Button>
                          </TravelPlannerModal>
                        </div>
                      </div>
                    <Button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 h-12 text-sm sm:text-base"
                    >
                      Confirm Booking
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
