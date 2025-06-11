"use client"

import Image from "next/image"
import { Filter, Search, SlidersHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState, useEffect } from "react"
import Link from "next/link"

// CMS-ready data structure for future integration
const experiences = [
	{
		id: 1,
		defaultContent: {
			title: "Adventuring in Shai Hills",
			shortDescription:
				"Explore scenic hills with guided tours through ancient caves and wildlife spotting.",
			image: "/placeholder.svg?height=400&width=300&text=Shai+Hills+Adventure",
			location: "Eastern Region, Ghana"
		},
		expandedContent: {
			title: "Adventuring in Shai Hills",
			fullDescription:
				"This Eastern experience offers a perfect mix of luxury, nature, and relaxation. Begin with a visit to Safari Valley Resort, an eco-friendly retreat where you can experience luxury in a serene natural setting, interact with free-roaming wildlife, and enjoy activities like biking, horseback riding, and nature walks.Next, head to Asenema Waterfalls, a hidden gem surrounded by lush greenery, where you can unwind and take a refreshing dip in the cool cascading waters.",
			image: "/placeholder.svg?height=500&width=400&text=Shai+Hills+Detailed+Safari"
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 2,
		defaultContent: {
			title: "Discover Cape Coast",
			shortDescription: "Journey through Ghana's historic Cape Coast and ancient castles.",
			image: "/placeholder.svg?height=400&width=300&text=Cape+Coast+Discovery",
      location: "Central Region, Ghana"
		},
		expandedContent: {
			title: "Discover Cape Coast",
			fullDescription:
				"Immerse yourself in Ghana's profound historical narrative through this comprehensive Cape Coast experience. Visit the iconic Cape Coast Castle, explore haunting dungeons that tell stories of the transatlantic slave trade, and walk through the Door of No Return. Experience vibrant fishing communities, witness traditional ceremonies, and savor authentic coastal cuisine while learning about resilience and cultural preservation.",
			image: "/placeholder.svg?height=500&width=400&text=Cape+Coast+Castle+Historical",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 3,
		defaultContent: {
			title: "Accra City Tour",
			shortDescription:
				"Discover the vibrant capital with markets, museums, and cultural sites.",
			image: "/placeholder.svg?height=400&width=300&text=Accra+City+Tour",
			location: "Greater Accra, Ghana",
		},
		expandedContent: {
			title: "Accra City Tour",
			fullDescription:
				"Navigate through Accra's bustling streets and discover the heartbeat of modern Ghana. Visit the vibrant Makola Market, explore the National Museum's treasures, and experience the artistic energy of the Arts Centre. Walk through historic Jamestown, enjoy panoramic views from Kwame Nkrumah Memorial Park, and taste street food delicacies while learning about Ghana's journey to independence.",
			image: "/placeholder.svg?height=500&width=400&text=Accra+Skyline+Modern",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 4,
		defaultContent: {
			title: "Western Tour",
			shortDescription:
				"Explore pristine beaches, rainforest canopy walks, and fishing communities.",
			image: "/placeholder.svg?height=400&width=300&text=Western+Ghana+Tour",
      location: "Western Region, Ghana",
		},
		expandedContent: {
			title: "Western Tour",
			fullDescription:
				"Embark on an extraordinary journey through Ghana's western paradise, where pristine beaches meet ancient rainforests. Experience the thrill of canopy walks in Kakum National Park, relax on untouched shores of Busua Beach, engage with traditional fishing communities in Dixcove, and discover hidden waterfalls. This comprehensive tour combines adventure, relaxation, and cultural immersion.",
			image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 5,
		defaultContent: {
			title: "Ashanti Tour",
			shortDescription:
				"Immerse in Ashanti Kingdom culture with palaces and craft centers.",
			image: "/placeholder.svg?height=400&width=300&text=Ashanti+Cultural+Tour",
			location: "Ashanti Region, Ghana",
		},
		expandedContent: {
			title: "Ashanti Tour",
			fullDescription:
				"Step into the magnificent world of the Ashanti Kingdom, where royal traditions come alive. Visit the sacred Manhyia Palace, witness traditional Kente weaving in Bonwire village, participate in authentic Ashanti ceremonies, and explore the golden treasures of Kumasi's cultural sites. Learn about the rich history of one of Africa's most powerful kingdoms.",
			image: "/placeholder.svg?height=500&width=400&text=Ashanti+Palace+Golden",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 6,
		defaultContent: {
			title: "Akosombo Adventure",
			shortDescription: "Experience Lake Volta with boat cruises and dam visits.",
			image: "/placeholder.svg?height=400&width=300&text=Akosombo+Lake+Adventure",
      location: "Volta Region, Ghana",
		},
		expandedContent: {
			title: "Akosombo Adventure",
			fullDescription:
				"Discover the engineering marvel of Lake Volta, the world's largest artificial lake by surface area. Cruise across expansive waters while enjoying breathtaking sunset views, visit the impressive Akosombo Dam, explore floating communities that call the lake home, and learn about hydroelectric power generation. Perfect for those interested in engineering marvels and natural beauty.",
			image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 7,
		defaultContent: {
			title: "Kente & Culture",
			shortDescription: "Learn ancient Kente weaving art in traditional villages.",
			image: "/placeholder.svg?height=400&width=300&text=Kente+Weaving+Culture",
      location: "Ashanti Region, Ghana",
		},
		expandedContent: {
			title: "Kente & Culture",
			fullDescription:
				"Delve deep into the sacred art of Kente weaving in the traditional villages of Bonwire and Adanwomase. Learn from master weavers about symbolic meanings behind each pattern and color, participate in hands-on weaving workshops, create your own authentic Kente strip, and understand the cultural significance of Ghana's most famous textile in royal and ceremonial contexts.",
			image: "/placeholder.svg?height=500&width=400&text=Kente+Weaving+Master",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
	{
		id: 8,
		defaultContent: {
			title: "Arts in Accra",
			shortDescription: "Explore vibrant arts scene with galleries and artist studios.",
			image: "/placeholder.svg?height=400&width=300&text=Accra+Arts+Scene",
			location: "Greater Accra, Ghana",
		},
		expandedContent: {
			title: "Arts in Accra",
			fullDescription:
				"Immerse yourself in Accra's thriving contemporary art scene through exclusive studio visits and gallery tours. Meet renowned artists in their creative spaces, witness live painting and sculpture demonstrations, explore vibrant street art of Jamestown, and participate in interactive art workshops. Discover how modern Ghanaian artists blend traditional themes with contemporary techniques.",
			image: "/placeholder.svg?height=500&width=400&text=Accra+Art+Gallery",
		},
		tags: ["Travel Planner's Choice", "2 PAX"],
	},
]

const filterOptions = ["Ghana", "Cape Town", "Nigeria", "Namibia"]

export default function ExperiencesPage() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null)

	const ExperienceCard = ({ experience, index }: { experience: (typeof experiences)[0]; index: number }) => {
		const isHovered = hoveredCard === experience.id
		const { defaultContent, expandedContent, tags } = experience

		return (
			<div
				className="relative transition-all duration-300 ease-in-out"
				onMouseEnter={() => setHoveredCard(experience.id)}
				onMouseLeave={() => setHoveredCard(null)}
				style={{ zIndex: isHovered ? 50 : 1 }}
			>
				{/* Default Card State */}
				<div
					className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-96 ${
						isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
					}`}
				>
					<div className="relative h-full">
						<Image
							src={defaultContent.image || "/placeholder.svg"}
							alt={defaultContent.title}
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

						{/* Tags at the top */}
						<div className="absolute top-4 left-4 flex flex-wrap gap-8">
							{tags.map((tag, index) => (
								<div
									key={index}
									className={`backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full font-sans border border-white/20 ${
										tag === "Travel Planner's Choice" 
											? "bg-gray-600/95"
											: "bg-black/40"
									}`}
								>
									{tag}
								</div>
							))}
						</div>

						<div className="absolute bottom-0 left-0 right-0 p-6">
							<h3 className="text-xl font-sans font-medium text-white mb-2">
								{defaultContent.title}
							</h3>
							<p className="text-white/90 text-sm mb-3 font-sans leading-relaxed">
								{defaultContent.shortDescription}
							</p>
							<div className="h-[2px] w-[45%] bg-white/90 mb-3" />
							<div className="flex items-center text-white/80 text-xs font-sans">
								<MapPin className="w-3 h-3 mr-1" />
								{defaultContent.location}
							</div>
						</div>
					</div>
				</div>

				{/* Expanded Card State */}
				<div
					className={`absolute top-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out ${
						isHovered ? "opacity-100 scale-110" : "opacity-0 scale-95 pointer-events-none"
					}`}
					style={{
						width: "min(150%, calc(100vw - 1rem))",
						height: "150%",
						transform: isHovered 
							? "translate(-50%, -20%) scale(1)" 
							: "translate(-50%, -20%) scale(0.95)",
						transformOrigin: "center center",
						maxWidth: "min(calc(100vw - 1rem), 850px)",
						left: "50%",
						position: "absolute",
						margin: "0 auto"
					}}
				>
					<div className="relative h-full">
						<Image
							src={expandedContent.image || "/placeholder.svg"}
							alt={expandedContent.title}
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

						{/* Content Container */}
						<div className="absolute inset-0 flex flex-col justify-end p-8">
							
								{/* Badges Section */}
								<div className="flex justify-between items-center w-full mb-4">
									<div className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-sans text-xs font-medium shadow-lg">
										Travel Planner's Choice
									</div>
									<div className="bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-sans text-[11px] border border-white/20">
										2 PAX (Minimum)
									</div>
								</div>

								{/* Content Section */}
								<div className="text-center">
									<h2 className="text-xl sm:text-2xl font-sans font-medium text-white mb-3 sm:mb-4 text-justify">
										{expandedContent.title}
									</h2>
									
									<p className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed mb-6 text-justify">
										{expandedContent.fullDescription}
									</p>

									{/* CTA Button */}
									<Button className="w-80 bg-transparent hover:bg-white/90 text-white/90 hover:text-gray-900 font-sans py-2 sm:py-2.5 px-5 sm:px-6 rounded-full transition-all text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl border border-white/20">
										<Link href={`/book-experience/${experience.id}`}>
											Book Experience
										</Link>
									</Button>
								</div>
							
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader />

			{/* Hero Section - Responsive Height */}
			<section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[875px] w-full flex items-center justify-center">
				<div className="absolute inset-0">
					<Image
						src="/images/elephants.jpg"
						alt="Safari experience with elephants"
						width={1920}
						height={875}
						className="object-cover w-full h-full"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/30 to-black/30" />
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent backdrop-blur-[2px]" style={{ height: '30%', bottom: 0, top: 'auto', backdropFilter: 'blur(2px) brightness(1.05)' }} />
				</div>
				<div className="relative text-center text-white z-10 px-4 max-w-[90%] mx-auto">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-normal mb-2 sm:mb-4 leading-tight">
						Experiences
					</h1>
					<p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans">
						Curated by Beyond
					</p>
				</div>
			</section>

			{/* Filter Section */}
			<section className="py-4 sm:py-6 md:py-8 bg-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="flex justify-between items-center gap-8">
      {/* Filter Buttons - Left side */}
      {/* <div className="flex-1 overflow-x-auto">
        <div className="flex gap-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              className="rounded-full px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-sans whitespace-nowrap text-sm"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div> */}

      {/* Search and Action Buttons - Right side */}
      {/* <div className="flex items-center gap-4 shrink-0">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search experiences"
            className="pl-10 rounded-full border-gray-300 font-sans w-full"
          />
        </div>

        <Button className="bg-gray-900 text-white rounded-full px-4 py-2 font-sans hover:bg-gray-800 text-sm">
          <Filter className="w-4 h-4 mr-2" />
          <span className="whitespace-nowrap">Filter</span>
        </Button>
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-sans text-sm"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </div> */}
    </div>
  </div>
</section>

			{/* Experiences Grid with expanded spacing for hover effects */}
			<section className="py-8 sm:py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6">
					{/* Grid with extra spacing to accommodate expanded cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
						{experiences.slice(0, 8).map((experience, index) => (
							<ExperienceCard key={experience.id} experience={experience} index={index} />
						))}
					</div>

					{/* Bespoke Experiences Section */}
					<div className="mt-8 sm:mt-12 md:mt-16">
						<div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-64 sm:h-72 md:h-80">
							<div className="relative h-full">
								<Image
									src="/placeholder.svg?height=320&width=1200&text=Tropical+Beach+Paradise"
									alt="Bespoke tropical experience"
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/40" />
								<div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center max-w-full sm:max-w-2xl">
									<h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white mb-2 sm:mb-4">
										Bespoke Experiences
									</h2>
									<p className="text-white/90 mb-4 sm:mb-6 font-sans leading-relaxed text-sm sm:text-base">
										A curated selection of exclusive experiences designed to exceed your expectations. Tell us
										what you're looking for and we'll create something extraordinary just for you.
									</p>
									<div className="w-full sm:max-w-md">
										<Link href="/customize-experience">
											<Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-sans px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base">
												Customize my experience
											</Button>
										</Link>
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
