import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

function formatFormData(data: any) {
  return `
Experience Name: ${data.experienceName || "N/A"}
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

  // Extract first name from full name
  const firstName = data.fullName?.split(" ")[0] || "";

  // Email to internal team using dynamic template
  const internalMsg = {
    to: "concierge@experiencesbybeyond.com", // TODO: Replace with your team's email if needed
    from: "concierge@experiencesbybeyond.com", // Use a verified sender
    templateId: "d-6042d804b96a42c99eee2b9f32c5a8eb", // Set this in your .env
    dynamic_template_data: {
      experienceName: data.experienceName, // or whatever field you use
      fullName: data.fullName,
      email: data.email,
      phone: data.phoneNumber, // map to 'phone'
      preferredContactMethod: data.preferredContact, // map to 'preferredContactMethod'
      preferredDate: data.travelDates, // map to 'preferredDate'
      guests: data.groupSize, // map to 'guests'
      message: data.experienceVision, // map to 'message'
      // add any other mappings as needed
    },
  };

  // Confirmation email to client using dynamic template
  const clientMsg = {
    to: data.email,
    from: "concierge@experiencesbybeyond.com",
    templateId: "d-a7094e3c9fb84d99b739f885bcf4c3ae", // Set this in your .env
    dynamic_template_data: {
      ...data,
      firstName, // add firstName for SendGrid template
    },
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