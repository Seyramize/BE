"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Users, MapPin, Phone, Mail, User, Settings, Banknote } from "lucide-react";
import { CountrySelector } from "@/components/country-selector";
import { LocationSelector } from "@/components/location-selector";
import { TravelPlannerModal } from "@/components/travel-planner-modal-clean";
import { PaymentConfirmationGroupModal } from "@/components/payment-confirmation-group-modal";
import { ActiveCounter } from "@/components/active-counter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingConfirmationGroupProps {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    id: string;
    title: string;
    totalPrice: number;
    heroImage: string;
    slug: string;
    groupPricing?: {
      fullPrice: number;
      paymentPlanInstallments: number;
    };
  };
  numberOfGuests: number;
  onBookingConfirmed: (guests: number) => void;
  activeCounter?: {
    totalSlots: number;
    availableSlots: number;
    spotsOpen: number;
    spotsTaken: number;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  countryDialCode: string;
  location: string;
  locationCountry: string;
  guests: string;
  paymentStyle: string;
}

export function BookingConfirmationGroup({
  isOpen,
  onClose,
  experience,
  numberOfGuests,
  onBookingConfirmed,
  activeCounter,
}: BookingConfirmationGroupProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [totalPrice, setTotalPrice] = useState(experience.totalPrice);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "GH",
    countryDialCode: "+233",
    location: "",
    locationCountry: "GH",
    guests: numberOfGuests.toString(),
    paymentStyle: "One Time Payment",
  });

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    }
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Calculate price based on guests and payment style
  useEffect(() => {
    const guestCount = parseInt(formData.guests) || 0;
    if (guestCount > 0) {
      const basePrice = experience.groupPricing?.fullPrice || 0;
      const totalBasePrice = basePrice * guestCount;
      
      if (formData.paymentStyle === "Installment Payment") {
        // For installment, show 1/3 of the total price
        setTotalPrice(parseFloat((totalBasePrice / 3).toFixed(2)));
      } else {
        // For one-time payment, show full price
        setTotalPrice(totalBasePrice);
      }
    }
  }, [formData.guests, formData.paymentStyle, experience.groupPricing?.fullPrice]);

  const guestOptions = Array.from({ length: 20 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1
  }));

  const getGuestCount = (guestOption: string): number => {
    const option = guestOptions.find(opt => opt.label === guestOption);
    return option ? option.value : 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.guests) {
      newErrors.guests = "Please select number of guests";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Open payment confirmation modal instead of redirecting to Stripe
    setIsPaymentModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "GH",
      countryDialCode: "+233",
      location: "",
      locationCountry: "GH",
      guests: numberOfGuests.toString(),
      paymentStyle: "One Time Payment",
    });
    setTotalPrice(experience.totalPrice);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Only show when payment modal is not open */}
      {!isPaymentModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
          aria-hidden="true"
          data-testid="modal-backdrop"
        />
      )}

      {/* Modal Container - Only show when payment modal is not open */}
      {!isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
        {/* Modal Content */}
        <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Left Side - Experience Image */}
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
                {activeCounter && (
                  <div className="mt-4">
                    <ActiveCounter
                      totalSlots={activeCounter.totalSlots}
                      availableSlots={activeCounter.availableSlots}
                      className="text-white"
                      textSize="text-sm"
                    />
                  </div>
                )}
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

            {/* Mobile Close Overlay */}
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
                      {/* Number of Guests and Payment Style */}
                      <div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                          {/* Number of Guests */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-5 h-5 text-slate-600" />
                              <label className="block text-slate-800 font-sans text-sm font-medium">
                                Number of guests
                              </label>
                            </div>
                            <Select
                              value={formData.guests}
                              onValueChange={(value) => handleInputChange("guests", value)}
                            >
                              <SelectTrigger className="w-full bg-white border-slate-200 text-slate-800 h-11">
                                <SelectValue placeholder="Select number of guests" />
                              </SelectTrigger>
                              <SelectContent>
                                {guestOptions.map((guest) => (
                                  <SelectItem key={guest.label} value={guest.label}>
                                    {guest.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                          </div>

                          {/* Payment Style */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Banknote className="w-5 h-5 text-slate-600" />
                              <label className="block text-slate-800 font-sans text-sm font-medium">
                                Payment Style
                              </label>
                            </div>
                            <Select
                              value={formData.paymentStyle}
                              onValueChange={(value) => handleInputChange("paymentStyle", value)}
                            >
                              <SelectTrigger className="w-full bg-white border-slate-200 text-slate-800 h-11">
                                <SelectValue placeholder="Select payment style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="One Time Payment">One Time Payment</SelectItem>
                                <SelectItem value="Installment Payment">Installment Payment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Total Cost */}
                          <div className="flex items-end">
                            <div className="flex flex-col gap-1 text-xs text-slate-600 w-full">
                              <div className="text-right">
                                <div className="text-slate-800 font-sans text-sm">
                                  {formData.paymentStyle === "Installment Payment" ? "First Payment" : "Total Cost"}
                                </div>
                                <div className="text-2xl sm:text-3xl font-sans text-slate-800">${totalPrice}</div>
                                {formData.paymentStyle === "Installment Payment" && (
                                  <div className="text-xs text-slate-500 mt-1">
                                    of ${(totalPrice * 3).toFixed(2)} total
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-black mb-4"></div>
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
                            className="border border-slate-900 text-slate-900 bg-white font-sans px-6 py-2 text-sm whitespace-nowrap min-w-[200px]"
                          >
                            Speak to a Travel Planner
                          </Button>
                        </TravelPlannerModal>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans py-3 h-12 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing..." : "Confirm Booking"}
                    </Button>
                    {errors.general && (
                      <div className="text-red-500 text-sm text-center px-4">
                        {errors.general}
                      </div>
                    )}
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
      )}

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationGroupModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onGoBack={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={(data) => {
          onBookingConfirmed(parseInt(formData.guests));
          setIsPaymentModalOpen(false);
          onClose();
        }}
        bookingDetails={{
          experienceName: experience.title,
          experienceImage: experience.heroImage,
          totalAmount: totalPrice,
          guests: parseInt(formData.guests),
          email: formData.email,
          fullName: formData.fullName,
          experienceId: experience.id,
          experienceSlug: experience.slug,
          countryDialCode: formData.countryDialCode,
          phoneNumber: formData.phoneNumber,
          paymentStyle: formData.paymentStyle,
          installmentTotal: formData.paymentStyle === "Installment Payment" ? 
            (experience.groupPricing?.fullPrice || 0) * parseInt(formData.guests) : undefined,
        }}
      />
    </>
  );
}