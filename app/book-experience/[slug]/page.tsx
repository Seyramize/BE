"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingFormModal } from "@/components/booking-form-modal"
import { GalleryModal } from "@/components/gallery-modal"
import { experiences, type Experience } from "@/lib/experiences-data"
import { Check, Eye, Sparkle, Hammer, PocketKnife, User, BedDouble, Car, Salad, Users, Drum, VenetianMask, Sailboat, Wifi, Utensils, Gift, GlassWater, Bus,  } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const includedIcons: Record<string, any> = {
  "Private transportation including fuel": Car,
  "Dedicated chaperone and access to resident guides": Users,
  "Professional massage at a waterfall": BedDouble,
  "On-the-go internet access": Wifi,
  "Lunch and dinner": Utensils,
  "Lunch and refreshments": Salad,
  "Lunch at a local restaurant": Utensils,
  "Professional city guide": User,
  "Professional tour guide": User,
  "All workshop materials": PocketKnife,
  "Chocolate workshop materials": Hammer,
  "All adventure equipment": Hammer,
  "Professional instructors": User,
  "Professional chocolatier": User,
  "Luxury Bus": Bus,
  "Spa treatment": Gift,
  "Cultural performance": Drum,
  "Boat cruise": Sailboat,
  "Bottled water": GlassWater,
  "Beyond Experiences Essentials™ Bag": Gift,
}

function getCountryAdjective(country: string): string {
  const countryAdjectives: { [key: string]: string } = {
    // Africa
    'Ghana': 'Ghanaian',
    'Kenya': 'Kenyan',
    'Nigeria': 'Nigerian',
    'South Africa': 'South African',
    'Tanzania': 'Tanzanian',
    'Uganda': 'Ugandan',
    'Ethiopia': 'Ethiopian',
    'Rwanda': 'Rwandan',
    'Botswana': 'Botswanan',
    'Namibia': 'Namibian',
    'Zimbabwe': 'Zimbabwean',
    'Zambia': 'Zambian',
    'Mozambique': 'Mozambican',
    'Angola': 'Angolan',
    'Malawi': 'Malawian',
    'Lesotho': 'Basotho',
    'Eswatini': 'Swazi',
    'Seychelles': 'Seychellois',
    'Mauritius': 'Mauritian',
    'Comoros': 'Comorian',
    'Madagascar': 'Malagasy',
    'Cape Verde': 'Cape Verdean',
    'São Tomé and Príncipe': 'São Toméan',
    'Equatorial Guinea': 'Equatorial Guinean',
    'Gabon': 'Gabonese',
    'Cameroon': 'Cameroonian',
    'Central African Republic': 'Central African',
    'Chad': 'Chadian',
    'Sudan': 'Sudanese',
    'South Sudan': 'South Sudanese',
    'Eritrea': 'Eritrean',
    'Djibouti': 'Djiboutian',
    'Somalia': 'Somali',
    'Burundi': 'Burundian',
    'Democratic Republic of the Congo': 'Congolese',
    'Republic of the Congo': 'Congolese',
    'Benin': 'Beninese',
    'Togo': 'Togolese',
    'Burkina Faso': 'Burkinabe',
    'Mali': 'Malian',
    'Niger': 'Nigerien',
    'Senegal': 'Senegalese',
    'Gambia': 'Gambian',
    'Guinea-Bissau': 'Guinea-Bissauan',
    'Guinea': 'Guinean',
    'Sierra Leone': 'Sierra Leonean',
    'Liberia': 'Liberian',
    'Côte d\'Ivoire': 'Ivorian',
    'Morocco': 'Moroccan',
    'Algeria': 'Algerian',
    'Tunisia': 'Tunisian',
    'Libya': 'Libyan',
    'Egypt': 'Egyptian',
    'Mauritania': 'Mauritanian',

    // Americas
    'United States': 'American',
    'Canada': 'Canadian',
    'Mexico': 'Mexican',
    'Brazil': 'Brazilian',
    'Argentina': 'Argentine',
    'Chile': 'Chilean',
    'Colombia': 'Colombian',
    'Peru': 'Peruvian',
    'Venezuela': 'Venezuelan',
    'Ecuador': 'Ecuadorian',
    'Bolivia': 'Bolivian',
    'Paraguay': 'Paraguayan',
    'Uruguay': 'Uruguayan',
    'Guyana': 'Guyanese',
    'Suriname': 'Surinamese',
    'French Guiana': 'French Guianese',
    'Panama': 'Panamanian',
    'Costa Rica': 'Costa Rican',
    'Nicaragua': 'Nicaraguan',
    'Honduras': 'Honduran',
    'El Salvador': 'Salvadoran',
    'Guatemala': 'Guatemalan',
    'Belize': 'Belizean',
    'Cuba': 'Cuban',
    'Jamaica': 'Jamaican',
    'Haiti': 'Haitian',
    'Dominican Republic': 'Dominican',
    'Puerto Rico': 'Puerto Rican',
    'Bahamas': 'Bahamian',
    'Trinidad and Tobago': 'Trinidadian',
    'Barbados': 'Barbadian',
    'Grenada': 'Grenadian',
    'Saint Lucia': 'Saint Lucian',
    'Saint Vincent and the Grenadines': 'Vincentian',
    'Antigua and Barbuda': 'Antiguan',
    'Dominica': 'Dominican',
    'Saint Kitts and Nevis': 'Kittitian',

    // Europe
    'United Kingdom': 'British',
    'France': 'French',
    'Germany': 'German',
    'Italy': 'Italian',
    'Spain': 'Spanish',
    'Portugal': 'Portuguese',
    'Netherlands': 'Dutch',
    'Belgium': 'Belgian',
    'Switzerland': 'Swiss',
    'Austria': 'Austrian',
    'Sweden': 'Swedish',
    'Norway': 'Norwegian',
    'Denmark': 'Danish',
    'Finland': 'Finnish',
    'Iceland': 'Icelandic',
    'Ireland': 'Irish',
    'Poland': 'Polish',
    'Czech Republic': 'Czech',
    'Slovakia': 'Slovak',
    'Hungary': 'Hungarian',
    'Romania': 'Romanian',
    'Bulgaria': 'Bulgarian',
    'Greece': 'Greek',
    'Croatia': 'Croatian',
    'Serbia': 'Serbian',
    'Slovenia': 'Slovenian',
    'Bosnia and Herzegovina': 'Bosnian',
    'Montenegro': 'Montenegrin',
    'Albania': 'Albanian',
    'North Macedonia': 'Macedonian',
    'Kosovo': 'Kosovar',
    'Estonia': 'Estonian',
    'Latvia': 'Latvian',
    'Lithuania': 'Lithuanian',
    'Ukraine': 'Ukrainian',
    'Belarus': 'Belarusian',
    'Russia': 'Russian',
    'Moldova': 'Moldovan',
    'Georgia': 'Georgian',
    'Armenia': 'Armenian',
    'Azerbaijan': 'Azerbaijani',
    'Turkey': 'Turkish',
    'Cyprus': 'Cypriot',
    'Malta': 'Maltese',
    'Luxembourg': 'Luxembourgish',
    'Liechtenstein': 'Liechtensteiner',
    'Monaco': 'Monegasque',
    'San Marino': 'Sammarinese',
    'Vatican City': 'Vatican',
    'Andorra': 'Andorran',

    // Asia
    'China': 'Chinese',
    'Japan': 'Japanese',
    'South Korea': 'Korean',
    'North Korea': 'Korean',
    'India': 'Indian',
    'Pakistan': 'Pakistani',
    'Bangladesh': 'Bangladeshi',
    'Sri Lanka': 'Sri Lankan',
    'Nepal': 'Nepali',
    'Bhutan': 'Bhutanese',
    'Maldives': 'Maldivian',
    'Afghanistan': 'Afghan',
    'Iran': 'Iranian',
    'Iraq': 'Iraqi',
    'Syria': 'Syrian',
    'Lebanon': 'Lebanese',
    'Jordan': 'Jordanian',
    'Israel': 'Israeli',
    'Palestine': 'Palestinian',
    'Saudi Arabia': 'Saudi',
    'Yemen': 'Yemeni',
    'Oman': 'Omani',
    'United Arab Emirates': 'Emirati',
    'Qatar': 'Qatari',
    'Bahrain': 'Bahraini',
    'Kuwait': 'Kuwaiti',
    'Vietnam': 'Vietnamese',
    'Laos': 'Lao',
    'Cambodia': 'Cambodian',
    'Thailand': 'Thai',
    'Myanmar': 'Burmese',
    'Malaysia': 'Malaysian',
    'Singapore': 'Singaporean',
    'Indonesia': 'Indonesian',
    'Philippines': 'Filipino',
    'Brunei': 'Bruneian',
    'East Timor': 'Timorese',
    'Mongolia': 'Mongolian',
    'Taiwan': 'Taiwanese',
    'Hong Kong': 'Hong Konger',
    'Macau': 'Macanese',

    // Oceania
    'Australia': 'Australian',
    'New Zealand': 'New Zealand',
    'Fiji': 'Fijian',
    'Papua New Guinea': 'Papua New Guinean',
    'Solomon Islands': 'Solomon Islander',
    'Vanuatu': 'Ni-Vanuatu',
    'Samoa': 'Samoan',
    'Tonga': 'Tongan',
    'Tuvalu': 'Tuvaluan',
    'Kiribati': 'I-Kiribati',
    'Marshall Islands': 'Marshallese',
    'Micronesia': 'Micronesian',
    'Palau': 'Palauan',
    'Nauru': 'Nauruan',
    'Cook Islands': 'Cook Islander',
    'Niue': 'Niuean',
    'Tokelau': 'Tokelauan',
    'American Samoa': 'American Samoan',
    'Guam': 'Guamanian',
    'Northern Mariana Islands': 'Northern Mariana Islander',
    'French Polynesia': 'French Polynesian',
    'New Caledonia': 'New Caledonian',
    'Wallis and Futuna': 'Wallis and Futunan',
    'Pitcairn Islands': 'Pitcairn Islander',
    'Norfolk Island': 'Norfolk Islander',
    'Christmas Island': 'Christmas Islander',
    'Cocos (Keeling) Islands': 'Cocos Islander'
  }

  // If the country is in our mapping, return its adjective
  if (countryAdjectives[country]) {
    return countryAdjectives[country]
  }

  // If not found, return the country name with 'n' appended
  return country + 'n'
}

function getRelatedExperiences(currentExperience: Experience, allExperiences: Experience[]) {
  // Get the country from the current experience's location
  const currentCountry = currentExperience.defaultContent.location.split(', ').pop() || ''
  
  // Filter experiences from the same country, excluding the current experience
  return allExperiences.filter(exp => 
    exp.defaultContent.location.split(', ').pop() === currentCountry && 
    exp.id !== currentExperience.id
  ).slice(0, 4) // Limit to 4 related experiences
}

export default function BookExperiencePage() {
  const { slug } = useParams()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  console.log('URL slug:', slug)
  
  // Import experiences from the data file
  const experience = experiences.find(
    exp => exp.id === parseInt(slug as string) || exp.slug === slug
  )
  console.log('Available experiences:', experiences.map(e => ({ id: e.id, title: e.defaultContent.title })))
  console.log('Looking for ID:', parseInt(slug as string))
  console.log('Found experience:', experience)

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Fetch booking/payment details from backend using sessionId
      fetch(`/api/booking-details?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setBookingDetails(data)
          setIsBookingModalOpen(true)
          setShowConfirmation(true)
        })
        .catch(() => {
          setIsBookingModalOpen(true)
          setShowConfirmation(false)
        })
    }
  }, [sessionId])

  if (!experience) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-sans">Experience not found</h1>
          <p className="text-gray-500">ID: {slug}</p>
          <p className="text-gray-500">Available IDs: {experiences.map(e => e.id).join(', ')}</p>
        </div>
        <SiteFooter />
      </div>
    )
  }
  const { bookingContent } = experience

  const relatedExperiences = getRelatedExperiences(experience, experiences)
  const countryName = getCountryAdjective(experience.defaultContent.location.split(', ').pop() || 'Ghanaian')

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[95vh] flex items-start justify-center pt-28 md:pt-40 pb-24">
        <div className="absolute inset-0">
          <Image
            src={bookingContent.heroImage}
            alt={bookingContent.title}
            fill
            className="object-cover"
            style={{ filter: "blur(0.25px)" }} 
            priority
          />
          {/* Glassmorphism gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 90%, #fff 100%)"
            }}
          />
        </div>
        <div className="relative w-full max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="font-serif font-normal text-white mb-2 drop-shadow-md text-[clamp(2rem,6vw,4rem)]"
           style={{
            // textShadow: `
            //   0 4px 24px rgba(0,0,0,0.55), 
            //   0 2px 8px rgba(0,0,0,0.45), 
            //   0 1px 0 #fff
            // `
          }}>
            {bookingContent.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto font-sans leading-relaxed"
           style={{
            // textShadow: `
            //   0 4px 24px rgba(0,0,0,0.55), 
            //   0 2px 8px rgba(0,0,0,0.45), 
            //   0 1px 0 #fff
            // `
          }}>
            {bookingContent.subtitle}
          </p>
          <div className="inline-flex items-center justify-center gap-3 sm:gap-2 px-2 sm:px-8 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm text-[clamp(0.55rem,2vw,0.95rem)] uppercase tracking-widest font-sans text-white whitespace-nowrap"
           style={{
            // textShadow: "0 2px 8px rgba(0,0,0,0.10), 0 1px 0 #fff"
          }}>
            <span>{bookingContent.duration}</span>
            <span>•</span>
            <span>{bookingContent.destinations}</span>
            <span>•</span>
            <span>{bookingContent.maxGuests}</span>
          </div>
        </div>
      </section>

      {/* Main Content (starts immediately after the faded hero image) */}
      <section className="relative z-10 bg-white pt-0 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Overview and Highlights */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-sm sm:text-lg font-sans font-bold mb-4 md:mb-6 uppercase tracking-[0.2em] text-slate-800">
                  Overview
                </h2>
                <p className="text-slate-700 font-serif font-bold leading-relaxed text-base sm:text-xl">
                  {bookingContent.overview}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-sm sm:text-lg font-sans font-bold mb-4 md:mb-6 uppercase tracking-[0.2em] text-slate-800 border-b border-black pb-2">
                  Highlights
                </h2>
                <div className="space-y-4">
                  {bookingContent.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-black pb-4">
                      <Sparkle className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
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
                    <h3 className="text-lg font-sans uppercase tracking-[0.2em] text-slate-600 mb-3">
                      Starting Price
                    </h3>
                    <div className="flex justify-between items-center gap-16 mt-2">
                      <div className="relative">
                        <span className="mt-2 text-4xl sm:text-5xl font-sans font-normal text-slate-800">
                          ${bookingContent.startingPrice}
                        </span>
                        <span className="absolute -top-1 right-[-2rem] text-xl text-slate-600 font-sans">.00</span>
                      </div>
                      <p className="text-lg text-slate-600 font-sans text-bold">
                        Minimum of {bookingContent.minimumGuests} {bookingContent.minimumGuests === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                    <Button
                      className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-sans px-6 sm:px-8 py-3 rounded-sm"
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                      Book this experience
                    </Button>
                    <Link href="/customize-experience" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-sans px-6 sm:px-8 py-3 rounded-sm"
                      >
                        Customize my experience
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-md sm:text-lg font-sans font-bold mb-4 md:mb-6 uppercase tracking-[0.2em] text-slate-800">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookingContent.included.map((item, index) => {
                    const Icon = includedIcons[item] || Check
                    return (
                      <div key={index} className={`flex items-center gap-3 border-b border-black pb-3 ${index === 0 ? 'border-t border-black pt-3' : ''} ${index === 1 ? 'sm:border-t sm:border-black sm:pt-3' : ''}`}>
                        <Icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-700 font-sans text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={bookingContent.galleryImages[0] || "/placeholder.svg"}
                      alt="Experience gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-white/50 text-slate-700 hover:bg-white font-sans px-4 py-2 rounded-sm"
                    onClick={() => setIsGalleryModalOpen(true)}
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
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-slate-800">
              More {countryName} adventures
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
                    src={experience.defaultContent.image || "/placeholder.svg"}
                    alt={experience.defaultContent.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg sm:text-xl font-sans text-white font-normal mb-2">
                      {experience.defaultContent.title}
                    </h3>
                    <p className="text-white/90 text-sm font-sans leading-relaxed mb-3 line-clamp-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        experience={{
          id: experience.id.toString(),
          title: bookingContent.title,
          startingPrice: bookingContent.startingPrice,
          minimumGuests: bookingContent.minimumGuests,
          heroImage: bookingContent.heroImage,
          slug: experience.slug, // <-- Add this line
        }}
        showConfirmation={showConfirmation}
        bookingDetails={bookingDetails}
      />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        images={bookingContent.galleryImages}
        initialImageIndex={0}
      />

      <SiteFooter />
    </div>
  )
}