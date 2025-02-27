import type { Metadata } from "next"
import { JetBrains_Mono, Plus_Jakarta_Sans, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-sans'
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: {
    default: "Simon Rüba - Software Developer & ML Engineer",
    template: "%s | Simon Rüba"
  },
  description: "Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications. Experienced in Python, TypeScript, and ML technologies.",
  keywords: ["Software Developer", "Machine Learning Engineer", "Python", "TypeScript", "React", "Next.js", "AI", "Web Development"],
  authors: [{ name: "Simon Rüba" }],
  creator: "Simon Rüba",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simonrueba.com",
    title: "Simon Rüba - Software Developer & ML Engineer",
    description: "Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.",
    siteName: "Simon Rüba",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Rüba - Software Developer & ML Engineer",
    description: "Software Developer and Machine Learning Engineer specializing in intelligent systems and modern web applications.",
    creator: "@simonrueba",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://simonrueba.com" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

