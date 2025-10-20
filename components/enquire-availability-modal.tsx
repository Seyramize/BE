"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CountrySelector } from "@/components/country-selector"
import { LocationSelector } from "@/components/location-selector"

interface ExperienceData {
  title: string
  heroImage: string
  slug: string
}

interface EnquireAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  experience: ExperienceData
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
  countryDialCode: string
  location: string
  locationCountry: string
  preferredDate: string
  message: string
  numberOfGuests: number;
}

export function EnquireAvailabilityModal({ isOpen, onClose, experience }: EnquireAvailabilityModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    countryDialCode: "+233",
    location: "",
    locationCountry: "GH",
    preferredDate: "",
    message: "",
    numberOfGuests: 1,
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (experience.slug !== "december-in-ghana-castles-to-coastlines" && !formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
      message: "",
      numberOfGuests: 1,
    })
    setErrors({})
    setSubmitSuccess(false)
    setIsSubmitting(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/enquire-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          experienceName: experience.title,
          experienceSlug: experience.slug,
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        throw new Error('Failed to submit enquiry')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      setErrors({ submit: 'Failed to submit enquiry. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-sans font-semibold text-slate-800">
              Enquire for Availability
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {experience.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-sans font-semibold text-slate-800 mb-2">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-slate-600">
                We'll get back to you within 24 hours with availability details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Details Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-slate-600" />
                  <h4 className="text-lg font-sans font-normal text-slate-800">Your Details</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                      Number of Guests *
                    </label>
                    <Select
                      value={formData.numberOfGuests.toString()}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfGuests: parseInt(value, 10) }))}
                    >
                      <SelectTrigger className="w-full border-slate-300 focus:border-slate-900 focus:ring-slate-900">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(20)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <CountrySelector
                        value={formData.countryCode}
                        onChange={(country) => {
                          handleInputChange("countryCode", country.code)
                          handleInputChange("countryDialCode", country.dialCode)
                        }}
                        className="w-24"
                      />
                      <Input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="flex-1 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                        placeholder="Phone number"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                      Location *
                    </label>
                    <LocationSelector
                      selectedCountry={formData.locationCountry}
                      location={formData.location}
                      onCountryChange={(countryCode) => {
                        handleInputChange("locationCountry", countryCode)
                      }}
                      onLocationChange={(loc) => handleInputChange("location", loc)}
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>
                </div>
              </div>

              {/* Preferred Date */}
              {experience.slug !== "december-in-ghana-castles-to-coastlines" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-sans font-normal text-slate-800">Preferred Date</h4>
                </div>
                
                <div className="relative">
                  <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                    When would you like to experience this? *
                  </label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    className="w-44 sm:w-56 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                </div>
              </div>
              )}

              {/* Additional Message */}
              <div>
                <label className="block text-slate-800 font-sans text-sm font-medium mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:border-slate-900 focus:ring-slate-900 focus:outline-none"
                  rows={4}
                  placeholder="Tell us more about your requirements or any special requests..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 h-12 text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Enquire for Availability"}
                </Button>
                
                {errors.submit && (
                  <p className="text-red-500 text-xs mt-2 text-center">{errors.submit}</p>
                )}
                
                <p className="text-xs text-slate-500 text-center px-4 mt-2">
                  We'll check availability and get back to you within 24 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
