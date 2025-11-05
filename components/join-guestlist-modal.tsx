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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
          experienceSlug,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
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

  if (!isOpen) return null;

  return (
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
                You're joining the guestlist for
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
                <h2 className="text-3xl font-serif mb-4">You’re in! 🥂</h2>
                <p className="text-slate-600 mb-6 max-w-md">
                  Thank you for joining the Vici Summer Uncorked guest list.
                  <br />
                  <br />
                  We’ll send your confirmation and event details shortly, get
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
                <h2 className="text-2xl font-serif mb-4">Join the Guestlist</h2>
                <p className="text-slate-600 mb-6">
                  Submit your details to request a spot at Vici Summer Uncorked.
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
                  <div>
                    <Label htmlFor="howHeard">
                      How Did You Hear About Us? (optional)
                    </Label>
                    <Select onValueChange={setHowHeard} value={howHeard}>
                      <SelectTrigger id="howHeard">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Influencer">Influencer</SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Partner Brand">
                          Partner Brand
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                      I confirm that I am 18+ and understand that entry is
                      subject to confirmation and event capacity.
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full pt-4"
                    disabled={isSubmitting || !isConfirmed}
                  >
                    {isSubmitting ? "Submitting..." : "Join Guestlist"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
