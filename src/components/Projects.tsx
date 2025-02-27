'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react'

const projects = [
  {
    title: 'AI-Powered Chatbot',
    description: 'Developed a conversational AI using natural language processing techniques and deep learning models.',
    technologies: ['Python', 'TensorFlow', 'NLTK'],
    github: 'https://github.com/johndoe/ai-chatbot',
  },
  {
    title: 'Image Classification System',
    description: 'Built a convolutional neural network for accurate image classification on a large dataset.',
    technologies: ['Python', 'PyTorch', 'OpenCV'],
    github: 'https://github.com/johndoe/image-classification',
  },
  {
    title: 'Predictive Analytics Dashboard',
    description: 'Created a web-based dashboard for visualizing and analyzing predictive models for business intelligence.',
    technologies: ['React', 'D3.js', 'Node.js', 'Express'],
    github: 'https://github.com/johndoe/predictive-analytics',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

