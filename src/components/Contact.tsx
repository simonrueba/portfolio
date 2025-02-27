'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement | string, config: TurnstileConfig) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    }
  }
}

interface TurnstileConfig {
  sitekey: string;
  callback: (token: string) => void;
  'refresh-expired': () => void;
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
  const turnstileRef = useRef<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Turnstile
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (window.turnstile && containerRef.current) {
      turnstileRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
        callback: (token: string) => {
          setFormData(prev => ({ ...prev, token }))
        },
        'refresh-expired': () => {
          setFormData(prev => ({ ...prev, token: '' }))
        }
      })
    }

    return () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.remove(turnstileRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

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
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
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
            <div ref={containerRef} className="flex justify-center" />
            
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
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

