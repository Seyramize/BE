"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function DynamicFavicon() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme
    let faviconLink = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null

    if (!faviconLink) {
      faviconLink = document.createElement("link")
      faviconLink.rel = "icon"
      document.head.appendChild(faviconLink)
    }

    if (currentTheme === "dark") {
      faviconLink.href = "/favicons/favicon.ico"
      faviconLink.type = "image/x-icon"
    } else {
      faviconLink.href = "/favicons/icon1.png"
      faviconLink.type = "image/png"
    }
  }, [theme, systemTheme])

  return null
}
