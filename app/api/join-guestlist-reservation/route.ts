import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendEmail } from '@/lib/mailtrap';
import {
  getViciPackageById,
  getViciPackageIncludesRecord,
  VICI_EXPERIENCE_SLUG,
} from '@/lib/vici-reservation-pricing';
import { buildSheetAppendRange } from '@/lib/google-sheet-range';


export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      email,
      phone,
      guests,
      instagramHandle,
      selectedPackage,
      specialRequests,
    } = await req.json();

    if (!fullName || !email || !phone || !guests || !selectedPackage) {
      return NextResponse.json({ error: 'Missing required fields: fullName, email, phone, guests and selectedPackage are required' }, { status: 400 });
    }

    if (!getViciPackageById(selectedPackage)) {
      return NextResponse.json({ error: 'Invalid table package selected.' }, { status: 400 });
    }

    // Google Sheets integration temporarily disabled as per request
    // const auth = new google.auth.GoogleAuth({
    //   credentials: {
    //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    //   },
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // });
    //
    // const sheets = google.sheets({ version: 'v4', auth });
    //
    // const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    // if (!spreadsheetId) {
    //   console.error('join-guestlist-reservation: GOOGLE_SHEET_ID is not set');
    //   return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    // }
    //
    // const range = buildSheetAppendRange('A:H');
    //
    // const newRow = [
    //   new Date().toISOString(),
    //   fullName,
    //   email,
    //   phone,
    //   guests,
    //   instagramHandle || '',
    //   selectedPackage,
    //   specialRequests || '',
    // ];
    //
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId,
    //   range,
    //   valueInputOption: 'USER_ENTERED',
    //   insertDataOption: 'INSERT_ROWS',
    //   requestBody: {
    //     values: [newRow],
    //   },
    // });

    try {
      const packageMap = getViciPackageIncludesRecord();
      const packageItems = (packageMap[selectedPackage] || []);
      let packageIncludesHtml = '';
      if (packageItems.length > 0) {
        packageIncludesHtml = packageItems
          .map(i => `<div style="text-align:right;margin:6px 0;">${i}</div>`) 
          .join('');
        packageIncludesHtml = `<div style="margin-top:8px;">${packageIncludesHtml}</div>`;
      } else {
        packageIncludesHtml = '<div style="color:#666;">Not specified</div>';
      }

      const bookPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/book-experience/${VICI_EXPERIENCE_SLUG}`;
      const paymentUrl = process.env.PAYMENT_URL || bookPageUrl;

      // Send confirmation email to the client
      await sendEmail({
        to: email,
        templateUuid: '9eec04b7-7793-49f6-8e35-32ac2fd1e9cb',
        templateVariables: {
          name: fullName || '(No name)',
          guests: guests || '(0)',
          date: 'Saturday, 18th April',
          venue: 'Vine Accra',
          selectedPackage: selectedPackage || '(None)',
          // Provide a pre-encoded version of the package for use in URLs
          selectedPackageEncoded: encodeURIComponent(selectedPackage || '(None)'),
          packageIncludes: packageIncludesHtml,
          brandName: 'Vici Day Party',
          paymentUrl,
        },
      });

      // Send notification email to the team
      const teamEmails = [
        'noah@beyondaccra.com',
        'carl@beyondaccra.com',
        'rebecca@lifestyleexp.com',
        'ashish@lifestyleexp.com',
        'concierge@experiencesbybeyond.com'
      ];

      for (const teamEmail of teamEmails) {
        await sendEmail({
          to: teamEmail,
          templateUuid: 'a780781f-f8ff-4400-9750-fa5a66e5489a',
          templateVariables: {
            name: fullName || '(No name)',
            email: email || '(No email)',
            phone: phone || '(No phone)',
            guests: guests || '(0)',
            selectedPackage: selectedPackage || '(None)',
            selectedPackageEncoded: encodeURIComponent(selectedPackage || '(None)'),
            packageIncludes: packageIncludesHtml,
            igHandle: instagramHandle || 'N/A',
            notes: specialRequests || '(Empty)',
            brandName: 'Vici Day Party',
            paymentUrl,
          },
        });
      }

    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Decide if you want to return an error to the user if email fails
      // For now, we'll just log it and assume the main operation was successful
    }

    return NextResponse.json({ message: 'Reservation request submitted successfully.' });
  } catch (error) {
    console.error('Error submitting reservation:', error);
    return NextResponse.json({ error: 'Failed to submit reservation' }, { status: 500 });
  }
}
