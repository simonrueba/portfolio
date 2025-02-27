'use client'

const SKILLS = {
  "Programming Languages": [
    "Python", "TypeScript", "JavaScript", "C#", "Java", "C", "SQL"
  ],
  "Machine Learning": [
    "PyTorch", "TensorFlow", "Computer Vision", "Deep Learning", "MLOps"
  ],
  "Web Development": [
    "React", "Next.js", "Node.js", "GraphQL", "REST APIs"
  ],
  "Tools & Infrastructure": [
    "Git", "Docker", "AWS", "Linux", "CI/CD"
  ]
}

export default function Skills() {
  return (
    <div className="container max-w-3xl mx-auto px-4">
      <section id="skills" className="py-16">
        <h2 className="text-xl font-mono mb-8">Technical Skills</h2>
        <div className="space-y-8">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-base font-mono mb-3">{category}</h3>
              <p className="text-sm leading-relaxed">
                {skills.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

