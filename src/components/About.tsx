'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function About() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="container max-w-3xl mx-auto px-6 sm:px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        <section id="about" className="pt-12 sm:pt-16">
          <h2 className="text-xl font-mono mb-6">About Me</h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Hi and thanks for stopping by! My name is <strong>Simon Rüba</strong>. I&apos;m a Software Developer and Machine Learning Engineer based in Innsbruck, Austria. I enjoy working on intelligent systems and web applications, with particular interest in AI and infrastructure improvements.
            </p>
            <p>
              With a background in Computer Science from the University of Innsbruck, I&apos;m fortunate to work at the intersection of software development and machine learning. I strive to contribute to practical AI solutions while maintaining robust and efficient systems.
            </p>
          </div>
        </section>

        <section id="experience">
          <h2 className="text-xl font-mono mb-6">Experience</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">Head of IT and Software</h3>
                <span className="text-sm text-foreground/60">2023–Present</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Heliotherm</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Developing IT strategy and technology roadmap</li>
                <li>Contributing to AWS AI Adoption Project, helping improve error detection</li>
                <li>Working on infrastructure modernization initiatives</li>
                <li>Implementing security measures and managing virtual environments</li>
                <li>Collaborating with and supporting the IT team</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">Software Developer</h3>
                <span className="text-sm text-foreground/60">2018–2023</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Accemic Technologies GmbH</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Contributed to CEDARtools® development for embedded systems</li>
                <li>Worked on code coverage and system monitoring features</li>
                <li>Developed solutions using C#, Java, C, and JavaScript</li>
                <li>Participated in software testing improvements</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="education">
          <h2 className="text-xl font-mono mb-6">Education</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">MSc Computer Science</h3>
                <span className="text-sm text-foreground/60">2023</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">University of Innsbruck, Austria</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Focus: Artificial Intelligence and Machine Learning</p>
                <p className="font-medium">Thesis: Automated PGMI Scale Classification for Mammogram Quality Assessment using ConvNeXt Ensemble</p>
                <div>
                  <p className="text-foreground/60 mb-2">Relevant Coursework:</p>
                  <p className="leading-relaxed tracking-wide text-foreground/80">
                    Machine Learning · Computer Vision · Natural Language Processing · Robotics · Information Security · Network Security · Semantic Web · Data Engineering · Software Design · Development Processes · Formal Languages · Automata Theory
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">BSc Computer Science</h3>
                <span className="text-sm text-foreground/60">2020</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">University of Innsbruck, Austria</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Thesis: Automatic Semantic Kidney and Kidney Tumor Segmentation</p>
                <div>
                  <p className="text-foreground/60 mb-2">Relevant Coursework:</p>
                  <p className="leading-relaxed tracking-wide text-foreground/80">
                    Algorithms · Data Structures · Operating Systems · Databases · Software Design · Functional Programming · Project Management · Machine Learning · AI · Computer Graphics · Autonomous Systems · Internet Technology · Cryptology · Discrete Mathematics · Analysis · Logic · Computer Vision · Information Theory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="text-xl font-mono mb-6">Technical Skills</h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-mono text-foreground/60 mb-2">Programming Languages</h3>
              <p className="leading-relaxed tracking-wide text-foreground/80">
                Python · TypeScript · JavaScript · C# · Java · C · SQL
              </p>
            </div>
            <div>
              <h3 className="font-mono text-foreground/60 mb-2">Machine Learning</h3>
              <p className="leading-relaxed tracking-wide text-foreground/80">
                PyTorch · TensorFlow · Computer Vision · Deep Learning · MLOps · Neural Networks · Model Optimization
              </p>
            </div>
            <div>
              <h3 className="font-mono text-foreground/60 mb-2">Web Development</h3>
              <p className="leading-relaxed tracking-wide text-foreground/80">
                React · Next.js · Node.js · GraphQL · REST APIs · Tailwind CSS · TypeScript
              </p>
            </div>
            <div>
              <h3 className="font-mono text-foreground/60 mb-2">Infrastructure & Tools</h3>
              <p className="leading-relaxed tracking-wide text-foreground/80">
                Git · Docker · AWS · Linux · CI/CD · VMware · Kubernetes · Terraform
              </p>
            </div>
          </div>
        </section>

        <section id="projects">
          <h2 className="text-xl font-mono mb-6">Projects</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">Password Security Center</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/simonrueba/password-checker.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="text-foreground/60">·</span>
                  <a 
                    href="https://password-checker-sigma.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              <div className="relative aspect-[16/9] mb-8 group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative h-full rounded-lg overflow-hidden border border-foreground/10 bg-gradient-to-br from-background to-foreground/5 shadow-xl">
                  {mounted && (
                    <Image
                      src={theme === 'light' 
                        ? "/projects/password-security-center-light.png"
                        : "/projects/password-security-center-dark.png"
                      }
                      alt="Password Security Center Screenshot"
                      fill
                      className="object-cover object-top transition-all duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  )}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                A comprehensive web application for password security analysis and generation, built with React and TypeScript. Features include password strength assessment, secure password generation, and breach checking powered by Have I Been Pwned.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/60">·</span>
                      <span>Advanced password strength analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/60">·</span>
                      <span>Secure password & passphrase generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/60">·</span>
                      <span>Password breach checking integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/60">·</span>
                      <span>Interactive security recommendations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                  <p className="text-sm leading-relaxed tracking-wide text-foreground/80">
                    React · TypeScript · Next.js · Tailwind CSS · Have I Been Pwned API · Crypto APIs · Jest · Cypress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

