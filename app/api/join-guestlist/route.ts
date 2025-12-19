import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendEmail } from '@/lib/mailtrap';



export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      email,
      phone,
      guests,
      instagramHandle,
      howHeard,
      specialRequests,
    } = await req.json();

    if (!fullName || !email || !phone || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
    const range = 'Sheet1!A:H'; // Adjust sheet name and range as needed

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

    console.log('Google Sheets response:', {
     
    });

    try {
      // Send confirmation email to the client
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
      // Decide if you want to return an error to the user if email fails
      // For now, we'll just log it and assume the main operation was successful
    }

    return NextResponse.json({ message: 'Successfully joined the guestlist!' });
  } catch (error) {
    console.error('Error adding to guestlist:', error);
    return NextResponse.json({ error: 'Failed to join the guestlist' }, { status: 500 });
  }
}