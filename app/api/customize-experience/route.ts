import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

function formatFormData(data: any) {
  return `
Full Name: ${data.fullName}
Email: ${data.email}
Phone Number: ${data.phoneNumber}
Country Code: ${data.countryCode}
Preferred Contact: ${data.preferredContact}
Experience Vision: ${data.experienceVision}
Preferred Destination: ${data.preferredDestination}
Group Size: ${data.groupSize}
Travel Dates: ${data.travelDates}
Is Flexible: ${data.isFlexible ? "Yes" : "No"}
Group Size Details: ${data.groupSizeDetails}
Additional Notes: ${data.additionalNotes}
  `;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Email to internal team
  const internalMsg = {
    to: "seyramalifo@gmail.com", // TODO: Replace with your team's email
    from: "concierge@experiencesbybeyond.com", // Use a verified sender
    subject: "New Custom Experience Request",
    text: `A new custom experience request was submitted:\n\n${formatFormData(data)}`,
  };

  // Confirmation email to client
  const clientMsg = {
    to: data.email,
    from: "concierge@experiencesbybeyond.com",
    subject: "We've received your custom experience request!",
    text: `Thank you, ${data.fullName}, for your request. Here’s what you submitted:\n\n${formatFormData(data)}\n\nOur travel planners will contact you within 24 hours.`,
  };

  try {
    await sgMail.send(internalMsg);
    await sgMail.send(clientMsg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
} 