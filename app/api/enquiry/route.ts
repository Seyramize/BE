import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailtrap";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();
    const fullName = `${firstName} ${lastName}`;

    // Email to internal team
    const sendInternalEmail = sendEmail({
      to: "concierge@experiencesbybeyond.com",
      templateUuid: "fd85b484-1f44-42d5-bbef-f980ea42188f", // TODO: Replace with Mailtrap template UUID
      templateVariables: {
        fullName,
        email,
        phone,
        message,
      },
    });

    // Confirmation email to user
    const sendUserEmail = sendEmail({
      to: email,
      templateUuid: "667eb95f-34d1-47bd-879f-79183de68d72", // TODO: Replace with Mailtrap template UUID
      templateVariables: {
        firstName,
        message,
      },
    });

    await sendInternalEmail;
    await sendUserEmail;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}