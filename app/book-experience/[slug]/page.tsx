"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingFormModal } from "@/components/booking-form-modal"

// This would typically come from a CMS or database
const experienceData = {
  slug: "adventuring-in-shai-hills",
  title: "Adventuring in Shai Hills",
  subtitle:
    "Safari Valley the luxury eco-friendly retreat where you can experience luxury in a serene natural setting, interacting with free-roaming wildlife, and enjoy activities like biking, horseback riding, and nature walks. Every moment is curated just for you by the professional team. A rare invitation to slow down and simply be.",
  duration: "1 DAY",
  destinations: "2 DESTINATIONS",
  maxGuests: "15 GUESTS (MAX)",
  heroImage: "/placeholder.svg?height=800&width=1200&text=Zebras+in+Golden+Grassland",
  galleryImages: [
    "/placeholder.svg?height=400&width=300&text=Wildlife+Safari",
    "/placeholder.svg?height=400&width=300&text=Luxury+Resort",
    "/placeholder.svg?height=400&width=300&text=Nature+Activities",
  ],
  overview:
    "This Eastern experience offers a perfect mix of luxury, nature, and relaxation. Begin with a visit to Safari Valley Resort, an eco-friendly retreat where you can experience luxury in a serene natural setting, interact with free-roaming wildlife, and enjoy activities like biking, horseback riding, and nature walks. Next, head to Asenema Waterfalls, a hidden gem surrounded by lush greenery, where you can unwind and take a refreshing dip in the cool cascading waters.",
  highlights: [
    "Escape to a world where nature leads and luxury follows—where misty mornings, birdsong, and stillness greet you each day in a setting crafted for calm.",
    "Wander alongside graceful antelope and zebras, freely roaming across the landscape—unfenced, untamed, and just as nature intended.",
    "Let the sound of cascading water and the cool forest air surround you as you stand before Asenema's gentle falls—a hidden gem tucked within the hills.",
    "From serene horseback rides through forest trails to open-air biking and peaceful rounds of golf, every activity invites you to breathe deeper and move slower.",
  ],
  startingPrice: 150,
  minimumGuests: 2,
  included: [
    "Private transportation including fuel",
    "Dedicated chaperone and access to resident guides",
    "Professional massage at a waterfall",
    "On-the-go internet access",
    "Lunch and dinner",
    "Beyond Experiences Essentials™ Bag",
  ],
}

const relatedExperiences = [
  {
    id: 1,
    title: "The Collectors Tour",
    description:
      "A curated journey of art and culture, taking you through Ghana's most prestigious galleries and private collections where art comes alive at first.",
    image: "/placeholder.svg?height=300&width=250&text=Art+Gallery+Tour",
  },
  {
    id: 2,
    title: "The Collectors Tour",
    description:
      "A curated journey of art and culture, taking you through Ghana's most prestigious galleries and private collections where art comes alive at first.",
    image: "/placeholder.svg?height=300&width=250&text=Cultural+Experience",
  },
  {
    id: 3,
    title: "The Collectors Tour",
    description:
      "A curated journey of art and culture, taking you through Ghana's most prestigious galleries and private collections where art comes alive at first.",
    image: "/placeholder.svg?height=300&width=250&text=Heritage+Tour",
  },
  {
    id: 4,
    title: "The Collectors Tour",
    description:
      "A curated journey of art and culture, taking you through Ghana's most prestigious galleries and private collections where art comes alive at first.",
    image: "/placeholder.svg?height=300&width=250&text=Adventure+Experience",
  },
]

export default function BookExperiencePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const openBookingModal = () => {
    console.log("Opening booking modal")
    setIsBookingModalOpen(true)
  }

  const closeBookingModal = () => {
    console.log("Closing booking modal")
    setIsBookingModalOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={experienceData.heroImage || "/placeholder.svg"}
            alt={experienceData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <div className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal mb-4 md:mb-6 leading-tight">
            {experienceData.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto font-sans leading-relaxed">
            {experienceData.subtitle}
          </p>

          {/* Experience Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-white/90 font-sans text-sm uppercase tracking-wider">
            <span>{experienceData.duration}</span>
            <span className="hidden sm:inline">•</span>
            <span>{experienceData.destinations}</span>
            <span className="hidden sm:inline">•</span>
            <span>{experienceData.maxGuests}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Overview and Highlights */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-normal mb-4 md:mb-6 uppercase tracking-wider text-slate-800">
                  Overview
                </h2>
                <p className="text-slate-700 font-sans leading-relaxed text-base sm:text-lg">
                  {experienceData.overview}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-normal mb-4 md:mb-6 uppercase tracking-wider text-slate-800">
                  Highlights
                </h2>
                <div className="space-y-4">
                  {experienceData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p className="text-slate-700 font-sans leading-relaxed text-base sm:text-lg">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing and Booking */}
              <div className="border-t border-gray-200 pt-8 md:pt-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-sans uppercase tracking-wider text-slate-600 mb-2">
                      Starting Price
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-serif font-normal text-slate-800">
                        ${experienceData.startingPrice}
                      </span>
                      <span className="text-sm text-slate-600 font-sans">.00</span>
                    </div>
                    <p className="text-sm text-slate-600 font-sans mt-1">
                      Minimum of {experienceData.minimumGuests} people
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                    <Button
                      className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-sans px-6 sm:px-8 py-3 rounded-none"
                      onClick={openBookingModal}
                    >
                      Book this experience
                    </Button>
                    <Link href="/customize-experience" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-sans px-6 sm:px-8 py-3 rounded-none"
                      >
                        Customize my experience
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-normal mb-4 md:mb-6 uppercase tracking-wider text-slate-800">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienceData.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-slate-600 flex-shrink-0" />
                      <span className="text-slate-700 font-sans text-sm sm:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={experienceData.galleryImages[0] || "/placeholder.svg"}
                      alt="Experience gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-white/50 text-slate-700 hover:bg-white font-sans px-4 py-2 rounded-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Ghanaian Adventures */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-slate-800">
              More Ghanaian adventures
            </h2>
            <div className="w-6 h-6 rounded-full border border-slate-400 flex items-center justify-center">
              <span className="text-slate-600 text-sm">?</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedExperiences.map((experience) => (
              <div key={experience.id} className="group">
                <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg sm:text-xl font-serif text-white mb-2">
                      {experience.title}
                    </h3>
                    <p className="text-white/90 text-sm font-sans leading-relaxed mb-3 line-clamp-2">
                      {experience.description}
                    </p>
                    <Button
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white font-serif px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
                      Book Experience
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingFormModal isOpen={isBookingModalOpen} onClose={closeBookingModal} experience={experienceData} />

      <SiteFooter />
    </div>
  )
}
