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
      // Map selected package to its includes so templates can show details
      const packageMap: Record<string, string[]> = {
        '10K': ['Veuve Rich x2', 'Agavita Reposado x1', 'Food Platter x1'],
        '15K': ['Veuve Rich x3', 'Agavita Reposado x1', 'Food Platter x1', 'Juice Pitcher x1'],
        '20K': ['Veuve Rich x4', 'Casamigos x1', 'Food Platter x2', 'Juice Pitcher x1'],
        '30K': ['Ace Of Spades x1', '1942 Tequila x1', 'Veuve Rich x2', 'Food Platter x2', 'Juice Pitcher x2'],
      };

      // Build a right-aligned block of lines (no bullets) so items align with the package amount
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

      // Send confirmation email to the client
      await sendEmail({
        to: email,
        templateUuid: '9eec04b7-7793-49f6-8e35-32ac2fd1e9cb',
        templateVariables: {
          name: fullName || '(No name)',
          guests: guests || '(0)',
          date: 'Saturday, 20th December',
          venue: 'Vine Accra',
          selectedPackage: selectedPackage || '(None)',
          // Provide a pre-encoded version of the package for use in URLs
          selectedPackageEncoded: encodeURIComponent(selectedPackage || '(None)'),
          packageIncludes: packageIncludesHtml,
          brandName: 'Vici Day Party',
          paymentUrl: process.env.PAYMENT_URL || '#',
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
            paymentUrl: process.env.PAYMENT_URL || '#',
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
