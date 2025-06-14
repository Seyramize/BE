import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function SiteFooter() {
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

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white border-0 text-slate-800 font-sans placeholder:text-gray-500"
              />
              <Button className="w-full bg-amber-100 text-slate-800 hover:bg-amber-200 font-sans font-medium py-3 rounded-md">
                STAY IN THE LOOP
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4 mb-6 font-sans">
              We may share select info with trusted partners to elevate your experience.
            </p>

            {/* Social Media */}
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-wider mb-3">CONNECT</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  <MessageCircle size={20} />
                  <span className="sr-only">WhatsApp</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.5c0-3.086.85-5.94 2.495-8.491C5.845 1.205 8.598.024 12.179 0h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.56 22.5 8.414 22.5 11.5c0 3.086-.85 5.94-2.495 8.491C18.361 22.795 15.608 23.976 12.186 24zM12.179 2c-2.757.02-4.87.942-6.28 2.739C4.508 6.533 3.75 8.789 3.75 11.5s.758 4.967 2.149 6.761c1.41 1.797 3.523 2.719 6.28 2.739h.007c2.757-.02 4.87-.942 6.28-2.739C19.858 16.467 20.616 14.211 20.616 11.5s-.758-4.967-2.149-6.761C17.057 2.942 14.944 2.02 12.186 2h-.007z" />
                    <path d="M12 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-7c-1.378 0-2.5 1.122-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5z" />
                  </svg>
                  <span className="sr-only">Threads</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
