import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailtrap";
import { guardFormSubmission, isValidSubmissionEmail } from "@/lib/form-guard";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  date: string;
  isFlexible: boolean;
  helpMessage: string;
};

function validateForm(data: FormData) {
  if (!data.fullName.trim()) return "Full name is required.";
  if (!data.email.trim()) return "Email is required.";
  if (!isValidSubmissionEmail(data.email)) return "Invalid email address.";
  if (!data.phoneNumber.trim()) return "Phone number is required.";
  if (!data.date.trim() && !data.isFlexible) return "Please select a date or mark as flexible.";
  return null;
}

function getFirstName(fullName: string) {
  return fullName.trim().split(" ")[0];
}

export async function POST(req: Request) {
  const body = await req.json();

  const guard = await guardFormSubmission(body);
  if (!guard.ok) {
    return NextResponse.json({ success: false, error: guard.error }, { status: guard.status });
  }

  const data = body as FormData;

  const errorMsg = validateForm(data);
  if (errorMsg) {
    return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
  }

  const formattedDate = data.isFlexible ? "Flexible" : new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const firstName = getFirstName(data.fullName);

  const teamEmails = [
    'ronnie@beyondaccra.com',
    'priscilla@beyondaccra.com',
    'concierge@experiencesbybeyond.com'
  ];

  const sendInternalEmails = teamEmails.map(teamEmail =>
    sendEmail({
      to: teamEmail,
      templateUuid: "a5f33c2e-fbb0-4617-9c1a-a053fff15c4e",
      templateVariables: {
        fullName: data.fullName,
        email: data.email,
        phone: `${data.countryCode} ${data.phoneNumber}`,
        date: formattedDate,
        flexible: data.isFlexible ? "Yes" : "No",
        message: data.helpMessage
      }
    })
  );

  const sendClientEmail = sendEmail({
    to: data.email,
    templateUuid: "6b3626ee-91a7-432b-8f64-362d71053dff",
    templateVariables: {
      fullName: data.fullName,
      firstName,
      date: formattedDate,
      flexible: data.isFlexible ? "Yes" : "No"
    }
  });

  try {
    await Promise.all([...sendInternalEmails, sendClientEmail]);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('MailerSend error:', error);
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      // @ts-ignore
      message = JSON.stringify(error.response?.body || error);
    }
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
