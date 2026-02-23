import { NextResponse } from 'next/server';

// Telegram Bot Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, region, socialNetwork, nickname, phone, email, message } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone and email are required' },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${name}
🌍 <b>Region:</b> ${region || 'Not specified'}
📱 <b>Social Network:</b> ${socialNetwork || 'Not specified'}
💬 <b>Nickname:</b> ${nickname || 'Not specified'}
📞 <b>Phone:</b> ${phone}
📧 <b>Email:</b> ${email}
${message ? `\n📝 <b>Message:</b>\n${message}` : ''}

🕐 <b>Time:</b> ${new Date().toLocaleString('ru-RU')}
    `.trim();

    // Send to Telegram
    if (BOT_TOKEN && CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        console.error('Telegram API error:', await response.text());
        return NextResponse.json(
          { error: 'Failed to send message' },
          { status: 500 }
        );
      }
    } else {
      console.log('Telegram not configured. Message:', telegramMessage);
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
