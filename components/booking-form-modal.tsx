"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

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
      setIsSubmitted(true)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="relative flex w-full max-w-5xl h-[90vh] max-h-[700px] bg-white rounded-lg overflow-hidden shadow-2xl">
          {/* Left Side - Experience Image */}
          <div className="relative w-2/5 h-full hidden md:block">
            <Image
              src={experience.heroImage || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-white">
                <p className="text-sm font-sans uppercase tracking-wider mb-4 opacity-90">YOU'RE BOOKING THE</p>
                <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight" id="booking-modal-title">
                  {experience.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 bg-stone-100 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-600 hover:text-slate-800 transition-colors z-10 flex items-center gap-2"
              type="button"
              aria-label="Close booking form"
            >
              <span className="text-sm font-sans">Close</span>
              <X className="w-4 h-4" />
            </button>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden bg-slate-800 text-white p-6 text-center">
              <p className="text-xs font-sans uppercase tracking-wider mb-2 opacity-90">YOU'RE BOOKING THE</p>
              <h2 className="text-2xl font-serif font-normal">{experience.title}</h2>
            </div>

            {!isSubmitted ? (
              <div className="h-full flex flex-col">
                {/* Fixed Header */}
                <div className="flex-shrink-0 p-8 pb-0 pt-16 border-b border-slate-200">
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

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 pt-6">
                  {/* Single Scrollable Form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Your Details Section */}
                    <div>
                      <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">Your Details</h4>
                      <p className="text-slate-600 font-sans text-sm mb-6">
                        Please provide the information of the primary guest
                      </p>

                      <div className="space-y-6">
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
                            className={`w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 ${
                              errors.fullName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email Address */}
                        <div>
                          <label htmlFor="email" className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Email address
                          </label>
                          <Input
                            id="email"
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
                          <label
                            htmlFor="phoneNumber"
                            className="block text-slate-800 font-sans text-sm font-medium mb-2"
                          >
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
                              id="phoneNumber"
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
                          <label htmlFor="location" className="block text-slate-800 font-sans text-sm font-medium mb-2">
                            Location
                          </label>
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
                              id="location"
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

                    {/* Your Preferences Section */}
                    <div>
                      <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">Your Preferences</h4>
                      <p className="text-slate-600 font-sans text-sm mb-6">Tailor the finer details</p>

                      <div className="space-y-6">
                        {/* Date Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              className={`w-full bg-white border-slate-200 text-slate-800 ${
                                errors.preferredDate ? "border-red-500" : ""
                              }`}
                            />
                            {errors.preferredDate && (
                              <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
                            )}
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
                              className="w-full bg-white border-slate-200 text-slate-800"
                            />
                          </div>
                        </div>

                        {/* Number of Guests */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="block text-slate-800 font-sans text-sm font-medium">
                              Number of guests
                            </label>
                            <div className="text-right">
                              <div className="text-slate-800 font-sans text-sm">Cost</div>
                              <div className="text-2xl font-serif text-slate-800">${totalCost}</div>
                              <div className="text-xs text-slate-600">per person</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            {guestOptions.map((guest) => (
                              <div key={guest} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={guest}
                                  name="guests"
                                  checked={formData.guests.includes(guest)}
                                  onChange={() => handleGuestSelection(guest)}
                                  className="w-4 h-4 text-slate-900 border-slate-400 focus:ring-slate-900"
                                />
                                <label htmlFor={guest} className="text-sm font-sans text-slate-800">
                                  {guest}
                                </label>
                              </div>
                            ))}
                          </div>

                          <div className="text-sm text-slate-600 mb-4 flex items-center gap-3">
                            <button
                              type="button"
                              className="underline hover:text-slate-800"
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
                                className="border-slate-900 text-slate-900 hover:bg-slate-50 font-sans px-3 py-1 text-xs"
                              >
                                Speak to a Travel Planner
                              </Button>
                            </TravelPlannerModal>
                          </div>

                          {errors.guests && <p className="text-red-500 text-xs">{errors.guests}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pb-8">
                      <TravelPlannerModal>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-slate-900 text-slate-900 hover:bg-slate-50 font-sans py-3 text-sm"
                        >
                          Speak to a Travel Planner
                        </Button>
                      </TravelPlannerModal>
                      <Button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 text-sm"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="flex flex-col h-full justify-center items-center text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-slate-800 mb-4">Booking Confirmed!</h3>
                <p className="text-slate-600 font-sans mb-6 max-w-md">
                  Thank you for your booking. You will receive a confirmation email shortly with all the details for
                  your {experience.title}.
                </p>
                <Button onClick={onClose} className="bg-slate-900 hover:bg-slate-800 text-white font-sans px-8 py-3">
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
