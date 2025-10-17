"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"
import { useSlotData } from "@/hooks/use-slot-data"

interface ActiveCounterProps {
  experienceId: string
  totalSlots: number
  availableSlots: number
  className?: string
  textSize?: string
}

export function ActiveCounter({ experienceId, totalSlots, availableSlots, className = "", textSize = "text-sm" }: ActiveCounterProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const { slotData, loading } = useSlotData(experienceId)
  
  // Use real-time slot data if available, otherwise fall back to props
  const currentTotalSlots = slotData?.totalSlots || totalSlots
  const currentAvailableSlots = slotData?.availableSlots || availableSlots

  // Update local state when availableSlots prop changes (from real bookings)
  useEffect(() => {
    if (currentAvailableSlots < currentTotalSlots) {
      setIsAnimating(true)
      // Reset animation after 2 seconds
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }, [currentAvailableSlots, currentTotalSlots])

  const spotsOpen = currentAvailableSlots
  const spotsTaken = currentTotalSlots - currentAvailableSlots

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Users className="w-4 h-4" />
      <span className={`${textSize} font-sans`}>
        {currentTotalSlots} GUESTS ({spotsOpen} SPOTS OPEN)
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
export function useActiveCounter(experienceId: string, initialTotal: number, initialAvailable: number) {
  const { slotData, loading } = useSlotData(experienceId)
  
  // Use real-time slot data if available, otherwise fall back to initial values
  const totalSlots = slotData?.totalSlots || initialTotal
  const availableSlots = slotData?.availableSlots || initialAvailable

  const bookSpots = (spots: number) => {
    // This is now handled by the webhook - slots are updated when payments are processed
    console.log(`Booking ${spots} spots for experience ${experienceId} - handled by webhook`)
  }

  const releaseSpots = (spots: number) => {
    // This would be used for cancellations - not implemented yet
    console.log(`Releasing ${spots} spots for experience ${experienceId} - not implemented`)
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
