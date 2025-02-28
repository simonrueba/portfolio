import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateTurnstileToken } from 'next-turnstile'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission')
    const { name, email, message, token } = await request.json()

    // Log the received data (excluding token for security)
    console.log('Received form data:', { 
      name, 
      email, 
      messageLength: message?.length,
      tokenLength: token?.length 
    })

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
    console.log('Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      hasTurnstileKey: Boolean(process.env.TURNSTILE_SECRET_KEY)
    })

    try {
      const validationResponse = await validateTurnstileToken({
        token,
        secretKey: process.env.TURNSTILE_SECRET_KEY!,
        idempotencyKey: uuidv4(),
        // Enable sandbox mode in development
        sandbox: process.env.NODE_ENV === 'development'
      })
      console.log('Turnstile validation response:', validationResponse)

      if (!validationResponse.success) {
        console.error('Turnstile validation failed:', validationResponse)
        return NextResponse.json(
          { error: 'Invalid CAPTCHA verification' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Error during Turnstile validation:', error)
      return NextResponse.json(
        { error: 'Failed to validate CAPTCHA' },
        { status: 500 }
      )
    }

    // Send email using Resend
    console.log('Sending email via Resend...')
    const emailResult = await resend.emails.send({
      from: 'Contact Form <answers_and_8o@icloud.com>',
      to: 'answers_and_8o@icloud.com',
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
      replyTo: email
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