'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement | string, config: TurnstileConfig) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface TurnstileConfig {
  sitekey: string;
  callback: (token: string) => void;
  'refresh-expired': 'auto' | 'manual' | 'never';
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  appearance?: 'always' | 'execute' | 'interaction-only';
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    token: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true)
  const turnstileRef = useRef<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Turnstile
    console.log('Starting to load Turnstile script...')
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
    script.async = true
    script.defer = true
    
    // Define the callback function
    window.onTurnstileLoad = () => {
      console.log('Turnstile script loaded via callback')
      setIsTurnstileLoading(false)
      initializeTurnstile()
    }

    script.onload = () => {
      console.log('Turnstile script onload event fired')
    }

    script.onerror = (error) => {
      console.error('Error loading Turnstile script:', error)
      setIsTurnstileLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      delete window.onTurnstileLoad
    }
  }, [])

  const initializeTurnstile = () => {
    if (!window.turnstile) {
      console.error('Turnstile not loaded')
      return
    }

    if (!containerRef.current) {
      console.error('Container ref not ready')
      return
    }

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    console.log('Initializing Turnstile with site key:', siteKey)
    
    if (!siteKey) {
      console.error('Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY environment variable')
      return
    }

    try {
      turnstileRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          console.log('Turnstile callback received')
          setFormData(prev => ({ ...prev, token }))
        },
        'refresh-expired': 'auto',
        onExpire: () => {
          console.log('Turnstile token expired')
          setFormData(prev => ({ ...prev, token: '' }))
        },
        theme: 'light',
        appearance: 'interaction-only',
      })
      console.log('Turnstile widget rendered with ID:', turnstileRef.current)
    } catch (error) {
      console.error('Error rendering Turnstile widget:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

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
      
      // Reset Turnstile after successful submission
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current)
      }
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
            </div>
            
            {/* Turnstile container */}
            <div className="space-y-4">
              <div 
                ref={containerRef} 
                className="flex justify-center"
              />
              {isTurnstileLoading && (
                <div className="text-sm text-foreground/60 text-center">
                  Loading verification...
                </div>
              )}
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
              {status === 'loading' ? 'Sending...' : !formData.token ? 'Please complete the verification' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

