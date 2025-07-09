import { NextRequest, NextResponse } from "next/server"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  }

  // Add contact to SendGrid Marketing List
  const res = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      list_ids: [SENDGRID_LIST_ID],
      contacts: [{ email }],
    }),
  })

  if (res.ok) {
    return NextResponse.json({ success: true })
  } else {
    const data = await res.json()
    return NextResponse.json({ error: data.errors?.[0]?.message || "Subscription failed." }, { status: 500 })
  }
}
