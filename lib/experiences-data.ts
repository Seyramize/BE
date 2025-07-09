// lib/experiences-data.ts

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
      minimumGuests: number
      included: string[]
    }
    tags: string[]
  }
  
  export const experiences: Experience[] = [
    {
      id: 1,
      slug: "shai-hills-experience",
      defaultContent: {
        title: "The Shai Hills Experience",
        shortDescription: "Experience the perfect blend of nature, culture, and adventure at Shai Hills.",
        image: "/images/home/shaihills.jpg?height=400&width=300&text=Shai+Hills+Adventure",
        location: "Eastern Region, Ghana"
      },
      expandedContent: {
        title: "Into the Hills: The Shai Hills Experience",
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
          "/images/experiences/shai-hills/Gallery/beyondvictor-146 (1).jpg?height=400&width=300&text=Wildlife+Safari",
          "/images/experiences/shai-hills/Gallery/beyondvictor-148.jpg?height=400&width=300&text=Luxury+Resort",
          "/images/experiences/shai-hills/Gallery/GYefu94XIAAy1yw.jpg?height=400&width=300&text=Nature+Activities",
          "/images/experiences/shai-hills/Gallery/shai-hills-resource-reserve.jpg?height=400&width=300&text=Nature+Activities",
        ],
        overview: "Experience the perfect blend of nature, culture, and adventure at Shai Hills. Begin with a scenic hike up the Mono Hills, exploring ancient caves and enjoying panoramic views of the Volta plains. Dive into the rich heritage of the Shai people at the Wildlife & Heritage Museum, where nature and history meet. Then, kick up the dust on an adrenaline-filled quad biking ride through the forest reserve. It’s a day of discovery, excitement, and unforgettable moments in the wild.",
        highlights: [
          "Guided hike up Mogo Hills.",
          "Breathtaking hilltop views & photo ops.",
          "Interactive Wildlife Museum tour.",
          "Quad biking adventure through forest trail.",
        ],
        startingPrice: 400,
        minimumGuests: 2,
        included: [
          "Private transportation including fuel",
          "Dedicated chaperone and access to resident guides",
          "Professional massage at a waterfall",
          "On-the-go internet access",
          "Lunch and dinner",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 2,
      slug: "cape-coast-experience",
      defaultContent: {
        title: "The Cape Coast Experience",
        shortDescription: "Journey through Ghana's historic Cape Coast and ancient castles.",
        image: "/images/home/capecoast.jpg?height=400&width=300&text=Cape+Coast+Discovery",
        location: "Central Region, Ghana"
      },
      expandedContent: {
        title: "Coastlines & Memory: The Cape Coast Experience",
        fullDescription: "A powerful journey through Ghana’s past — from Assin Manso and the castles of Cape Coast and Elmina, to the rainforest canopy walk at Kakum. History, reflection, and breathtaking views.",
        image: "/placeholder.svg?height=500&width=400&text=Cape+Coast+Castle+Historical",
      },
      bookingContent: {
        title: "Journey Through Time: Cape Coast",
        subtitle: "Embark on a profound journey through Ghana's rich history, from the sacred grounds of Assin Manso to the imposing castles of Cape Coast and Elmina. Experience the breathtaking canopy walk at Kakum National Park, where history and nature intertwine in a truly unforgettable way.",
        duration: "1 DAY",
        destinations: "3 DESTINATIONS",
        maxGuests: "12 GUESTS (MAX)",
        heroImage: "/images/experiences/the-cape-coast-experience/cover.jpg?height=800&width=1200&text=Cape+Coast+Castle",
        galleryImages: [
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-148 (3).jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-161.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-162.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-164.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-166.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-171.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-180.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/beyondsojourn-181 (1).jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/20181107_124315.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/At the Assin Manso Slave River, locally known as Donkor Nsuo, slaves from northern Ghana and nei.jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/caption (3).jpg?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/download.webp?height=400&width=300&text=Cape+Coast+Castle+2",
          "/images/experiences/the-cape-coast-experience/Gallery/IMG_1985-2 (1).jpg?height=400&width=300&text=Cape+Coast+Castle+2",
        ],
        overview: "Our Cape Coast tour offers a deep dive into Ghana’s history, resilience, and natural beauty. The journey begins at the Assin Manso Slave River, where enslaved Africans took their last bath before being taken to the coast. At Cape Coast Castle, you’ll explore the dungeons and learn about the transatlantic slave trade through guided tours and museum exhibits. A visit to Elmina Castle, the oldest European building in sub-Saharan Africa, reveals more about colonial rule and the human stories behind its walls. The tour also includes Kakum National Park, where you can walk across a breathtaking canopy walkway suspended high above the rainforest.",
        highlights: [
          "Learn about Ghana’s role in the transatlantic slave trade at Cape Coast and Elmina Castles.",
          "Stand at the Door of No Return.",
          "Experience the rainforest from above on Kakum’s canopy walkway.",
          "Enjoy breathtaking coastal landscapes and countryside views.",
        ],
        startingPrice: 380,
        minimumGuests: 1,
        included: [
          "Private transportation including fuel",
          "Professional tour guide",
          "Castle entrance fees",
          "Canopy walkway access",
          "Lunch and refreshments",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 3,
      slug: "accra-in-a-day",
      defaultContent: {
        title: "Accra in a Day",
        shortDescription: "Discover the vibrant capital with markets, museums, and cultural sites.",
        image: "/images/home/accra.jpeg?height=400&width=300&text=Accra+City+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "City Pulse: Accra in a Day",
        fullDescription: "Explore Ghana’s capital through its history, culture, and daily life — from monuments and markets to museums and makers. A full immersion into the rhythm of the city.",
        image: "/placeholder.svg?height=500&width=400&text=Accra+Skyline+Modern",
      },
      bookingContent: {
        title: "Accra Unveiled: City in a Day",
        subtitle: "Dive into the heart of Ghana’s bustling capital, exploring its vibrant markets, rich museums, and iconic cultural sites—all in one unforgettable day.",
        duration: "1 DAY",
        destinations: "5 DESTINATIONS",
        maxGuests: "20 GUESTS (MAX)",
        heroImage: "/images/experiences/accra-city-tour/hero.jpeg?height=800&width=1200&text=Accra+City+Tour",
        galleryImages: [
          "/images/experiences/accra-city-tour/Gallery/054a15ec-baf0-4101-8ec5-f546424d233f478ded33e73b97ebbf_black-star-square-7.jpg?height=400&width=300&text=Makola+Market",
          "/images/experiences/accra-city-tour/Gallery/image (2).jpg?height=400&width=300&text=Makola+Market",
          "/images/experiences/accra-city-tour/Gallery/ousu 190 (1).jpg?height=400&width=300&text=Makola+Market",
          "/images/experiences/accra-city-tour/Gallery/ousu 362.jpg?height=400&width=300&text=Makola+Market",
          "/images/experiences/accra-city-tour/Gallery/accragallery1.jpeg?height=400&width=300&text=Makola+Market",
        ],
        overview: "This Accra city tour takes you through Ghana’s rich history, culture, and vibrant daily life. You’ll visit the Kwame Nkrumah Mausoleum, which is a historical site dedicated to Ghana’s first president, Dr. Kwame Nkrumah, where you’ll learn about his life and the independence movement. At the Ghana National Museum, the oldest and biggest museum in Ghana, you'll explore the country’s cultural and historical heritage. At Black Star Square (Independence Square), see one of Ghana’s most iconic landmarks, symbolizing Ghana’s independence and pride. Next, immerse yourself in the bustling Makola Market, one of Accra's largest and busiest hubs, where traders sell everything from textiles to fresh produce. The tour also includes the Accra Arts Centre, where you can explore handmade crafts, meet artisans, and shop for unique souvenirs. For art lovers, there is an art gallery that showcases traditional and contemporary Ghanaian artwork.",
        highlights: [
          "Gain a deeper understanding of Ghana’s independence and cultural heritage.",
          "A sensory overload of colors, sounds, and unique finds at Makola.",
          "Engage with Ghanaian artisans and discover traditional craftsmanship.",
          "Capture stunning photos at Black Star Square and historical sites.",
          "Experience Accra’s energy, storytelling, and everyday life firsthand.",
        ],
        startingPrice: 300,
        minimumGuests: 1,
        included: [
          "Private transportation",
          "Professional city guide",
          "Museum entrance fees",
          "Lunch at a local restaurant",
          "Bottled water",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 4,
      slug: "kente-rhythm-workshop",
      defaultContent: {
        title: "Kente & Rhythm Workshop",
        shortDescription: "Dive into the heart of Ghanaian tradition with this unforgettable cultural experience.",
        image: "/images/experiences/kente.jpg?height=400&width=300&text=Kente+Weaving+Workshop",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Woven Stories: Kente & Rhythm Workshop",
        fullDescription: "Spend the day learning from Ghanaian artisans and performers — weave your own kente, then feel the beat in a high-energy drumming and traditional dance session.",
        image: "/placeholder.svg?height=500&width=400&text=Western+Ghana+Canopy+Beach",
      },
      bookingContent: {
        title: "Kente Weaving & Traditional Dance and Drumming Lessons",
        subtitle: "Immerse yourself in Ghana’s living heritage—learn the sacred art of kente weaving and experience the energy of traditional drumming and dance.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "10 GUESTS (MAX)",
        heroImage: "/images/experiences/kente/cover.jpg?height=800&width=1200&text=Kente+Workshop",
        galleryImages: [
          "/images/experiences/kente/Gallery/8776-bonwire-kente-village.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/06-Ashanti-Names-DSC02997.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/343226152_a7e6f12e6e_b_1024x1024.jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/Drumming_bottom (1).jpg?height=400&width=300&text=Kente+Weaving",
          "/images/experiences/kente/Gallery/Tsirkormpam-lady-drumming-scaled.jpg?height=400&width=300&text=Kente+Weaving",
        ],
        overview: "Dive into the heart of Ghanaian tradition with this unforgettable cultural experience at the Accra Art Center. Begin with a private kente weaving workshop, where skilled artisans teach you the meanings behind each pattern and guide you as you create your own piece. Then, feel the rhythm of West Africa through interactive drumming and traditional dance sessions led by vibrant local performers. Perfect for travelers seeking authentic, hands-on cultural immersion.",
        highlights: [
          "Exclusive Kente weaving workshop with local master weavers.",
          "Interactive traditional drumming session.",
          "High-energy traditional dance lesson with local instructors.",
          "Experience a high-energy Ghanaian dance session.",
        ],
        startingPrice: 235,
        minimumGuests: 2,
        included: [
          "All workshop materials",
          "Professional instructors",
          "Cultural performance",
          "Lunch and refreshments",
          "Bottled water",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 5,
      slug: "chocolate-spa-mansa-gold",
      defaultContent: {
        title: "Chocolate + Spa with Mansa Gold",
        shortDescription: "Discover the rich world of Ghanaian cocoa in a hands-on chocolate-making workshop.",
        image: "/images/experiences/mansagold.jpg?height=400&width=300&text=Ashanti+Cultural+Tour",
        location: "Greater Accra, Ghana",
      },
      expandedContent: {
        title: "Melt & Unwind: Chocolate + Spa with Mansa Gold",
        fullDescription: "Craft your own artisanal chocolate with Ghana’s finest cocoa, then relax into a massage at Resense Spa. A luxurious blend of indulgence and calm.",
        image: "/placeholder.svg?height=500&width=400&text=Ashanti+Palace+Golden",
      },
      bookingContent: {
        title: "Chocolate-Making Experience with Mansa Gold",
        subtitle: "From bean to bar, discover the secrets of Ghanaian chocolate, then treat yourself to a world-class spa experience.",
        duration: "1 DAY",
        destinations: "2 DESTINATIONS",
        maxGuests: "8 GUESTS (MAX)",
        heroImage: "/images/experiences/chocolate+spa/cover.jpg?height=800&width=1200&text=Chocolate+Spa",
        galleryImages: [
          "/images/experiences/chocolate+spa/Gallery/1.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/chocolate+spa/Gallery/2.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/chocolate+spa/Gallery/3.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/chocolate+spa/Gallery/4.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/chocolate+spa/Gallery/5.jpg?height=400&width=300&text=Chocolate+Workshop",
          "/images/experiences/chocolate+spa/Gallery/6.jpg?height=400&width=300&text=Chocolate+Workshop",
        ],
        overview: "Discover the rich world of Ghanaian cocoa in a hands-on chocolate-making workshop. Craft your own delicious treats with guidance from expert chocolatiers. Then, slip into serenity with a soothing massage at the luxurious Resense Spa. This experience blends indulgence and relaxation, perfect for food lovers and wellness seekers alike.",
        highlights: [
          "Guided chocolate-making using Ghana’s finest cocoa.",
          "Create and take home your own artisanal chocolates.",
          "Relaxing massage session at the Resense Spa.",
          "Ideal for couples or solo travelers seeking luxury and culture.",
        ],
        startingPrice: 255,
        minimumGuests: 1,
        included: [
          "Chocolate workshop materials",
          "Professional chocolatier",
          "Spa treatment",
          "Lunch and refreshments",
          "Luxury Bus",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    },
    {
      id: 6,
      slug: "trident-experience",
      defaultContent: {
        title: "The Trident Experience",
        shortDescription: "Dive into an unforgettable water-based adventure on the scenic Volta Lake.",
        image: "/images/experiences/trident.jpg?height=400&width=300&text=Akosombo+Lake+Adventure",
        location: "Volta Region, Ghana",
      },
      expandedContent: {
        title: "Water & Wind: The Trident Experience",
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
          "Abseiling from rocky cliffs or Adomi Bridge.",
          "Kayaking across the calm waters of Volta Lake.",
          "Sunset cruise under golden skies.",
          "Swimming and relaxing on a private lakeside beach.",
        ],
        startingPrice: 350,
        minimumGuests: 1,
        included: [
          "All adventure equipment",
          "Professional guides",
          "Luxury Bus",
          "Boat cruise",
          "Lunch and refreshments",
          "Beyond Experiences Essentials™ Bag",
        ]
      },
      tags: ["Travel Planner's Choice", "2 PAX"]
    }
  ]