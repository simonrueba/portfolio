import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Education() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Education</CardTitle>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
              <p className="text-muted-foreground">University of Technology</p>
              <p className="text-muted-foreground">Expected Graduation: May 2024</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Relevant Coursework</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Machine Learning</li>
                <li>Artificial Intelligence</li>
                <li>Deep Learning</li>
                <li>Data Structures and Algorithms</li>
                <li>Database Systems</li>
                <li>Web Development</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

