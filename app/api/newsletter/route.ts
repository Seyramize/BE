import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/mailtrap"
import { guardFormSubmission, isValidSubmissionEmail } from "@/lib/form-guard"

export async function POST(req: NextRequest) {
	const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
	const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID
	const body = await req.json()

	const guard = await guardFormSubmission(body)
	if (!guard.ok) {
		return NextResponse.json({ error: guard.error }, { status: guard.status })
	}

	const { email } = body

	if (!isValidSubmissionEmail(email)) {
		return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
	}

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
    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
            dynamic_template_data: {},
          },
        ],
        from: { email: "concierge@experiencesbybeyond.com", name: "Experiences by Beyond" },
        template_id: "d-6dcfd45d1bf04186a5e16756547c8c96",
      }),
    });

    try {
      const teamEmails = [
        'ronnie@beyondaccra.com',
				'priscilla@beyondaccra.com',
        'concierge@experiencesbybeyond.com'
      ];

      for (const teamEmail of teamEmails) {
        await sendEmail({
          to: teamEmail,
          templateUuid: "YOUR_NEWSLETTER_SUBSCRIPTION_TEAM_TEMPLATE_UUID",
          templateVariables: {
            email: email,
            subscriptionDate: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            subscriptionTime: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          },
        });
      }
    } catch (emailError) {
      console.error('Error sending team notification for newsletter subscription:', emailError);
    }

    return NextResponse.json({ success: true });
  } else {
    const data = await res.json()
    return NextResponse.json({ error: data.errors?.[0]?.message || "Subscription failed." }, { status: 500 })
  }
}
