'use client'

import { useState, useRef, useEffect } from 'react'

declare global {
  interface Window {
    turnstile: any
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    // Load the Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (widgetId.current) {
        window.turnstile?.remove(widgetId.current)
      }
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    // Reset Turnstile when form submission is successful
    if (status === 'success') {
      window.turnstile?.reset(widgetId.current)
      setToken(null)
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setStatus('error')
      setErrorMessage('Please complete the CAPTCHA')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  useEffect(() => {
    // Initialize Turnstile when the script is loaded
    const initTurnstile = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => {
            setToken(token)
          },
          'refresh-expired': () => {
            setToken(null)
          }
        })
      }
    }

    if (window.turnstile) {
      initTurnstile()
    } else {
      document.addEventListener('turnstile:ready', initTurnstile)
      return () => {
        document.removeEventListener('turnstile:ready', initTurnstile)
      }
    }
  }, [])

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6">
      <section id="contact" className="py-12 sm:py-16">
        <h2 className="text-lg sm:text-xl font-mono mb-6 sm:mb-8">Contact</h2>
        <div className="space-y-8 sm:space-y-12">
          <div>
            <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology and machine learning. Feel free to get in touch by sending me an email at{' '}
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
              
              <div ref={turnstileRef} className="flex justify-center sm:justify-start" />
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
              disabled={status === 'loading' || !token}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-base sm:text-sm font-mono border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

