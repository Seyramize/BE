"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo positioned on the left */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Centered Navigation */}
          <nav
            className={`bg-black/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg transition-all duration-300 ${
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
          <div className="flex-1"></div>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden text-white p-2 ml-4">
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
