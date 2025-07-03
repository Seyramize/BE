"use client"

import Image from "next/image"
import { Filter, Search, SlidersHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState, useEffect } from "react"
import Link from "next/link"
import { experiences } from "@/lib/experiences-data"

const filterOptions = ["Ghana", "Cape Town", "Nigeria", "Namibia"]

export default function ExperiencesPage() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null)
	const [isSearchFocused, setIsSearchFocused] = useState(false)

	const ExperienceCard = ({
		experience,
		index,
		columns = 4
	}: {
		experience: (typeof experiences)[0]
		index: number
		columns?: number
	}) => {
		const isHovered = hoveredCard === experience.id
		const { defaultContent, expandedContent, tags } = experience

		// Calculate if card should slide from left or right based on column position
		// For tablet view (2 columns), odd indices slide from right, even from left
		const isLeftSlide = index % 2 === 0

		return (
			<div
				className="relative h-96"
				onMouseEnter={() => setHoveredCard(experience.id)}
				onMouseLeave={() => setHoveredCard(null)}
				style={{ zIndex: isHovered ? 50 : 1 }}
			>
				{/* Default Card State */}
				<div
					className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-2500 ease-out h-full`}
					style={{
						transition: 'opacity 1200ms ease-out, transform 2500ms ease-out',
						transform: isHovered ? 'scale(0.98) rotate(-1deg)' : 'scale(1) rotate(0deg)',
						transformOrigin: 'center'
					}}
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
						<div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between">
							{tags.map((tag, index) => (
								<div
									key={index}
									className={`backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full font-sans border border-white/20 ${
										tag === "Travel Planner's Choice"
											? "bg-blue-950"
											: "bg-black/40"
									} ${tag === "2 PAX" ? "ml-auto" : ""}`}
								>
									{tag === "2 PAX" ? (
										<div className="flex items-center gap-1">
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												viewBox="0 0 24 24" 
												fill="none" 
												stroke="currentColor" 
												strokeWidth="2" 
												strokeLinecap="round" 
												strokeLinejoin="round" 
												className="w-3 h-3"
											>
												<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
												<circle cx="12" cy="7" r="4" />
											</svg>
											<span>2</span>
										</div>
									) : (
										tag
									)}
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
							{/* Book Experience Button on hover */}
							{isHovered && (
								<div className="mt-4 flex justify-center">
									<Link href={`/book-experience/${experience.id}`}>
										<Button className="bg-transparent border border-white text-white font-sans px-12 py-2 rounded-full transition-colors text-sm min-w-[180px] hover:bg-white/10">
											Book Experience
										</Button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Expanded Card State */}
				{/* <div
					className={`absolute top-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-2500 ease-out pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"} sm:w-[215%] w-full`}
					style={{
						height: "100%",
						transform: `
							${isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.95) rotate(1deg)'}
							translateX(${isHovered ? 0 : isLeftSlide ? '-100%' : '0'}%)
						`,
						transformOrigin: isLeftSlide ? 'left center' : 'right center',
						left: isLeftSlide ? '0' : 'auto',
						right: isLeftSlide ? 'auto' : '0',
						transition: 'transform 2500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 1200ms ease-out',
						transitionDelay: isHovered ? '200ms' : '400ms',
						willChange: 'transform, opacity'
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
						{/* <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8"> */}
							{/* Badges Section */}
							{/* <div className="flex items-center gap-2 sm:gap-3 w-full mb-1">
								<div className="bg-blue-950 backdrop-blur-sm text-white px-2 py-1 rounded-full font-sans text-[8px] sm:text-[10px] font-medium shadow-lg">
									Travel Planner's Choice
								</div>
								<div className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full font-sans text-[8px] sm:text-[10px] border border-white/20">
									2 PAX (Minimum)
								</div>
							</div> */}

							{/* Content Section */}
							{/* <div className="flex flex-col">
								<div className="w-full">
									<h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-white mb-2 text-justify w-full">
										{expandedContent.title}
									</h2>
									<p className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed mb-4 text-justify">
										{expandedContent.fullDescription}
									</p>
								</div>
								<div className="flex justify-center w-full">
									<Button className="bg-white/20 hover:bg-white/30 text-white font-sans px-6 sm:px-12 py-2 sm:py-3 rounded-full backdrop-blur-sm border border-white/30 w-full pointer-events-auto text-sm sm:text-base">
										<Link href={`/book-experience/${experience.id}`}>
											Book Experience
										</Link>
									</Button>
								</div>
							</div> */}
						{/* </div> */}
					{/* </div>
				</div> */}
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader />

			{/* Hero Section */}
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
			<section className="relative z-10 pt-0 sm:pt-1 md:pt-2 pb-4 sm:pb-6 md:pb-8 -mt-8 sm:-mt-12 md:-mt-16">
				
				
				{/* Filter Content */}
				<div className="relative container mx-auto px-4 sm:px-6 z-30">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8">
      
						{/* Filter Buttons - Left side */}
						<div className="w-full sm:flex-1 overflow-x-auto">
							<div className="flex gap-2 pb-2 sm:pb-0">
								{filterOptions.map((filter) => (
									<Button
										key={filter}
										variant="outline"
										className="rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border-gray-300 text-gray-700 hover:bg-gray-100 font-sans whitespace-nowrap text-[10px] sm:text-xs"
									>
										{filter}
									</Button>
								))}
							</div>
						</div>

						{/* Search and Action Buttons - Right side */}
						<div className={`flex items-center gap-4 shrink-0 transition-all duration-300 ${isSearchFocused ? 'w-full' : ''}`}>
							<Button className={`bg-gray-900 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-sans hover:bg-gray-800 text-xs sm:text-sm transition-all duration-300 ${isSearchFocused ? 'hidden' : ''}`}>
								<Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
								<span className="whitespace-nowrap">Filter</span>
							</Button>
							<Button
								className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white hover:bg-gray-900 font-sans text-xs sm:text-sm transition-all duration-300 ${isSearchFocused ? 'hidden' : ''}`}
							>
								<SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
								Sort
							</Button>
							<div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full' : 'w-40 sm:w-52 md:w-48 lg:w-56'}`}>
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-4" />
								<Input
									placeholder="Search experiences"
									className="pl-10 rounded-full border-gray-300 font-sans w-full text-xs sm:text-sm"
									onFocus={() => setIsSearchFocused(true)}
									onBlur={() => setIsSearchFocused(false)}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Experiences Grid with expanded spacing for hover effects */}
			<section className="py-8 sm:py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6">
					{/* Grid with extra spacing to accommodate expanded cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
						{experiences.slice(0, 8).map((experience, index) => (
							<ExperienceCard
								key={experience.id}
								experience={experience}
								index={index}
								columns={4} // Adjust based on screen size if needed
							/>
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
								<div className="absolute inset-0 p-4 sm:p-6 md:p-8 pl-8 sm:pl-12 md:pl-20 flex flex-col justify-center max-w-full sm:max-w-2xl">
									<h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-white mb-2 sm:mb-4">
										Bespoke Experiences
									</h2>
									<p className="text-white/90 mb-4 sm:mb-6 font-sans leading-relaxed text-sm sm:text-base">
										A curated selection of exclusive experiences designed to exceed your expectations. Tell us
										what you're looking for and we'll create something extraordinary just for you.
									</p>
									<div className="w-full sm:max-w-md">
										<Link href="/customize-experience">
											<Button className="w-full sm:w-auto bg-white hover:bg-white text-black font-sans px-6 sm:px-8 py-2.5 sm:py-3 rounded-md transition-colors text-sm sm:text-base">
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
