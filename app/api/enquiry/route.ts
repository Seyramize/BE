import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailtrap";
import { guardFormSubmission, isValidSubmissionEmail } from "@/lib/form-guard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guard = await guardFormSubmission(body);
    if (!guard.ok) {
      return NextResponse.json({ success: false, error: guard.error }, { status: guard.status });
    }

    const { firstName, lastName, email, phone, message } = body;
    if (!firstName?.trim() || !lastName?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }
    if (!isValidSubmissionEmail(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;

    const teamEmails = [
      "ronnie@beyondaccra.com",
      "priscilla@beyondaccra.com",
      "concierge@experiencesbybeyond.com",
    ];

    const sendInternalEmails = teamEmails.map((teamEmail) =>
      sendEmail({
        to: teamEmail,
        templateUuid: "fd85b484-1f44-42d5-bbef-f980ea42188f",
        templateVariables: { fullName, email, phone, message },
      })
    );

    const sendUserEmail = sendEmail({
      to: email,
      templateUuid: "667eb95f-34d1-47bd-879f-79183de68d72",
      templateVariables: { firstName, message },
    });

    await Promise.all([...sendInternalEmails, sendUserEmail]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}
