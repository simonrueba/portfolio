'use client'

import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <nav className="flex flex-col sm:flex-row items-center justify-between">
          <a href="/" className="font-mono text-base mb-4 sm:mb-0">
            simon.rüba
          </a>
          
          <div className="flex items-center space-x-3 text-sm font-mono text-foreground/60">
            <a href="#about" className="hover:text-foreground">about</a>
            <span>/</span>
            <a href="#projects" className="hover:text-foreground">projects</a>
            <span>/</span>
            <a href="#experience" className="hover:text-foreground">experience</a>
            <span>/</span>
            <a href="#contact" className="hover:text-foreground">contact</a>
            <span>/</span>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

