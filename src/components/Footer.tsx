export default function Footer() {
  return (
    <footer className="container max-w-2xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-3 text-sm font-mono text-foreground/40">
        <div className="flex items-center space-x-3">
          <a 
            href="https://github.com/simonruba" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            github
          </a>
          <span>/</span>
          <a 
            href="https://linkedin.com/in/simonruba" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            linkedin
          </a>
          <span>/</span>
          <a 
            href="https://twitter.com/simonruba" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            twitter
          </a>
        </div>
        <div>
          <small>© {new Date().getFullYear()}</small>
        </div>
      </div>
    </footer>
  )
}

