"use client"

import { useState, useEffect } from "react"

interface SlotData {
  experienceId: string
  totalSlots: number
  availableSlots: number
  lastUpdated: string
}

export function useSlotData(experienceId: string) {
  const [slotData, setSlotData] = useState<SlotData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSlotData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/slots/${experienceId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Experience not found or not a group experience")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setSlotData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch slot data")
      console.error("Error fetching slot data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (experienceId) {
      fetchSlotData()
      
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchSlotData, 30000)
      
      return () => clearInterval(interval)
    }
  }, [experienceId])

  return {
    slotData,
    loading,
    error,
    refetch: fetchSlotData
  }
}
