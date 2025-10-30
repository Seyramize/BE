"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFormModal } from "@/components/booking-form-modal";
import { GalleryModal } from "@/components/gallery-modal";
import { EnquireAvailabilityModal } from "@/components/enquire-availability-modal";
import { BookingConfirmationGroup } from "@/components/booking-confirmation-group";
import { experiences, type Experience, type ExperienceVariant } from "@/lib/experiences-data";
import {
  Check,
  Hotel,
  CalendarCheck,
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
// import { ActiveCounter, useActiveCounter } from "@/components/active-counter";
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
  "5-star accommodations": Hotel,
  "All scheduled experiences and tours": CalendarCheck, 
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

  const [selectedVariant, setSelectedVariant] = useState<
    ExperienceVariant | undefined
  >(experience?.bookingContent.variants?.[0]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMastercardModalOpen, setIsMastercardModalOpen] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [isGroupConfirmationOpen, setIsGroupConfirmationOpen] = useState(false);
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

  if (!experience || (experience.hidden && (!experience.accessCode || (Array.isArray(experience.accessCode) ? !experience.accessCode.includes(searchParams.get('code') || '') : experience.accessCode !== searchParams.get('code'))))) {
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

  const currentBookingContent = selectedVariant || bookingContent;

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [totalPrice, setTotalPrice] = useState(
    "price" in currentBookingContent
      ? currentBookingContent.price
      : bookingContent.pricing?.oneGuest || 0
  );

  // Active counter for group experiences
  const isGroupExperience = bookingContent.isGroupExperience;
  // const activeCounter = useActiveCounter(
  //   experience.id.toString(),
  //   bookingContent.totalSlots || 0,
  //   bookingContent.availableSlots || 0
  // );

  // Dynamic per-installment price for group experiences based on current totalPrice and installments
  const groupInstallments = bookingContent.groupPricing?.paymentPlanInstallments || 1;
  const groupPerInstallment = isGroupExperience
    ? parseFloat(((totalPrice || 0) / groupInstallments).toFixed(2))
    : 0;

  const handleGuestsChange = (value: string) => {
    const guests = parseInt(value, 10);
    let newTotalPrice;

    if (selectedVariant) {
      newTotalPrice = selectedVariant.price * guests;
    } else if (isGroupExperience) {
      // For group experiences, use the fixed group pricing
      const pricePerGuest = bookingContent.groupPricing?.fullPrice || 0;
      newTotalPrice = pricePerGuest * guests;
    } else if (bookingContent.pricing) {
      // For regular experiences, use the tiered pricing
      let pricePerGuest;
      if (guests === 1) {
        pricePerGuest = bookingContent.pricing.oneGuest;
      } else if (guests === 2) {
        pricePerGuest = bookingContent.pricing.twoGuests;
      } else {
        pricePerGuest = bookingContent.pricing.threeOrMoreGuests;
      }
      newTotalPrice = pricePerGuest * guests;
    } else {
      newTotalPrice = 0; // or some default value
    }

    setNumberOfGuests(guests);
    setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
  };

  useEffect(() => {
    const guests = numberOfGuests;
    let newTotalPrice;

    if (selectedVariant) {
      newTotalPrice = selectedVariant.price * guests;
    } else if (isGroupExperience) {
      const pricePerGuest = bookingContent.groupPricing?.fullPrice || 0;
      newTotalPrice = pricePerGuest * guests;
    } else if (bookingContent.pricing) {
      let pricePerGuest;
      if (guests === 1) {
        pricePerGuest = bookingContent.pricing.oneGuest;
      } else if (guests === 2) {
        pricePerGuest = bookingContent.pricing.twoGuests;
      } else {
        pricePerGuest = bookingContent.pricing.threeOrMoreGuests;
      }
      newTotalPrice = pricePerGuest * guests;
    } else {
      newTotalPrice = 0; // or some default value
    }
    setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
  }, [selectedVariant, numberOfGuests, bookingContent, isGroupExperience]);

  const handleVariantChange = (variantId: string) => {
    const variant = bookingContent.variants?.find((v) => v.id === variantId);
    setSelectedVariant(variant);
  };

  const relatedExperiences = getRelatedExperiences(experience, experiences);
  const countryName = getCountryAdjective(
    experience.defaultContent.location.split(", ").pop() || "Ghanaian"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[55vh] md:min-h-[95vh] flex items-center justify-center pt-20 sm:pt-28 md:pt-20 pb-0 sm:pb-16">
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
          {/* Glassmorphism gradient - hidden on mobile */}
          <div
            className="hidden sm:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 90%, #fff 100%)",
            }}
          />
        </div>
        <div className="relative w-full max-w-5xl mx-auto px-6 text-center z-10">
          {/* Group Experience Text - Above Title (Mobile Only) */}
          {isGroupExperience && (
            <div className="mb-2 sm:hidden">
              <span className="text-white font-sans text-xs uppercase tracking-widest">GROUP EXPERIENCE</span>
            </div>
          )}

          <h1 className="font-serif sm:font-serif font-normal text-white mb-2 drop-shadow-md">
            <div className="text-[clamp(2rem,6vw,4rem)] leading-none">
              {bookingContent.title}
            </div>
          </h1>

          {/* Group Experience Subtitle - Below Title (Mobile Only) */}
          {isGroupExperience && (
            <p className="text-white font-sans text-xs uppercase tracking-widest mb-6 sm:hidden">
              {bookingContent.subtitle}
            </p>
          )}

          {/* Group Experience Details - Below Title (Desktop Only) */}
          {isGroupExperience && (
            <div className="hidden sm:block mt-4">
              <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-slate-900 shadow-sm text-xs uppercase tracking-widest font-sans text-white">
                <span>{bookingContent.duration}</span>
                <span>|</span>
                <span>${bookingContent.groupPricing?.fullPrice}</span>
                {bookingContent.startDate && bookingContent.endDate && (
                  <>
                    <span>|</span>
                    <span>{new Date(bookingContent.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })} - {new Date(bookingContent.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                  </>
                )}
                {/* <span>|</span> */}
                {/* <ActiveCounter
                  experienceId={experience.id.toString()}
                  totalSlots={activeCounter.totalSlots}
                  availableSlots={activeCounter.availableSlots}
                  className="text-white"
                /> */}
              </div>
            </div>
          )}

          {experience.tags.includes("Priceless") && !isGroupExperience && (
            <div className="inline-flex uppercase items-center gap-2 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-sans text-xs mt-1 border border-white/20">
              <img
                src="/images/mastercard.svg"
                alt="Mastercard"
                className="w-5 h-5"
              />
              <span className="tracking-widest">Mastercard holders only</span>
            </div>
          )}
        </div>
      </section>

      {/* Key Stats Bar - Mobile Only for Group Experiences */}
      {isGroupExperience && (
        <div className="sm:hidden bg-gray-800 py-4 px-6">
          <div className="flex items-center justify-center gap-2 text-white font-sans text-[10px] uppercase tracking-widest whitespace-nowrap">
            <span>{bookingContent.duration}</span>
            <span>|</span>
            <span>${bookingContent.groupPricing?.fullPrice}</span>
            {/* <span>|</span> */}
            {/* <ActiveCounter
              experienceId={experience.id.toString()}
              totalSlots={activeCounter.totalSlots}
              availableSlots={activeCounter.availableSlots}
              className="text-white"
              textSize="text-[10px]"
            /> */}
          </div>
        </div>
      )}

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
                  {currentBookingContent.overview}
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
                <div className="space-y-4">
                  {currentBookingContent.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 border-b border-black pb-3"
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
                {isGroupExperience ? (
                  /* Group Experience Pricing */
                  <div className="space-y-4">
                    {/* Mobile Layout */}
                    <div className="sm:hidden space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[11px] uppercase tracking-widest font-sans text-black mb-1">
                            NO. OF PAX
                          </h3>
                          <Select onValueChange={handleGuestsChange} defaultValue="1">
                            <SelectTrigger className="w-20 h-8 rounded-full bg-gray-800 text-white border-gray-800 px-3 text-sm">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent className="w-32">
                              {[...Array(20)].map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-right">
                          <h3 className="text-[11px] uppercase tracking-widest font-sans text-black mb-1">
                            STARTING AT
                          </h3>
                          <div className="text-3xl font-sans font-normal text-black leading-none">
                            ${totalPrice}
                          </div>
                          {experience.slug !== "december-in-ghana-castles-to-coastlines" && (
                          <div className="text-sm font-sans text-black mt-1">
                            or ${groupPerInstallment} in {bookingContent.groupPricing?.paymentPlanInstallments} payments
                          </div>
                          )}
                        </div>
                      </div>
                      {experience.slug === "december-in-ghana-castles-to-coastlines" ? (
                        <Button
                          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 rounded-lg text-sm font-sans"
                          onClick={() => setIsEnquireModalOpen(true)}
                        >
                          Enquire for Availability
                        </Button>
                      ) : (
                      <Button
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 rounded-lg text-sm font-sans"
                        onClick={() => setIsGroupConfirmationOpen(true)}
                      >
                        Book your spot
                      </Button>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:block">
                      <div className="flex items-center justify-between">
                        {/* Pax Selector */}
                        <div>
                          <h3 className="text-[11px] uppercase tracking-widest font-sans text-slate-600 mb-1">
                            No. of Pax
                          </h3>
                          <Select onValueChange={handleGuestsChange} defaultValue="1">
                            <SelectTrigger className="w-20 h-8 rounded-full bg-slate-900 text-white border-slate-900 px-3 text-sm">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent className="w-32">
                              {[...Array(20)].map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-slate-900 mx-6" />

                        {/* Pricing + Button */}
                        <div className="flex items-center gap-12 flex-1">
                          {/* Full Price */}
                          <div className="text-left">
                            <h3 className="text-[11px] uppercase tracking-widest gap-4 font-sans text-slate-600 mb-1">
                              Starting
                            </h3>
                            <div className="text-3xl font-sans font-normal text-black leading-none">
                              ${totalPrice}
                            </div>
                          </div>

                          {/* Payment Plan */}
                          {experience.slug !== "december-in-ghana-castles-to-coastlines" && (
                          <div className="flex flex-col justify-center items-start tracking-widest leading-none space-y-0 mt-1">
                            <div className="text-base font-sans font-semibold text-slate-900">
                              OR ${groupPerInstallment}
                            </div>
                            <div className="text-xs font-sans text-slate-600">
                              IN {bookingContent.groupPricing?.paymentPlanInstallments} PAYMENTS
                            </div>
                          </div>
                          )}

                          {/* Button */}
                          {experience.slug === "december-in-ghana-castles-to-coastlines" ? (
                          <Button
                            className="ml-auto bg-slate-900 hover:bg-slate-900 text-white w-56 py-3 rounded-lg text-sm font-sans"
                            onClick={() => setIsEnquireModalOpen(true)}
                          >
                            Enquire for Availability
                          </Button>
                          ) : (
                          <Button
                            className="ml-auto bg-slate-900 hover:bg-slate-900 text-white w-56 py-3 rounded-lg text-sm font-sans"
                            onClick={() => setIsGroupConfirmationOpen(true)}
                          >
                            Book your spot
                          </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>


                ) : (
                  /* Regular Experience Pricing */
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
                            {[...Array(experience.slug === "a-date-with-fashion" || experience.slug === "afrofuture" ? 10 : 6)].map((_, i) => (
                              <SelectItem key={i + 1} value={`${i + 1}`}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="relative text-right">
                      <span className="text-3xl font-sans font-normal text-black">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>
                )}
                {/* Mobile buttons - only for non-group experiences */}
                {!isGroupExperience && (
                  <div
                    ref={buttonRef}
                    className="sm:hidden mt-6 flex flex-col gap-3 px-0.5"
                  >
                    {experience.slug === "a-date-with-fashion" ? (
                      <>
                        {bookingContent.variants && (
                          <Select
                            onValueChange={handleVariantChange}
                            defaultValue={bookingContent.variants[0]?.id}
                          >
                            <SelectTrigger className="w-full bg-champagne text-black border-gray-800 rounded-lg px-4 py-3 text-sm justify-between">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {bookingContent.variants.map((variant) => (
                                <SelectItem
                                  key={variant.id}
                                  value={variant.id}
                                >
                                  {variant.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <Button
                          className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg"
                          onClick={() => setIsEnquireModalOpen(true)}
                        >
                          Enquire for Availability
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg"
                          onClick={() => setIsBookingModalOpen(true)}
                        >
                          Book this experience
                        </Button>
                        <Link
                          href={`/customize-experience?experience=${encodeURIComponent(
                            selectedVariant
                              ? selectedVariant.title
                              : bookingContent.title
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
                      </>
                    )}
                  </div>
                )}
                {/* Desktop buttons - only for non-group experiences */}
                {!isGroupExperience && (
                  <div className="hidden sm:flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-lg sm:text-xs font-sans uppercase tracking-widest text-slate-600">
                        No. of Pax
                      </h3>
                      <div className="flex items-center gap-8 mt-0.5">
                        <Select
                          onValueChange={handleGuestsChange}
                          defaultValue="1"
                        >
                          <SelectTrigger className="w-24 h-7 rounded-lg bg-slate-900 text-white border-slate-900">
                            <SelectValue placeholder="1" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(experience.slug === "a-date-with-fashion" || experience.slug === "afrofuture" ? 10 : 6)].map((_, i) => (
                              <SelectItem key={i + 1} value={`${i + 1}`}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-3xl sm:text-4xl font-sans font-normal text-slate-800">
                          ${totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Price and Buttons */}
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        {experience.slug === "a-date-with-fashion" ? (
                          <div className="flex items-center gap-2">
                            {bookingContent.variants && (
                              <Select
                                onValueChange={handleVariantChange}
                                defaultValue={
                                  bookingContent.variants[0]?.id
                                }
                              >
                                <SelectTrigger className="w-auto bg-[#EFE6DA] text-black border-gray-800 rounded-sm px-3 py-2 text-sm justify-between gap-x-5">
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {bookingContent.variants.map(
                                    (variant) => (
                                      <SelectItem
                                        key={variant.id}
                                        value={variant.id}
                                      >
                                        {variant.title}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            )}
                            <Button
                              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 sm:px-8 py-6 sm:py-3 rounded-sm"
                              onClick={() => setIsEnquireModalOpen(true)}
                            >
                              Enquire for Availability
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Button
                              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 sm:px-8 py-6 sm:py-3 rounded-sm"
                              onClick={() => setIsBookingModalOpen(true)}
                            >
                              Book this experience
                            </Button>
                            <Link
                              href={`/customize-experience?experience=${encodeURIComponent(
                                selectedVariant
                                  ? selectedVariant.title
                                  : bookingContent.title
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                        className={`flex items-center gap-3 border-b border-black pb-3 ${index === 0 ? "border-t border-black pt-3" : ""
                          } ${index === 1
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

              {/* What's Not Included - Group Experience Only */}
              {isGroupExperience && bookingContent.notIncluded && (
                <div>
                  <h2 className="text-xs sm:text-lg font-sans font-bold mb-1 md:mb-2 uppercase md:tracking-[0.2em] tracking-widest text-slate-800">
                    What's Not Included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                    {bookingContent.notIncluded.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 border-b border-black pb-3"
                      >
                        <span className="w-4 h-4 text-slate-600 flex-shrink-0 text-center">×</span>
                        <span className="text-slate-700 font-sans text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important - Group Experience Only */}
              {isGroupExperience && bookingContent.important && (
                <div>
                  <h2 className="text-xs sm:text-lg font-sans font-bold mb-1 md:mb-2 uppercase md:tracking-[0.2em] tracking-widest text-slate-800">
                    Important
                  </h2>
                  <p className="text-slate-700 font-sans font-normal leading-relaxed text-base sm:text-xl">
                    {bookingContent.important}
                  </p>
                </div>
              )}
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
          title: selectedVariant ? selectedVariant.title : bookingContent.title,
          totalPrice: totalPrice,
          minimumGuests: bookingContent.minimumGuests,
          heroImage: bookingContent.heroImage,
          slug: experience.slug,
          pricing: bookingContent.pricing,
          numberOfGuests: numberOfGuests,
        }}
        showConfirmation={showConfirmation}
        bookingDetails={bookingDetails}
        onBookingConfirmed={isGroupExperience ? (guests: number) => {
          // activeCounter.bookSpots(guests)
        } : undefined}
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

      {/* Sticky CTA on mobile */}
      {isMobile && isSticky && (
        <div className="sm:hidden fixed bottom-4 left-0 right-0 px-4 z-20">
          {experience.slug === "a-date-with-fashion" ? (
            <Button
              className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg shadow-xl shadow-black/20 ring-1 ring-black/5 transition"
              onClick={() => setIsEnquireModalOpen(true)}
            >
              Enquire for Availability
            </Button>
          ) : (
            <Button
              className="w-full bg-slate-900 hover:bg-slate-900 text-white font-sans px-6 py-6 rounded-lg shadow-xl shadow-black/20 ring-1 ring-black/5 transition"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book this experience
            </Button>
          )}
        </div>
      )}

      {/* Enquire Modal (only used for A Date with Fashion) */}
      <EnquireAvailabilityModal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        experience={{
          title: experience.defaultContent.title,
          heroImage: experience.bookingContent.heroImage,
          slug: experience.slug,
        }}
      />

      {/* Group Experience Booking Confirmation Modal */}
      {isGroupExperience && (
        <BookingConfirmationGroup
          isOpen={isGroupConfirmationOpen}
          onClose={() => setIsGroupConfirmationOpen(false)}
          experience={{
            id: experience.id.toString(),
            title: bookingContent.title,
            totalPrice: totalPrice,
            heroImage: bookingContent.heroImage,
            slug: experience.slug,
            duration: bookingContent.duration,
            startDate: (bookingContent as any).startDate,
            endDate: (bookingContent as any).endDate,
            groupPricing: bookingContent.groupPricing,
          }}
          numberOfGuests={numberOfGuests}
          onBookingConfirmed={(guests: number) => {
            // activeCounter.bookSpots(guests);
            setIsGroupConfirmationOpen(false);
          }}
          // activeCounter={{
          //   totalSlots: activeCounter.totalSlots,
          //   availableSlots: activeCounter.availableSlots,
          //   spotsOpen: activeCounter.spotsOpen,
          //   spotsTaken: activeCounter.spotsTaken,
          // }}
        />
      )}

      <SiteFooter />
    </div>
  );
}
