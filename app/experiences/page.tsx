import type { Metadata } from "next"
import ExperiencesClientPage from "./experiences-client"

export const metadata: Metadata = {
  title: "Experiences",
  description: "Browse curated travel experiences across Ghana and beyond.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    type: "website",
    title: "Experiences | Beyond Experiences",
    description: "Browse curated travel experiences across Ghana and beyond.",
    url: "/experiences",
    images: [{ url: "/images/expihome.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiences | Beyond Experiences",
    description: "Browse curated travel experiences across Ghana and beyond.",
    images: ["/images/expihome.jpg"],
  },
}

export default function ExperiencesPage() {
  return <ExperiencesClientPage />
}
