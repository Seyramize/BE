import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailtrap';
import { experiences } from '@/lib/experiences-data';
import { guardFormSubmission, isValidSubmissionEmail } from '@/lib/form-guard';

const USER_CONFIRMATION_TEMPLATE_ID = "586ff26b-1d0c-436f-8a3e-e215af2c88a5";
const INTERNAL_TEAM_TEMPLATE_ID = "1b35b7c1-3fdf-4eae-b2f0-ef0514fe4aba";

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

  let preferredDate = data.preferredDate;
  if (data.experienceName === 'December in Accra') {
    const experience = experiences.find(
      (exp) => exp.defaultContent.title === data.experienceName
    );
    if (experience && experience.bookingContent.subtitle) {
      preferredDate = experience.bookingContent.subtitle;
    }
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
      templateUuid: INTERNAL_TEAM_TEMPLATE_ID,
      templateVariables: {
        experienceName: data.experienceName,
        fullName: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
        preferredContactMethod: data.preferredContactMethod,
        preferredDate: preferredDate,
        guests: data.numberOfGuests,
        message: data.message,
      },
    })
  );

  const sendClientEmail = sendEmail({
    to: data.email,
    templateUuid: USER_CONFIRMATION_TEMPLATE_ID,
    templateVariables: {
      ...data,
      firstName,
      message: "Thank you for your availability enquiry. We'll check our calendar and get back to you within 24 hours with available dates and pricing details.",
    },
  });

  try {
    await Promise.all([...sendInternalEmails, sendClientEmail]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending availability enquiry emails:', error);
    return NextResponse.json({ success: false, error: "Failed to send enquiry" }, { status: 500 });
  }
}
