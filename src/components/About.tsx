'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="container max-w-3xl mx-auto px-4">
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
              Hi and thanks for stopping by! My name is <strong>Simon Rüba</strong>. I'm a Software Developer and Machine Learning Engineer specializing in building intelligent systems and modern web applications.
            </p>
            <p>
              I work at the intersection of software development and machine learning, focusing on creating practical AI solutions and robust web applications. My expertise spans both traditional software development and cutting-edge AI technologies.
            </p>
          </div>
        </section>

        <section id="experience">
          <h2 className="text-xl font-mono mb-6">Experience</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">Software Developer</h3>
                <span className="text-sm text-foreground/60">2020–Present</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Company Name · Berlin, DE</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Led development of machine learning infrastructure</li>
                <li>Implemented distributed training pipelines</li>
                <li>Reduced model training time by 40%</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">ML Engineer</h3>
                <span className="text-sm text-foreground/60">2018–2020</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Previous Company · Munich, DE</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Developed computer vision models for object detection</li>
                <li>Built data processing pipelines</li>
                <li>Improved model accuracy by 25%</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="research">
          <h2 className="text-xl font-mono mb-6">Research</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">MNIST Classifier</h3>
                <span className="text-sm text-foreground/60">2023</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Interactive digit recognition using ONNX.js and TensorFlow</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Built a real-time handwritten digit recognition system</li>
                <li>Implemented client-side inference using ONNX.js</li>
                <li>Achieved 98% accuracy on test set</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-mono">Portfolio Website</h3>
                <span className="text-sm text-foreground/60">2024</span>
              </div>
              <p className="text-sm text-foreground/60 mb-3">Modern web application built with Next.js and TypeScript</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Designed and implemented a responsive, accessible interface</li>
                <li>Optimized performance with static generation and image optimization</li>
                <li>Integrated dark mode and smooth animations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="text-xl font-mono mb-6">Technical Skills</h2>
          <ul className="list-none space-y-4 text-sm">
            <li>
              <span className="font-mono text-foreground/60 inline-block w-24">Languages:</span>
              Python, TypeScript, C++, SQL
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-24">ML & AI:</span>
              PyTorch, TensorFlow, Computer Vision, NLP
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-24">Web:</span>
              React, Next.js, Node.js, GraphQL
            </li>
            <li>
              <span className="font-mono text-foreground/60 inline-block w-24">Tools:</span>
              Git, Docker, AWS, Linux
            </li>
          </ul>
        </section>

        <section id="contact" className="pb-16">
          <h2 className="text-xl font-mono mb-6">Contact</h2>
          <p className="mb-4">
            Feel free to get in touch by sending me an email at{' '}
            <a 
              href="mailto:contact@simonruba.com" 
              className="text-foreground hover:text-foreground/80"
            >
              contact@simonruba.com
            </a>
          </p>
          <blockquote className="border-l-2 pl-4 text-sm">
            <p className="space-y-1">
              Simon Rüba<br />
              Software Developer & ML Engineer<br />
              Berlin, Germany
            </p>
          </blockquote>
        </section>
      </motion.div>
    </div>
  )
}

