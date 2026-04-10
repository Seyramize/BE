"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  VICI_TABLE_PACKAGES,
  getViciPackageById,
} from "@/lib/vici-reservation-pricing";

interface JoinGuestlistReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceSlug: string;
  heroImage: string;
  title: string;
}

export function JoinGuestlistReservationModal({
  isOpen,
  onClose,
  experienceSlug,
  heroImage,
  title,
}: JoinGuestlistReservationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setEmail("");
      setPhone("");
      setGuests("1");
      setInstagramHandle("");
      setHowHeard("");
      setSpecialRequests("");
      setSelectedPackage("");
      setIsConfirmed(false);
      setShowSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isConfirmed) {
      toast.error("Please confirm you are 18+ and agree to complete payment via Paystack.");
      setIsSubmitting(false);
      return;
    }

    if (!fullName || !email || !phone || !guests) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!selectedPackage || !getViciPackageById(selectedPackage)) {
      toast.error("Please select a table package.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Directly redirect to Paystack for payment
      const res = await fetch("/api/create-vici-table-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          phone,
          guests: parseInt(guests),
          selectedPackage,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(
          typeof data.error === "string"
            ? data.error
            : "Could not start payment. Please try again."
        );
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("No payment link returned. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
        <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-2/5 h-48 lg:h-full flex-shrink-0">
            <Image
              src={heroImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-end justify-start lg:p-8 p-6 pb-8 lg:items-center lg:justify-center">
              <div className="text-left text-white">
                <p className="text-sm font-sans uppercase tracking-wider mb-2 opacity-90">
                  Book your table for
                </p>
                <h2 className="text-3xl lg:text-5xl font-serif font-normal leading-tight">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-stone-100 relative flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto min-h-0 p-6 lg:p-8">
              {showSuccess ? (
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <h2 className="text-3xl font-serif mb-4">You&apos;re in! 🥂</h2>
                  <p className="text-slate-600 mb-6 max-w-md">
                    Thank you—your table reservation for Vici Day Party has been
                    received.
                    <br />
                    <br />
                    Complete payment on the next screen or via Paystack from
                    your confirmation email.
                  </p>
                  <Button onClick={onClose} className="w-1/2">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                    type="button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-serif mb-4">Book this experience</h2>
                  <p className="text-slate-600 mb-6">
                    Choose your table package and pay securely with Paystack after
                    you submit your details.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select onValueChange={setGuests} value={guests}>
                          <SelectTrigger id="guests">
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={`${i + 1}`}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="instagram">
                        Instagram Handle (optional)
                      </Label>
                      <Input
                        id="instagram"
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Select your table package</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {VICI_TABLE_PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPackage(pkg.id)}
                            className={`relative rounded-lg p-4 text-left transition-all ${
                              selectedPackage === pkg.id
                                ? "bg-[#071428] border-transparent text-white"
                                : "border-2 border-stone-300 bg-white hover:border-stone-400 text-slate-800"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-28 h-28 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                                <Image
                                  src={heroImage || "/placeholder.svg"}
                                  alt={pkg.title}
                                  width={112}
                                  height={112}
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-1">
                                <p
                                  className={
                                    selectedPackage === pkg.id
                                      ? "text-sm uppercase tracking-wider text-white/90 mb-1"
                                      : "text-xs uppercase tracking-wider text-slate-600 mb-1"
                                  }
                                >
                                  {pkg.title}
                                </p>
                                <p
                                  className={
                                    selectedPackage === pkg.id
                                      ? "text-2xl font-semibold text-white"
                                      : "text-2xl font-semibold text-slate-800"
                                  }
                                >
                                  {pkg.priceLabel}
                                </p>
                              </div>

                              <div
                                className={`text-right max-w-[42%] sm:max-w-none ${
                                  selectedPackage === pkg.id
                                    ? "text-white/90"
                                    : "text-slate-600"
                                }`}
                              >
                                <p className="text-xs uppercase tracking-wider mb-1">
                                  Includes
                                </p>
                                {pkg.includes.map((line, i) => (
                                  <p key={i} className="text-xs">
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">
                        Special Requests or Notes (optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Dietary needs, seating preferences, or birthday shout-outs."
                      />
                    </div>
                    <div className="flex items-center space-x-4 pt-2">
                      <Checkbox
                        id="terms"
                        checked={isConfirmed}
                        onCheckedChange={(checked) =>
                          setIsConfirmed(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal text-slate-600 leading-tight"
                      >
                        I confirm I am 18+ and agree to complete payment via
                        Paystack to secure my table. I understand Vici may contact
                        me to finalize details.
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full pt-4"
                      disabled={isSubmitting || !isConfirmed || !selectedPackage}
                    >
                      {isSubmitting ? "Submitting…" : "Continue To Payment"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
