"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface GuestlistReservationBookingConfirmation {
  name: string;
  email: string;
  phone: string;
  guests: number;
  selectedPackage: string;
  priceLabel: string;
  packageIncludes: string[];
}

interface GuestlistReservationBookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: GuestlistReservationBookingConfirmation | null;
}

export function GuestlistReservationBookingConfirmationModal({
  isOpen,
  onClose,
  booking,
}: GuestlistReservationBookingConfirmationModalProps) {
  if (!isOpen || !booking) return null;

  const {
    name,
    email,
    phone,
    guests,
    selectedPackage,
    priceLabel,
    packageIncludes,
  } = booking;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#efe6d3] rounded-xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="relative h-48 w-full">
          <Image
            src="/images/conimg.jpg"
            alt="Header"
            fill
            className="object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow flex items-center justify-center z-10">
            <Image
              src="/images/vicilogo.png"
              alt="VICI Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-2 w-full text-center text-white px-4 z-10">
            <h3 className="text-xl font-serif mb-1">Reservation<br />Completed</h3>
            <p className="text-xs max-w-xs mx-auto leading-relaxed">
              🎉 Your table is confirmed! A confirmation and payment receipt have been sent to your email.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-4 text-[#071428]">Summary</h4>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[10px] uppercase text-slate-600 tracking-wide">Name</p>
              <div className="flex justify-between items-center py-1 border-b border-neutral-400">
                <span className="text-sm font-medium">{name}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase text-slate-600 tracking-wide">Guests</p>
              <div className="flex justify-between items-center py-1 border-b border-neutral-400">
                <span className="text-sm font-medium">{guests}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase text-slate-600 tracking-wide">Table package</p>
              <div className="flex justify-between items-center py-1 border-b border-neutral-400">
                <span className="text-sm font-medium">{selectedPackage}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase text-slate-600 tracking-wide">Amount</p>
              <div className="flex justify-between items-center py-1 border-b border-neutral-400">
                <span className="text-sm font-medium">{priceLabel}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[10px] uppercase text-slate-600 tracking-wide mb-2">Package includes</p>
            <ul className="text-sm space-y-1">
              {packageIncludes && packageIncludes.length > 0 ? (
                packageIncludes.map((item, index) => (
                  <li key={index} className="text-slate-700">{item}</li>
                ))
              ) : (
                <li className="text-slate-500">No items</li>
              )}
            </ul>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 text-xs text-[#071428] leading-relaxed">
              <p>Confirmation sent to</p>
              <p className="font-semibold">{email}</p>
            </div>

            <Button
              variant="default"
              className="rounded-lg px-4 shrink-0"
              onClick={() =>
                (window.location.href = `mailto:concierge@experiencesbybeyond.com?subject=Reservation%20for%20the%20Vici%20Day%20Party&body=I%20need%20help%20with%20my%20booking.`)
              }
            >
              Need help?
            </Button>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-700 mb-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 border px-3 py-1 rounded-md text-xs"
              onClick={() => window.open("https://instagram.com/vicidayparty", "_blank")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Follow @vicidayparty
            </Button>
          </div>

          <Button onClick={onClose} variant="outline" className="w-full">
            Done
          </Button>
        </div>

      </div>
    </div>
  );
}
