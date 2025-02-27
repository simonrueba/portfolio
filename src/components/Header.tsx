'use client'

import { useState } from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container max-w-2xl mx-auto px-6 sm:px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="font-mono text-base" onClick={closeMenu}>
            simon.rüba
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-3 text-sm font-mono text-foreground/60">
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

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 sm:hidden">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 -mr-2 hover:bg-accent rounded-md"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-foreground transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-foreground transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden"
            >
              <div className="flex flex-col space-y-6 py-6 text-sm font-mono text-foreground/60">
                <Link 
                  href="#about" 
                  className="hover:text-foreground"
                  onClick={closeMenu}
                >
                  about
                </Link>
                <Link 
                  href="#projects" 
                  className="hover:text-foreground"
                  onClick={closeMenu}
                >
                  projects
                </Link>
                <Link 
                  href="#experience" 
                  className="hover:text-foreground"
                  onClick={closeMenu}
                >
                  experience
                </Link>
                <Link 
                  href="#contact" 
                  className="hover:text-foreground"
                  onClick={closeMenu}
                >
                  contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

