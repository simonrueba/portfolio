import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyTurnstileToken(token: string) {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  )

  const data = await response.json()
  return data.success
}

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = await request.json()

    // Basic validation
    if (!name || !email || !message || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    const isValid = await verifyTurnstileToken(token)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA' },
        { status: 400 }
      )
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'simonrueba@gmail.com', // Your email address
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    )
  }
} 