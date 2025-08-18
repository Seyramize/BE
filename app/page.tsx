"use client";
import Image from "next/image"
import { CircleArrowRight, Video } from "lucide-react"
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMobile } from "@/hooks/use-mobile";
import { FaRegMap } from "react-icons/fa";
import { TbBinoculars } from "react-icons/tb";

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

  const isMobile = useMobile();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto-hiding Navigation */}
      <SiteHeader />

      {/* Hero Section - No spacer needed */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <video
            src="/images/newhome.webm"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
           
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative container mx-auto px-8 md:px-16 lg:px-32 xl:px-40 h-full flex flex-col justify-center">
          <div className="max-w-2xl mx-auto pt-0 pb-0 text-center">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-argent font-normal text-white leading-none md:leading-tight mb-5">
              Go beyond
              <br />
              the ordinary
            </h1>
            <div className="text-sm text-white/90 mb-5 max-w-lg font-sans leading-none md:leading-relaxed">
              <p className="md:inline">Experiences that redefine the way you travel. </p>
              
            </div>
            <div className="flex flex-col items-center md:flex-row gap-4 mb-0 justify-center">
              <Link href="/experiences" className="w-full md:w-auto px-8 md:px-0">
                                  <Button className="w-full md:w-auto text-sm md:text-normal px-8 py-8 md:py-3 rounded-xl md:rounded-xl bg-[#EFE6DA] md:bg-[#EFE6DA] text-gray-900 font-sans hover:text-white hover:md:text-white flex items-center gap-2 backdrop-blur-sm">
                    Explore Experiences  
                   <FaRegMap className="w-8 h-8 text-gray-900 hover:text-white" />
                  </Button>
                
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Curated Experiences Section */}
      <section className="pt-6 pb-4 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Column (Left on Desktop, Bottom on Mobile) */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-argent font-normal mb-6 leading-tight hidden md:block">
                Africa,
                <br />
                curated for you.
              </h2>
              <div className="md:hidden">
                {/* This div is only for mobile to group the images */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative h-56">
                    <Image
                      src="/images/Ce2.jpg?height=320&width=240&text=Tropical+Resort"
                      alt="Tropical beach resort"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-6 md:mt-0 mb-6 font-sans leading-tight">
                From Ghana’s golden coast to Namibia’s sweeping deserts and São Tomé’s emerald isles, each journey is designed to immerse you in the soul of the continent. These experiences are not just trips; they’re curated paths into culture, adventure, and memory, where discovery feels effortless and every moment lingers long after you’ve returned.
              </p>
              
            </div>

            {/* Image Column (Right on Desktop, Hidden on Mobile) */}
            <div className="order-1 md:order-2 grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 hidden md:grid">
              <div className="relative h-80 md:h-96 md:w-[130%] md:-ml-[15%]">
                <Image
                  src="/images/Ce2.jpg?height=320&width=240&text=Tropical+Resort"
                  alt="Tropical beach resort"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Link href="/experiences" className="relative h-80 md:h-96 md:w-full w-full block group">
                <Image
                  src="/images/hotair.jpg?height=320&width=240&text=Hot+Air+Balloon"
                  alt="Hot air balloon over landscape"
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent z-0" />
                <div className="absolute bottom-4 left-10 md:left-2 lg:left-4 px-1 py-3 z-10">
                  <div className="flex items-center space-x-2">
                    <span className="font-body text-left text-2xl sm:text-lg md:text-sm lg:text-2xl font-sans text-white">
                      Browse <br className="leading-none" /> <span className="block -mt-1 sm:-mt-2">Experiences</span>
                    </span>
                    <CircleArrowRight className="h-10 w-10 sm:h-8 sm:w-8 md:h-6 md:w-6 text-white lg:left-8" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="pt-4 md:pt-12 pb-8 md:pb-16 bg-[#f3eae1] overflow-hidden">
        <div className="md:container md:mx-auto md:px-16 lg:px-32 xl:px-40">
          <h2 className="text-2xl md:text-4xl font-argent font-normal mb-3 md:mb-12 px-6 md:px-0">Featured Experiences</h2>
          {isMobile ? (
            <>
              {/* Top carousel (original logic) */}
              <Carousel opts={{ align: "start", loop: false }} className="pl-6">
                <CarouselContent className="-ml-4">
                  {experiences.slice(0, 3).map((experience, index) => (
                    <CarouselItem key={`top-${experience.id}`} className="pl-4 basis-5/6">
                      <div className="relative rounded-xl overflow-hidden group h-[470px]">
                        <Image
                          src={experience.defaultContent.image}
                          alt={experience.defaultContent.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className={`${index === 0 ? 'text-3xl' : 'text-2xl'} font-serif font-normal text-white mt-2 mb-3`}>{experience.defaultContent.title}</h3>
                          <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                            {experience.defaultContent.shortDescription}
                          </p>
                          <Link href={`/book-experience/${experience.slug}`}>
                            <Button
                              variant="glass"
                              className="font-sans px-12 py-7 rounded-xl w-full">
                              Book Experience
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                  <CarouselItem className="pl-4 basis-5/6">
                    <Link href="/experiences">
                      <div className="relative rounded-lg overflow-hidden group h-[470px] bg-gray-900 flex flex-col justify-center items-center text-center p-6">
                        <TbBinoculars className="text-white mb-4" size={40} />
                        <h3 className="text-4xl font-serif font-normal text-white mt-2 mb-3">Explore Experiences</h3>
                        <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                          Browse our catalog of experiences curated with you in mind.
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>

              {/* Additional country carousels (mobile only) */}
              {/* {["Ghana", "Namibia", "Sao Tome", "Nigeria"].map((country) => (
                <div key={`country-${country}`} className="mt-4">
                  <h3 className="text-xl font-argent font-normal mb-2 px-6">{country}</h3>
                  <Carousel opts={{ align: "start", loop: false }} className="pl-6">
                    <CarouselContent className="-ml-4">
                      {experiences.slice(0, 3).map((experience) => (
                        <CarouselItem key={`${country}-${experience.id}`} className="pl-4 basis-5/6">
                          <div className="relative rounded-xl overflow-hidden group h-[420px]">
                            <Image
                              src={experience.defaultContent.image}
                              alt={experience.defaultContent.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h4 className="text-2xl font-serif font-normal text-white mt-2 mb-3">{experience.defaultContent.title}</h4>
                              <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                                {experience.defaultContent.shortDescription}
                              </p>
                              <Link href={`/book-experience/${experience.slug}`}>
                                <Button variant="glass" className="font-sans px-12 py-7 rounded-xl w-full">
                                  Book Experience
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                      <CarouselItem className="pl-4 basis-5/6">
                        <Link href="/experiences">
                          <div className="relative rounded-lg overflow-hidden group h-[420px] bg-gray-900 flex flex-col justify-center items-center text-center p-6">
                            <TbBinoculars className="text-white mb-4" size={40} />
                            <h4 className="text-3xl font-serif font-normal text-white mt-2 mb-3">Explore <br /> {country}</h4>
                            <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                              Browse our catalog of experiences curated with you in mind.
                            </p>
                          </div>
                        </Link>
                      </CarouselItem>
                    </CarouselContent>
                  </Carousel>
                </div>
              ))} */}
            </>
          ) : (
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
                  {/* <span className="text-white/80 uppercase text-sm tracking-wider font-sans">{experiences[0].defaultContent.location}</span> */}
                  <h3 className="text-3xl font-serif font-normal text-white mt-2 mb-3">{experiences[0].defaultContent.title}</h3>
                  <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                    {experiences[0].defaultContent.shortDescription}
                  </p>
                  <Link href={`/book-experience/${experiences[0].slug}`}>
                    <Button
                      variant="glass"
                      className="font-sans px-12 py-3 rounded-xl w-full">
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
                    {/* <span className="text-white/80 uppercase text-sm tracking-wider font-sans">{experience.defaultContent.location}</span> */}
                      <h3 className="text-2xl font-serif font-normal text-white mb-2">{experience.defaultContent.title}</h3>
                      <p className="text-white/90 mb-3 text-sm font-sans leading-relaxed">
                        {experience.defaultContent.shortDescription}
                      </p>
                      <Link href={`/book-experience/${experience.slug}`}>
                        <Button size="sm" variant="glass" className="font-sans px-8 py-3 rounded-xl">
                          Book Experience
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pt-6 pb-6 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <h2 className="text-2xl md:text-4xl font-argent leading-7 font-normal mb-4">Frequently Asked Questions</h2>
          <p className="text-white/80 max-w-3xl mb-8 font-sans leading-tight">
            Wondering how it all comes together? These are the questions we get most often.
          </p>

          <div className="max-w-full">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border border-white rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-6 md:py-4 hover:bg-gray-800/50 font-sans text-left">
                  How do I book an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 md:py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Simply browse the Experience Catalog, select the experience you're interested in, and click "Book this
                  experience". You'll be guided through a short form to confirm your preferred date, group size, and any
                  special requests. Your booking will be confirmed once payment is received.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-white rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-6 md:py-4 hover:bg-gray-800/50 font-sans text-left">
                  Can I customize an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 md:py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Most experiences can be customized to meet your specific needs—like adding a private photographer or
                  upgrading your transport. For full bespoke planning, please contact our concierge team directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-white rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-6 md:py-4 hover:bg-gray-800/50 font-sans text-left">
                  What's included in the price?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 md:py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Each experience page clearly states what's included—from meals and transport to guides and entry fees.
                  If you're unsure about any details, feel free to reach out before booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-white rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-6 md:py-4 hover:bg-gray-800/50 font-sans text-left">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 md:py-4 bg-gray-800/30 font-sans leading-relaxed">
                  Cancellations made at least 72 hours in advance are eligible for a full refund. Cancellations made
                  within 72 hours may incur a fee depending on the experience. Please refer to the cancellation terms
                  listed on your booking confirmation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-white rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-6 md:py-4 hover:bg-gray-800/50 font-sans text-left">
                  Can I speak to someone before booking?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 md:py-4 bg-gray-800/30 font-sans leading-relaxed">
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
                    href="mailto:concierge@experiencesbybeyond.com"
                    target="_blank"
                    rel="noopener noreferrer"
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
      <section className="pt-0 pb-10 md:py-20 bg-[#f3eae1]">
        <div className="container mx-auto px-0 md:px-16 lg:px-32 xl:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Form section */}
            <div className="order-2 md:order-2 px-6 md:px-0">
              <div className="md:pt-[165px]">
                <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" className="bg-white border-gray-200 font-sans w-full py-6 md:py-2 placeholder:text-xs" />
                  </div>
                  <div>
                    <Input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="bg-white border-gray-200 font-sans w-full py-6 md:py-2 placeholder:text-xs" />
                  </div>
                  <div>
                    <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="bg-white border-gray-200 font-sans w-full py-6 md:py-2 placeholder:text-xs" />
                  </div>
                  <div>
                    <Input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone" className="bg-white border-gray-200 font-sans w-full py-6 md:py-2 placeholder:text-xs" />
                  </div>
                  <div>
                    <Textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help?" className="bg-white border-gray-200 min-h-[120px] font-sans w-full py-6 md:py-2 placeholder:text-xs" />
                  </div>
                  {error && <div className="text-red-600 mt-2">{error}</div>}
                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-body rounded-2xl md:rounded-full py-8 md:py-3" disabled={loading}>
                    {loading ? "Sending..." : "Enquire"}
                  </Button>
                  {success && <div className="text-green-600 mt-2">Thank you! Your enquiry has been sent.</div>}
                </form>
              </div>
            </div>

            {/* Title and photo section */}
            <div className="order-1 md:order-1">
              <div className="relative h-[200px] md:h-auto overflow-hidden md:hidden">
                <Image
                  src="/images/home/enquiry.jpg?height=500&width=800&text=Wooden+Boat+Lake"
                  alt="Wooden boat on a crystal clear lake"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f3eae1] to-transparent" />
              </div>
              <div className="relative md:hidden -mt-8 text-left px-6 z-10">
                <h2 className="text-2xl font-title font-normal text-gray-900 mb-2">Want to enquire?</h2>
                <p className="text-gray-700 font-sans leading-tight">
                  Whether it’s a custom itinerary, a quick question, or something unique you’d like to add, we’re here to help.
                </p>
              </div>
              <div className="hidden md:block">
                <h2 className="text-3xl md:text-4xl font-title font-normal mb-6">Want to enquire?</h2>
                <p className="text-gray-700 mb-6 font-sans leading-relaxed">
                  Whether it’s a custom itinerary, a quick question, or something unique you’d like to add, we’re here to help.
                </p>
                <div className="relative h-[300px] lg:h-[375px] rounded-lg overflow-hidden">
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
        </div>
      </section>

      <SiteFooter />
      {/* Desktop/Tablet-only "Speak to a Travel Planner" Sticky Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-20">
        <TravelPlannerModal>
          <Button
            className="bg-gray-900/90 hover:bg-gray-900 text-white font-sans w-13 h-13 p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <img src="/images/ChatsCircle.png" alt="chats" className="w-5 h-5" />
          </Button>
        </TravelPlannerModal>
      </div>
      {/* Mobile-only "Speak to a Travel Planner" Sticky Button */}
      <div className="md:hidden fixed bottom-4 right-6 z-20">
        <TravelPlannerModal>
          <Button
            className="bg-gray-900/90 hover:bg-gray-900 text-white font-sans w-13 h-13 p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <img src="/images/ChatsCircle.png" alt="chats" className="w-5 h-5" />
          </Button>
        </TravelPlannerModal>
      </div>
    </div>
  )
}
