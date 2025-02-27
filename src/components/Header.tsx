'use client'

import { ModeToggle } from './ModeToggle'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <nav className="flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="font-mono text-base mb-4 sm:mb-0">
            simon.rüba
          </Link>
          
          <div className="flex items-center space-x-3 text-sm font-mono text-foreground/60">
            <Link href="#about" className="hover:text-foreground">about</Link>
            <span>/</span>
            <Link href="#projects" className="hover:text-foreground">projects</Link>
            <span>/</span>
            <Link href="#experience" className="hover:text-foreground">experience</Link>
            <span>/</span>
            <Link href="#contact" className="hover:text-foreground">contact</Link>
            <span>/</span>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

