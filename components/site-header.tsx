"use client"

import { useState, useEffect, useRef } from "react"
import { Logo } from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { Menu, X, } from "lucide-react"
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiX, SiThreads, SiFacebook } from "react-icons/si";



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
        <div className="absolute left-4 md:left-3 lg:left-4 scale-[0.8] md:scale-65 lg:scale-75">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:inline-flex bg-[#0b1b28]/[0.375] rounded-lg px-14 md:px-8 lg:px-12 py-1 md:py-1 lg:py-1 items-center justify-center transition-all duration-300 backdrop-blur-md ${
            isScrolled ? "bg-[#0b1b28]/[0.4]" : "bg-[#0b1b28]/[0.35]"
          }`}
        >
          <div className="flex items-center space-x-12 md:space-x-6 lg:space-x-12">
            <Link
              href="/"
              className={`relative text-sm transition-all duration-300 font-sans group px-3 md:px-2 lg:px-3 py-1.5 md:py-1 lg:py-1.5 ${
                pathname === "/" ? "text-blue-950 font-medium" : "text-white hover:text-blue-900"
              }`}
            >
              <span className="relative z-10">{`Home`}</span>
            </Link>
            <Link
              href="/experiences"
              className={`relative text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/experiences" ? "text-blue-950 font-medium" : "text-white hover:text-blue-900"
              }`}
            >
              <span className="relative z-10">{`Experiences`}</span>
            </Link>
            <Link
              href="/about"
              className={`relative text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/about" ? "text-blue-950 font-medium" : "text-white hover:text-blue-900"
              }`}
            >
              <span className="relative z-10">{`About Us`}</span>
            </Link>
            <Link
              href="/journal"
              className={`relative text-sm transition-all duration-300 font-sans group px-3 py-1.5 ${
                pathname === "/journal" ? "text-blue-950 font-medium" : "text-white hover:text-blue-900"
              }`}
            >
              <span className="relative z-10">{`The Journal`}</span>
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden absolute right-6 w-11 h-11 bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 flex items-center justify-center p-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          <div className="flex flex-col space-y-1">
            <span className="block w-4 h-[2px] bg-gray-300"></span>
            <span className="block w-4 h-[2px] bg-gray-300"></span>
            <span className="block w-4 h-[2px] bg-gray-300"></span>
          </div>
        </Button>
      </div>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 w-full min-h-screen z-[150] md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'opacity-95 bg-black' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-between h-full py-24 text-white">
            {/* Menu Header */}
            <div className="flex flex-col items-center space-y-2">
              <Logo />
              <span className="text-xs tracking-widest">MENU</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center space-y-7 text-3xl font-serif">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition">Home</Link>
              <Link href="/experiences" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition">Experiences</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition">About Us</Link>
              <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition">The Journal</Link>
            </nav>

            {/* Social Links */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs tracking-widest">CONNECT</span>
              <div className="flex text-2xl space-x-6">
                <a href="#" className="hover:text-green-400 transition"><FaWhatsapp /></a>
                <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
                <a href="#" className="hover:text-blue-400 transition"><SiFacebook /></a>
                <a href="#" className="hover:text-gray-400 transition"><SiThreads /></a>
                <a href="#" className="hover:text-gray-400 transition"><SiX /></a>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex flex-col items-center space-y-2 text-white">
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="h-11 w-11 rounded-full border-4 border-white bg-black text-white flex items-center justify-center cursor-pointer"
            >
              <X className="h-7 w-7" />
            </div>
            <span className="text-xs tracking-widest">CLOSE MENU</span>
          </div>

          </div>
        </div>
    </header>
  )
}
