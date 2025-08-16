import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"
import MastercardGate from "@/components/mastercard-gate"

// Argent font for headings
const argent = localFont({
  src: '../public/fonts/argent-cf/Argent-CF-.otf',
  variable: '--font-argent',
})

// Helvetica font for body text
const helvetica = localFont({
  src: '../public/fonts/helvetica-now-display/HelveticaNowDisplay-Regular.ttf',
  variable: '--font-helvetica',
})

export const metadata: Metadata = {
  title: "Beyond Experiences - Extraordinary Travel Adventures",
  description:
    "Discover bespoke experiences that redefine the way you travel. Whether you seek serenity, thrill, or unforgettable encounters, your next journey begins here.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${argent.variable} ${helvetica.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Show Mastercard welcome on initial site load */}
          <MastercardGate />
          {children}
          <Toaster />
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