import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailtrap";
import { guardFormSubmission, isValidSubmissionEmail } from "@/lib/form-guard";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const guard = await guardFormSubmission(body);
  if (!guard.ok) {
    return NextResponse.json({ success: false, error: guard.error }, { status: guard.status });
  }

  const data = body;
  if (!isValidSubmissionEmail(data.email)) {
    return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }

  const firstName = data.fullName?.split(" ")[0] || "";

  const teamEmails = [
    'ronnie@beyondaccra.com',
    'priscilla@beyondaccra.com',
    'concierge@experiencesbybeyond.com'
  ];

  const sendInternalEmails = teamEmails.map(teamEmail =>
    sendEmail({
      to: teamEmail,
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
    })
  );

  const sendClientEmail = sendEmail({
    to: data.email,
    templateUuid: "915d7c4d-3220-4507-a8c4-c422f2ea287d",
    templateVariables: {
      ...data,
      firstName,
    },
  });

  try {
    await Promise.all([...sendInternalEmails, sendClientEmail]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
