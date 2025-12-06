"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

interface GuestlistClosedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuestlistClosedModal({
  isOpen,
  onClose,
}: GuestlistClosedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="relative p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Guest List Closed
            </h2>
            <p className="text-slate-600 mb-4">
              The guest list for Vici Day Party is now closed.
            </p>
            <p className="text-slate-600 mb-4">
              Thank you for the incredible response.
            </p>
            <p className="text-slate-600 mb-6">
              Stay on the lookout, another edition is on the way. Follow us and
              keep an eye out for the next drop.
            </p>
            <a
              href="https://www.instagram.com/vicidayparty?igsh=MXB1aThreDVmc3o4Zg=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto border-slate-900 text-slate-900 bg-white font-sans px-6 py-4 rounded-lg flex items-center gap-2"
              >
                <FaInstagram size={20} />
                <span>Follow on Instagram</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
