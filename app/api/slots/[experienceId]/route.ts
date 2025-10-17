import { NextRequest, NextResponse } from "next/server"
import { getSlotData } from "@/lib/slot-manager"

export async function GET(
  req: NextRequest,
  { params }: { params: { experienceId: string } }
) {
  try {
    const { experienceId } = params
    
    if (!experienceId) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      )
    }

    const slotData = getSlotData(experienceId)
    
    if (!slotData) {
      return NextResponse.json(
        { error: "Experience not found or not a group experience" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      experienceId: slotData.experienceId,
      totalSlots: slotData.totalSlots,
      availableSlots: slotData.availableSlots,
      lastUpdated: slotData.lastUpdated
    })
  } catch (error) {
    console.error("Error fetching slot data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
