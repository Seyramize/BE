import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { experiences } from '@/lib/experiences-data';
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// In-memory set to track which session IDs have had emails sent (demo only)
const sentEmailSessions = new Set<string>();

// SendGrid template IDs
const USER_CONFIRMATION_TEMPLATE_ID = "d-830cac9ed61344ac90a5390c896d6400";
const INTERNAL_TEAM_TEMPLATE_ID = "d-3a09c71153994bc7b5217425747763be";

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
    // Extract first name from full name
    const fullName = meta.fullName || '';
    const firstName = fullName.split(' ')[0] || fullName;
    
    const bookingDetails = {
      experienceName: experience?.bookingContent.title || productNameStr || meta.experienceName || '',
      preferredDate: meta.preferredDate || '',
      alternateDate: meta.alternateDate || '',
      guests,
      email: session.customer_email || meta.email || '',
      fullName,
      firstName,
      phone: meta.phone || '',
      amount: (() => {
        // Try to get amount from Stripe session
        if (session.amount_total) {
          // Convert from cents to dollars and format
          const amountInDollars = session.amount_total / 100;
          return `$${amountInDollars.toFixed(2)}`;
        }
        // Fallback to metadata amount
        if (meta.amount) {
          return meta.amount;
        }
        // Fallback to line item amount
        if (lineItem?.amount_total) {
          const amountInDollars = lineItem.amount_total / 100;
          return `$${amountInDollars.toFixed(2)}`;
        }
        return '';
      })(),
      bookingId: session.id,
      transactionId: (typeof session.payment_intent === 'object' && session.payment_intent?.id)
        ? session.payment_intent.id
        : (typeof session.payment_intent === 'string' ? session.payment_intent : ''),
      includedItems: experience?.bookingContent.included || [],
      supportEmail: "concierge@experiencesbybeyond.com",
      supportPhone: "+233546506220",
      paymentMethod: (() => {
        // Try to get payment method details from the session
        if (session.payment_intent && typeof session.payment_intent === 'object') {
          const paymentIntent = session.payment_intent as any;
          // For card payments, we can get the card details
          if (paymentIntent?.payment_method_details?.type === 'card') {
            const card = paymentIntent.payment_method_details.card;
            if (card?.brand && card?.last4) {
              return `${card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} card ending ****${card.last4}`;
            }
          }
        }
        // Fallback to payment method type
        return session.payment_method_types?.[0] || 'card';
      })(),
    };

    // Idempotency: Only send emails if not already sent for this session
    if (bookingDetails.email && !sentEmailSessions.has(sessionId)) {
      // Email to internal team using SendGrid template
      const internalMsg = {
        to: "concierge@experiencesbybeyond.com", // TODO: Replace with your team's email
        from: "concierge@experiencesbybeyond.com",    // must be a verified sender in SendGrid
        templateId: INTERNAL_TEAM_TEMPLATE_ID,
        dynamic_template_data: {
          ...bookingDetails,
        },
      };
      // Confirmation email to client using SendGrid template
      const userMsg = {
        to: bookingDetails.email,
        from: "concierge@experiencesbybeyond.com", // must be a verified sender in SendGrid
        templateId: USER_CONFIRMATION_TEMPLATE_ID,
        dynamic_template_data: {
          ...bookingDetails,
        },
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