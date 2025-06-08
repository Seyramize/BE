"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
  preferredContact: string
  experienceVision: string
  preferredDestination: string
  groupSize: string
  travelDates: string
  isFlexible: boolean
  groupSizeDetails: string
  additionalNotes: string
}

export default function CustomizeExperiencePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    preferredContact: "Email",
    experienceVision: "",
    preferredDestination: "Ghana",
    groupSize: "",
    travelDates: "",
    isFlexible: false,
    groupSizeDetails: "",
    additionalNotes: "",
  })
  const [hasHistory, setHasHistory] = useState(false)

  // Check if there's browser history available
  useEffect(() => {
    // Check if we have history to go back to
    const checkHistory = () => {
      try {
        // Check if there's a referrer or if we came from within the site
        const hasReferrer = document.referrer && document.referrer.includes(window.location.origin)
        const hasHistoryLength = window.history.length > 1
        setHasHistory(hasReferrer || hasHistoryLength)
      } catch (error) {
        console.warn("Could not check browser history:", error)
        setHasHistory(false)
      }
    }

    checkHistory()
  }, [])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Custom experience form submitted:", formData)
    // Handle form submission logic here

    // Show success message and redirect after submission
    alert(
      "Thank you! Your custom experience request has been submitted. Our travel planners will contact you within 24 hours.",
    )
    handleClose()
  }

  const handleClose = () => {
    console.log("Close button clicked")

    try {
      // First, try to go back in browser history
      if (hasHistory && window.history.length > 1) {
        console.log("Going back in history")
        router.back()
      } else {
        // If no history, redirect to experiences page
        console.log("No history available, redirecting to experiences page")
        router.push("/experiences")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback: redirect to experiences page
      window.location.href = "/experiences"
    }
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("ESC key pressed, closing page")
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [hasHistory])

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 overflow-hidden">
        {/* Abstract background with flowing shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/8 rounded-full blur-3xl transform translate-y-1/2"></div>
        </div>

        {/* Close button with multiple fallback options */}
        <div className="absolute top-6 right-6 z-10">
          {/* Primary close button */}
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 bg-black/20 hover:bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm"
            type="button"
            aria-label="Close customize experience page"
          >
            <span className="text-sm font-sans">Close</span>
            <X className="w-4 h-4" />
          </button>

          {/* Fallback link button (hidden but available for screen readers) */}
          <Link
            href="/experiences"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 text-white bg-black/50 px-3 py-2 rounded"
            aria-label="Return to experiences page"
          >
            Return to Experiences
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-stone-100 leading-tight">
              Tailor your
              <br />
              experience
            </h1>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-slate-800 mb-4">Crafted just for you</h2>
            <p className="text-slate-600 font-sans text-lg">
              Share your vision. We'll transform it into an unforgettable journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-serif font-normal text-slate-800 mb-2">Contact Details</h3>
              <p className="text-slate-600 font-sans mb-8">
                Your information allows us to begin crafting your tailored experience.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Full name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="First and last names"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Phone number
                  </label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => handleInputChange("countryCode", value)}
                    >
                      <SelectTrigger className="w-20 bg-white border-slate-200 h-12">
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
                      className="flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
                    />
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label htmlFor="preferredContact" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Preferred methods of contact
                  </label>
                  <Select
                    value={formData.preferredContact}
                    onValueChange={(value) => handleInputChange("preferredContact", value)}
                  >
                    <SelectTrigger className="w-full bg-white border-slate-200 h-12">
                      <SelectValue placeholder="Email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Experience Vision */}
            <div>
              <h3 className="text-2xl font-serif font-normal text-slate-800 mb-2">Experience Vision</h3>
              <p className="text-slate-600 font-sans mb-8">
                Let's dream together. Tell us what kind of journey you're hoping to create.
              </p>

              <div>
                <label htmlFor="experienceVision" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                  What type of experience are you dreaming of?
                </label>
                <Textarea
                  id="experienceVision"
                  placeholder="A romantic weekend? A culinary escape? A celebration with friends?..."
                  value={formData.experienceVision}
                  onChange={(e) => handleInputChange("experienceVision", e.target.value)}
                  className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 min-h-[120px] resize-none"
                />
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Preferred Destination */}
              <div>
                <label
                  htmlFor="preferredDestination"
                  className="block text-slate-800 font-sans text-sm font-medium mb-3"
                >
                  Preferred Destination (Optional)
                </label>
                <Select
                  value={formData.preferredDestination}
                  onValueChange={(value) => handleInputChange("preferredDestination", value)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 h-12">
                    <SelectValue placeholder="Ghana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="South Africa">South Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Group Size */}
              <div>
                <label htmlFor="groupSize" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                  Group Size
                </label>
                <Input
                  id="groupSize"
                  type="text"
                  placeholder="Insert a number (include yourself)"
                  value={formData.groupSize}
                  onChange={(e) => handleInputChange("groupSize", e.target.value)}
                  className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
                />
              </div>

              {/* Preferred Travel Dates */}
              <div>
                <label htmlFor="travelDates" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                  Preferred Travel Dates
                </label>
                <div className="relative">
                  <Input
                    id="travelDates"
                    type="text"
                    placeholder="Dates"
                    value={formData.travelDates}
                    onChange={(e) => handleInputChange("travelDates", e.target.value)}
                    className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                <div className="flex items-center mt-3">
                  <Checkbox
                    id="flexible"
                    checked={formData.isFlexible}
                    onCheckedChange={(checked) => handleInputChange("isFlexible", checked as boolean)}
                    className="border-slate-400"
                  />
                  <label htmlFor="flexible" className="ml-2 text-sm font-sans text-slate-800">
                    Flexible
                  </label>
                </div>
              </div>
            </div>

            {/* Group Size Details */}
            <div>
              <label htmlFor="groupSizeDetails" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                Group Size
              </label>
              <Input
                id="groupSizeDetails"
                type="text"
                placeholder="Group Size"
                value={formData.groupSizeDetails}
                onChange={(e) => handleInputChange("groupSizeDetails", e.target.value)}
                className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <h3 className="text-2xl font-serif font-normal text-slate-800 mb-2">Additional Notes</h3>
              <p className="text-slate-600 font-sans mb-8">
                Every detail matters. Is there anything else we should know to make this unforgettable?
              </p>

              <div>
                <label htmlFor="additionalNotes" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                  Tell us more
                </label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Special celebrations, must-haves, names of guests, or anything else on your mind..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 min-h-[120px] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-4 text-base h-14"
              >
                Tailor your experience
              </Button>
              <p className="text-center text-slate-600 font-sans text-sm mt-4">
                Our travel planners will be in touch within 24 hours to begin curating your bespoke journey.
              </p>
            </div>

            {/* Additional Close Options */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-sans px-6 py-2"
                >
                  Cancel and Return
                </Button>
                <Link href="/experiences">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-800 font-sans px-6 py-2"
                  >
                    Browse Experiences
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
