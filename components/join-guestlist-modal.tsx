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
import { GuestlistBookingConfirmationModal } from "@/components/guestlist-booking-confirmation-modal";

interface JoinGuestlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceSlug: string;
  heroImage: string;
  title: string;
}

export function JoinGuestlistModal({
  isOpen,
  onClose,
  experienceSlug,
  heroImage,
  title,
}: JoinGuestlistModalProps) {
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
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    name?: string;
    guests?: number;
    packageName?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form state when modal opens
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
      toast.error("Please confirm you are 18+ to continue.");
      setIsSubmitting(false);
      return;
    }

    if (!fullName || !email || !phone || !guests) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!selectedPackage) {
      toast.error("Please select a table package.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/join-guestlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          guests: parseInt(guests),
          instagramHandle,
          howHeard,
          specialRequests,
          selectedPackage: selectedPackage,
          experienceSlug,
        }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        setConfirmationData({
          name: fullName,
          guests: parseInt(guests),
          packageName: selectedPackage,
          email,
        });
        setConfirmationOpen(true);
      } else {
        const data = await response.json();
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPackageIncludes = (packageName: string): string[] => {
    const packages: Record<string, string[]> = {
      '10K': ['Veuve Rich x2', 'Agavita Reposado x1', 'Food Platter x1'],
      '15K': ['Veuve Rich x3', 'Agavita Reposado x1', 'Food Platter x1', 'Juice Pitcher x1', 'Shisha x1'],
      '20K': ['Veuve Rich x4', 'Casamigos x1', 'Food Platter x2', 'Juice Pitcher x1', 'Shisha x2'],
      '30K': ['Ace Of Spades x1', '1942 Tequila x1', 'Veuve Rich x2', 'Food Platter x2', 'Juice Pitcher x2', 'Shisha x3']
    };
    return packages[packageName] || [];
  };
  
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
        <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Left Side - Image */}
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
                  You're reserving a table for
                </p>
                <h2 className="text-3xl lg:text-5xl font-serif font-normal leading-tight">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 bg-stone-100 relative flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto min-h-0 p-6 lg:p-8">
              {showSuccess ? (
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <h2 className="text-3xl font-serif mb-4">You're in! 🥂</h2>
                  <p className="text-slate-600 mb-6 max-w-md">
                    Thank you for joining the Vici Day Party guest list.
                    <br />
                    <br />
                    We'll send your confirmation and event details shortly, get
                    ready for sunshine, music, and champagne.
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
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-serif mb-4">Reserve a Table</h2>
                  <p className="text-slate-600 mb-6">
                    Submit your details to reserve a table at Vici Day Party.
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
                        <Select onValueChange={setGuests} defaultValue={guests}>
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
                    
                    {/* Table Package Selection */}
                    <div>
                      <Label className="mb-3 block">Select Your Table Package</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {/* Table for Six */}
                        <button
                          type="button"
                          onClick={() => setSelectedPackage("10K")}
                          className={`relative rounded-lg p-4 text-left transition-all ${
                            selectedPackage === "10K"
                              ? "bg-[#071428] border-transparent text-white"
                              : "border-2 border-stone-300 bg-white hover:border-stone-400 text-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-28 h-28 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image
                                src={heroImage || "/placeholder.svg"}
                                alt="Table for Six"
                                width={112}
                                height={112}
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                                <p className={`${selectedPackage === "10K" ? "text-sm uppercase tracking-wider text-white/90 mb-1" : "text-xs uppercase tracking-wider text-slate-600 mb-1"}`}>
                                Table for Six
                              </p>
                              <p className={`${selectedPackage === "10K" ? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-slate-800"}`}>₵ 10K</p>
                            </div>

                            <div className={`text-right ${selectedPackage === "10K" ? "text-white/90" : "text-slate-600"}`}>
                              <p className="text-xs uppercase tracking-wider mb-1">Includes</p>
                              <p className="text-xs">Veuve Rich x2</p>
                              <p className="text-xs">Agavita Reposado x1</p>
                              <p className="text-xs">Food Platter x1</p>
                            </div>
                          </div>
                        </button>
                        
                        {/* Table for Eight */}
                        <button
                          type="button"
                          onClick={() => setSelectedPackage("15K")}
                          className={`relative rounded-lg p-4 text-left transition-all ${
                            selectedPackage === "15K"
                              ? "bg-[#071428] border-transparent text-white"
                              : "border-2 border-stone-300 bg-white hover:border-stone-400 text-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-28 h-28 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image
                                src={heroImage || "/placeholder.svg"}
                                alt="Table for Eight"
                                width={112}
                                height={112}
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <p className={`${selectedPackage === "15K" ? "text-sm uppercase tracking-wider text-white/90 mb-1" : "text-xs uppercase tracking-wider text-slate-600 mb-1"}`}>
                                Table for Eight
                              </p>
                              <p className={`${selectedPackage === "15K" ? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-slate-800"}`}>₵ 15K</p>
                            </div>

                            <div className={`text-right ${selectedPackage === "15K" ? "text-white/90" : "text-slate-600"}`}>
                              <p className="text-xs uppercase tracking-wider mb-1">Includes</p>
                              <p className="text-xs">Veuve Rich x3</p>
                              <p className="text-xs">Agavita Reposado x1</p>
                              <p className="text-xs">Food Platter x1</p>
                              <p className="text-xs">Juice Pitcher x1</p>
                              <p className="text-xs">Shisha x1</p>
                            </div>
                          </div>
                        </button>

                        {/* Table for Ten */}
                        <button
                          type="button"
                          onClick={() => setSelectedPackage("20K")}
                          className={`relative rounded-lg p-4 text-left transition-all ${
                            selectedPackage === "20K"
                              ? "bg-[#071428] border-transparent text-white"
                              : "border-2 border-stone-300 bg-white hover:border-stone-400 text-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-28 h-28 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image
                                src={heroImage || "/placeholder.svg"}
                                alt="Table for Ten"
                                width={112}
                                height={112}
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <p className={`${selectedPackage === "20K" ? "text-sm uppercase tracking-wider text-white/90 mb-1" : "text-xs uppercase tracking-wider text-slate-600 mb-1"}`}>
                                Table for Ten
                              </p>
                              <p className={`${selectedPackage === "20K" ? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-slate-800"}`}>₵ 20K</p>
                            </div>

                            <div className={`text-right ${selectedPackage === "20K" ? "text-white/90" : "text-slate-600"}`}>
                              <p className="text-xs uppercase tracking-wider mb-1">Includes</p>
                              <p className="text-xs">Veuve Rich x4</p>
                              <p className="text-xs">Casamigos x1</p>
                              <p className="text-xs">Food Platter x2</p>
                              <p className="text-xs">Juice Pitcher x1</p>
                              <p className="text-xs">Shisha x2</p>
                            </div>
                          </div>
                        </button>

                        {/* Table for Ten */}
                        <button
                          type="button"
                          onClick={() => setSelectedPackage("30K")}
                          className={`relative rounded-lg p-4 text-left transition-all ${
                            selectedPackage === "30K"
                              ? "bg-[#071428] border-transparent text-white"
                              : "border-2 border-stone-300 bg-white hover:border-stone-400 text-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-28 h-28 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image
                                src={heroImage || "/placeholder.svg"}
                                alt="Table for Ten"
                                width={112}
                                height={112}
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <p className={`${selectedPackage === "30K" ? "text-sm uppercase tracking-wider text-white/90 mb-1" : "text-xs uppercase tracking-wider text-slate-600 mb-1"}`}>
                                Table for Ten
                              </p>
                              <p className={`${selectedPackage === "30K" ? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-slate-800"}`}>₵ 30K</p>
                            </div>

                            <div className={`text-right ${selectedPackage === "30K" ? "text-white/90" : "text-slate-600"}`}>
                              <p className="text-xs uppercase tracking-wider mb-1">Includes</p>
                              <p className="text-xs">Ace Of Spades x1</p>
                              <p className="text-xs">1942 Tequila x1</p>
                              <p className="text-xs">Veuve Rich x2</p>
                              <p className="text-xs">Food Platter x2</p>
                              <p className="text-xs">Juice Pitcher x2</p>
                              <p className="text-xs">Shisha x3</p>
                            </div>
                          </div>
                        </button>
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
                        I understand this is a reservation request and Vici will contact me to finalize the booking.
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full pt-4"
                      disabled={isSubmitting || !isConfirmed || !selectedPackage}
                    >
                      {isSubmitting ? "Submitting..." : "Reserve a Table"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <GuestlistBookingConfirmationModal
        isOpen={confirmationOpen}
        onClose={() => {
          setConfirmationOpen(false);
          setConfirmationData(null);
          onClose();
        }}
        booking={confirmationData ? {
          name: confirmationData.name || '',
          email: confirmationData.email || '',
          guests: confirmationData.guests || 1,
          selectedPackage: confirmationData.packageName || '',
          packageIncludes: getPackageIncludes(confirmationData.packageName || '')
        } : null}
      />
    </>
  );
}