export type Experience = {
    id: number
    slug: string
    defaultContent: {
      title: string
      shortDescription: string
      image: string
      location: string
    }
    expandedContent: {
      title: string
      fullDescription: string
      image: string
    }
    bookingContent: {
      title: string
      subtitle: string
      duration: string
      destinations: string
      maxGuests: string
      heroImage: string
      galleryImages: string[]
      overview: string
      highlights: string[]
      startingPrice: number
      pricing: {
        oneGuest: number
        twoGuests: number
        threeOrMoreGuests: number
      }
      minimumGuests: number
      included: string[]
      whatsPriceless?: string
    }
    tags: string[]
  }
  
  export const experiences: Experience[] = [
    {
      id: 1,
      slug: "shai-hills-experience",
      defaultContent: {
        title: "Adventuring in Shai Hills",
        shortDescription: "Discover the perfect blend of nature, culture, and adventure at Shai Hills.",
        image: "/images/experiences/shai-hills/cover.jpg?height=400&width=300&text=Shai+Hills+Adventure",
        location: "Eastern Region, Ghana"
      },
      expandedContent: {
        title: "Shai Hills Experience",
        fullDescription: "Nature, heritage, and adventure come together in this day trip featuring scenic hikes, ancient caves, a wildlife museum, and high-energy quad biking through a forest reserve.",
        image: "/placeholder.svg?height=500&width=400&text=Shai+Hills+Detailed+Safari"
      },
      bookingContent: {
        title: "Adventuring in Shai Hills",
        subtitle: "Safari Valley the luxury eco-friendly retreat where you can experience luxury in a serene natural setting, interacting with free-roaming wildlife, and enjoy activities like biking, horseback riding, and nature walks. Every moment is curated just for you by the professional team. A rare invitation to slow down and simply be.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "15 GUESTS (MAX)",
        heroImage: "/images/experiences/shai-hills/cover.jpg?height=800&width=1200&text=Zebras+in+Golden+Grassland",
        galleryImages: [
          "/images/experiences/shai-hills/Gallery/1.jpg?height=400&width=300&text=Wildlife+Safari",
          "/images/experiences/shai-hills/Gallery/2.jpg?height=400&width=300&text=Luxury+Resort",
          "/images/experiences/shai-hills/Gallery/3.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/4.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/5.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/6.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/7.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/8.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/9.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/10.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/11.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/12.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/13.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/14.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/15.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/16.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/17.jpg?height=400&width=300&text=Nature+Activities",
        ],
        overview: "Discover the perfect blend of nature, culture, and adventure at Shai Hills. Begin with a scenic hike up Mogo Hills, exploring ancient caves and enjoying panoramic views of the Volta plains. Step into heritage at the Wildlife & Heritage Museum, where culture and history meet. Then, kick up the dust on an adrenaline-filled quad biking ride through the forest reserve. A day of discovery, adventure, and moments you’ll never forget.",
        highlights: [
          "Guided hike up Mogo Hills.",
          "Panoramic hilltop views and photo opportunities",
          "Interactive Wildlife and Heritage Museum tour",
          "Quad biking through forest trails.",
        ],
        startingPrice: 450,
        pricing: {
          oneGuest: 450,
          twoGuests: 330,
          threeOrMoreGuests: 250,
        },
        minimumGuests: 2,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 2,
      slug: "cape-coast-tour",
      defaultContent: {
        title: "Cape Coast Tour",
        shortDescription: "Trace Ghana’s history and natural beauty in one journey.",
        image: "/images/experiences/cape-coast-castle/cover.jpg?height=400&width=300&text=Cape+Coast+Discovery",
        location: "Central Region, Ghana"
      },
      expandedContent: {
        title: "Cape Coast Tour",
        fullDescription: "A powerful journey through Ghana’s past — from Assin Manso and the castles of Cape Coast and Elmina, to the rainforest canopy walk at Kakum. History, reflection, and breathtaking views.",
        image: "/placeholder.svg?height=500&width=400&text=Cape+Coast+Castle+Historical",
      },
      bookingContent: {
        title: "Cape Coast Tour",
        subtitle: "Embark on a profound journey through Ghana's rich history, from the sacred grounds of Assin Manso to the imposing castles of Cape Coast and Elmina. Experience the breathtaking canopy walk at Kakum National Park, where history and nature intertwine in a truly unforgettable way.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/cape-coast-castle/cover.jpg?height=800&width=1200&text=Cape+Coast+Castle",
        galleryImages: [
          "/images/experiences/cape-coast-castle/Gallery/1.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/2.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/3.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/4.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/5.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/6.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/7.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/8.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/9.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/10.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/11.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/12.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/13.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/14.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/15.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/16.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/17.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/18.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/19.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/20.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/21.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/22.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/23.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-castle/Gallery/24.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
        ],
        overview: "Trace Ghana’s history and natural beauty in one journey. Begin at Assin Manso Slave River, where enslaved people took their last bath. Continue to Cape Coast Castle and Elmina Castle, two of West Africa’s most significant historical sites. End at Kakum National Park, where the canopy walkway offers a breathtaking view above the forest.",
        highlights: [
          "Learn about Ghana’s role in the transatlantic slave trade at Cape Coast and Elmina Castles.",
          "Stand at the Door of No Return, where enslaved Africans were shipped away.",
          "Visit Assin Manso and reflect on the journey of the enslaved.",
          "Experience the rainforest from above on Kakum’s canopy walkway.",
          "Enjoy breathtaking coastal landscapes and countryside views.",
        ],
        startingPrice: 380,
        pricing: {
          oneGuest: 400,
          twoGuests: 325,
          threeOrMoreGuests: 220,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 3,
      slug: "cape-coast-by-candlelight",
      defaultContent: {
        title: "Cape Coast Castle by Candlelight",
        shortDescription: "Step into history under the cover of night with an exclusive after-dark tour of Cape Coast Castle.",
        image: "/images/experiences/cape-coast-by-candelight/cover.jpg?height=400&width=300&text=Cape+Coast+Discovery",
        location: "Central Region, Ghana"
      },
      expandedContent: {
        title: "Cape Coast Castle by Candlelight",
        fullDescription: "A powerful journey through Ghana’s past — from Assin Manso and the castles of Cape Coast and Elmina, to the rainforest canopy walk at Kakum. History, reflection, and breathtaking views.",
        image: "/placeholder.svg?height=500&width=400&text=Cape+Coast+Castle+Historical",
      },
      bookingContent: {
        title: "Cape Coast Castle by Candlelight",
        subtitle: "Embark on a profound journey through Ghana's rich history, from the sacred grounds of Assin Manso to the imposing castles of Cape Coast and Elmina. Experience the breathtaking canopy walk at Kakum National Park, where history and nature intertwine in a truly unforgettable way.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/cape-coast-by-candelight/cover.jpg?height=800&width=1200&text=Cape+Coast+Castle",
        galleryImages: [
          "/images/experiences/cape-coast-by-candelight/Gallery/1.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/2.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/3.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/4.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/5.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/6.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/7.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/8.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/cape-coast-by-candelight/Gallery/9.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
        ],
        overview: "Step into history under the cover of night with an exclusive after-dark tour of Cape Coast Castle. By lantern light, wander the dungeons, the governor’s quarters, and the Door of No Return. Haunting silence and the crash of Atlantic waves bring the past into sharp focus. Guided storytelling reveals resilience and memory, culminating in a candlelit reflection in the courtyard",
        whatsPriceless: "A deeply personal, hauntingly immersive journey through history, walking in the footsteps of the past in a way daylight cannot convey.",
        highlights: [
          "Exclusive access after regular hours",
          "A rare nighttime perspective of the castle",
          "Private guide with intimate storytelling",
        ],
        startingPrice: 649,
        pricing: {
          oneGuest: 649,
          twoGuests: 649,
          threeOrMoreGuests: 649,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
        ]
      },
      tags: ["Priceless", "1 PAX"]
    },
    {
      id: 4,
      slug: "accra-city-tour",
      defaultContent: {
        title: "Accra City Tour",
        shortDescription: "Accra is a city alive with history, rhythm, and everyday energy.",
        image: "/images/experiences/accra-city-tour/hero.jpg?height=400&width=300&text=Accra+City+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Accra City Tour",
        fullDescription: "Explore Ghana’s capital through its history, culture, and daily life — from monuments and markets to museums and makers. A full immersion into the rhythm of the city.",
        image: "/placeholder.svg?height=500&width=400&text=Accra+Skyline+Modern",
      },
      bookingContent: {
        title: "Accra City Tour",
        subtitle: "Dive into the heart of Ghana’s bustling capital, exploring its vibrant markets, rich museums, and iconic cultural sites—all in one unforgettable day.",
        duration: "1 DAY",
        destinations: "5 DESTINATIONS",
        maxGuests: "20 GUESTS (MAX)",
        heroImage: "/images/experiences/accra-city-tour/hero.jpg?height=800&width=1200&text=Accra+City+Tour",
        galleryImages: [
          "/images/experiences/accra-city-tour/Gallery/1.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/2.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/3.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/4.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/5.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/6.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/7.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/8.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/9.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/10.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/11.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/12.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/13.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/14.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/15.jpg?height=400&width=300&text=Accra+City+Tour",
          "/images/experiences/accra-city-tour/Gallery/16.jpg?height=400&width=300&text=Accra+City+Tour",
        ],
        overview: "Accra is a city alive with history, rhythm, and everyday energy. Begin at the Kwame Nkrumah Mausoleum, dedicated to Ghana’s first president, then step into the Ghana National Museum to explore centuries of heritage. At Independence Square, feel the spirit of Ghana’s freedom, before diving into the color and chaos of Makola Market. Finish with handmade crafts and art at the Arts Centre, where you meet artisans shaping Ghana’s creative future.",
        highlights: [
          "Learn about Ghana’s independence and heritage",
          "Experience Makola’s vibrant, sensory overload",
          "Engage with artisans at the Arts Centre",
          "Capture stunning photos at Independence Square",
        ],
        startingPrice: 350,
        pricing: {
          oneGuest: 350,
          twoGuests: 332.5,
          threeOrMoreGuests: 332.5,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 5,
      slug: "kente-and-rhythm",
      defaultContent: {
        title: "Kente and Rhythm",
        shortDescription: "Dive into Ghana’s cultural heartbeat at the Accra Arts Centre.",
        image: "/images/experiences/kente/cover.jpg?height=400&width=300&text=Accra+City+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Kente and Rhythm",
        fullDescription: "Explore Ghana’s capital through its history, culture, and daily life — from monuments and markets to museums and makers. A full immersion into the rhythm of the city.",
        image: "/placeholder.svg?height=500&width=400&text=Accra+Skyline+Modern",
      },
      bookingContent: {
        title: "Kente and Rhythm",
        subtitle: "Dive into the heart of Ghana’s bustling capital, exploring its vibrant markets, rich museums, and iconic cultural sites—all in one unforgettable day.",
        duration: "1 DAY",
        destinations: "5 DESTINATIONS",
        maxGuests: "20 GUESTS (MAX)",
        heroImage: "/images/experiences/kente/cover.jpg?height=800&width=1200&text=Accra+City+Tour",
        galleryImages: [
          "/images/experiences/kente/Gallery/1.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/2.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/3.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/4.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/5.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/6.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/7.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/8.jpg?height=400&width=300&text=Kente+Weaving",
        ],
        overview: "Dive into Ghana’s cultural heartbeat at the Accra Arts Centre. Begin with a private kente weaving workshop, where skilled artisans guide you in creating your own piece and share the meanings behind each pattern. Then, join in the pulse of West Africa through drumming and traditional dance — immersive, hands-on, and unforgettable.",
        highlights: [
          "Exclusive Kente weaving workshop with local master weavers",
          "Interactive traditional drumming session",
          "High-energy traditional dance lesson with local instructors",
          
        ],
        startingPrice: 250,
        pricing: {
          oneGuest: 250,
          twoGuests: 200,
          threeOrMoreGuests: 180,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    // {
    //   id: 6,
    //   slug: "dine-on-a-mat",
    //   defaultContent: {
    //     title: "Dine on a Mat",
    //     shortDescription: "Step into Fulani culture with Chef Fatmata Binta, winner of the Basque Culinary World Prize and UN Ambassador for Responsible Tourism.",
    //     image: "/images/experiences/dine-on-a-mat/cover.jpg?height=400&width=300&text=Kente+Weaving+Workshop",
    //     location: "Greater Accra, Ghana",
    //   },
    //   expandedContent: {
    //     title: "Dine on a Mat",
    //     fullDescription: "Spend the day learning from Ghanaian artisans and performers — weave your own kente, then feel the beat in a high-energy drumming and traditional dance session.",
    //     image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
    //   },
    //   bookingContent: {
    //     title: "Dine on a Mat",
    //     subtitle: "Immerse yourself in Ghana’s living heritage—learn the sacred art of kente weaving and experience the energy of traditional drumming and dance.",
    //     duration: "1 DAY",
    //     destinations: "2 DESTINATIONS",
    //     maxGuests: "10 GUESTS (MAX)",
    //     heroImage: "/images/experiences/dine-on-a-mat/cover.jpg?height=800&width=1200&text=Kente+Workshop",
    //     galleryImages: [
    //       "/images/experiences/dine-on-a-mat/Gallery/1.jpg?height=400&width=300&text=Kente+Weaving",
    //       "/images/experiences/dine-on-a-mat/Gallery/2.jpg?height=400&width=300&text=Kente+Weaving",
    //       "/images/experiences/dine-on-a-mat/Gallery/3.jpg?height=400&width=300&text=Kente+Weaving",
    //       "/images/experiences/dine-on-a-mat/Gallery/4.jpg?height=400&width=300&text=Kente+Weaving",
    //       "/images/experiences/dine-on-a-mat/Gallery/5.jpg?height=400&width=300&text=Kente+Weaving",
    //     ],
    //     overview: "Step into Fulani culture with Chef Fatmata Binta, winner of the Basque Culinary World Prize and UN Ambassador for Responsible Tourism. Born in Sierra Leone, Chef Binta reimagines Fulani traditions through food, with an exclusive five-course meal curated for your group. Accompanied by traditional drinks, a tea ceremony, and stories about African gastronomy, the experience is intimate, cultural, and deeply flavorful.Dive into Ghana’s cultural heartbeat at the Accra Arts Centre. Begin with a private kente weaving workshop, where skilled artisans guide you in creating your own piece and share the meanings behind each pattern. Then, join in the pulse of West Africa through drumming and traditional dance — immersive, hands-on, and unforgettable.",
    //     whatsPriceless: "Exclusive access to one of Africa’s most celebrated culinary voices and a chance to explore Fulani cuisine in a way few ever do.",
    //     highlights: [
    //       "Five-course private dining experience with Chef Binta",
    //       "Introduction to Fulani cuisine and culture",
    //       "Tea ceremony and storytelling",
    //     ],
    //     startingPrice: 235,
    //     pricing: {
    //       oneGuest: 235,
    //       twoGuests: 223.25,
    //       threeOrMoreGuests: 223.25,
    //     },
    //     minimumGuests: 2,
    //     included: [
    //       "Private transportation including fuel",
    //       "Dedicated chaperone and access to resident guides",
    //       "Complimentary bites and drinks",
    //       "Beyond Experiences Essentials™ Bag",
    //     ]
    //   },
    //   tags: ["Priceless", "2 PAX"]
    // },
    {
      id: 6,
      slug: "wojutei",
      defaultContent: {
        title: "Wojutei",
        shortDescription: "Begin your journey at the lush Aburi Botanical Gardens, where a guided walk introduces you to native spices and plants steeped in tradition.",
        image: "/images/experiences/wojutei/cover.jpg?height=400&width=300&text=Kente+Weaving+Workshop",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Wojutei",
        fullDescription: "Spend the day learning from Ghanaian artisans and performers — weave your own kente, then feel the beat in a high-energy drumming and traditional dance session.",
        image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
      },
      bookingContent: {
        title: "Wojutei",
        subtitle: "Immerse yourself in Ghana’s living heritage—learn the sacred art of kente weaving and experience the energy of traditional drumming and dance.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "10 GUESTS (MAX)",
        heroImage: "/images/experiences/wojutei/cover.jpg?height=800&width=1200&text=Kente+Workshop",
        galleryImages: [
          "/images/experiences/wojutei/Gallery/1.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/2.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/3.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/4.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/5.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/6.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/7.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/8.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/wojutei/Gallery/9.jpg?height=400&width=300&text=Kente+Weaving",
        ],
        overview: "Begin your journey at the lush Aburi Botanical Gardens, where a guided walk introduces you to native spices and plants steeped in tradition. From there, ascend to a stunning mountaintop home with sweeping views, where Chef Fiifi welcomes you into an intimate, storied dining experience. Drawing inspiration from the spices discovered in the gardens, Chef Fiifi weaves his personal journey and heritage into a curated multi-course meal that is as much storytelling as it is fine dining. The evening concludes with an interactive dessert session, where you’re invited to join him in the kitchen for a hands-on finale. This is not just dining - it’s discovery, connection, and memory, all set against the backdrop of Aburi’s serene landscape.",
        whatsPriceless: "Exclusive access to Chef Fiifi’s culinary journey, blending nature, storytelling, and gastronomy into an intimate dining experience few will ever encounter.",
        highlights: [
          "Guided spice walk through Aburi Botanical Gardens",
          "Intimate multi-course dining with Chef Fiifi",
          "Story-driven culinary journey inspired by local ingredients",
          "Interactive dessert-making session with the chef",
        ],
        startingPrice: 235,
        pricing: {
          oneGuest: 235,
          twoGuests: 223.25,
          threeOrMoreGuests: 223.25,
        },
        minimumGuests: 2,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          
        ]
      },
      tags: ["Priceless", "2 PAX"]
    },
    {
      id: 7,
      slug: "a-date-with-fashion",
      defaultContent: {
        title: "A Date with Fashion",
        shortDescription: "Step into Ghana’s fashion scene with three pioneering designers whose work has graced the likes of Beyoncé, Cardi B, and Angelique Kidjo.",
        image: "/images/experiences/a-date-with-fashion/cover.jpg?height=400&width=300&text=Kente+Weaving+Workshop",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "A Date with Fashion",
        fullDescription: "Spend the day learning from Ghanaian artisans and performers — weave your own kente, then feel the beat in a high-energy drumming and traditional dance session.",
        image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
      },
      bookingContent: {
        title: "A Date with Fashion",
        subtitle: "Immerse yourself in Ghana’s living heritage—learn the sacred art of kente weaving and experience the energy of traditional drumming and dance.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "10 GUESTS (MAX)",
        heroImage: "/images/experiences/a-date-with-fashion/cover.jpg?height=800&width=1200&text=Kente+Workshop",
        galleryImages: [
          "/images/experiences/a-date-with-fashion/Gallery/1.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/2.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/3.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/4.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/5.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/6.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/7.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/8.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/9.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/10.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/11.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/12.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/13.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/14.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/15.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/16.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/17.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/a-date-with-fashion/Gallery/18.jpg?height=400&width=300&text=Kente+Weaving",
         
        ],
        overview: "Step into Ghana’s fashion scene with three pioneering designers whose work has graced the likes of Beyoncé, Cardi B, and Angelique Kidjo. Tour their studios, learn about their creative process, and collaborate to design a one-of-a-kind piece to take home. This is more than fashion — it’s artistry, identity, and culture.",
        whatsPriceless: "Personal interaction with Ghana’s leading designers and the opportunity to co-create a custom piece.",
        highlights: [
          "Guided showroom tours with top designers",
          "Hands-on design session for a custom piece",
          "Access to unisex fashion suitable for all",
        ],
        startingPrice: 899,
        pricing: {
          oneGuest: 899,
          twoGuests: 899,
          threeOrMoreGuests: 899,
        },
        minimumGuests: 2,
        included: [
         "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
        ]
      },
      tags: ["Priceless", "2 PAX"]
    },
    {
      id: 8,
      slug: "afrofuture",
      defaultContent: {
        title: "Afrofuture",
        shortDescription: "Time with the founders and access to headliners in one of Africa’s biggest music stages",
        image: "/images/experiences/afrofuture/cover.jpg?height=400&width=300&text=Kente+Weaving+Workshop",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Afrofuture",
        fullDescription: "Spend the day learning from Ghanaian artisans and performers — weave your own kente, then feel the beat in a high-energy drumming and traditional dance session.",
        image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
      },
      bookingContent: {
        title: "Afrofuture",
        subtitle: "Immerse yourself in Ghana’s living heritage—learn the sacred art of kente weaving and experience the energy of traditional drumming and dance.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "10 GUESTS (MAX)",
        heroImage: "/images/experiences/afrofuture/cover.jpg?height=800&width=1200&text=Kente+Workshop",
        galleryImages: [
          "/images/experiences/afrofuture/Gallery/1.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/afrofuture/Gallery/2.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/afrofuture/Gallery/3.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/afrofuture/Gallery/4.jpg?height=400&width=300&text=Kente+Weaving",
        ],
        overview: "Accra is home to Afrofuture, one of the world’s most electrifying African music festivals. Past headliners include Burna Boy, Davido, Black Sherif, and Asake. With this experience, you join the founders’ inner circle. Go backstage, meet the artists, and live the festival from a perspective reserved for only a few.",
        whatsPriceless: "Time with the founders and access to headliners in one of Africa’s biggest music stages",
        highlights: [
          "All-access festival entry",
          "Backstage experiences and introductions",
          "Attend as part of the founders’ entourage",
        ],
        startingPrice: 3499,
        pricing: {
          oneGuest: 3499,
          twoGuests: 3499,
          threeOrMoreGuests: 3499,
        },
        minimumGuests: 2,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
        ]
      },
      tags: ["Priceless", "2 PAX"]
    },
    {
      id: 9,
      slug: "gardens-trails-and-cacao",
      defaultContent: {
        title: "Gardens, Trails, and Cacao",
        shortDescription: "Aburi is a perfect blend of history, greenery, and adventure.",
        image: "/images/experiences/gtc/cover.jpg?height=400&width=300&text=Ashanti+Cultural+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Gardens, Trails, and Cacao",
        fullDescription: "Craft your own artisanal chocolate with Ghana’s finest cocoa, then relax into a massage at Resense Spa. A luxurious blend of indulgence and calm.",
        image: "/placeholder.svg?height=500&width=400&text=Ashanti+Palace+Golden",
      },
      bookingContent: {
        title: "Gardens, Trails, and Cacao",
        subtitle: "From bean to bar, discover the secrets of Ghanaian chocolate, then treat yourself to a world-class spa experience.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "8 GUESTS (MAX)",
        heroImage: "/images/experiences/gtc/cover.jpg?height=800&width=1200&text=Chocolate+Spa",
        galleryImages: [
          "/images/experiences/gtc/Gallery/1.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/2.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/3.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/4.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/5.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/6.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/7.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/8.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/9.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/10.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/11.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/12.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/13.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/14.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/15.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/16.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/17.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/18.jpg?height=400&width=300&text=Chocolate+Workshop", 
          "/images/experiences/gtc/Gallery/19.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/20.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/21.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/22.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/23.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/gtc/Gallery/24.jpg?height=400&width=300&text=Chocolate+Workshop",
        ],
        overview: "Aburi is a perfect blend of history, greenery, and adventure. Begin at the Tetteh Quarshie Cocoa Farm, birthplace of Ghana’s cocoa story. Continue to Aburi Botanical Gardens, a serene landscape of exotic trees and curated paths. Then switch pace with quad biking across the Aburi Hills, riding winding trails with panoramic views. End the day at Oboadaka Waterfall, a hidden escape where you can cool off in nature’s calm.",
        highlights: [
          "Explore Ghana’s cocoa heritage at Tetteh Quarshie Farm",
          "Stroll through Aburi Botanical Gardens",
          "Quad biking adventure on Aburi Hills",
          "Relax at Oboadaka Waterfall",
        ],
        startingPrice: 465,
        pricing: {
          oneGuest: 465,
          twoGuests: 310,
          threeOrMoreGuests: 250,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 10,
      slug: "fairafric-farm-to-chocolate-tour",
      defaultContent: {
        title: "FairAfric Farm to Chocolate Tour",
        shortDescription: "Located in Suhum in Ghana’s Eastern Region, Fairafric offers a unique bean-to-bar chocolate-making experience that blends education, sustainability, and delicious indulgence.",
        image: "/images/experiences/fair-afric/cover.jpg?height=400&width=300&text=Ashanti+Cultural+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "FairAfric Farm to Chocolate Tour",
        fullDescription: "Craft your own artisanal chocolate with Ghana’s finest cocoa, then relax into a massage at Resense Spa. A luxurious blend of indulgence and calm.",
        image: "/placeholder.svg?height=500&width=400&text=Ashanti+Palace+Golden",
      },
      bookingContent: {
        title: "FairAfric Farm to Chocolate Tour",
        subtitle: "From bean to bar, discover the secrets of Ghanaian chocolate, then treat yourself to a world-class spa experience.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "8 GUESTS (MAX)",
        heroImage: "/images/experiences/fair-afric/cover.jpg?height=800&width=1200&text=Chocolate+Spa",
        galleryImages: [
          "/images/experiences/fair-afric/Gallery/1.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/fair-afric/Gallery/2.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/fair-afric/Gallery/3.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/fair-afric/Gallery/4.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/fair-afric/Gallery/5.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/fair-afric/Gallery/6.jpg?height=400&width=300&text=Chocolate+Workshop",
        ],
        overview: "Located in Suhum in Ghana’s Eastern Region, Fairafric offers a unique bean-to-bar chocolate-making experience that blends education, sustainability, and delicious indulgence. Guests are guided through the factory where they see each step of the chocolate-making process from sorting and roasting cocoa beans to tempering and packaging bars. Participants get the chance to make their chocolate bars, selecting ingredients like nuts, dried fruits, or spices to customize their creations. Visitors also get to enjoy a tasting flight of different chocolate varieties from creamy milk chocolate to intense dark options. This experience also includes lunch.",
        highlights: [
          "Authentic, farm-to-factory experience",
          "Interactive and educational",
          "Supports a sustainable and ethical chocolate movement in Africa",
        ],
        startingPrice: 450,
        pricing: {
          oneGuest: 450,
          twoGuests: 300,
          threeOrMoreGuests: 220,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 11,
      slug: "the-trident-experience",
      defaultContent: {
        title: "The Trident Experience",
        shortDescription: "Dive into an unforgettable water-based adventure on the scenic Volta Lake.",
        image: "/images/experiences/trident.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Volta Region, Ghana",
      },
      expandedContent: {
        title: "The Trident Experience",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "The Trident Experience",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/trident/hero.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/trident/Gallery/IMG_5382.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/trident/Gallery/IMG_5469.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/trident/Gallery/IMG_5482.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/trident/Gallery/IMG_5392.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "Dive into an unforgettable water-based adventure on the scenic Volta Lake. Start with a thrilling abseiling experience, descending cliff faces or the Adomi Bridge with expert guidance and breathtaking views. Then, take to the water for a serene yet energizing kayaking session, gliding through the calm currents surrounded by nature and scenic views. As the day winds down, relax with a peaceful sunset boat ride, where golden skies and gentle waves offer the perfect end to your lakeside escape.",
        highlights: [
          "Descend rocky cliffs or the Adomi Bridge with expert guidance and breathtaking lake views.",
          "Paddle across the calm waters of Volta Lake, surrounded by nature.",
          "Unwind with a peaceful cruise under golden skies.",
          "A perfect blend of adrenaline, relaxation, and stunning photo moments.",
        ],
        startingPrice: 560,
        pricing: {
          oneGuest: 560,
          twoGuests: 350,
          threeOrMoreGuests: 290,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 12,
      slug: "art-after-dark",
      defaultContent: {
        title: "Art After Dark",
        shortDescription: "Art After Dark (AAD), redefines how audiences engage with contemporary art",
        image: "/images/experiences/art-after-dark/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Art After Dark",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Art After Dark",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/art-after-dark/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/art-after-dark/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/7.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/8.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/9.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/art-after-dark/Gallery/10.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "Art After Dark (AAD), redefines how audiences engage with contemporary art. Instead of traditional gallery spaces, AAD unfolds in lounges, bars, and intimate venues, creating a relaxed yet vibrant atmosphere where art, performance, and community meet. Each edition is curated as either a group exhibition or a focused solo presentation, often interwoven with performance, music, food, and drink. The result is a cultural happening that encourages dialogue, discovery, and deeper connection between artists and audiences.",
        whatsPriceless: "Sharing spaces, stories, and moments with the artists themselves. An intimate connection to art you won’t find anywhere else.",
        highlights: [
          "Immersive exhibitions reimagined in unconventional spaces",
          "Occasional live performance elements, such as spoken word or movement art",
          "A social, nightlife-inspired atmosphere that breaks the mold of traditional galleries",
          "Curated soundscapes with DJs enhancing the visual and performative works",
          "Culinary and beverage pairings that add to the sense of community and exchange",
        ],
        startingPrice: 560,
        pricing: {
          oneGuest: 560,
          twoGuests: 350,
          threeOrMoreGuests: 290,
        },
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Priceless", "1 PAX"]
    },
    {
      id: 13,
      slug: "sandwich-harbour-exploration",
      defaultContent: {
        title: "Sandwich Harbour Exploration",
        shortDescription: "Where rolling dunes meet the Atlantic, Sandwich Harbour - part of the Namib Naukluft Park - feels otherworldly.",
        image: "/images/experiences/sandwich-harbour/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Namibia",
      },
      expandedContent: {
        title: "Sandwich Harbour Exploration",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Sandwich Harbour Exploration",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/sandwich-harbour/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/sandwich-harbour/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sandwich-harbour/Gallery/7.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "Where rolling dunes meet the Atlantic, Sandwich Harbour - part of the Namib Naukluft Park - feels otherworldly. Ride in 4x4s across steep sand faces and along untouched beaches. Wildlife thrives in this fragile space: flamingos, jackals, and countless seabirds. It’s a rare corner of the earth where extremes collide.",
        highlights: [
          "4x4 dune drive where desert meets ocean",
          "Panoramic views of sand and sea",
          "Flamingo viewing at the Walvis Bay lagoon",
          "Walvis Bay Saltpans",
          "Kuiseb River Delta",
          "Sandwich Harbour Lagoon (Weather permitting)",
          "Snacks overlooking the Atlantic Ocean or majestic dunes",
        ],
        startingPrice: 200,
        pricing: {
          oneGuest: 200,
          twoGuests: 200,
          threeOrMoreGuests: 200,
        },
        minimumGuests: 3,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Complimentary bites and drinks",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "3 PAX"]
    },
    {
      id: 14,
      slug: "quad-biking-on-dune-7",
      defaultContent: {
        title: "Quad Biking on Dune 7",
        shortDescription: "Dune 7 rises higher than any other dune in Namibia, and conquering it is half the thrill.",
        image: "/images/experiences/quad-biking/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Namibia",
      },
      expandedContent: {
        title: "Quad Biking on Dune 7",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Quad Biking on Dune 7",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/quad-biking/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/quad-biking/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/quad-biking/Gallery/7.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "Dune 7 rises higher than any other dune in Namibia, and conquering it is half the thrill. With a quad bike roaring beneath you, climb its ridges, cut across slopes, and feel the desert open endlessly ahead.",
        highlights: [
          "1 hour Quad biking on Namibia’s tallest dune",
          "Exhilarating climbs and turns",
          "Panoramic desert views",
        ],
        startingPrice: 50,
        pricing: {
          oneGuest: 50,
          twoGuests: 50,
          threeOrMoreGuests: 50,
        },
        minimumGuests: 1,
        included: [
          "Quad bike/per person",
          "Riding guide",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 15,
      slug: "hot-air-ballooning-over-the-desert",
      defaultContent: {
        title: "Hot Air Ballooning Over the Desert",
        shortDescription: "At sunrise, the desert becomes alive with light and shadow.",
        image: "/images/experiences/hot-air/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Namibia",
      },
      expandedContent: {
        title: "Hot Air Ballooning Over the Desert",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Hot Air Ballooning Over the Desert",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/hot-air/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/hot-air/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/hot-air/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/hot-air/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/hot-air/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/hot-air/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "At sunrise, the desert becomes alive with light and shadow. You rise with the winds, floating for nearly an hour above rolling dunes and rugged mountains — endless horizons in every direction. On landing, the experience continues with a Champagne breakfast set right in the desert, before a gentle drive back through its quiet majesty. This is Namibia at its most cinematic, and you’re at the heart of it.",
        highlights: [
          "Sunrise hot air balloon ride over the Namib Desert",
          "Stunning aerial views of dunes and wildlife",
          "Champagne breakfast in the desert",
        ],
        startingPrice: 740,
        pricing: {
          oneGuest: 740,
          twoGuests: 740,
          threeOrMoreGuests: 740,
        },
        minimumGuests: 1,
        included: [
          "1-hour flight",
          "Champagne breakfast",
          "Flight certificate",
        ]
      },
      tags: ["Travel Planner's Choice", "1 PAX"]
    },
    {
      id: 16,
      slug: "dolphin-watching-and-snorkeling",
      defaultContent: {
        title: "Dolphin Watching and Snorkeling",
        shortDescription: "The waters off São Tomé are alive with life.",
        image: "/images/experiences/dws/cover.jpeg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "São Tomé",
      },
      expandedContent: {
        title: "Dolphin Watching and Snorkeling",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Dolphin Watching and Snorkeling",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/dws/cover.jpeg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/dws/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/dws/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/dws/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/dws/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/dws/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/dws/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "The waters off São Tomé are alive with life. At dawn, pods of bottlenose and spotted dolphins skim close to shore — playful, curious, and in their hundreds. Slip into the sea with snorkeling gear, listen to their underwater calls, and swim alongside them in their element. After, dive deeper into São Tomé’s waters, discovering reefs, marine life, and the island’s vibrant undersea world.",
        highlights: [
          "Early-morning dolphin encounter with bottlenose and spotted dolphins",
          "Snorkeling with dolphins in their natural habitat",
          "Scuba diving among reefs and tropical marine life",
          "Chance to spot other migratory species in season",
        ],
        startingPrice: 80,
        pricing: {
          oneGuest: 80,
          twoGuests: 80,
          threeOrMoreGuests: 80,
        },
        minimumGuests: 3,
        included: [
          "Life jackets",
          "Full Snorkel Gear",
          "Water and Fruit",
        ]
      },
      tags: ["Travel Planner's Choice", "3 PAX"]
    },
    {
      id: 17,
      slug: "cacao-and-coffee-farm-tour",
      defaultContent: {
        title: "Cocoa and Coffee Farm Tour",
        shortDescription: "This is São Tomé’s story — told through its farms, flavors, and landscapes.",
        image: "/images/experiences/cocoa-tour/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "São Tomé",
      },
      expandedContent: {
        title: "Cocoa and Coffee Farm Tour",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Cocoa and Coffee Farm Tour",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/cocoa-tour/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/cocoa-tour/Gallery/1.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/3.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/cocoa-tour/Gallery/7.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "This is São Tomé’s story — told through its farms, flavors, and landscapes. Walk through historic plantations like Agostinho Neto and Bela Vista, exploring the journey of cocoa from nursery to fermentation to drying. Pause for a traditional lunch with sweeping sea views, cool off at Blue Lagoon, and end with tastings at Diogo Vaz — rich chocolates and fresh coffee made on the island itself.",
        highlights: [
          "Guided tours of historic cocoa and coffee plantations",
          "Hands-on look at the cocoa-making process from bean to bar",
          "Traditional Santomean lunch with sea views",
          "Refreshing stop at Blue Lagoon",
          "Coffee and chocolate tasting at Diogo Vaz",
        ],
        startingPrice: 180,
        pricing: {
          oneGuest: 180,
          twoGuests: 180,
          threeOrMoreGuests: 180,
        },
        minimumGuests: 2,
        included: [
          "Local experienced guide",
          "4x4 Transport and fuel",
          "All visit and fee expenses",
          "Water and complimentary snacks",
          "All visit and fee expenses",
          "Lunch at Roca Monte Forte",
          "Coffee or tea at Diogo Vaz",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 18,
      slug: "sao-tome-city-tour",
      defaultContent: {
        title: "São Tomé City Tour",
        shortDescription: "São Tomé’s capital is small but full of life. Begin in Bobo Forro’s lively markets — fruit, fish, color, and noise.",
        image: "/images/experiences/sao-tome-tour/cover.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "São Tomé",
      },
      expandedContent: {
        title: "São Tomé City Tour",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "São Tomé City Tour",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/sao-tome-tour/cover.jpg?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/sao-tome-tour/Gallery/1.webp?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/3.webp?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/7.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/8.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/sao-tome-tour/Gallery/9.jpg?height=400&width=300&text=Abseiling+Cliffs",
        ],
        overview: "São Tomé’s capital is small but full of life. Begin in Bobo Forro’s lively markets — fruit, fish, color, and noise. Wander through colonial streets, past the azulejo-covered Cathedral, the Presidential Palace, and Independence Square. Visit the National Museum to uncover the island’s layered history, then end with flavors: grilled fish, tropical fruits, or Santomean ice cream in exotic island varieties.",
        highlights: [
          "Explore São Tomé’s bustling markets and colonial architecture",
          "Visit Independence Square, Cathedral, and Presidential Palace",
          "Discover the island’s past at the National Museum",
          "Taste local cuisine and Santomean ice cream",
        ],
        startingPrice: 120,
        pricing: {
          oneGuest: 120,
          twoGuests: 120,
          threeOrMoreGuests: 120,
        },
        minimumGuests: 2,
        included: [
          "Local experienced guide",
          "4x4 Transport and fuel",
          "Water and complimentary snacks",
          "All visit and fee expenses",
          "Exotic Ice Cream (or pastry)",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 19,
      slug: "canvas-and-soul",
      defaultContent: {
        title: "Canvas & Soul",
        shortDescription: "Canvas and Soul is an intimate art and storytelling journey where every guest becomes a creator.",
        image: "/images/experiences/canvas-and-soul/cover.png?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Ghana",
      },
      expandedContent: {
        title: "Canvas & Soul",
        fullDescription: "Adventure and calm meet on Volta Lake. Abseil from rocky cliffs, kayak through quiet waters, and end the day with a golden-hour boat cruise under the open sky.",
        image: "/placeholder.svg?height=500&width=400&text=Lake+Volta+Dam+Sunset",
      },
      bookingContent: {
        title: "Canvas & Soul",
        subtitle: "From abseiling to kayaking and a sunset cruise, experience the best of Volta Lake in one action-packed day.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/canvas-and-soul/cover.png?height=800&width=1200&text=Volta+Lake+Adventure",
        galleryImages: [
          "/images/experiences/canvas-and-soul/Gallery/1.jpeg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/canvas-and-soul/Gallery/2.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/canvas-and-soul/Gallery/3.jpeg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/canvas-and-soul/Gallery/4.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/canvas-and-soul/Gallery/5.jpg?height=400&width=300&text=Abseiling+Cliffs",
          "/images/experiences/canvas-and-soul/Gallery/6.jpg?height=400&width=300&text=Abseiling+Cliffs",
      
        ],
        overview: "Canvas and Soul is an intimate art and storytelling journey where every guest becomes a creator. It begins with a resident artist sharing their story, a tapestry of life, culture, and inspiration, as wine is poured and the space fills with quiet reflection. Guests are then invited to pick up a brush, painting their own canvas inspired by the artist’s journey. Guided by the artist’s presence, the evening unfolds as a shared act of creativity and connection.",
        highlights: [
          "Storytelling session with a resident artist",
          "Wine and art-filled atmosphere in an intimate setting",
          "Guided painting experience with your own blank canvas",
        ],
        startingPrice: 120,
        pricing: {
          oneGuest: 120,
          twoGuests: 120,
          threeOrMoreGuests: 120,
        },
        minimumGuests: 2,
        included: [
          "Guided art lesson by resident artist",
          "Private transportation, including fuel.",
          "Beyond Essentials Bag",
          "Complimentary bites and drinks.",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
  ]