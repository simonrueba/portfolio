'use client'

import { useState, useRef } from 'react'
import { Turnstile } from "next-turnstile"
import { useTheme } from 'next-themes'

interface FormData {
  name: string
  email: string
  message: string
  token: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    token: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    if (!formRef.current) {
      setStatus('error')
      setErrorMessage('Form not found')
      return
    }

    if (!formData.token) {
      setStatus('error')
      setErrorMessage('Please verify you are not a robot')
      return
    }

    try {
      console.log('Form submission started')
      console.log('Form data:', { 
        name: formData.name, 
        email: formData.email, 
        messageLength: formData.message.length,
        hasToken: Boolean(formData.token)
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('API Response:', { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '', token: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again later.'
      )
    }
  }

  return (
    <div className="container max-w-3xl mx-auto px-6 sm:px-4">
      <section id="contact" className="py-12 sm:py-16">
        <h2 className="text-lg sm:text-xl font-mono mb-6 sm:mb-8">Contact</h2>
        <div className="space-y-8 sm:space-y-12">
          <div>
            <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              I&apos;m always interested in hearing about new opportunities, collaborations, or just having a chat about technology and machine learning. Feel free to get in touch by sending me an email at{' '}
              <a 
                href="mailto:simonrueba@gmail.com" 
                className="text-foreground hover:text-foreground/80 inline-block"
              >
                simonrueba@gmail.com
              </a>
              .
            </p>
            <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              You can also use the form below:
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-mono mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 text-base sm:text-sm bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-base sm:text-sm bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 text-base sm:text-sm bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onVerify={(token) => {
                  console.log('Turnstile verification successful')
                  setFormData(prev => ({ ...prev, token }))
                }}
                onError={(error) => {
                  console.error('Turnstile error:', error)
                  setStatus('error')
                  setErrorMessage('Security check failed. Please try again.')
                }}
                onExpire={() => {
                  console.log('Turnstile token expired')
                  setFormData(prev => ({ ...prev, token: '' }))
                  setErrorMessage('Security check expired. Please verify again.')
                }}
                onLoad={() => {
                  console.log('Turnstile loaded')
                }}
                className="flex justify-center"
                theme={theme === 'dark' ? 'dark' : 'light'}
                appearance="interaction-only"
                retry="auto"
                refreshExpired="auto"
              />
            </div>
            
            {status === 'error' && (
              <div className="text-sm text-red-500 p-3 bg-red-50 dark:bg-red-950/50 rounded-md">
                {errorMessage}
              </div>
            )}
            
            {status === 'success' && (
              <div className="text-sm text-green-500 p-3 bg-green-50 dark:bg-green-950/50 rounded-md">
                Message sent successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !formData.token}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-base sm:text-sm font-mono border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

