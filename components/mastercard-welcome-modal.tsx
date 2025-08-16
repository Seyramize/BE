"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

interface MastercardWelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onExplore?: () => void
  ctaHref?: string
  backgroundImageSrc?: string
}

/**
 * Fullscreen welcome modal for Mastercard Priceless experiences.
 * Centers left-aligned content over a photo background with a subtle gradient overlay.
 */
export function MastercardWelcomeModal({
  isOpen,
  onClose,
  onExplore,
  ctaHref = "/priceless",
  backgroundImageSrc = "/images/travelplanner.jpg",
}: MastercardWelcomeModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const ButtonContent = (
    <span className="inline-flex items-center gap-2">
      <span className="whitespace-nowrap">Explore Priceless<span className="align-super text-[8px] ml-0.5">TM</span> experiences</span>
      {/* Mastercard brand mark */}
      <span className="relative -mr-1 inline-flex items-center">
        <svg width="28" height="18" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="14" cy="12" r="10" fill="#EB001B" />
          <circle cx="24" cy="12" r="10" fill="#F79E1B" />
          <rect x="14" y="2" width="10" height="20" fill="#FF5F00" />
        </svg>
      </span>
    </span>
  )

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40" onClick={onClose} aria-hidden="true" />

      {/* Modal container (centered card, reduced size) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl h-[320px] sm:h-[420px] md:h-[420px] rounded-xl overflow-hidden shadow-2xl">
          {/* Background image */}
          <Image
            src={backgroundImageSrc}
            alt="Mastercard Priceless welcome"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay across all screens */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/0" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 text-white/90 hover:text-white transition-colors flex items-center gap-2 z-10"
            type="button"
            aria-label="Close mastercard welcome"
          >
            <span className="text-sm">Close</span>
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-2xl pb-4 sm:pb-0">
              <h1 className="text-white font-serif text-center sm:text-left font-normal leading-[0.9] text-4xl sm:text-4xl md:text-5xl mb-5">
                Got a
                <br />
                mastercard?
              </h1>
              <p className="text-white/90 font-sans text-sm text-center sm:text-left sm:text-base md:text-lg leading-relaxed mb-10 max-w-md">
                Explore Priceless<span className="align-super text-[8px] ml-0.5">TM</span> experience
                for Mastercard holders powered by Beyond Experiences
              </p>

              {onExplore ? (
                <button
                  onClick={onExplore}
                  type="button"
                  className="flex sm:inline-flex items-center justify-center mx-auto sm:mx-0 gap-2 bg-white text-black hover:bg-white/90 transition-colors rounded-xl px-5 py-3 text-sm sm:text-base shadow-sm"
                >
                  {ButtonContent}
                </button>
              ) : (
                <Link
                  href={ctaHref}
                  className="flex sm:inline-flex items-center justify-center mx-auto sm:mx-0 gap-2 bg-white text-black hover:bg-white/90 transition-colors rounded-xl px-5 py-3 text-sm sm:text-base shadow-sm"
                >
                  {ButtonContent}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MastercardWelcomeModal


