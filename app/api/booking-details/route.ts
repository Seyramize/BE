export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { experiences } from '@/lib/experiences-data';
import { sendEmail } from '@/lib/mailtrap';
import { verifyPaystackTransaction } from '@/lib/paystack-server';

// In-memory set to track which session IDs have had emails sent (demo only)
const sentEmailSessions = new Set<string>();

// Mailtrap template UUIDs
const USER_CONFIRMATION_TEMPLATE_ID = "27ffbc93-4c12-4664-9ddc-494bbc77e155";
const INTERNAL_TEAM_TEMPLATE_ID = "40519514-3eb4-402f-acfa-a438de284abc";
// Guestlist (Vici Day Party) template UUIDs
const GUESTLIST_USER_CONFIRMATION_TEMPLATE_ID = "9eec04b7-7793-49f6-8e35-32ac2fd1e9cb";
const GUESTLIST_TEAM_NOTIFICATION_TEMPLATE_ID = "a780781f-f8ff-4400-9750-fa5a66e5489a";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    // Try Paystack first (reference is passed as session_id)
    if (sessionId && !sessionId.startsWith('cs_')) {
      try {
        const verification = await verifyPaystackTransaction(sessionId);
        
        if (verification.status && verification.data?.status === 'success') {
          const meta = verification.data?.metadata || {};
          const experienceId = meta.experienceId ? parseInt(meta.experienceId) : undefined;
          let experience = undefined;
          if (experienceId) {
            experience = experiences.find(exp => exp.id === experienceId);
          }
          const guests = meta.guests ? parseInt(meta.guests) : 1;
          const fullName = meta.fullName || '';
          const firstName = fullName.split(' ')[0] || fullName;
          // Amount from Paystack verification is in subunit (cents for USD, kobo for NGN)
          const paystackAmount = verification.data?.amount ? verification.data.amount / 100 : 0;
          const paymentChannel = verification.data?.authorization?.channel || 'card';
          const currency = 'GHS';
          const currencySymbol = '₵';
          
          const bookingDetails = {
            experienceName: experience?.bookingContent.title || meta.experienceName || '',
            preferredDate: meta.preferredDate || '',
            alternateDate: meta.alternateDate || '',
            guests,
            email: meta.email || '',
            fullName,
            firstName,
            phone: meta.phone || '',
            amount: `${currencySymbol}${paystackAmount.toFixed(2)}`,
            transactionId: verification.data?.reference || sessionId,
            bookingId: `BK${Date.now()}`,
            isPaid: true,
            includedItems: experience?.bookingContent.included || [],
            supportEmail: "concierge@experiencesbybeyond.com",
            supportPhone: "+233504513123",
            paymentMethod: paymentChannel,
            bookingType: meta.type || 'experience',
            selectedPackage: meta.selectedPackage || '',
            priceLabel: `${currencySymbol}${paystackAmount.toFixed(2)}`,
            packageIncludes: meta.packageIncludes ? JSON.parse(meta.packageIncludes) : [],
          };
          
          // Send confirmation emails
          if (bookingDetails.email && !sentEmailSessions.has(sessionId)) {
            // Determine which templates to use based on booking type
            const isGuestlistReservation = meta.type === 'vici_table';
            const userTemplateId = isGuestlistReservation ? GUESTLIST_USER_CONFIRMATION_TEMPLATE_ID : USER_CONFIRMATION_TEMPLATE_ID;
            const teamTemplateId = isGuestlistReservation ? GUESTLIST_TEAM_NOTIFICATION_TEMPLATE_ID : INTERNAL_TEAM_TEMPLATE_ID;
            
            // Email to internal team
            const sendInternalEmail = sendEmail({
              to: "concierge@experiencesbybeyond.com",
              templateUuid: teamTemplateId,
              templateVariables: {
                ...bookingDetails,
                name: fullName,
              },
            });

            // Confirmation email to client
            const sendUserEmail = sendEmail({
              to: bookingDetails.email,
              templateUuid: userTemplateId,
              templateVariables: {
                ...bookingDetails,
                name: fullName,
              },
            });

            try {
              await Promise.all([
                sendInternalEmail,
                sendUserEmail
              ]);
              sentEmailSessions.add(sessionId); // Mark as sent
            } catch (emailErr) {
              console.error('Error sending booking confirmation emails:', emailErr);
              // Don't fail the booking details fetch if email fails
            }
          }
          
          return NextResponse.json(bookingDetails);
        }
      } catch (error) {
        console.log('Paystack transaction verification failed:', error);
        return NextResponse.json({ error: 'Failed to verify payment' }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
  } catch (err) {
    console.error('Error fetching booking details:', err);
    return NextResponse.json({ error: 'Failed to fetch booking details' }, { status: 500 });
  }
} 