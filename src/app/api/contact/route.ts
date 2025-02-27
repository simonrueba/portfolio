import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyTurnstileToken(token: string) {
  try {
    console.log('Verifying Turnstile token...')
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
    console.log('Turnstile verification response:', data)
    return data.success
  } catch (error) {
    console.error('Error verifying Turnstile token:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission')
    const { name, email, message, token } = await request.json()

    // Log the received data (excluding token for security)
    console.log('Received form data:', { name, email, messageLength: message?.length })

    // Basic validation
    if (!name || !email || !message || !token) {
      console.log('Missing required fields:', {
        name: !name,
        email: !email,
        message: !message,
        token: !token
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    console.log('Starting Turnstile verification...')
    const isValid = await verifyTurnstileToken(token)
    console.log('Turnstile verification result:', isValid)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA' },
        { status: 400 }
      )
    }

    // Send email using Resend
    console.log('Sending email via Resend...')
    const emailResult = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'simonrueba@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    })
    console.log('Email sent successfully:', emailResult)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in contact form submission:', error)
    // Return more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { error: `Error processing request: ${errorMessage}` },
      { status: 500 }
    )
  }
} 