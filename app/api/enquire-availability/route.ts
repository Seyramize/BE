import { NextRequest, NextResponse } from 'next/server';
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// SendGrid template IDs
const USER_CONFIRMATION_TEMPLATE_ID = "d-830cac9ed61344ac90a5390c896d6400"; // Reuse existing template
const INTERNAL_TEAM_TEMPLATE_ID = "d-3a09c71153994bc7b5217425747763be"; // Reuse existing template

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // Extract first name from full name
  const firstName = data.fullName?.split(" ")[0] || "";

  // Email to internal team using dynamic template
  const internalMsg = {
    to: "concierge@experiencesbybeyond.com",
    from: "concierge@experiencesbybeyond.com",
    templateId: INTERNAL_TEAM_TEMPLATE_ID,
    dynamic_template_data: {
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
  };

  // Confirmation email to client using dynamic template
  const clientMsg = {
    to: data.email,
    from: "concierge@experiencesbybeyond.com",
    templateId: USER_CONFIRMATION_TEMPLATE_ID,
    dynamic_template_data: {
      ...data,
      firstName,
      enquiryType: "availability",
      message: "Thank you for your availability enquiry. We'll check our calendar and get back to you within 24 hours with available dates and pricing details.",
    },
  };

  try {
    await sgMail.send(internalMsg);
    await sgMail.send(clientMsg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending availability enquiry emails:', error);
    return NextResponse.json({ success: false, error: "Failed to send enquiry" }, { status: 500 });
  }
}
