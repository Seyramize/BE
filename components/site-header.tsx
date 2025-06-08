"use client"

import { useState, useEffect, useRef } from "react"
import { Logo } from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY

      // Determine if we've scrolled enough to change appearance
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine scroll direction
      if (Math.abs(scrollDifference) > 5) {
        // Only react to significant scroll movements
        if (scrollDifference > 0) {
          setScrollDirection("down")
        } else {
          setScrollDirection("up")
        }
      }

      // Show navbar when scrolling up or at the very top
      if (currentScrollY <= 100) {
        setIsVisible(true)
      } else if (scrollDirection === "up") {
        setIsVisible(true)
      } else if (scrollDirection === "down" && currentScrollY > 200) {
        setIsVisible(false)
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to show navbar when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        if (currentScrollY > 100) {
          setIsVisible(true)
        }
      }, 150) // Show navbar 150ms after scrolling stops

      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [lastScrollY, scrollDirection])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${isScrolled ? "py-3" : "py-6"}`}
    >
      <div className="container mx-auto px-6 flex justify-center">
        {/* Logo positioned on the left */}
        <div className="absolute left-6 md:left-12">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:inline-flex bg-gray-500 rounded-full px-8 py-3 shadow-lg items-center justify-center transition-all duration-300 ${
            isScrolled ? "bg-gray-500/95 backdrop-blur-md" : "bg-gray-500"
          }`}
        >
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className={`text-white text-sm hover:text-gray-200 transition-colors font-sans ${
                pathname === "/" ? "font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/experiences"
              className={`text-white text-sm hover:text-gray-200 transition-colors font-sans ${
                pathname === "/experiences" ? "font-medium" : ""
              }`}
            >
              Experiences
            </Link>
            <Link
              href="/about"
              className={`text-white text-sm hover:text-gray-200 transition-colors font-sans ${
                pathname === "/about" ? "font-medium" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/journal"
              className={`text-white text-sm hover:text-gray-200 transition-colors font-sans ${
                pathname === "/journal" ? "font-medium" : ""
              }`}
            >
              The Journal
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          className="md:hidden text-white p-2 absolute right-6 hover:bg-gray-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile menu overlay with slide-in animation */}
        <div className={`fixed inset-0 z-50 md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
          {/* Backdrop blur and overlay */}
          <div 
            className={`absolute inset-0 backdrop-blur-md bg-black/50 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Slide-in menu container */}
          <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Menu links */}
            <nav className="mt-16 px-2 space-y-4">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                  pathname === "/" ? "bg-gray-50" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/experiences"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                  pathname === "/experiences" ? "bg-gray-50" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                  pathname === "/about" ? "bg-gray-50" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/journal"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                  pathname === "/journal" ? "bg-gray-50" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                The Journal
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
