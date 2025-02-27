import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio - Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.',
  alternates: {
    canonical: 'https://simonrueba.com',
  },
  openGraph: {
    title: 'Simon Rüba - Home',
    description: 'Welcome to my portfolio - Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.',
    url: 'https://simonrueba.com',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Simon Rüba - Software Developer & ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simon Rüba - Home',
    description: 'Welcome to my portfolio - Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.',
    images: ['/og-image.png'], // Add your Twitter card image
  },
} 