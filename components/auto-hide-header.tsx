"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"

export function AutoHideHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we've scrolled enough to change appearance
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo positioned on the left */}
          <div>
            <Logo />
          </div>

          {/* Centered Navigation */}
          <nav
            className={`bg-black/30 backdrop-blur-md rounded-full px-5 py-2 shadow-lg transition-all duration-300 ${
              isScrolled ? "bg-black/50" : "bg-black/30"
            }`}
          >
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white text-sm hover:text-gray-200 transition-colors font-helvetica">
                Home
              </Link>
              <Link href="/experiences" className="text-white text-sm hover:text-gray-200 transition-colors font-helvetica">
                Experiences
              </Link>
              <Link href="/about" className="text-white text-sm hover:text-gray-200 transition-colors font-helvetica">
                About Us
              </Link>
            </div>
          </nav>

          {/* Right space for balance */}
          <div className="invisible">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden text-white p-1 ml-2 absolute right-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
