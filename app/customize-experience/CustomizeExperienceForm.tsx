"use client";

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
import { CountrySelector } from "@/components/country-selector"
import { toast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { getBookingDateLimits, isDateWithinBookingRange } from "@/lib/date-limits"

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
  experienceName?: string
}

export default function CustomizeExperienceForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const experienceFromQuery = searchParams.get("experience") || ""
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
    experienceName: experienceFromQuery,
  })
  const [hasHistory, setHasHistory] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { minDate, maxDate } = getBookingDateLimits()

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

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (experienceFromQuery) {
      setFormData((prev) => ({
        ...prev,
        experienceName: experienceFromQuery,
      }))
    }
  }, [experienceFromQuery])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for required fields
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.preferredContact.trim()) newErrors.preferredContact = "Preferred contact method is required";
    if (!formData.experienceVision.trim()) newErrors.experienceVision = "Experience vision is required";
    if (!formData.groupSize.trim()) newErrors.groupSize = "Group size is required";
    if (!formData.travelDates.trim()) {
      newErrors.travelDates = "Preferred travel dates are required";
    } else if (!isDateWithinBookingRange(formData.travelDates)) {
      newErrors.travelDates = `Preferred travel dates must be between ${minDate} and ${maxDate}`;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // There are errors, do not submit
      return;
    }

    try {
      const response = await fetch("/api/customize-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Request submitted!",
          description: "Our travel planners will contact you within 24 hours.",
          className: "bg-white dark:bg-slate-900 border-green-200 dark:border-green-700 shadow-xl",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const data = await response.json();
        toast({
          title: "Submission failed",
          description: data.error || "There was an error submitting your request. Please try again later.",
          className: "bg-white dark:bg-slate-900 border-red-200 dark:border-red-700 shadow-xl",
        });
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again later.",
        className: "bg-white dark:bg-slate-900 border-red-200 dark:border-red-700 shadow-xl",
      });
    }
  };

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
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-slate-900 overflow-hidden">
        {/* Abstract background with flowing shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/8 rounded-full blur-3xl transform translate-y-1/2"></div>
        </div>

        {/* Close button with scroll-based positioning */}
        <div 
          className="fixed top-6 right-6 z-50"
        >
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 bg-black/20 hover:bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm"
            type="button"
            aria-label="Close customize experience page"
          >
            <span className="text-sm font-sans">Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 bg-[url('/images/expereincecustomisation.png')] bg-cover bg-no-repeat bg-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="text-center relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-stone-100 leading-10">
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
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-slate-800 mb-4">Crafted just for you</h2>
            <p className="text-slate-600 font-sans text-lg">
              Share your vision. We'll transform it into an unforgettable journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-sans font-normal text-slate-800 mb-2">Contact Details</h3>
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
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Phone number
                  </label>
                  <div className="flex gap-2">
                    <CountrySelector
                      value={formData.countryCode}
                      onChange={(country) => handleInputChange("countryCode", country.code)}
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label htmlFor="preferredContact" className="block text-slate-800 font-sans text-sm font-medium mb-3">
                    Preferred methods of contact
                  </label>
                  <Select
                    value={formData.preferredContact}
                    onValueChange={(value: string) => handleInputChange("preferredContact", value)}
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
                  {errors.preferredContact && <p className="text-red-500 text-xs mt-1">{errors.preferredContact}</p>}
                </div>
              </div>
            </div>

            {/* Experience Vision */}
            <div>
              <h3 className="text-2xl font-sans font-normal text-slate-800 mb-2">Experience Vision</h3>
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
                {errors.experienceVision && <p className="text-red-500 text-xs mt-1">{errors.experienceVision}</p>}
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
                  onValueChange={(value: string) => handleInputChange("preferredDestination", value)}
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
                {errors.groupSize && <p className="text-red-500 text-xs mt-1">{errors.groupSize}</p>}
              </div>

              {/* Preferred Travel Dates */}
              <div>
                <label
                  htmlFor="travelDates"
                  className="block text-slate-800 font-sans text-sm font-medium mb-2"
                >
                  Preferred Travel Dates <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="travelDates"
                    type="date"
                    value={formData.travelDates}
                    onChange={(e) => handleInputChange("travelDates", e.target.value)}
                    min={minDate}
                    max={maxDate}
                    className={`w-75 bg-white border-slate-200 text-slate-800 h-12 ${
                      errors.travelDates ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.travelDates && <p className="text-red-500 text-xs mt-1">{errors.travelDates}</p>}
              </div>
            </div>
            {/* End of Travel Details */}
            <hr className="border-black my-8" />


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

          </form>
        </div>
      </section>
    </div>
  )
} 