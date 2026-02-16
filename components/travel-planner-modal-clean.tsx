"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelector } from "@/components/country-selector"
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { getBookingDateLimits, isDateWithinCurrentYearAndNotPast } from "@/lib/date-limits"

interface TravelPlannerModalProps {
  children: React.ReactNode
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
  date: string
  isFlexible: boolean
  helpMessage: string
}

// Place this function inside or above your component
function validateForm(data: FormData) {
  const { minDate, maxDate } = getBookingDateLimits();

  if (!data.fullName.trim()) return "Full name is required.";
  if (!data.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Invalid email address.";
  if (!data.phoneNumber.trim()) return "Phone number is required.";

  // Phone number validation using libphonenumber-js
  const phoneNumber = parsePhoneNumberFromString(
    data.phoneNumber,
    data.countryCode as CountryCode
  );
  if (!phoneNumber || !phoneNumber.isValid()) {
    return "Please enter a valid phone number for the selected country.";
  }

  if (!data.date.trim() && !data.isFlexible) {
    return "Please select a date or mark as flexible.";
  }

  if (data.date.trim() && !isDateWithinCurrentYearAndNotPast(data.date)) {
    return `Date must be between ${minDate} and ${maxDate}.`;
  }

  return null;
}

export function TravelPlannerModal({ children }: TravelPlannerModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast();
  const { minDate, maxDate } = getBookingDateLimits();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    date: "",
    isFlexible: false,
    helpMessage: "",
  })

  // Component mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle ESC key and body scroll
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validateForm(formData);
    if (errorMsg) {
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/travel-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        toast({
          title: "Call booked!",
          description: "We've received your request. Check your email for confirmation.",
          variant: "default",
        });
      } else {
        const errorData = await res.json();
        toast({
          title: "Something went wrong",
          description: errorData?.error || "We couldn't schedule your call. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Network error",
        description: err?.message || "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsSubmitted(false)
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "GH",
      date: "",
      isFlexible: false,
      helpMessage: "",
    })
  }

  if (!mounted) {
    return children
  }

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div ref={modalRef} className="relative w-full max-w-[95%] sm:max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-black hover:text-gray-200 transition-colors rounded-full p-2"
          type="button"
          aria-label="Close travel planner modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Hero Section */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src="/images/travelplanner.jpg"
                alt="Professional travel planner with headset ready to assist"
                className="w-full h-full object-cover object-top sm:object-position:50%_20% md:object-position:40%_30%"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="px-6 sm:px-8 md:px-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-white mb-2 leading-tight">
                    Talk to a<br />
                    travel planner
                  </h2>
                  <p className="text-white/90 font-sans text-sm sm:text-base leading-relaxed max-w-md">
                    Schedule a complimentary call with our travel planners to begin crafting your bespoke experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-[#fdf6e9] p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Full name</label>
                    <Input
                      type="text"
                      placeholder="First and last names"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Email address</label>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Phone number</label>
                    <div className="flex gap-2">
                      <CountrySelector
                        value={formData.countryCode}
                        onChange={(country) => handleInputChange("countryCode", country.code)}
                        className="w-30"
                      />
                      <Input
                        type="tel"
                        placeholder="123-000-000"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Date</label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          min={minDate}
                          max={maxDate}
                          className="w-50 bg-white border-slate-200 text-slate-800 h-12 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 border rounded flex items-center justify-center mr-2 cursor-pointer ${
                            formData.isFlexible ? "bg-slate-900 border-slate-900" : "bg-white border-slate-300"
                          }`}
                          onClick={() => handleInputChange("isFlexible", !formData.isFlexible)}
                        >
                          {formData.isFlexible && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <label
                          className="text-sm font-sans text-slate-800 cursor-pointer"
                          onClick={() => handleInputChange("isFlexible", !formData.isFlexible)}
                        >
                          I'm flexible
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 font-sans text-sm font-medium mb-2">How can we help?</label>
                  <Textarea
                    placeholder="Tell us about your ideal getaway, special occasions, or questions"
                    value={formData.helpMessage}
                    onChange={(e) => handleInputChange("helpMessage", e.target.value)}
                    className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 min-h-[100px] rounded-md resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0f1923] hover:bg-[#1a2836] text-white font-sans py-4 text-base h-14 rounded-md transition-colors"
                  >
                    Schedule my call
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-row w-full bg-white min-h-[10rem]">
            {/* Left: Image */}
            <div className="w-[40%] h-40 sm:h-auto">
              <img
                src="/images/travelplanner.jpg"
                alt="Travel planner on a call"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Message Panel */}
            <div className="flex-1 bg-[#fdf6e9] flex items-center">
              <div className="p-6 sm:p-8">
                <h3 className="text-3xl sm:text-5xl font-normal font-serif text-[#0f1923] mb-2">Call booked!</h3>
                <p className="text-sm sm:text-base text-slate-700 max-w-md">
                  One of our travel planners will reach out shortly to confirm your call and begin your journey.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null

  return (
    <>
      <div onClick={handleClick} style={{ display: "inline-block", cursor: "pointer" }}>
        {children}
      </div>
      {mounted && modalContent && createPortal(modalContent, document.body)}
      <Toaster />
    </>
  )
}
