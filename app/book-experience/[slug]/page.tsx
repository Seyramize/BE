"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFormModal } from "@/components/booking-form-modal";
import { GalleryModal } from "@/components/gallery-modal";
import { experiences, type Experience } from "@/lib/experiences-data";
import {
  Check,
  Eye,
  Sparkle,
  Hammer,
  PocketKnife,
  User,
  BedDouble,
  Car,
  Salad,
  Users,
  Drum,
  VenetianMask,
  Sailboat,
  Wifi,
  Utensils,
  Gift,
  GlassWater,
  Bus,
  IceCream,
  Banknote,
  Coffee,
  Plane,
  Martini,
  LifeBuoy,
  Palette,
  Bike,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMobile } from "@/hooks/use-mobile";
import { TbAirBalloon, TbBinoculars, TbCertificate2, TbHelmet } from "react-icons/tb";
import { MastercardPaymentBounceModal } from "@/components/mastercard-payment-bounce-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const includedIcons: Record<string, any> = {
  "Private transportation including fuel": Car,
  "Private transportation, including fuel.": Car,
  "Dedicated chaperone and access to resident guides": Users,
  "Local experienced guide": Users,
  "4x4 Transport and fuel": Car,
  "Quad bike/per person": Bike,
  "Riding guide": TbHelmet,
  "Water and Fruit": Salad,
  "Water and complimentary snacks": GlassWater,
  "All visit and fee expenses": Banknote,
  "Exotic Ice Cream (or pastry)": IceCream,
  "Lunch at Roca Monte Forte": Salad,
  "Coffee or tea at Diogo Vaz": Coffee,
  "Professional massage at a waterfall": BedDouble,
  "Complimentary bites and drinks": Utensils,
  "Complimentary bites and drinks.": Utensils,
  "1-hour flight": TbAirBalloon,
  "Champagne breakfast": Martini,
  "Life jackets": LifeBuoy,
  "Full Snorkel Gear": Hammer,
  "Water and fruit": Salad,
  "Lunch and dinner": Utensils,
  "Guided art lesson by resident artist": Palette,
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
  "Flight certificate": TbCertificate2,
  "Spa treatment": Gift,
  "Cultural performance": Drum,
  "Boat cruise": Sailboat,
  "Bottled water": GlassWater,
  "Beyond Experiences Essentials™ Bag": Gift,
  "Beyond Essentials Bag": Gift,
};

function getCountryAdjective(country: string): string {
  const countryAdjectives: { [key: string]: string } = {
    // Africa
    Ghana: "Ghanaian",
    Kenya: "Kenyan",
    Nigeria: "Nigerian",
    "South Africa": "South African",
    Tanzania: "Tanzanian",
    Uganda: "Ugandan",
    Ethiopia: "Ethiopian",
    Rwanda: "Rwandan",
    Botswana: "Botswanan",
    Namibia: "Namibian",
    Zimbabwe: "Zimbabwean",
    Zambia: "Zambian",
    Mozambique: "Mozambican",
    Angola: "Angolan",
    Malawi: "Malawian",
    Lesotho: "Basotho",
    Eswatini: "Swazi",
    Seychelles: "Seychellois",
    Mauritius: "Mauritian",
    Comoros: "Comorian",
    Madagascar: "Malagasy",
    "Cape Verde": "Cape Verdean",
    "São Tomé and Príncipe": "São Toméan",
    "Equatorial Guinea": "Equatorial Guinean",
    Gabon: "Gabonese",
    Cameroon: "Cameroonian",
    "Central African Republic": "Central African",
    Chad: "Chadian",
    Sudan: "Sudanese",
    "South Sudan": "South Sudanese",
    Eritrea: "Eritrean",
    Djibouti: "Djiboutian",
    Somalia: "Somali",
    Burundi: "Burundian",
    "Democratic Republic of the Congo": "Congolese",
    "Republic of the Congo": "Congolese",
    Benin: "Beninese",
    Togo: "Togolese",
    "Burkina Faso": "Burkinabe",
    Mali: "Malian",
    Niger: "Nigerien",
    Senegal: "Senegalese",
    Gambia: "Gambian",
    "Guinea-Bissau": "Guinea-Bissauan",
    Guinea: "Guinean",
    "Sierra Leone": "Sierra Leonean",
    Liberia: "Liberian",
    "Côte d'Ivoire": "Ivorian",
    Morocco: "Moroccan",
    Algeria: "Algerian",
    Tunisia: "Tunisian",
    Libya: "Libyan",
    Egypt: "Egyptian",
    Mauritania: "Mauritanian",

    // Americas
    "United States": "American",
    Canada: "Canadian",
    Mexico: "Mexican",
    Brazil: "Brazilian",
    Argentina: "Argentine",
    Chile: "Chilean",
    Colombia: "Colombian",
    Peru: "Peruvian",
    Venezuela: "Venezuelan",
    Ecuador: "Ecuadorian",
    Bolivia: "Bolivian",
    Paraguay: "Paraguayan",
    Uruguay: "Uruguayan",
    Guyana: "Guyanese",
    Suriname: "Surinamese",
    "French Guiana": "French Guianese",
    Panama: "Panamanian",
    "Costa Rica": "Costa Rican",
    Nicaragua: "Nicaraguan",
    Honduras: "Honduran",
    "El Salvador": "Salvadoran",
    Guatemala: "Guatemalan",
    Belize: "Belizean",
    Cuba: "Cuban",
    Jamaica: "Jamaican",
    Haiti: "Haitian",
    "Dominican Republic": "Dominican",
    "Puerto Rico": "Puerto Rican",
    Bahamas: "Bahamian",
    "Trinidad and Tobago": "Trinidadian",
    Barbados: "Barbadian",
    Grenada: "Grenadian",
    "Saint Lucia": "Saint Lucian",
    "Saint Vincent and the Grenadines": "Vincentian",
    "Antigua and Barbuda": "Antiguan",
    Dominica: "Dominican",
    "Saint Kitts and Nevis": "Kittitian",

    // Europe
    "United Kingdom": "British",
    France: "French",
    Germany: "German",
    Italy: "Italian",
    Spain: "Spanish",
    Portugal: "Portuguese",
    Netherlands: "Dutch",
    Belgium: "Belgian",
    Switzerland: "Swiss",
    Austria: "Austrian",
    Sweden: "Swedish",
    Norway: "Norwegian",
    Denmark: "Danish",
    Finland: "Finnish",
    Iceland: "Icelandic",
    Ireland: "Irish",
    Poland: "Polish",
    "Czech Republic": "Czech",
    Slovakia: "Slovak",
    Hungary: "Hungarian",
    Romania: "Romanian",
    Bulgaria: "Bulgarian",
    Greece: "Greek",
    Croatia: "Croatian",
    Serbia: "Serbian",
    Slovenia: "Slovenian",
    "Bosnia and Herzegovina": "Bosnian",
    Montenegro: "Montenegrin",
    Albania: "Albanian",
    "North Macedonia": "Macedonian",
    Kosovo: "Kosovar",
    Estonia: "Estonian",
    Latvia: "Latvian",
    Lithuania: "Lithuanian",
    Ukraine: "Ukrainian",
    Belarus: "Belarusian",
    Russia: "Russian",
    Moldova: "Moldovan",
    Georgia: "Georgian",
    Armenia: "Armenian",
    Azerbaijan: "Azerbaijani",
    Turkey: "Turkish",
    Cyprus: "Cypriot",
    Malta: "Maltese",
    Luxembourg: "Luxembourgish",
    Liechtenstein: "Liechtensteiner",
    Monaco: "Monegasque",
    "San Marino": "Sammarinese",
    "Vatican City": "Vatican",
    Andorra: "Andorran",

    // Asia
    China: "Chinese",
    Japan: "Japanese",
    "South Korea": "Korean",
    "North Korea": "Korean",
    India: "Indian",
    Pakistan: "Pakistani",
    Bangladesh: "Bangladeshi",
    "Sri Lanka": "Sri Lankan",
    Nepal: "Nepali",
    Bhutan: "Bhutanese",
    Maldives: "Maldivian",
    Afghanistan: "Afghan",
    Iran: "Iranian",
    Iraq: "Iraqi",
    Syria: "Syrian",
    Lebanon: "Lebanese",
    Jordan: "Jordanian",
    Israel: "Israeli",
    Palestine: "Palestinian",
    "Saudi Arabia": "Saudi",
    Yemen: "Yemeni",
    Oman: "Omani",
    "United Arab Emirates": "Emirati",
    Qatar: "Qatari",
    Bahrain: "Bahraini",
    Kuwait: "Kuwaiti",
    Vietnam: "Vietnamese",
    Laos: "Lao",
    Cambodia: "Cambodian",
    Thailand: "Thai",
    Myanmar: "Burmese",
    Malaysia: "Malaysian",
    Singapore: "Singaporean",
    Indonesia: "Indonesian",
    Philippines: "Filipino",
    Brunei: "Bruneian",
    "East Timor": "Timorese",
    Mongolia: "Mongolian",
    Taiwan: "Taiwanese",
    "Hong Kong": "Hong Konger",
    Macau: "Macanese",

    // Oceania
    Australia: "Australian",
    "New Zealand": "New Zealand",
    Fiji: "Fijian",
    "Papua New Guinea": "Papua New Guinean",
    "Solomon Islands": "Solomon Islander",
    Vanuatu: "Ni-Vanuatu",
    Samoa: "Samoan",
    Tonga: "Tongan",
    Tuvalu: "Tuvaluan",
    Kiribati: "I-Kiribati",
    "Marshall Islands": "Marshallese",
    Micronesia: "Micronesian",
    Palau: "Palauan",
    Nauru: "Nauruan",
    "Cook Islands": "Cook Islander",
    Niue: "Niuean",
    Tokelau: "Tokelauan",
    "American Samoa": "American Samoan",
    Guam: "Guamanian",
    "Northern Mariana Islands": "Northern Mariana Islander",
    "French Polynesia": "French Polynesian",
    "New Caledonia": "New Caledonian",
    "Wallis and Futuna": "Wallis and Futunan",
    "Pitcairn Islands": "Pitcairn Islander",
    "Norfolk Island": "Norfolk Islander",
    "Christmas Island": "Christmas Islander",
    "Cocos (Keeling) Islands": "Cocos Islander",
  };

  // If the country is in our mapping, return its adjective
  if (countryAdjectives[country]) {
    return countryAdjectives[country];
  }

  // If not found, return the country name with 'n' appended
  return country + "n";
}

function getRelatedExperiences(
  currentExperience: Experience,
  allExperiences: Experience[]
) {
  // Get the country from the current experience's location
  const currentCountry =
    currentExperience.defaultContent.location.split(", ").pop() || "";

  // Filter experiences from the same country, excluding the current experience
  return allExperiences
    .filter(
      (exp) =>
        exp.defaultContent.location.split(", ").pop() === currentCountry &&
        exp.id !== currentExperience.id
    )
    .slice(0, 4); // Limit to 4 related experiences
}

export default function BookExperiencePage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const isMobile = useMobile();
  const sessionId = searchParams.get("session_id");
  console.log("URL slug:", slug);

  // Import experiences from the data file
  const experience = experiences.find(
    (exp) => exp.id === parseInt(slug as string) || exp.slug === slug
  );
  console.log(
    "Available experiences:",
    experiences.map((e) => ({ id: e.id, title: e.defaultContent.title }))
  );
  console.log("Looking for ID:", parseInt(slug as string));
  console.log("Found experience:", experience);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMastercardModalOpen, setIsMastercardModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch booking/payment details from backend using sessionId
      fetch(`/api/booking-details?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setBookingDetails(data);
          setIsBookingModalOpen(true);
          setShowConfirmation(true);
        })
        .catch(() => {
          setIsBookingModalOpen(true);
          setShowConfirmation(false);
        });
    } else if (searchParams.get("cancel")) {
      const experience = experiences.find((exp) => exp.slug === slug);
      if (experience && experience.tags.includes("Priceless")) {
        setIsMastercardModalOpen(true);
      }
    } else if (searchParams.get("mastercard-bounce")) {
      setIsMastercardModalOpen(true);
    }
  }, [sessionId, slug, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const buttonTop = buttonRef.current.getBoundingClientRect().top;
        const shouldBeSticky = buttonTop > window.innerHeight;
        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  if (!experience) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-sans">Experience not found</h1>
          <p className="text-gray-500">ID: {slug}</p>
          <p className="text-gray-500">
            Available IDs: {experiences.map((e) => e.id).join(", ")}
          </p>
        </div>
        <SiteFooter />
      </div>
    );
  }
  const { bookingContent } = experience;

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(bookingContent.pricing.oneGuest);

  const handleGuestsChange = (value: string) => {
    const guests = parseInt(value, 10);
    let pricePerGuest;

    if (guests === 1) {
      pricePerGuest = bookingContent.pricing.oneGuest;
    } else if (guests === 2) {
      pricePerGuest = bookingContent.pricing.twoGuests;
    } else {
      pricePerGuest = bookingContent.pricing.threeOrMoreGuests;
    }

    const newTotalPrice = pricePerGuest * guests;

    setNumberOfGuests(guests);
    setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
  };

  const relatedExperiences = getRelatedExperiences(experience, experiences);
  const countryName = getCountryAdjective(
    experience.defaultContent.location.split(", ").pop() || "Ghanaian"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[95vh] flex items-center justify-center pt-28 md:pt-20 pb-16">
        <div className="absolute inset-0">
          <Image
            src={bookingContent.heroImage}
            alt={bookingContent.title}
            fill
            className="object-cover"
            style={{ filter: "blur(0.25px)" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Glassmorphism gradient */}
          <div
            className="hidden sm:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 90%, #fff 100%)",
            }}
          />
        </div>
        <div className="relative w-full max-w-5xl mx-auto px-6 text-center z-10">
          <h1
            className="font-serif font-normal text-white mb-2 drop-shadow-md text-[clamp(2rem,6vw,4rem)]"
            style={
              {
                // textShadow: `
                //   0 4px 24px rgba(0,0,0,0.55),
                //   0 2px 8px rgba(0,0,0,0.45),
                //   0 1px 0 #fff
                // `
              }
            }
          >
            {bookingContent.title}
          </h1>
          {experience.tags.includes("Priceless") && (
            <div className="inline-flex uppercase items-center gap-2 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-sans text-xs mt-1 border border-white/20">
              <img
                src="/images/mastercard.svg"
                alt="Mastercard"
                className="w-5 h-5"
              />
              <span className="tracking-widest">Mastercard holders only</span>
            </div>
          )}
          {/* <p className="hidden sm:block text-3xl sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto font-sans leading-relaxed"
           style={{
            // textShadow: `
            //   0 4px 24px rgba(0,0,0,0.55), 
            //   0 2px 8px rgba(0,0,0,0.45), 
            //   0 1px 0 #fff
            // `
          }}>
            {bookingContent.subtitle}
          </p> */}
          {/* <div className="hidden sm:inline-flex items-center justify-center gap-3 sm:gap-2 px-2 sm:px-8 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm text-[clamp(0.55rem,2vw,0.95rem)] uppercase tracking-widest font-sans text-white whitespace-nowrap"
           style={{
            // textShadow: "0 2px 8px rgba(0,0,0,0.10), 0 1px 0 #fff"
          }}>
            <span>{bookingContent.duration}</span>
            <span>•</span>
            <span>{bookingContent.destinations}</span>
            <span>•</span>
            <span>{bookingContent.maxGuests}</span>
          </div> */}
        </div>
      </section>

      {/* Main Content (starts immediately after the faded hero image) */}
      <section className="relative z-10 bg-white pt-4 sm:pt-0 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Overview and Highlights */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-sm sm:text-lg font-sans font-bold mb-2 md:mb-2 uppercase tracking-widest md:tracking-[0.2em] text-slate-800">
                  Overview
                </h2>
                <p className="text-slate-700 font-sans font-normal leading-relaxed text-base sm:text-xl">
                  {bookingContent.overview}
                </p>
                {bookingContent.whatsPriceless && (
                  <div className="mt-8">
                    <h2 className="text-sm sm:text-lg font-sans font-bold mb-2 md:mb-2 uppercase tracking-widest md:tracking-[0.2em] text-slate-800">
                      What's Priceless
                    </h2>
                    <p className="text-slate-700 font-sans font-normal leading-relaxed text-base sm:text-xl">
                      {bookingContent.whatsPriceless}
                    </p>
                  </div>
                )}
                {isMobile && (
                  <div className="relative h-60 sm:h-72 my-6 rounded-lg overflow-hidden">
                    <Image
                      src={
                        bookingContent.galleryImages[0] || "/placeholder.svg"
                      }
                      alt={bookingContent.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="outline"
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-white/50 text-slate-700 hover:bg-white font-sans px-2 py-1 text-xs rounded-sm sm:px-4 sm:py-2 sm:text-sm"
                      onClick={() => setIsGalleryModalOpen(true)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-xs sm:text-lg font-sans font-bold mb-1 md:mb-2 uppercase md:tracking-[0.2em] tracking-widest text-slate-800 border-b border-black pb-2">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                  {bookingContent.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 border-b border-black pb-3 sm:pb-4"
                    >
                      <Sparkle className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing and Booking */}
              <div className="pt-2 md:pt-4">
                {/* Mobile Layout */}
                <div className="flex sm:hidden items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-sans text-black">
                      No. of Pax
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Select
                        onValueChange={handleGuestsChange}
                        defaultValue="1"
                      >
                        <SelectTrigger className="w-20 h-8 rounded-lg bg-slate-900 text-white border-slate-900 px-2">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(6)].map((_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="text-3xl font-sans font-normal text-black">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
                <div
                  ref={buttonRef}
                  className="sm:hidden mt-6 flex flex-col gap-3 px-0.5"
                >
                  <Button
                    className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book this experience
                  </Button>
                  <Link
                    href={`/customize-experience?experience=${encodeURIComponent(
                      bookingContent.title
                    )}`}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-slate-900 text-slate-900 bg-white font-sans px-6 py-4 rounded-lg"
                    >
                      More than 6 guests?
                    </Button>
                  </Link>
                </div>
                <div className="hidden sm:flex items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xs font-sans uppercase tracking-widest text-slate-600">
                      No. of Pax
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Select
                        onValueChange={handleGuestsChange}
                        defaultValue="1"
                      >
                        <SelectTrigger className="w-24 h-7 rounded-lg bg-slate-900 text-white border-slate-900">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(6)].map((_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="flex items-center gap-8">
                    <span className="text-3xl sm:text-4xl font-sans font-normal text-slate-800">
                      ${totalPrice}
                    </span>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                      <Button
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 sm:px-8 py-6 sm:py-3 rounded-sm"
                        onClick={() => setIsBookingModalOpen(true)}
                      >
                        Book this experience
                      </Button>
                      <Link
                        href={`/customize-experience?experience=${encodeURIComponent(
                          bookingContent.title
                        )}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-slate-900 text-slate-900 bg-white font-sans px-6 sm:px-8 py-5 sm:py-3 rounded-sm"
                        >
                          More than 6 guests?
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-xs sm:text-lg font-sans font-bold mb-1 md:mb-2 uppercase md:tracking-[0.2em] tracking-widest text-slate-800">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                  {bookingContent.included.map((item, index) => {
                    const Icon = includedIcons[item] || Check;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 border-b border-black pb-3 ${
                          index === 0 ? "border-t border-black pt-3" : ""
                        } ${
                          index === 1
                            ? "sm:border-t sm:border-black sm:pt-3"
                            : ""
                        }`}
                      >
                        <Icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-700 font-sans text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={
                        bookingContent.galleryImages[0] || "/placeholder.svg"
                      }
                      alt="Experience gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-white/50 text-slate-700 hover:bg-white font-sans px-3 py-1 text-xs rounded-sm sm:px-4 sm:py-2 sm:text-sm"
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
      <section className="py-4 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-slate-800">
              More {countryName} adventures
            </h2>
            {/* <div className="w-6 h-6 rounded-full border border-slate-400 flex items-center justify-center">
              <span className="text-slate-600 text-sm">∨</span>
            </div> */}
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden">
            <Carousel opts={{ align: "start", loop: false }} className="pl-2">
              <CarouselContent className="-ml-4">
                {relatedExperiences.map((experience) => (
                  <CarouselItem key={experience.id} className="pl-4 basis-5/6">
                    <div className="relative rounded-lg overflow-hidden group h-[400px] sm:h-[470px]">
                      <Image
                        src={
                          experience.defaultContent.image || "/placeholder.svg"
                        }
                        alt={experience.defaultContent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* <span className="text-white/80 uppercase text-sm tracking-wider font-sans">{experience.defaultContent.location}</span> */}
                        <h3 className="text-2xl font-serif font-normal text-white mt-2 mb-3">
                          {experience.defaultContent.title}
                        </h3>
                        <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                          {experience.defaultContent.shortDescription}
                        </p>
                        <Link href={`/book-experience/${experience.slug}`}>
                          <Button
                            variant="glass"
                            className="font-sans px-12 py-7 rounded-3xl w-full"
                          >
                            Book Experience
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
                <CarouselItem className="pl-4 basis-5/6">
                  <Link href="/experiences">
                    <div className="relative rounded-lg overflow-hidden group h-[400px] sm:h-[470px] bg-gray-900 flex flex-col justify-center items-center text-center p-6">
                      <TbBinoculars className="text-white mb-4" size={40} />
                      <h3 className="text-3xl font-serif font-normal text-white mt-2 mb-3">
                        Explore Experiences
                      </h3>
                      <p className="text-white/90 mb-4 max-w-md font-sans leading-relaxed">
                        Browse our catalog of experiences curated with you in
                        mind.
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                        variant="glass"
                        className="font-sans px-8 py-3 rounded-full"
                      >
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
          totalPrice: totalPrice,
          minimumGuests: bookingContent.minimumGuests,
          heroImage: bookingContent.heroImage,
          slug: experience.slug,
          pricing: bookingContent.pricing,
          numberOfGuests: numberOfGuests,
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

      <MastercardPaymentBounceModal
        isOpen={isMastercardModalOpen}
        onClose={() => setIsMastercardModalOpen(false)}
      />

      {isMobile && isSticky && (
        <div className="sm:hidden fixed bottom-4 left-0 right-0 px-4 z-20">
          <Button
            className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg shadow-xl shadow-black/20 ring-1 ring-black/5 transition"
            onClick={() => setIsBookingModalOpen(true)}
          >
            Book this experience
          </Button>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
