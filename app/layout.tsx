import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

// Serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

// Sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Beyond Experiences - Extraordinary Travel Adventures",
  description:
    "Discover bespoke experiences that redefine the way you travel. Whether you seek serenity, thrill, or unforgettable encounters, your next journey begins here.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
      {/* Script to clean up any unwanted attributes that might cause hydration issues */}
      <Script id="clean-html-attrs" strategy="afterInteractive">
        {`
          // Clean up any unwanted data attributes that might be added by extensions
          document.addEventListener('DOMContentLoaded', () => {
            const htmlElement = document.documentElement;
            const attributesToRemove = [];
            
            // Identify attributes to remove (those starting with 'data-bybit')
            for (let i = 0; i < htmlElement.attributes.length; i++) {
              const attr = htmlElement.attributes[i];
              if (attr.name.startsWith('data-bybit')) {
                attributesToRemove.push(attr.name);
              }
            }
            
            // Remove identified attributes
            attributesToRemove.forEach(attr => {
              htmlElement.removeAttribute(attr);
            });
          });
        `}
      </Script>
    </html>
  )
}
