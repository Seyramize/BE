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
  const [currentAvailable, setCurrentAvailable] = useState(availableSlots)
  const [isAnimating, setIsAnimating] = useState(false)

  // Simulate real-time updates (mock behavior)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate someone booking (5% chance every 10 seconds)
      if (Math.random() < 0.05 && currentAvailable > 0) {
        setIsAnimating(true)
        setCurrentAvailable(prev => Math.max(0, prev - 1))
        
        // Reset animation after 2 seconds
        setTimeout(() => setIsAnimating(false), 2000)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [currentAvailable])

  const spotsOpen = currentAvailable
  const spotsTaken = totalSlots - currentAvailable

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
