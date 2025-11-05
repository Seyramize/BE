import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

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

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
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
      requestBody: {
        values: [newRow],
      },
    });

    return NextResponse.json({ message: 'Successfully joined the guestlist!' });
  } catch (error) {
    console.error('Error adding to guestlist:', error);
    return NextResponse.json({ error: 'Failed to join the guestlist' }, { status: 500 });
  }
}
