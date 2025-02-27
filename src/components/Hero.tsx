'use client'

import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container px-6 md:px-6"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <p className="text-base md:text-lg font-mono text-foreground/60">
                Hi, my name is
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                Simon Rüba
              </h1>
              <p className="text-base md:text-lg font-mono text-foreground/60">
                Software Developer & ML Engineer
              </p>
            </div>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
              I specialize in building intelligent systems and modern web applications, combining traditional software development with cutting-edge machine learning technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pt-8"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
            >
              Get in Touch →
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero

