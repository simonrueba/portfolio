'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Script from 'next/script'

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Simon Rüba',
            jobTitle: 'Software Developer & ML Engineer',
            url: 'https://simonrueba.com',
            sameAs: [
              'https://github.com/simonrueba',
              'https://linkedin.com/in/simonrueba',
              'https://twitter.com/simonrueba',
            ],
            description: 'Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.',
            knowsAbout: [
              'Software Development',
              'Machine Learning',
              'Python',
              'TypeScript',
              'React',
              'Next.js',
              'AI',
              'Web Development',
            ],
          })
        }}
      />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Contact />
      </main>
    </>
  )
} 