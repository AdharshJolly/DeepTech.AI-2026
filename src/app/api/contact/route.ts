import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, enquiryType, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL environment variable is not configured. Submissions will be logged to server console.");
      console.log("Contact Enquiry Data:", { name, email, phone, enquiryType, message });
      return NextResponse.json({ 
        success: true, 
        warning: 'Submission received (Simulation Mode). Please configure GOOGLE_SHEET_WEBHOOK_URL in .env.local to sync with Google Sheets.' 
      });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        name,
        email,
        phone: phone || 'N/A',
        enquiryType: enquiryType || 'General Inquiries',
        message
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script web app responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error forwarding contact form to Google Sheets:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
