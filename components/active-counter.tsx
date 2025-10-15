"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"

interface ActiveCounterProps {
  totalSlots: number
  availableSlots: number
  className?: string
  textSize?: string
}

export function ActiveCounter({ totalSlots, availableSlots, className = "", textSize = "text-sm" }: ActiveCounterProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Update local state when availableSlots prop changes (from real bookings)
  useEffect(() => {
    if (availableSlots < totalSlots) {
      setIsAnimating(true)
      // Reset animation after 2 seconds
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }, [availableSlots, totalSlots])

  const spotsOpen = availableSlots
  const spotsTaken = totalSlots - availableSlots

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Users className="w-4 h-4" />
      <span className={`${textSize} font-sans`}>
        {totalSlots} GUESTS ({spotsOpen} SPOTS OPEN)
      </span>
      {isAnimating && (
        <div className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-sans rounded-full animate-pulse">
          Just booked!
        </div>
      )}
    </div>
  )
}

// Hook for managing counter state across components
export function useActiveCounter(initialTotal: number, initialAvailable: number) {
  const [totalSlots, setTotalSlots] = useState(initialTotal)
  const [availableSlots, setAvailableSlots] = useState(initialAvailable)

  const bookSpots = (spots: number) => {
    setAvailableSlots(prev => Math.max(0, prev - spots))
  }

  const releaseSpots = (spots: number) => {
    setAvailableSlots(prev => Math.min(totalSlots, prev + spots))
  }

  return {
    totalSlots,
    availableSlots,
    spotsOpen: availableSlots,
    spotsTaken: totalSlots - availableSlots,
    bookSpots,
    releaseSpots,
    isFullyBooked: availableSlots === 0,
    isLowAvailability: availableSlots <= 3
  }
}
