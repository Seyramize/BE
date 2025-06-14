"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelector } from "@/components/country-selector"

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

export function TravelPlannerModal({ children }: TravelPlannerModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        countryCode: "GH",
        date: "",
        isFlexible: false,
        helpMessage: "",
      })
    }, 3000)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsSubmitted(false)
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
                src="/images/discovery-call-modal.png"
                alt="Professional travel planner with headset ready to assist"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="px-6 sm:px-8 md:px-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-argent font-normal text-white mb-2 leading-tight">
                    Talk to a<br />
                    travel planner
                  </h2>
                  <p className="text-white/90 font-helvetica text-sm sm:text-base leading-relaxed max-w-md">
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
                    <label className="block text-slate-800 font-helvetica text-sm font-medium mb-2">Full name</label>
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
                    <label className="block text-slate-800 font-helvetica text-sm font-medium mb-2">Email address</label>
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
                    <label className="block text-slate-800 font-helvetica text-sm font-medium mb-2">Phone number</label>
                    <div className="flex gap-2">
                      <CountrySelector
                        value={formData.countryCode}
                        onChange={(value) => handleInputChange("countryCode", value)}
                        className="w-30"
                      />
                      <Input
                        type="tel"
                        placeholder="+1(123) 000-000"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="flex-1 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-800 font-helvetica text-sm font-medium mb-2">Date</label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
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
                          className="text-sm font-helvetica text-slate-800 cursor-pointer"
                          onClick={() => handleInputChange("isFlexible", !formData.isFlexible)}
                        >
                          I'm flexible
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 font-helvetica text-sm font-medium mb-2">How can we help?</label>
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
                    className="w-full bg-[#0f1923] hover:bg-[#1a2836] text-white font-helvetica py-4 text-base h-14 rounded-md transition-colors"
                  >
                    Schedule my call
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full justify-center items-center text-center p-4 sm:p-6 md:p-8 bg-[#fdf6e9] py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-argent text-slate-800 mb-3 sm:mb-4">Call Scheduled!</h3>
            <p className="text-sm sm:text-base text-slate-600 font-helvetica mb-4 sm:mb-6 max-w-md">
              Thank you for scheduling a call with our travel planners. We'll be in touch within 24 hours to confirm
              your appointment and begin crafting your perfect experience.
            </p>
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
    </>
  )
}
