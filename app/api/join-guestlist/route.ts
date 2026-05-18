import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendEmail } from '@/lib/mailtrap';
import { guardFormSubmission, isValidSubmissionEmail } from '@/lib/form-guard';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const guard = await guardFormSubmission(body);
    if (!guard.ok) {
      return NextResponse.json({ error: guard.error }, { status: guard.status });
    }

    const {
      fullName,
      email,
      phone,
      guests,
      instagramHandle,
      howHeard,
      specialRequests,
    } = body;

    if (!fullName || !email || !phone || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidSubmissionEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = "1Sa6LvCgkuKQDSgKu8EoHqSLttGedc8dDjemh1mF4qmQ";
    const range = 'Sheet1!A:H';

    const newRow = [
      new Date().toISOString(),
      fullName,
      email,
      phone,
      guests,
      instagramHandle || '',
      howHeard || '',
      specialRequests || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [newRow],
      },
    });

    try {
      await sendEmail({
        to: email,
        templateUuid: '0d047401-7366-4c56-b7e6-aaa7e38803f1',
        templateVariables: {
          name: fullName,
          guests: guests,
          date: 'Saturday, 20th December',
          venue: 'Vine Accra',
        },
      });

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
          templateUuid: 'd691c1c4-a893-4cd7-b69a-421170baa007',
          templateVariables: {
            name: fullName,
            email: email,
            phone: phone,
            guests: guests,
            igHandle: instagramHandle || 'N/A',
            channel: howHeard || 'N/A',
            notes: specialRequests || '(Empty)',
          },
        });
      }

    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json({ message: 'Successfully joined the guestlist!' });
  } catch (error) {
    console.error('Error adding to guestlist:', error);
    return NextResponse.json({ error: 'Failed to join the guestlist' }, { status: 500 });
  }
}
