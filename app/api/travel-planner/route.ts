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

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const data = await req.json();

  // Validate before sending emails
  const errorMsg = validateForm(data);
  if (errorMsg) {
    return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
  }

  // Email to internal team
  const internalMsg = {
    to: "internal-team@example.com", // replace with your internal team email
    from: "no-reply@beyondexperiences.com", // your verified sender
    subject: "New Travel Planner Call Scheduled",
    text: `
      Name: ${data.fullName}
      Email: ${data.email}
      Phone: ${data.countryCode} ${data.phoneNumber}
      Date: ${data.date} ${data.isFlexible ? "(Flexible)" : ""}
      Message: ${data.helpMessage}
    `,
  };

  // Email to client
  const clientMsg = {
    to: data.email,
    from: "no-reply@beyondexperiences.com", // your verified sender
    subject: "Your Travel Planner Call is Scheduled",
    text: `
      Hi ${data.fullName},

      Thank you for scheduling a call with us! We'll be in touch within 24 hours to confirm your appointment.

      Best,
      The Beyond Experiences Team
    `,
  };

  try {
    await sgMail.send(internalMsg);
    await sgMail.send(clientMsg);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}