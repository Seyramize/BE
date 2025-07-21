"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import React, { useState } from "react"
import { SocialIcon } from 'react-social-icons'

export function SiteFooter() {
  // Add state for the email input and feedback
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setMessage("Thank you for subscribing!")
        setEmail("")
      } else {
        const data = await res.json()
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo */}
          <div className="md:col-span-2">
            <div className="relative w-24 h-8">
              <Image
                src="/images/footer-logo.png"
                alt="Beyond Experiences"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div> 

          {/* Explore Column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">EXPLORE</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Discover our curated journeys</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/experiences"
                  className="text-white hover:text-gray-300 transition-colors font-sans text-sm"
                >
                  Experiences
                </Link>
              </li>
              <li>
                <Link
                  href="/city-guides"
                  className="text-white hover:text-gray-300 transition-colors font-sans text-sm"
                >
                  City Guides
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="text-white hover:text-gray-300 transition-colors font-sansetica text-sm">
                  Bespoke Travel
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">SUPPORT</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Here when you need us</p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">CONNECT</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Stay in touch</p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-serif font-normal mb-4">Stay in the Loop</h3>
            <p className="text-sm text-gray-300 mb-6 font-sans leading-relaxed">
              Get curated travel inspiration, special offers, and behind-the-scenes access.
            </p>

            {/* Newsletter Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white border-0 text-slate-800 font-sans placeholder:text-gray-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button
                className="w-full bg-amber-100 text-slate-800 hover:bg-amber-200 font-sans font-medium py-3 rounded-md"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "STAY IN THE LOOP"}
              </Button>
            </form>
            {message && (
              <p className={`text-xs mt-2 font-sans ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-4 mb-6 font-sans">
              We may share select info with trusted partners to elevate your experience.
            </p>

            {/* Social Media */}
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-wider mb-3">CONNECT</p>
              <div className="flex space-x-4">
                <SocialIcon url="https://api.whatsapp.com/send?phone=233504513123&text=Hi%20beyond%20team%2C%20" bgColor="#1e293b" fgColor="#fff" style={{ height: 40, width: 40 }} />
                <SocialIcon url="https://www.instagram.com/beyondaccra/" network="instagram" bgColor="#1e293b" fgColor="#fff" style={{ height: 40, width: 40 }} />
                <SocialIcon url="https://www.facebook.com/p/Beyond-Accra-100090689846628/" network="facebook" bgColor="#1e293b" fgColor="#fff" style={{ height: 40, width: 40 }} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
