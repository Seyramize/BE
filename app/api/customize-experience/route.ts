import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailtrap";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Extract first name from full name
  const firstName = data.fullName?.split(" ")[0] || "";

  // Email to internal team using dynamic template
  const sendInternalEmail = sendEmail({
    to: "concierge@experiencesbybeyond.com",
    templateUuid: "7af31867-7a0d-4fce-81f1-c8dfae80fb00",
    templateVariables: {
      experienceName: data.experienceName,
      fullName: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      preferredContactMethod: data.preferredContact,
      preferredDate: data.travelDates,
      guests: data.groupSize,
      message: data.experienceVision,
    },
  });

  // Confirmation email to client using dynamic template
  const sendClientEmail = sendEmail({
    to: data.email,
    templateUuid: "915d7c4d-3220-4507-a8c4-c422f2ea287d",
    templateVariables: {
      ...data,
      firstName,
    },
  });

  try {
    await Promise.all([sendInternalEmail, sendClientEmail]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
} 