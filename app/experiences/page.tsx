import Image from "next/image"
import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const experiences = [
  {
    id: 1,
    title: "Adventuring in Shai Hills",
    category: "Travel/Tourism/Culture",
    description:
      "Explore the scenic Shai Hills with guided tours through ancient caves, wildlife spotting, and cultural experiences with local communities. Discover the natural beauty and rich heritage of this remarkable destination.",
    duration: "Full Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Shai+Hills+Adventure",
  },
  {
    id: 2,
    title: "Discover Cape Coast",
    category: "Travel/Tourism/Culture",
    description:
      "Journey through Ghana's historic Cape Coast, visiting ancient castles, learning about the slave trade history, and experiencing local culture. Walk through centuries of history and connect with the past.",
    duration: "2 Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Cape+Coast+Discovery",
  },
  {
    id: 3,
    title: "Accra City Tour",
    category: "Travel/Tourism/Culture",
    description:
      "Discover the vibrant capital city of Ghana with visits to markets, museums, and cultural sites that showcase the rich heritage of Accra. Experience the pulse of modern Ghana.",
    duration: "Half Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Accra+City+Tour",
  },
  {
    id: 4,
    title: "Western Tour",
    category: "Travel/Tourism/Culture",
    description:
      "Explore Ghana's western region with its pristine beaches, rainforest canopy walks, and traditional fishing communities. Immerse yourself in coastal culture and natural wonders.",
    duration: "3 Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Western+Ghana+Tour",
  },
  {
    id: 5,
    title: "Ashanti Tour",
    category: "Travel/Tourism/Culture",
    description:
      "Immerse yourself in the rich culture of the Ashanti Kingdom, visiting traditional palaces, craft centers, and experiencing royal ceremonies. Discover the heart of Ghanaian tradition.",
    duration: "2 Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Ashanti+Cultural+Tour",
  },
  {
    id: 6,
    title: "Akosombo Adventure",
    category: "Travel/Tourism/Culture",
    description:
      "Experience the beauty of Lake Volta with boat cruises, visits to the Akosombo Dam, and exploration of surrounding communities. Witness engineering marvels and natural beauty.",
    duration: "Full Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Akosombo+Lake+Adventure",
  },
  {
    id: 7,
    title: "Kente & Culture",
    category: "Travel/Tourism/Culture",
    description:
      "Learn the ancient art of Kente weaving in traditional villages and discover the cultural significance of Ghana's most famous textile. Create your own piece of history.",
    duration: "Half Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Kente+Weaving+Culture",
  },
  {
    id: 8,
    title: "Arts in Accra",
    category: "Travel/Tourism/Culture",
    description:
      "Explore Accra's vibrant arts scene with visits to galleries, artist studios, and cultural centers showcasing contemporary Ghanaian art. Meet local artists and discover emerging talent.",
    duration: "Half Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Accra+Arts+Scene",
  },
  {
    id: 9,
    title: "Hands-on Gastronomy",
    category: "Travel/Tourism/Culture",
    description:
      "Learn to cook traditional Ghanaian dishes with local chefs, visit spice markets, and enjoy authentic culinary experiences. Taste the flavors that define Ghanaian cuisine.",
    duration: "Full Day Experience",
    image: "/placeholder.svg?height=400&width=300&text=Ghanaian+Cooking+Class",
  },
]

const filterOptions = ["Ghana", "Cape Town", "Nigeria", "Namibia"]

export default function ExperiencesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section - Increased Height */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Experiences%20Catalog.png-qJpKqA0NH4KBAKO143TKoHYVhbysiy.jpeg"
            alt="Safari experience with elephants"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal mb-4 leading-tight">
            Experiences
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-sans">Curated by Beyond</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-sans"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button className="bg-gray-900 text-white rounded-full px-6 py-2 font-sans hover:bg-gray-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter Experiences
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-sans"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search" className="pl-10 rounded-full border-gray-300 font-sans" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* First Row - 4 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {experiences.slice(0, 4).map((experience) => (
              <div
                key={experience.id}
                className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-80">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-sans">
                      {experience.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-serif font-normal text-white mb-2">{experience.title}</h3>
                    <p className="text-white/90 text-sm mb-3 font-sans leading-relaxed line-clamp-3">
                      {experience.description}
                    </p>
                    <p className="text-white/80 text-xs font-sans">{experience.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 4 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {experiences.slice(4, 8).map((experience) => (
              <div
                key={experience.id}
                className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-80">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-sans">
                      {experience.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-serif font-normal text-white mb-2">{experience.title}</h3>
                    <p className="text-white/90 text-sm mb-3 font-sans leading-relaxed line-clamp-3">
                      {experience.description}
                    </p>
                    <p className="text-white/80 text-xs font-sans">{experience.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third Row - 1 card left, 1 large card right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Single experience card */}
            <div className="lg:col-span-1">
              <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-80">
                  <Image
                    src={experiences[8].image || "/placeholder.svg"}
                    alt={experiences[8].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-sans">
                      {experiences[8].category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-serif font-normal text-white mb-2">{experiences[8].title}</h3>
                    <p className="text-white/90 text-sm mb-3 font-sans leading-relaxed line-clamp-3">
                      {experiences[8].description}
                    </p>
                    <p className="text-white/80 text-xs font-sans">{experiences[8].duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bespoke Experiences - Large card */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-80">
                  <Image
                    src="/placeholder.svg?height=320&width=800&text=Tropical+Beach+Paradise"
                    alt="Bespoke tropical experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-normal text-white mb-4">Bespoke Experiences</h2>
                    <p className="text-white/90 mb-6 max-w-lg font-sans leading-relaxed">
                      A curated selection of exclusive experiences designed to exceed your expectations. Tell us what
                      you're looking for and we'll create something extraordinary.
                    </p>
                    <div className="max-w-md">
                      <Input
                        placeholder="Describe your experience"
                        className="bg-white/90 border-0 rounded-full px-6 py-3 text-gray-900 font-sans placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
