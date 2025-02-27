'use client'

const CAREER_EVENTS = [
  {
    year: '2023 - Present',
    title: 'Head of IT and Software',
    company: 'Heliotherm',
    description: 'Leading IT operations and software development initiatives.'
  },
  {
    year: '2023',
    title: 'Software Developer',
    company: 'Accemic Technologies GmbH',
    description: 'Developed CEDARtools® using C#, Java, C, JavaScript, TeSSLa.'
  },
  {
    year: '2023',
    title: 'MSc Computer Science',
    company: 'University of Innsbruck',
    description: 'Thesis: Automated PGMI Scale Classification for Mammogram Quality Assessment'
  }
]

export default function Career() {
  return (
    <div className="container max-w-3xl mx-auto px-4">
      <section id="career" className="py-16">
        <h2 className="text-xl font-mono mb-8">Career</h2>
        <div className="space-y-12">
          {CAREER_EVENTS.map((event, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-base font-mono">{event.title}</h3>
                <span className="text-sm text-foreground/60">{event.year}</span>
              </div>
              <p className="text-sm text-foreground/60 mb-4">{event.company}</p>
              <p className="text-sm leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

