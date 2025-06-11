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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${isScrolled ? "py-2 md:py-1 lg:py-2" : "py-4 md:py-2 lg:py-4"}`}
    >
      <div className="container mx-auto px-4 md:px-2 lg:px-4 flex justify-center relative">
        {/* Logo positioned on the left */}
        <div className="absolute left-4 md:left-3 lg:left-4">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:inline-flex bg-white/10 rounded-lg px-4 md:px-2 lg:px-4 py-2 md:py-1 lg:py-2 shadow-lg items-center justify-center transition-all duration-300 backdrop-blur-md before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/15 before:to-transparent before:backdrop-blur-md ${
            isScrolled ? "bg-white/15" : "bg-white/5"
          }`}
        >
          <div className="flex items-center space-x-6 md:space-x-2 lg:space-x-6">
            <Link
              href="/"
              className={`relative text-white text-sm transition-all duration-300 font-sans group px-3 md:px-2 lg:px-3 py-1.5 md:py-1 lg:py-1.5 ${
                pathname === "/" 
                  ? "font-medium" 
                  : "hover:text-amber-100"
              }`}
            >
              <span className="relative z-10">{`Home`}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 ${
                pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
            <Link
              href="/experiences"
              className={`relative text-white text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/experiences" 
                  ? "font-medium" 
                  : "hover:text-amber-100"
              }`}
            >
              <span className="relative z-10">{`Experiences`}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 ${
                pathname === "/experiences" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
            <Link
              href="/about"
              className={`relative text-white text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/about" 
                  ? "font-medium" 
                  : "hover:text-amber-100"
              }`}
            >
              <span className="relative z-10">{`About Us`}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 ${
                pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
            <Link
              href="/journal"
              className={`relative text-white text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/journal" 
                  ? "font-medium" 
                  : "hover:text-amber-100"
              }`}
            >
              <span className="relative z-10">{`The Journal`}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 ${
                pathname === "/journal" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          className="md:hidden text-amber-400 p-2 absolute right-6 hover:bg-amber-50/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile menu overlay with slide-in animation */}
        <div className={`fixed inset-0 w-full min-h-screen z-[150] md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
          {/* Backdrop blur and overlay */}
          <div 
            className={`fixed inset-0 w-full min-h-screen backdrop-blur-lg bg-gradient-to-br from-black/40 to-black/30 transition-all duration-700 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100 backdrop-saturate-150' : 'opacity-0 backdrop-saturate-100'
            }`}
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Slide-in menu container */}
          <div
            className={`fixed top-0 right-0 h-[100dvh] w-4/5 max-w-sm bg-gradient-to-br from-amber-50/90 via-white/95 to-amber-100/80 backdrop-blur-2xl shadow-[0_0_50px_5px_rgba(251,191,36,0.15)] transform transition-all duration-700 ease-out origin-right rounded-l-2xl border border-amber-200/40 ${
              isMobileMenuOpen 
                ? 'translate-x-0 opacity-100 scale-100 rotate-0 shadow-[0_0_45px_5px_rgba(251,191,36,0.1)]' 
                : 'translate-x-[103%] opacity-0 scale-95 rotate-2 shadow-[0_0_45px_5px_rgba(251,191,36,0)]'
            }`}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 p-2 rounded-md text-amber-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Menu links */}
            <nav className="mt-16 px-2 space-y-4">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 ${
                  pathname === "/" ? "bg-amber-50 text-amber-600" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/experiences"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 ${
                  pathname === "/experiences" ? "bg-amber-50 text-amber-600" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 ${
                  pathname === "/about" ? "bg-amber-50 text-amber-600" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/journal"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 ${
                  pathname === "/journal" ? "bg-amber-50 text-amber-600" : ""
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
