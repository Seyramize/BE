"use client"

import { useEffect, useState } from "react"
import MastercardWelcomeModal from "@/components/mastercard-welcome-modal"

export default function MastercardGate() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("__mc_welcome_seen__")
    if (!hasSeen) {
      setOpen(true)
      sessionStorage.setItem("__mc_welcome_seen__", "1")
    }
  }, [])

  return (
    <MastercardWelcomeModal
      isOpen={open}
      onClose={() => setOpen(false)}
      ctaHref="/priceless"
    />
  )
}


