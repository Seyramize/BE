import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Add this type definition if not already present
type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  date: string;
  isFlexible: boolean;
  helpMessage: string;
};

// Place this function at the top or above your POST handler
function validateForm(data: FormData) {
  if (!data.fullName.trim()) return "Full name is required.";
  if (!data.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Invalid email address.";
  if (!data.phoneNumber.trim()) return "Phone number is required.";
  if (!data.date.trim() && !data.isFlexible) return "Please select a date or mark as flexible.";
  return null;
}

function getFirstName(fullName: string) {
  return fullName.trim().split(" ")[0];
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const data = await req.json();

  // Validate before sending emails
  const errorMsg = validateForm(data);
  if (errorMsg) {
    return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
  }

  // Format date for better readability
  const formattedDate = data.isFlexible ? "Flexible" : new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const firstName = getFirstName(data.fullName);

  // Email to internal team using template
  const internalMsg = {
    to: "concierge@experiencesbybeyond.com",
    from: "concierge@experiencesbybeyond.com",
    templateId: "d-6939718cc86c4dd481d6e7db57416ef5",
    dynamicTemplateData: {
      fullName: data.fullName,
      email: data.email,
      phone: `${data.countryCode} ${data.phoneNumber}`,
      date: formattedDate,
      flexible: data.isFlexible ? "Yes" : "No", // <-- Add this line
      message: data.helpMessage
    }
  };

  // Email to client using template
  const clientMsg = {
    to: data.email,
    from: "concierge@experiencesbybeyond.com",
    templateId: "d-8f55f56a6e6343a0bf6e58947f964170",
    dynamicTemplateData: {
      fullName: data.fullName,
      firstName,
      date: formattedDate,
      flexible: data.isFlexible ? "Yes" : "No" // <-- Add if needed
    }
  };

  try {
    await sgMail.send(internalMsg);
    await sgMail.send(clientMsg);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('SendGrid error:', error);
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