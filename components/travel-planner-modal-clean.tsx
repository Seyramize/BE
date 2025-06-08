"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors rounded-full p-2"
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mb-2 leading-tight">
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
                      <select
                        value={formData.countryCode}
                        onChange={(e) => handleInputChange("countryCode", e.target.value)}
                        className="w-20 h-12 pl-3 pr-8 border border-slate-200 rounded-md bg-white text-sm"
                      >
                        <option value="AD">AD</option>
                        <option value="AE">AE</option>
                        <option value="AF">AF</option>
                        <option value="AG">AG</option>
                        <option value="AI">AI</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AO">AO</option>
                        <option value="AQ">AQ</option>
                        <option value="AR">AR</option>
                        <option value="AS">AS</option>
                        <option value="AT">AT</option>
                        <option value="AU">AU</option>
                        <option value="AW">AW</option>
                        <option value="AX">AX</option>
                        <option value="AZ">AZ</option>
                        <option value="BA">BA</option>
                        <option value="BB">BB</option>
                        <option value="BD">BD</option>
                        <option value="BE">BE</option>
                        <option value="BF">BF</option>
                        <option value="BG">BG</option>
                        <option value="BH">BH</option>
                        <option value="BI">BI</option>
                        <option value="BJ">BJ</option>
                        <option value="BL">BL</option>
                        <option value="BM">BM</option>
                        <option value="BN">BN</option>
                        <option value="BO">BO</option>
                        <option value="BQ">BQ</option>
                        <option value="BR">BR</option>
                        <option value="BS">BS</option>
                        <option value="BT">BT</option>
                        <option value="BV">BV</option>
                        <option value="BW">BW</option>
                        <option value="BY">BY</option>
                        <option value="BZ">BZ</option>
                        <option value="CA">CA</option>
                        <option value="CC">CC</option>
                        <option value="CD">CD</option>
                        <option value="CF">CF</option>
                        <option value="CG">CG</option>
                        <option value="CH">CH</option>
                        <option value="CI">CI</option>
                        <option value="CK">CK</option>
                        <option value="CL">CL</option>
                        <option value="CM">CM</option>
                        <option value="CN">CN</option>
                        <option value="CO">CO</option>
                        <option value="CR">CR</option>
                        <option value="CU">CU</option>
                        <option value="CV">CV</option>
                        <option value="CW">CW</option>
                        <option value="CX">CX</option>
                        <option value="CY">CY</option>
                        <option value="CZ">CZ</option>
                        <option value="DE">DE</option>
                        <option value="DJ">DJ</option>
                        <option value="DK">DK</option>
                        <option value="DM">DM</option>
                        <option value="DO">DO</option>
                        <option value="DZ">DZ</option>
                        <option value="EC">EC</option>
                        <option value="EE">EE</option>
                        <option value="EG">EG</option>
                        <option value="EH">EH</option>
                        <option value="ER">ER</option>
                        <option value="ES">ES</option>
                        <option value="ET">ET</option>
                        <option value="FI">FI</option>
                        <option value="FJ">FJ</option>
                        <option value="FK">FK</option>
                        <option value="FM">FM</option>
                        <option value="FO">FO</option>
                        <option value="FR">FR</option>
                        <option value="GA">GA</option>
                        <option value="GB">GB</option>
                        <option value="GD">GD</option>
                        <option value="GE">GE</option>
                        <option value="GF">GF</option>
                        <option value="GG">GG</option>
                        <option value="GH">GH</option>
                        <option value="GI">GI</option>
                        <option value="GL">GL</option>
                        <option value="GM">GM</option>
                        <option value="GN">GN</option>
                        <option value="GP">GP</option>
                        <option value="GQ">GQ</option>
                        <option value="GR">GR</option>
                        <option value="GS">GS</option>
                        <option value="GT">GT</option>
                        <option value="GU">GU</option>
                        <option value="GW">GW</option>
                        <option value="GY">GY</option>
                        <option value="HK">HK</option>
                        <option value="HM">HM</option>
                        <option value="HN">HN</option>
                        <option value="HR">HR</option>
                        <option value="HT">HT</option>
                        <option value="HU">HU</option>
                        <option value="ID">ID</option>
                        <option value="IE">IE</option>
                        <option value="IL">IL</option>
                        <option value="IM">IM</option>
                        <option value="IN">IN</option>
                        <option value="IO">IO</option>
                        <option value="IQ">IQ</option>
                        <option value="IR">IR</option>
                        <option value="IS">IS</option>
                        <option value="IT">IT</option>
                        <option value="JE">JE</option>
                        <option value="JM">JM</option>
                        <option value="JO">JO</option>
                        <option value="JP">JP</option>
                        <option value="KE">KE</option>
                        <option value="KG">KG</option>
                        <option value="KH">KH</option>
                        <option value="KI">KI</option>
                        <option value="KM">KM</option>
                        <option value="KN">KN</option>
                        <option value="KP">KP</option>
                        <option value="KR">KR</option>
                        <option value="KW">KW</option>
                        <option value="KY">KY</option>
                        <option value="KZ">KZ</option>
                        <option value="LA">LA</option>
                        <option value="LB">LB</option>
                        <option value="LC">LC</option>
                        <option value="LI">LI</option>
                        <option value="LK">LK</option>
                        <option value="LR">LR</option>
                        <option value="LS">LS</option>
                        <option value="LT">LT</option>
                        <option value="LU">LU</option>
                        <option value="LV">LV</option>
                        <option value="LY">LY</option>
                        <option value="MA">MA</option>
                        <option value="MC">MC</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MF">MF</option>
                        <option value="MG">MG</option>
                        <option value="MH">MH</option>
                        <option value="MK">MK</option>
                        <option value="ML">ML</option>
                        <option value="MM">MM</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MP">MP</option>
                        <option value="MQ">MQ</option>
                        <option value="MR">MR</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="MU">MU</option>
                        <option value="MV">MV</option>
                        <option value="MW">MW</option>
                        <option value="MX">MX</option>
                        <option value="MY">MY</option>
                        <option value="MZ">MZ</option>
                        <option value="NA">NA</option>
                        <option value="NC">NC</option>
                        <option value="NE">NE</option>
                        <option value="NF">NF</option>
                        <option value="NG">NG</option>
                        <option value="NI">NI</option>
                        <option value="NL">NL</option>
                        <option value="NO">NO</option>
                        <option value="NP">NP</option>
                        <option value="NR">NR</option>
                        <option value="NU">NU</option>
                        <option value="NZ">NZ</option>
                        <option value="OM">OM</option>
                        <option value="PA">PA</option>
                        <option value="PE">PE</option>
                        <option value="PF">PF</option>
                        <option value="PG">PG</option>
                        <option value="PH">PH</option>
                        <option value="PK">PK</option>
                        <option value="PL">PL</option>
                        <option value="PM">PM</option>
                        <option value="PN">PN</option>
                        <option value="PR">PR</option>
                        <option value="PS">PS</option>
                        <option value="PT">PT</option>
                        <option value="PW">PW</option>
                        <option value="PY">PY</option>
                        <option value="QA">QA</option>
                        <option value="RE">RE</option>
                        <option value="RO">RO</option>
                        <option value="RS">RS</option>
                        <option value="RU">RU</option>
                        <option value="RW">RW</option>
                        <option value="SA">SA</option>
                        <option value="SB">SB</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="SE">SE</option>
                        <option value="SG">SG</option>
                        <option value="SH">SH</option>
                        <option value="SI">SI</option>
                        <option value="SJ">SJ</option>
                        <option value="SK">SK</option>
                        <option value="SL">SL</option>
                        <option value="SM">SM</option>
                        <option value="SN">SN</option>
                        <option value="SO">SO</option>
                        <option value="SR">SR</option>
                        <option value="SS">SS</option>
                        <option value="ST">ST</option>
                        <option value="SV">SV</option>
                        <option value="SX">SX</option>
                        <option value="SY">SY</option>
                        <option value="SZ">SZ</option>
                        <option value="TC">TC</option>
                        <option value="TD">TD</option>
                        <option value="TF">TF</option>
                        <option value="TG">TG</option>
                        <option value="TH">TH</option>
                        <option value="TJ">TJ</option>
                        <option value="TK">TK</option>
                        <option value="TL">TL</option>
                        <option value="TM">TM</option>
                        <option value="TN">TN</option>
                        <option value="TO">TO</option>
                        <option value="TR">TR</option>
                        <option value="TT">TT</option>
                        <option value="TV">TV</option>
                        <option value="TW">TW</option>
                        <option value="TZ">TZ</option>
                        <option value="UA">UA</option>
                        <option value="UG">UG</option>
                        <option value="UM">UM</option>
                        <option value="US">US</option>
                        <option value="UY">UY</option>
                        <option value="UZ">UZ</option>
                        <option value="VA">VA</option>
                        <option value="VC">VC</option>
                        <option value="VE">VE</option>
                        <option value="VG">VG</option>
                        <option value="VI">VI</option>
                        <option value="VN">VN</option>
                        <option value="VU">VU</option>
                        <option value="WF">WF</option>
                        <option value="WS">WS</option>
                        <option value="YE">YE</option>
                        <option value="YT">YT</option>
                        <option value="ZA">ZA</option>
                        <option value="ZM">ZM</option>
                        <option value="ZW">ZW</option>
                      </select>
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
                    <label className="block text-slate-800 font-sans text-sm font-medium mb-2">Date</label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="mm/yy"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="w-full bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 rounded-md pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
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
          <div className="flex flex-col h-full justify-center items-center text-center p-4 sm:p-6 md:p-8 bg-[#fdf6e9] py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-800 mb-3 sm:mb-4">Call Scheduled!</h3>
            <p className="text-sm sm:text-base text-slate-600 font-sans mb-4 sm:mb-6 max-w-md">
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
