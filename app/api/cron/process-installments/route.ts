import { NextRequest, NextResponse } from "next/server"
import { processAllPendingInstallments } from "../../../../lib/payment-scheduler"

export async function GET(req: NextRequest) {
  // Verify this is a legitimate cron request (you should add proper authentication)
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("Processing pending installments...")
    const results = await processAllPendingInstallments()
    
    return NextResponse.json({
      success: true,
      processed: results.length,
      results: results,
    })
  } catch (error) {
    console.error("Error processing installments:", error)
    return NextResponse.json(
      { error: "Failed to process installments", details: error instanceof Error ? error.message : error },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggering
export async function POST(req: NextRequest) {
  return GET(req)
}