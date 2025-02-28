'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="container max-w-3xl mx-auto px-6 sm:px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        <section id="about">
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
                  <p className="text-foreground/60 mb-1">Relevant Coursework:</p>
                  <p className="leading-relaxed">Machine Learning, Computer Vision, Robotics, Information Security, Network Security, Semantic Web, Data Engineering, Natural Language Processing, Software Design, Development Processes, Formal Languages, Automata Theory</p>
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
                  <p className="text-foreground/60 mb-1">Relevant Coursework:</p>
                  <p className="leading-relaxed">Algorithms, Data Structures, Operating Systems, Databases, Software Design, Functional Programming, Project Management, Machine Learning, AI, Computer Graphics, Autonomous Systems, Internet Technology, Cryptology, Discrete Math, Analysis, Logic, Computer Vision, Information Theory</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="text-xl font-mono mb-6">Technical Skills</h2>
          <ul className="list-none space-y-4 text-sm">
            <li>
              <span className="font-mono text-foreground/60 inline-block w-36">Programming:</span>
              Python, TypeScript, JavaScript, C#, Java, C, SQL
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-36">Machine Learning:</span>
              PyTorch, TensorFlow, Computer Vision, Deep Learning, MLOps
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-36">Web Development:</span>
              React, Next.js, Node.js, GraphQL, REST APIs
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-36">Infrastructure:</span>
              Git, Docker, AWS, Linux, CI/CD, VMware
            </li>
          </ul>
        </section>
      </motion.div>
    </div>
  )
}

