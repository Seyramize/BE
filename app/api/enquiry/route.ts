import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    // Email to internal team
    const internalMsg = {
      to: ["seyramalifo@gmail.com", "s.noahlarsey@gmail.com"], // change to your team email
      from: "concierge@experiencesbybeyond.com",    // must be a verified sender in SendGrid
      subject: "New Enquiry Form Submission",
      html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // Confirmation email to user
    const userMsg = {
      to: email,
      from: "concierge@experiencesbybeyond.com", // must be a verified sender in SendGrid
      subject: "Thank you for your enquiry",
      html: `
        <h2>Thank you, ${firstName}!</h2>
        <p>We have received your enquiry and will get back to you soon.</p>
        <p><b>Your message:</b> ${message}</p>
      `,
    };

    await Promise.all([sgMail.send(internalMsg), sgMail.send(userMsg)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}