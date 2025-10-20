/*
// Simple in-memory slot management for group experiences
// In production, this should be replaced with a database

interface SlotData {
  experienceId: string
  totalSlots: number
  availableSlots: number
  lastUpdated: string
}

// In-memory storage for slot data
const slotStorage = new Map<string, SlotData>()

// Initialize slots for group experiences
export function initializeSlots(experienceId: string, totalSlots: number) {
  const existingData = slotStorage.get(experienceId)
  
  if (!existingData) {
    slotStorage.set(experienceId, {
      experienceId,
      totalSlots,
      availableSlots: totalSlots,
      lastUpdated: new Date().toISOString()
    })
    console.log(`Initialized ${totalSlots} slots for experience ${experienceId}`)
  }
  
  return slotStorage.get(experienceId)!
}

// Get current slot data
export function getSlotData(experienceId: string): SlotData | null {
  return slotStorage.get(experienceId) || null
}

// Book slots (reduce available slots)
export function bookSlots(experienceId: string, numberOfGuests: number): boolean {
  const slotData = slotStorage.get(experienceId)
  
  if (!slotData) {
    console.error(`No slot data found for experience ${experienceId}`)
    return false
  }
  
  if (slotData.availableSlots < numberOfGuests) {
    console.error(`Not enough slots available for experience ${experienceId}. Requested: ${numberOfGuests}, Available: ${slotData.availableSlots}`)
    return false
  }
  
  slotData.availableSlots = Math.max(0, slotData.availableSlots - numberOfGuests)
  slotData.lastUpdated = new Date().toISOString()
  
  console.log(`Booked ${numberOfGuests} slots for experience ${experienceId}. Remaining: ${slotData.availableSlots}`)
  return true
}

// Release slots (increase available slots) - for cancellations
export function releaseSlots(experienceId: string, numberOfGuests: number): boolean {
  const slotData = slotStorage.get(experienceId)
  
  if (!slotData) {
    console.error(`No slot data found for experience ${experienceId}`)
    return false
  }
  
  slotData.availableSlots = Math.min(slotData.totalSlots, slotData.availableSlots + numberOfGuests)
  slotData.lastUpdated = new Date().toISOString()
  
  console.log(`Released ${numberOfGuests} slots for experience ${experienceId}. Available: ${slotData.availableSlots}`)
  return true
}

// Get all slot data (for debugging/admin purposes)
export function getAllSlotData(): SlotData[] {
  return Array.from(slotStorage.values())
}

// Reset slots to initial state (for testing)
export function resetSlots(experienceId: string, totalSlots: number): void {
  slotStorage.set(experienceId, {
    experienceId,
    totalSlots,
    availableSlots: totalSlots,
    lastUpdated: new Date().toISOString()
  })
  console.log(`Reset slots for experience ${experienceId} to ${totalSlots}`)
}
*/
