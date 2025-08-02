import Image from "next/image"
import { Play, Calendar, Map, Clock, Users, Sparkle } from "lucide-react"
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
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="max-w-2xl mx-auto mt-24 text-white">
              <div className="mt-64">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8">
                    <Image
                      src="/images/whitelogo.png"
                      alt="Beyond Experiences Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h1 className="text-4xl font-serif font-normal mb-4 leading-8 px-8">
                  Born from a
                  <br />
                  love of discovery
                </h1>
                <p className="text-md font-sans leading-tight max-w-lg mx-auto px-8">
                  At Beyond Experiences, we believe your next great adventure should be just a click away. We offer a
                  curated catalog of premium, ready-made journeys—designed for travelers who crave authentic moments
                  without the heavy lift of planning.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden w-full mx-auto mt-6 mb-4 px-2 max-w-7xl">
              <div className="relative rounded-2xl h-[30vh] w-full flex items-center justify-center">
                <Image
                  src="/images/about-us/aboutusvideo.jpg?height=500&width=800&text=Silhouettes+Against+Twilight+Sky"
                  alt="People silhouettes against twilight sky"
                  fill
                  className="object-cover [object-position:50%_30%]"
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
              <div className="w-full flex justify-start">
                <Button className="text-sm px-8 py-5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-sans border border-white mt-4 flex items-center gap-2">
                  Explore Experiences
                  <Map className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="max-w-2xl mx-auto mt-24 lg:mt-32">
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8">
                  <img
                    src="/images/AboutLayerIcon.png"
                    alt="Beyond Experiences Logo"
                    className="w-full h-full object-contain filter brightness-0"
                  />
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] font-sans font-bold mb-6">ABOUT US</p>
              <h1 className="text-6xl lg:text-7xl font-serif font-normal mb-6 leading-none">
                Born from a
                <br />
                love of discovery
              </h1>
              <p className="text-lg text-slate-700 mb-8 font-sans leading-relaxed max-w-lg mx-auto">
                At Beyond Experiences, we believe your next great adventure should be just a click away. We offer a curated
                catalog of premium, ready-made journeys—designed for travelers who crave authentic moments without the
                heavy lift of planning.
              </p>
            </div>
            <div className="w-full text-center mb-16">
              <Button className="text-base px-8 py-3 rounded-full bg-[#B55A30] hover:bg-[#B55A30] text-white font-sans border-0">
                Explore Experiences
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden w-full mx-auto mb-32 px-8 lg:px-16 max-w-7xl">
              <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
                <Image
                  src="/images/about-us/aboutusvideo.jpg?height=500&width=800&text=Silhouettes+Against+Twilight+Sky"
                  alt="People silhouettes against twilight sky"
                  fill
                  className="object-cover [object-position:50%_30%]"
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
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="pt-7 pb-7 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-left mb-6 md:hidden">What we offer</h2>
          <h2 className="hidden md:block text-5xl md:text-6xl font-sans font-normal text-center mb-8">
            What we offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Map className="w-6 h-6 md:w-14 md:h-14 text-slate-600" />
              </div>
              <div>
                <div className="border-l-2 border-black pl-3 md:hidden">
                  <h3 className="text-sm font-sans font-semibold mb-1">HANDPICKED ITINERARIES</h3>
                  <p className="text-sm text-slate-600 font-sans leading-tight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor arcu arcu, et sodales dolor
                    convallis a. Proin venenatis, massa vitae sodales vehicula, sapien sem lobortis felis, eu mollis
                    mauris nulla vitae ex.
                  </p>
                </div>
                <div className="hidden md:flex md:flex-col">
                  <h3 className="text-sm font-sans font-semibold mb-1">HANDPICKED ITINERARIES</h3>
                  <p className="text-sm text-slate-600 font-sans">Curated by seasoned local experts</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 md:w-14 md:h-14 text-slate-600" />
              </div>
              <div>
                <div className="border-l-2 border-black pl-3 md:hidden">
                  <h3 className="text-sm font-sans font-semibold mb-1">INSTANT ACCESS</h3>
                  <p className="text-sm text-slate-600 font-sans leading-tight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor arcu arcu, et sodales dolor
                    convallis a. Proin venenatis, massa vitae sodales vehicula, sapien sem lobortis felis, eu mollis
                    mauris nulla vitae ex.
                  </p>
                </div>
                <div className="hidden md:flex md:flex-col">
                  <h3 className="text-sm font-sans font-semibold mb-1">INSTANT ACCESS</h3>
                  <p className="text-sm text-slate-600 font-sans">Book in minutes, travel within the week</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 md:w-14 md:h-14 text-slate-600" />
              </div>
              <div>
                <div className="border-l-2 border-black pl-3 md:hidden">
                  <h3 className="text-sm font-sans font-semibold mb-1">AUTHENTIC IMMERSION</h3>
                  <p className="text-sm text-slate-600 font-sans leading-tight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor arcu arcu, et sodales dolor
                    convallis a. Proin venenatis, massa vitae sodales vehicula, sapien sem lobortis felis, eu mollis
                    mauris nulla vitae ex.
                  </p>
                </div>
                <div className="hidden md:flex md:flex-col">
                  <h3 className="text-sm font-sans font-semibold mb-1">AUTHENTIC IMMERSION</h3>
                  <p className="text-sm text-slate-600 font-sans">Real ideas into cultures, people, and landscapes</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Sparkle className="w-6 h-6 md:w-14 md:h-14 text-slate-600" />
              </div>
              <div>
                <div className="border-l-2 border-black pl-3 md:hidden">
                  <h3 className="text-sm font-sans font-semibold mb-1">ACCESSIBLE LUXURY</h3>
                  <p className="text-sm text-slate-600 font-sans leading-tight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor arcu arcu, et sodales dolor
                    convallis a. Proin venenatis, massa vitae sodales vehicula, sapien sem lobortis felis, eu mollis
                    mauris nulla vitae ex.
                  </p>
                </div>
                <div className="hidden md:flex md:flex-col">
                  <h3 className="text-sm font-sans font-semibold mb-1">ACCESSIBLE LUXURY</h3>
                  <p className="text-sm text-slate-600 font-sans">Premium experiences without the boutique price tag</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}

      {/* Mobile view */}
      <div className="md:hidden">
        {/* hero image */}
        <div className="relative h-[27vh] w-full">
          <Image
            src="/images/about-us/sustainability1.jpg?height=500&width=800"
            alt="Community sustainability initiatives"
            fill
            className="object-cover"
          />
        </div>
        {/* dark block */}
        <div className="bg-[#142929] text-white px-6 pt-6 pb-10">
          <h2 className="text-3xl font-serif leading-7 font-normal mb-6">
            Our commitment<br/>to sustainability
          </h2>
          <div className="space-y-6 text-sm leading-tight text-white/90">
            <p>
              At Beyond Experiences, we believe that travel should be an enriching force for both travelers and the destinations they visit. That's why we're committed to protecting the communities, cultures, and environments that make our journeys possible. Every experience we offer is designed to create positive impact for the local people and places that share their stories to the ecosystems that host our adventures.
            </p>
            <p>
              We partner directly with local artisans, eco-conscious operators, and community-led initiatives that champion belonging, equity, and regeneration. Whether it's booking with guides who give back to their communities, sourcing from businesses that prioritize fair wages, or choosing thoughtful choices at every turn.
            </p>
            <p>
              From tree-planting travel practices to supporting cultural preservation efforts, we believe that the best way to explore our beautiful world is more than a pleasure—it's a step toward a future where exploration and responsibility go hand in hand.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet view */}
      <section className="hidden md:block py-20 bg-[#142929] text-white">
        <div className="container mx-auto px-6">
          {/* Centered heading */}
          <h2 className="text-3xl md:text-4xl font-sans font-normal mb-10 text-center max-w-3xl mx-auto leading-tight">
            Our Commitment to Sustainability
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Text content - spans 7 columns on large screens */}
            <div className="lg:col-span-7">
              <div className="space-y-4 text-white/90 font-sans leading-relaxed">
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
                <div className="relative h-[200px] md:h-[320px] lg:h-[350px] w-[58%] rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-us/sustainability1.jpg?height=300&width=500&text=Community+Sustainability+Initiatives"
                    alt="Community sustainability initiatives and local partnerships"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/20" />
                </div>

                {/* Second image - slightly narrower */}
                <div className="relative h-[200px] md:h-[320px] lg:h-[350px] w-[42%] rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-us/sustainability2.jpg?height=250&width=400&text=Environmental+Conservation+Efforts"
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

      {/* Mobile view */}
      <div className="md:hidden">
        {/* hero */}
        <div className="relative h-[40vh] w-full">
          <Image
            src="/images/quad-bikes.jpg"
            alt="Desert ATV adventure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center py-4">
            <h2 className="text-4xl font-serif font-normal leading-9 text-white text-center">
              Go beyond<br/>the ordinary
            </h2>
            <div className="mt-24 flex flex-col items-center gap-4">
              <Button className="text-sm px-8 py-6 rounded-xl border border-white text-white bg-white/20 hover:bg-white/30 flex items-center gap-2">
                Explore Experiences
                <Map className="w-5 h-5" />
              </Button>
              <p className="text-sm text-white/80 leading-tight text-center">
                Adventure is calling, and it&rsquo;s closer <br></br> than you think.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Desktop / Tablet view */}
      <section className="hidden md:block relative py-48">
        <div className="absolute inset-0">
          <Image
            src="/images/quad-bikes.jpg"
            alt="Desert ATV adventure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative text-center text-white z-10 px-4 -mt-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-8 leading-tight">
            Go Beyond the Ordinary.
          </h2>
          <p className="text-sm md:text-lg text-white/90 mb-4 font-sans max-w-3xl mx-auto leading-relaxed">
            Adventure is calling—and it's closer than you think.
            <br className="leading-tight" />
            <span className="block mt-2 sm:mt-3">Book your next story today with Beyond Experiences and discover a world waiting to meet you.</span>
          </p>
          <Button className="bg-white hover:bg-white text-black font-sans px-8 py-3 rounded-full backdrop-blur-sm border border-white/30">
            Explore Experiences
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
