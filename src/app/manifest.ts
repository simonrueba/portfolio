import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Simon Rüba - Software Developer & ML Engineer',
    short_name: 'Simon Rüba',
    description: 'Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
} 