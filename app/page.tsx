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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto-hiding Navigation */}
      <SiteHeader />

      {/* Hero Section - No spacer needed */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Mountain+Lake+with+Kayak"
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
            <p className="text-lg text-white/90 mb-4 max-w-lg font-helvetica leading-relaxed">
              Discover bespoke experiences that redefine the way you travel. Whether you seek serenity, thrill, or
              unforgettable encounters, your next journey begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/experiences">
                <Button className="text-base px-8 py-3 rounded-full bg-[#B55A30] hover:bg-[#B55A30] text-white font-helvetica border-0">
                  Explore Experiences 👣
                </Button>
              </Link>

              <TravelPlannerModal>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-base text-black font-helvetica px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
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
              <p className="text-gray-700 mb-6 font-helvetica leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie dui lorem, at molestie dui
                accumsan in. Donec tempus, lorem eget venenatis molestie, nulla ipsum consectetur lorem, vel tempor
                lorem ipsum vel lorem.
              </p>
              <p className="text-gray-700 mb-8 font-helvetica leading-relaxed">
                Vestibulum ut consequat elit. Mauris sodales fermentum lorem, ut molestie magna cursus fermentum. Donec
                quis lorem vel magna cursus fermentum. Donec quis lorem vel magna cursus fermentum. Donec quis lorem vel
                magna cursus fermentum.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="relative h-80 md:h-96 md:w-[120%] md:-ml-[10%]">
                <Image
                  src="/placeholder.svg?height=320&width=240&text=Tropical+Resort"
                  alt="Tropical beach resort"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Link href="/experiences" className="relative h-80 md:h-96 md:w-[120%] md:mt-12 block group">
                <Image
                  src="/placeholder.svg?height=320&width=240&text=Hot+Air+Balloon"
                  alt="Hot air balloon over landscape"
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-10 md:left-4 lg:left-10 px-1 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-body text-left text-base sm:text-lg md:text-lg lg:text-2xl font-helvetica text-gray-900">Browse <br className="leading-none" /> <span className="block -mt-1 sm:-mt-2">Experiences</span></span>
                    <CircleArrowRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 text-gray-900" />
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
            <div className="relative rounded-lg overflow-hidden group">
              <div className="relative h-[610px]">
                <Image
                  src="/placeholder.svg?height=610&width=600&text=Running+with+Zebras"
                  alt="Running with Zebras"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white/80 uppercase text-sm tracking-wider font-helvetica">Eastern Africa</span>
                <h3 className="text-3xl font-argent font-normal text-white mt-2 mb-3">Running with Zebras</h3>
                <p className="text-white/90 mb-4 max-w-md font-helvetica leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie dui lorem, at molestie dui
                  accumsan in. Donec tempus, lorem eget venenatis molestie, nulla ipsum consectetur lorem.
                </p>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white font-helvetica px-12 py-3 rounded-full backdrop-blur-sm border border-white/30 w-full">
                  Book Experience
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="relative rounded-lg overflow-hidden group">
                <div className="relative h-72">
                  <Image
                    src="/placeholder.svg?height=288&width=400&text=Collectors+Tour"
                    alt="The Collectors Tour"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-argent font-normal text-white mb-2">The Collectors Tour</h3>
                  <p className="text-white/90 mb-3 text-sm font-helvetica leading-relaxed">
                    Discover the world's most exclusive art collections with private viewings and expert commentary.
                  </p>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white font-helvetica px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
                    More Experience
                  </Button>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden group">
                <div className="relative h-72">
                  <Image
                    src="/placeholder.svg?height=288&width=400&text=Collectors+Tour"
                    alt="The Collectors Tour"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-argent font-normal text-white mb-2">The Collectors Tour</h3>
                  <p className="text-white/90 mb-3 text-sm font-helvetica leading-relaxed">
                    Discover the world's most exclusive art collections with private viewings and expert commentary.
                  </p>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white font-helvetica px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
                  
                    More Experience
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 xl:px-40">
          <h2 className="text-3xl md:text-4xl font-argent font-normal mb-12">Frequently Asked Questions</h2>
          <p className="text-white/80 max-w-3xl mb-12 font-helvetica leading-relaxed">
            Find answers to common questions about our experiences and booking process. If you don't see your question
            here, please reach out to us directly.
          </p>

          <div className="max-w-full">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-helvetica text-left">
                  How do I book an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-helvetica leading-relaxed">
                  Simply browse the Experience Catalog, select the experience you're interested in, and click "Book this
                  experience". You'll be guided through a short form to confirm your preferred date, group size, and any
                  special requests. Your booking will be confirmed once payment is received.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-helvetica text-left">
                  Can I customize an experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-helvetica leading-relaxed">
                  Most experiences can be customized to meet your specific needs—like adding a private photographer or
                  upgrading your transport. For full bespoke planning, please contact our concierge team directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-helvetica text-left">
                  What's included in the price?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-helvetica leading-relaxed">
                  Each experience page clearly states what's included—from meals and transport to guides and entry fees.
                  If you're unsure about any details, feel free to reach out before booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-helvetica text-left">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-helvetica leading-relaxed">
                  Cancellations made at least 72 hours in advance are eligible for a full refund. Cancellations made
                  within 72 hours may incur a fee depending on the experience. Please refer to the cancellation terms
                  listed on your booking confirmation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 font-helvetica text-left">
                  Can I speak to someone before booking?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-800/30 font-helvetica leading-relaxed">
                  Of course! If you have questions or need clarification, you can reach our team via WhatsApp or email
                  using the contact details in the footer. We're happy to help!
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
                <form className="space-y-4">
                  <div>
                    <Input type="text" placeholder="First Name" className="bg-white border-gray-200 font-helvetica w-full" />
                  </div>
                  <div>
                    <Input type="text" placeholder="Last Name" className="bg-white border-gray-200 font-helvetica w-full" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" className="bg-white border-gray-200 font-helvetica w-full" />
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone" className="bg-white border-gray-200 font-helvetica w-full" />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your dream experience"
                      className="bg-white border-gray-200 min-h-[120px] font-helvetica w-full"
                    />
                  </div>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-body rounded-full py-3">
                    Enquire
                  </Button>
                </form>
              </div>
            </div>

            {/* Title and photo section */}
            <div className="order-1 md:order-1">
              <h2 className="text-3xl md:text-4xl font-title font-normal mb-6">Enquire</h2>
              <p className="text-gray-700 mb-6 font-helvetica leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie dui lorem, at molestie dui
                accumsan in. Donec tempus, lorem eget venenatis molestie, nulla ipsum consectetur lorem, vel tempor
                lorem ipsum vel lorem.
              </p>
              <div className="relative h-[200px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=800&text=Wooden+Boat+Lake"
                  alt="Wooden boat on a crystal clear lake"
                  fill
                  className="object-cover"
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
