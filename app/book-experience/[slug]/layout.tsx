import type { Metadata } from "next"
import { experiences } from "@/lib/experiences-data"

type LayoutProps = {
  children: React.ReactNode
  params: { slug: string }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = params
  const experience = experiences.find(
    (e) => e.slug === slug || e.id.toString() === slug
  )

  if (!experience) {
    return {
      title: "Experience not found",
      robots: { index: false, follow: false },
    }
  }

  const url = `/book-experience/${experience.slug}`
  const title = experience.bookingContent.title
  const description = experience.defaultContent.shortDescription
  const images = [
    experience.bookingContent.heroImage,
    ...experience.bookingContent.galleryImages,
  ]
    .filter(Boolean)
    .slice(0, 4)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} | Beyond Experiences`,
      description,
      images: images.map((src) => ({ url: src })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Beyond Experiences`,
      description,
      images,
    },
  }
}

export default function ExperienceLayout({ children, params }: LayoutProps) {
  const experience = experiences.find(
    (e) => e.slug === params.slug || e.id.toString() === params.slug
  )

  if (!experience) return children

  const pageUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://experiencesbybeyond.com") + `/book-experience/${experience.slug}`
  const images = [
    experience.bookingContent.heroImage,
    ...experience.bookingContent.galleryImages,
  ]
    .filter(Boolean)
    .slice(0, 6)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: experience.bookingContent.title,
    description: experience.defaultContent.shortDescription,
    image: images,
    brand: {
      "@type": "Brand",
      name: "Beyond Experiences",
    },
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: experience.bookingContent.startingPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}


