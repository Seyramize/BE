import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { experiences } from '@/lib/experiences-data';
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// In-memory set to track which session IDs have had emails sent (demo only)
const sentEmailSessions = new Set<string>();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'payment_intent'] });
    const lineItem = session.line_items?.data[0];
    const productName = lineItem?.description || lineItem?.price?.product || 'Experience';
    const productNameStr = typeof productName === 'string' ? productName : '';
    // Try to find the experience by title (case-insensitive)
    const meta = session.metadata || {};
    const experienceId = meta.experienceId ? parseInt(meta.experienceId) : undefined;
    let experience = undefined;
    if (experienceId) {
      experience = experiences.find(exp => exp.id === experienceId);
    } else {
      experience = experiences.find(exp => exp.bookingContent.title.toLowerCase() === productNameStr.toLowerCase() || exp.defaultContent.title.toLowerCase() === productNameStr.toLowerCase());
    }
    const guests = meta.guests ? parseInt(meta.guests) : 1;
    const bookingDetails = {
      experienceName: experience?.bookingContent.title || productNameStr || meta.experienceName || '',
      preferredDate: meta.preferredDate || '',
      alternateDate: meta.alternateDate || '',
      guests,
      email: session.customer_email || meta.email || '',
      fullName: meta.fullName || '',
      phone: meta.phone || '',
      amount: meta.amount || '',
      bookingId: session.id,
      transactionId: session.payment_intent?.toString() || '',
      includedItems: experience?.bookingContent.included || [],
    };

    // Idempotency: Only send emails if not already sent for this session
    if (bookingDetails.email && !sentEmailSessions.has(sessionId)) {
      // Email to internal team
      const internalMsg = {
        to: "concierge@experiencesbybeyond.com", // TODO: Replace with your team's email
        from: "concierge@experiencesbybeyond.com",    // must be a verified sender in SendGrid
        subject: `New Booking: ${bookingDetails.experienceName}`,
        html: `
          <h2>New Booking Received</h2>
          <p><b>Name:</b> ${bookingDetails.fullName}</p>
          <p><b>Email:</b> ${bookingDetails.email}</p>
          <p><b>Phone:</b> ${bookingDetails.phone}</p>
          <p><b>Experience:</b> ${bookingDetails.experienceName}</p>
          <p><b>Preferred Date:</b> ${bookingDetails.preferredDate}</p>
          <p><b>Alternate Date:</b> ${bookingDetails.alternateDate}</p>
          <p><b>Guests:</b> ${bookingDetails.guests}</p>
          <p><b>Booking ID:</b> ${bookingDetails.bookingId}</p>
          <p><b>Transaction ID:</b> ${bookingDetails.transactionId}</p>
        `,
      };
      // Confirmation email to client
      const userMsg = {
        to: bookingDetails.email,
        from: "concierge@experiencesbybeyond.com", // must be a verified sender in SendGrid
        subject: `Your Booking is Confirmed: ${bookingDetails.experienceName}`,
        html: `
          <h2>Thank you for your booking!</h2>
          <p>Your booking for <b>${bookingDetails.experienceName}</b> is confirmed.</p>
          <p><b>Date:</b> ${bookingDetails.preferredDate}</p>
          <p><b>Guests:</b> ${bookingDetails.guests}</p>
          <p><b>Booking ID:</b> ${bookingDetails.bookingId}</p>
          <p>We look forward to welcoming you!</p>
        `,
      };
      try {
        await Promise.all([
          sgMail.send(internalMsg),
          sgMail.send(userMsg)
        ]);
        sentEmailSessions.add(sessionId); // Mark as sent
      } catch (emailErr) {
        console.error('Error sending booking emails:', emailErr);
        // Don't fail the booking details fetch if email fails
      }
    }

    return NextResponse.json(bookingDetails);
  } catch (err) {
    console.error('Error fetching Stripe session:', err);
    return NextResponse.json({ error: 'Failed to fetch booking details' }, { status: 500 });
  }
} 