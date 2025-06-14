import Image from "next/image"
import { Play, Calendar, Clock, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/mountains.jpg"
            alt="Cloudy sky over mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>
        <div className="relative text-center text-slate-800 z-10 px-4 w-full">
          {/* Content container with max-width */}
          <div className="max-w-2xl mx-auto mt-16 md:mt-24 lg:mt-32">
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8">
                <img
                  src="/images/AboutLayerIcon.png"
                  alt="Beyond Experiences Logo"
                  className="w-full h-full object-contain filter brightness-0"
                />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wider font-helvetica mb-6">ABOUT US</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-argent font-normal mb-8 leading-tight">
              Born from a
              <br />
              love of discovery
            </h1>
            <p className="text-lg text-slate-700 mb-8 font-helvetica leading-relaxed max-w-lg mx-auto">
              At Beyond Experiences, we believe your next great adventure should be just a click away. We offer a curated
              catalog of premium, ready-made journeys—designed for travelers who crave authentic moments without the heavy
              lift of planning.
            </p>
            <Button className="text-base px-8 py-3 rounded-full bg-[#B55A30] hover:bg-[#B55A30] text-white font-argent border-0 mb-16">
              Discover More
            </Button>
          </div>

          {/* Video Section - Now outside the max-width container */}
          <div className="relative rounded-lg overflow-hidden w-full mx-auto mb-32 px-4 md:px-8 lg:px-16 max-w-7xl">
            <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=500&width=800&text=Silhouettes+Against+Twilight+Sky"
                alt="People silhouettes against twilight sky"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Button
                    variant="ghost"
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 backdrop-blur-sm"
                  >
                    <Play className="w-8 h-8" fill="currentColor" />
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-6 h-6 text-white/60">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-argent font-normal text-center mb-16">What we offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-helvetica font-semibold mb-2">HANDPICKED ITINERARIES</h3>
              <p className="text-sm text-slate-600 font-helvetica">Curated by seasoned local experts</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-helvetica font-semibold mb-2">INSTANT ACCESS</h3>
              <p className="text-sm text-slate-600 font-helvetica">Book in minutes, travel within the week</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-helvetica font-semibold mb-2">AUTHENTIC IMMERSION</h3>
              <p className="text-sm text-slate-600 font-helvetica">Real ideas into cultures, people, and landscapes</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-helvetica font-semibold mb-2">ACCESSIBLE LUXURY</h3>
              <p className="text-sm text-slate-600 font-helvetica">Premium experiences without the boutique price tag</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-[#556B2F] text-white">
        <div className="container mx-auto px-6">
          {/* Centered heading */}
          <h2 className="text-2xl md:text-3xl font-argent font-normal mb-10 text-center max-w-3xl mx-auto leading-tight">
            Our Commitment to Sustainability
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Text content - spans 7 columns on large screens */}
            <div className="lg:col-span-7">
              <div className="space-y-4 text-white/90 font-helvetica leading-relaxed">
                <p>
                  At Beyond Experiences, we believe that travel should be an enriching force for both travelers and the
                  destinations they visit. That's why we're committed to protecting the communities, cultures, and
                  environments that make our journeys possible. Every experience we offer is designed to create positive
                  impact for the local people and places that share their stories to the ecosystems that host our
                  adventures.
                </p>
                <p>
                  We partner directly with local artisans, eco-conscious operators, and community-led initiatives that
                  champion belonging, equity, and regeneration. Whether it's booking with guides who give back to their
                  communities, sourcing from businesses that prioritize fair wages, or choosing thoughtful choices at
                  every turn.
                </p>
                <p>
                  From tree-planting travel practices to supporting cultural preservation efforts, we believe that the
                  best way to explore our beautiful world is more than a pleasure—it's a step toward a future where
                  exploration and responsibility go hand in hand.
                </p>
              </div>
            </div>

            {/* Two images with different widths - span 5 columns on large screens */}
            <div className="lg:col-span-5">
              <div className="flex gap-4">
                {/* First image - slightly wider */}
                <div className="relative h-[350px] w-[58%] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Community+Sustainability+Initiatives"
                    alt="Community sustainability initiatives and local partnerships"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/20" />
                </div>

                {/* Second image - slightly narrower */}
                <div className="relative h-[350px] w-[42%] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400&text=Environmental+Conservation+Efforts"
                    alt="Environmental conservation and eco-friendly practices"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/quad-bikes.jpg"
            alt="Desert ATV adventure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative text-center text-white z-10 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-argent font-normal mb-8 leading-tight">
            Go Beyond the Ordinary.
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-helvetica max-w-2xl mx-auto leading-relaxed">
            Adventure is calling—and it's closer than you think.
            <br />
            Book your next story today with Beyond Experiences and discover a world waiting to meet you.
          </p>
          <Button className="bg-white hover:bg-white text-black font-argent px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
            Explore Experiences
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
