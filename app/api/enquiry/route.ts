import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();
    const fullName = `${firstName} ${lastName}`;

    // Email to internal team
    const internalMsg = {
      to: "concierge@experiencesbybeyond.com", // change to your team email
      from: "concierge@experiencesbybeyond.com", // must be a verified sender in SendGrid
      templateId: "d-81252be20f1d4916a28e595c0df9a32f",
      dynamicTemplateData: {
        fullName,
        email,
        phone,
        message,
      },
    };

    // Confirmation email to user
    const userMsg = {
      to: email,
      from: "concierge@experiencesbybeyond.com", // must be a verified sender in SendGrid
      templateId: "d-512264a7453742259196cb8b625458df",
      dynamicTemplateData: {
        firstName,
        message,
      },
    };

    await Promise.all([sgMail.send(internalMsg), sgMail.send(userMsg)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}