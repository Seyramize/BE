"use client"

import Link from "next/link"
import Image from "next/image"
import React, { useState } from "react"
import { FaWhatsapp, FaInstagram, FaTripadvisor } from "react-icons/fa"
import { SiFacebook, SiX, SiThreads } from "react-icons/si"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function SiteFooter() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      })
      if (res.ok) {
        setStatus("success")
        setMessage("Thank you for subscribing!")
        setFirstName("")
        setLastName("")
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
    <footer className="bg-[#0F1A2A] text-white">
      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* Mobile View */}
        <div className="md:hidden px-4">
          <div className="flex flex-col items-start text-left space-y-12">
            <div className="relative w-40 h-10">
              <Image src="/images/footer-logo.png" alt="Beyond Experiences" fill className="object-contain" priority />
            </div>
            <div className="w-full max-w-sm">
              <h3 className="text-2xl font-normal font-sans mb-3">Stay in the Loop</h3>
              <p className="text-sm text-gray-400 mb-6 font-sans">
                Get curated travel inspiration, special offers, and behind-the-scenes access.
              </p>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <Input type="text" placeholder="First Name" className="bg-gray-100 border-0 text-slate-800 font-sans placeholder:text-gray-500 rounded-lg py-5 placeholder:text-xs" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                <Input type="text" placeholder="Last Name" className="bg-gray-100 border-0 text-slate-800 font-sans placeholder:text-gray-500 rounded-lg py-5 placeholder:text-xs" value={lastName} onChange={e => setLastName(e.target.value)} required />
                <Input type="email" placeholder="E-mail Address" className="bg-gray-100 border-0 text-slate-800 font-sans placeholder:text-gray-500 rounded-lg py-5 placeholder:text-xs" value={email} onChange={e => setEmail(e.target.value)} required />
                <Button className="w-full bg-[#F3EADF] text-slate-800 hover:bg-amber-200 font-sans font-medium py-6 rounded-lg tracking-widest" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Subscribing..." : "STAY IN THE LOOP"}
                </Button>
              </form>
              {message && <p className={`text-xs mt-2 font-sans ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>}
              <p className="text-xs text-gray-500 mt-4">We may share select info with trusted partners to elevate your experience.</p>
            </div>
            <div className="w-full max-w-sm">
              <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4">CONNECT</h3>
              <div className="flex justify-between">
                <a href="#" className="hover:text-gray-300 transition"><FaWhatsapp size={24} /></a>
                <a href="#" className="hover:text-gray-300 transition"><FaInstagram size={24} /></a>
                <a href="#" className="hover:text-gray-300 transition"><SiFacebook size={24} /></a>
                <a href="#" className="hover:text-gray-300 transition"><SiThreads size={24} /></a>
                <a href="#" className="hover:text-gray-300 transition"><SiX size={22} /></a>
              </div>
            </div>
            <div className="w-full space-y-8">
              <div>
                <h3 className="text-xs font-sans text-gray-300 font-semibold uppercase tracking-wider mb-1">EXPLORE</h3>
                <p className="text-xs text-gray-400 mb-4 font-sans">Discover our curated journeys</p>
                <ul className="space-y-0.5">
                  <li><Link href="/experiences" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Experiences</Link></li>
                  <li><Link href="/city-guides" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">City Guides</Link></li>
                  <li><Link href="/bespoke" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Bespoke Travel</Link></li>
                  <li><Link href="/about" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">About Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-sans text-gray-300 font-semibold uppercase tracking-wider mb-1">SUPPORT</h3>
                <p className="text-xs text-gray-400 mb-4 font-sans">Here when you need us</p>
                <ul className="space-y-0.5">
                  <li><Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Contact Us</Link></li>
                  <li><Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">FAQs</Link></li>
                  <li><Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-sans text-gray-300 font-semibold uppercase tracking-wider mb-1">CONNECT</h3>
                <p className="text-xs text-gray-400 mb-4 font-sans">Stay in touch</p>
                <ul className="space-y-0.5">
                  <li><Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Contact Us</Link></li>
                  <li><Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">FAQs</Link></li>
                  <li><Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-left text-gray-400 text-xs pt-1.5 space-y-2 w-full max-w-sm">
              <p>© 2020-2025 Beyond Accra Concierge Company LLC. All rights reserved.</p>
              <p>CST#2007274-20</p>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="relative w-24 h-8 mb-8">
              <Image src="/images/footer-logo.png" alt="Beyond Experiences" fill className="object-contain" priority />
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">EXPLORE</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Discover our curated journeys</p>
            <ul className="space-y-2">
              <li><Link href="/experiences" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Experiences</Link></li>
              <li><Link href="/city-guides" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">City Guides</Link></li>
              <li><Link href="/bespoke" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Bespoke Travel</Link></li>
              <li><Link href="/about" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">About Us</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">SUPPORT</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Here when you need us</p>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Contact Us</Link></li>
              <li><Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">FAQs</Link></li>
              <li><Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-2">CONNECT</h3>
            <p className="text-xs text-gray-400 mb-4 font-sans">Stay in touch</p>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Contact Us</Link></li>
              <li><Link href="/faqs" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">FAQs</Link></li>
              <li><Link href="/terms" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-white hover:text-gray-300 transition-colors font-sans text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="text-2xl font-normal font-sans mb-4">Stay in the Loop</h3>
            <p className="text-sm text-gray-300 mb-6 font-sans leading-relaxed">Get curated travel inspiration, special offers, and behind-the-scenes access.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input type="text" placeholder="First Name" className="bg-white border-0 text-slate-800 font-sans placeholder:text-gray-500" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              <Input type="text" placeholder="Last Name" className="bg-white border-0 text-slate-800 font-sans placeholder:text-gray-500" value={lastName} onChange={e => setLastName(e.target.value)} required />
              <Input type="email" placeholder="Email address" className="bg-white border-0 text-slate-800 font-sans placeholder:text-gray-500" value={email} onChange={e => setEmail(e.target.value)} required />
              <Button className="w-full bg-amber-100 text-slate-800 hover:bg-amber-200 font-sans font-medium py-3 rounded-md" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing..." : "STAY IN THE LOOP"}
              </Button>
            </form>
            {message && <p className={`text-xs mt-2 font-sans ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>}
            <p className="text-xs text-gray-400 mt-4 mb-6 font-sans">We may share select info with trusted partners to elevate your experience.</p>
            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-3 mt-8">CONNECT</h3>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-gray-300 transition"><FaWhatsapp /></a>
              <a href="#" className="hover:text-gray-300 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-300 transition"><SiFacebook /></a>
              <a href="#" className="hover:text-gray-300 transition"><SiThreads /></a>
              <a href="#" className="hover:text-gray-300 transition"><SiX /></a>
            </div>
          </div>
          <div className="md:col-span-12 text-center text-gray-400 text-xs pt-6 mt-6 border-t border-gray-700">
            <p>© 2020-2025 Beyond Accra Concierge Company LLC. All rights reserved. CST#2007274-20</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
