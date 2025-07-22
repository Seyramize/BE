"use client";
import Image from "next/image"
import { CircleArrowRight } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TravelPlannerModal } from "@/components/travel-planner-modal-clean"
import { experiences } from "@/lib/experiences-data"
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Simple validation
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000); // Hide after 5 seconds
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto-hiding Navigation */}
      <SiteHeader />

      {/* Hero Section - No spacer needed */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero.jpg?height=1080&width=1920&text=Mountain+Lake+with+Kayak"
            alt="Scenic mountain lake with kayak"
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative container mx-auto px-6 md:px-16 lg:px-32 xl:px-40 h-full flex flex-col justify-center">
          <div className="max-w-2xl pt-48 md:pt-64 lg:pt-80 pb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-argent font-normal text-white leading-tight mb-6">
              Go Beyond
              <br />
              the Ordinary
            </h1>
            <p className="text-lg text-white/90 mb-4 max-w-lg font-sans leading-relaxed">
              Discover bespoke experiences that redefine the way you travel. Whether you seek serenity, thrill, or
              unforgettable encounters, your next journey begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/experiences">
                <Button className="text-normal px-8 py-3 rounded-full bg-[#f67d46] hover:bg-[#f67d46] text-white font-sans border-0">
                  Explore Experiences 👣
                </Button>
              </Link>

              <TravelPlannerModal>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-normal text-black font-sans px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
                  Speak to a Travel Planner
                </Button>
              </TravelPlannerModal>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Experiences Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-argent font-normal mb-6 leading-tight">
                Curated
                <br />
                Experiences
              </h2>
              <p className="text-gray-700 mb-6 font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie dui lorem, at molestie dui
                accumsan in. Donec tempus, lorem eget venenatis molestie, nulla ipsum consectetur lorem, vel tempor
                lorem ipsum vel lorem.
              </p>
              <p className="text-gray-700 mb-8 font-sans leading-relaxed">
                Vestibulum ut consequat elit. Mauris sodales fermentum lorem, ut molestie magna cursus fermentum. Donec
                quis lorem vel magna cursus fermentum. Donec quis lorem vel magna cursus fermentum. Donec quis lorem vel
                magna cursus fermentum.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="relative h-80 md:h-96 md:w-[120%] md:-ml-[10%]">
                <Image
                  src="/images/home/curatedexp2.jpg?height=320&width=240&text=Tropical+Resort"
                  alt="Tropical beach resort"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Link href="/experiences" className="relative h-80 md:h-96 md:w-[120%] md:mt-12 block group">
                <Image
                  src="/images/home/curatedexp1.jpg?height=320&width=240&text=Hot+Air+Balloon"
                  alt="Hot air balloon over landscape"
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                />
                {/* Gradient background for text/icon */}
                <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent z-0" />
                <div className="absolute bottom-4 left-10 md:left-4 lg:left-10 px-1 py-3 z-10">
                  <div className="flex items-center space-x-2">
                    <span className="font-body text-left text-2xl sm:text-lg md:text-lg lg:text-2xl font-sans text-gray-900">
                      Browse <br className="leading-none" /> <span className="block -mt-1 sm:-mt-2">Experiences</span>
                    </span>
                    <CircleArrowRight className="h-10 w-10 sm:h-8 sm:w-8 md:h-8 md:w-8 text-gray-900" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <h2 className="text-3xl md:text-4xl font-argent font-normal mb-12">Featured experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First featured experience - Large card */}
            <div className="relative rounded-lg overflow-hidden group">
              <div className="relative h-[610px]">
                <Image
                  src={experiences[0].defaultContent.image}
                  alt={experiences[0].defaultContent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white/80 uppercase text-sm tracking-wider font-sans">{experiences[0].defaultContent.location}</span>
                <h3 className="text-3xl font-serif font-normal text-white mt-2 mb-3">{experiences[0].defaultContent.title}</h3>
                <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                  {experiences[0].defaultContent.shortDescription}
                </p>
                <Link href={`/book-experience/${experiences[0].slug}`}>
                  <Button
                    className="bg-white/20 hover:bg-white/30 text-white font-sans px-12 py-3 rounded-full backdrop-blur-sm border border-white/30 w-full">
                    Book Experience
                  </Button>
                </Link>
              </div>
            </div>

            {/* Second and third featured experiences - Smaller cards */}
            <div className="grid grid-cols-1 gap-8">
              {experiences.slice(1, 3).map((experience) => (
                <div key={experience.id} className="relative rounded-lg overflow-hidden group">
                  <div className="relative h-72">
                    <Image
                      src={experience.defaultContent.image}
                      alt={experience.defaultContent.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white/80 uppercase text-sm tracking-wider font-sans">{experience.defaultContent.location}</span>
                    <h3 className="text-2xl font-serif font-normal text-white mb-2">{experience.defaultContent.title}</h3>
                    <p className="text-white/90 mb-3 text-sm font-sans leading-relaxed">
                      {experience.defaultContent.shortDescription}
                    </p>
                    <Link href={`/book-experience/${experience.slug}`}>
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white font-sans px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
                        Book Experience
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <h2 className="text-3xl md:text-4xl font-argent font-normal mb-4">Frequently Asked Questions</h2>
          <p className="text-white/80 max-w-3xl mb-8 font-sans leading-relaxed">
            Find answers to common questions about our experiences and booking process. If you don't see your question
            here, please reach out to us directly.
          </p>

          <div className="max-w-full">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-sans text-left">
                  How do I book an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Simply browse the Experience Catalog, select the experience you're interested in, and click "Book this
                  experience". You'll be guided through a short form to confirm your preferred date, group size, and any
                  special requests. Your booking will be confirmed once payment is received.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-sans text-left">
                  Can I customize an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Most experiences can be customized to meet your specific needs—like adding a private photographer or
                  upgrading your transport. For full bespoke planning, please contact our concierge team directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-sans text-left">
                  What's included in the price?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Each experience page clearly states what's included—from meals and transport to guides and entry fees.
                  If you're unsure about any details, feel free to reach out before booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-sans text-left">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Cancellations made at least 72 hours in advance are eligible for a full refund. Cancellations made
                  within 72 hours may incur a fee depending on the experience. Please refer to the cancellation terms
                  listed on your booking confirmation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-sans text-left">
                  Can I speak to someone before booking?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Of course! If you have questions or need clarification, you can reach our team via{' '}
                  <a
                    href="https://api.whatsapp.com/send?phone=233504513123&text=Hi%20beyond%20team%2C%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    WhatsApp
                  </a>{' '}or{' '}
                  <a
                    href="mailto:info@example.com"
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    Email
                  </a>
                  {' '}using the contact details in the footer. We're happy to help!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enquire Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form section */}
            <div className="order-2 md:order-2">
              <div className="md:pt-[165px]">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" className="bg-white border-gray-200 font-sans w-full" />
                  </div>
                  <div>
                    <Input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="bg-white border-gray-200 font-sans w-full" />
                  </div>
                  <div>
                    <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="bg-white border-gray-200 font-sans w-full" />
                  </div>
                  <div>
                    <Input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone" className="bg-white border-gray-200 font-sans w-full" />
                  </div>
                  <div>
                    <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your dream experience" className="bg-white border-gray-200 min-h-[120px] font-sans w-full" />
                  </div>
                  {error && <div className="text-red-600 mt-2">{error}</div>}
                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-body rounded-full py-3" disabled={loading}>
                    {loading ? "Sending..." : "Enquire"}
                  </Button>
                  {success && <div className="text-green-600 mt-2">Thank you! Your enquiry has been sent.</div>}
                </form>
              </div>
            </div>

            {/* Title and photo section */}
            <div className="order-1 md:order-1">
              <h2 className="text-3xl md:text-4xl font-title font-normal mb-6">Enquire</h2>
              <p className="text-gray-700 mb-6 font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie dui lorem, at molestie dui
                accumsan in. Donec tempus, lorem eget venenatis molestie, nulla ipsum consectetur lorem, vel tempor
                lorem ipsum vel lorem.
              </p>
              <div className="relative h-[400px] md:h-[300px] lg:h-[375px] rounded-lg overflow-hidden">
                <Image
                  src="/images/home/enquiry.jpg?height=500&width=800&text=Wooden+Boat+Lake"
                  alt="Wooden boat on a crystal clear lake"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
