import { useState, useEffect } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useScreenSize() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth)

    // Update width on resize
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lessThan = (breakpoint: Breakpoint) => width < breakpoints[breakpoint]
  const greaterThan = (breakpoint: Breakpoint) => width >= breakpoints[breakpoint]

  return {
    width,
    lessThan,
    greaterThan,
  }
} 