import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailtrap';

// Mailtrap template UUIDs
const USER_CONFIRMATION_TEMPLATE_ID = "586ff26b-1d0c-436f-8a3e-e215af2c88a5"; // Reuse existing template
const INTERNAL_TEAM_TEMPLATE_ID = "1b35b7c1-3fdf-4eae-b2f0-ef0514fe4aba"; // Reuse existing template

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // Extract first name from full name
  const firstName = data.fullName?.split(" ")[0] || "";

  // Email to internal team using dynamic template
  const sendInternalEmail = sendEmail({
    to: "concierge@experiencesbybeyond.com",
    templateUuid: INTERNAL_TEAM_TEMPLATE_ID,
    templateVariables: {
      experienceName: data.experienceName,
      fullName: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      preferredContactMethod: "email", // Default to email
      preferredDate: data.preferredDate,
      guests: "Availability enquiry", // Indicate this is an availability enquiry
      message: data.message || "Availability enquiry for " + data.experienceName,
      enquiryType: "availability",
    },
  });

  // Confirmation email to client using dynamic template
  const sendClientEmail = sendEmail({
    to: data.email,
    templateUuid: USER_CONFIRMATION_TEMPLATE_ID,
    templateVariables: {
      ...data,
      firstName,
      enquiryType: "availability",
      message: "Thank you for your availability enquiry. We'll check our calendar and get back to you within 24 hours with available dates and pricing details.",
    },
  });

  try {
    await Promise.all([sendInternalEmail, sendClientEmail]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending availability enquiry emails:', error);
    return NextResponse.json({ success: false, error: "Failed to send enquiry" }, { status: 500 });
  }
}
