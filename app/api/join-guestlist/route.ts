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
      selectedPackage,
      specialRequests,
    } = await req.json();

    if (!fullName || !email || !phone || !guests || !selectedPackage) {
      return NextResponse.json({ error: 'Missing required fields: fullName, email, phone, guests and selectedPackage are required' }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A:H'; // Adjust sheet name and range as needed

    const newRow = [
      new Date().toISOString(),
      fullName,
      email,
      phone,
      guests,
      instagramHandle || '',
      selectedPackage,
      specialRequests || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    try {
      // Send confirmation email to the client
      await sendEmail({
        to: email,
        templateUuid: '9eec04b7-7793-49f6-8e35-32ac2fd1e9cb',
        templateVariables: {
          name: fullName,
          guests: guests,
          date: 'Saturday, 20th December',
          venue: 'Vine Accra',
          selectedPackage: selectedPackage,
        },
      });

      // Send notification email to the team
      const teamEmails = [
        'noah@beyondaccra.com',
        'carl@beyondaccra.com',
        'concierge@experiencesbybeyond.com'
      ];

      for (const teamEmail of teamEmails) {
        await sendEmail({
          to: teamEmail,
          templateUuid: 'a780781f-f8ff-4400-9750-fa5a66e5489a',
          templateVariables: {
            name: fullName,
            email: email,
            phone: phone,
            guests: guests,
            selectedPackage: selectedPackage,
            igHandle: instagramHandle || 'N/A',
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
