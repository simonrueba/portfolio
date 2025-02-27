'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import * as ort from 'onnxruntime-web'

interface Prediction {
  digit: number
  confidence: number
  allProbabilities: number[]
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const { theme } = useTheme()
  const sessionRef = useRef<ort.InferenceSession | null>(null)

  // Load the model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Initialize ONNX Runtime Web with basic configuration
        const session = await ort.InferenceSession.create('/models/mnist-8.onnx', {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'basic'
        });
        sessionRef.current = session;
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load model:', err)
        setIsLoading(false)
      }
    }

    loadModel()
  }, [])

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch devices
    setIsDrawing(true)
    const pos = getPosition(e)
    lastPos.current = pos

    // Start drawing a dot at the initial position
    const ctx = drawingCanvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.fillStyle = theme === 'dark' ? '#fff' : '#000'
      ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch devices
    if (!isDrawing) return

    const canvas = drawingCanvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const pos = getPosition(e)
    
    ctx.beginPath()
    ctx.strokeStyle = theme === 'dark' ? '#fff' : '#000'
    ctx.lineWidth = 24
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()

    lastPos.current = pos
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    predict()
  }

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = drawingCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const event = 'touches' in e ? e.touches[0] : e
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    }
  }

  const predict = async () => {
    try {
      const canvas = drawingCanvasRef.current
      if (!canvas || !sessionRef.current) return

      // Get the canvas context
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Create a temporary canvas for preprocessing
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = 28
      tempCanvas.height = 28
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return

      // Draw and resize the image
      tempCtx.fillStyle = 'black'
      tempCtx.fillRect(0, 0, 28, 28)
      tempCtx.drawImage(canvas, 0, 0, 280, 280, 0, 0, 28, 28)

      // Get image data and preprocess
      const imageData = tempCtx.getImageData(0, 0, 28, 28)
      const input = new Float32Array(28 * 28)
      
      // Convert to grayscale and normalize
      for (let i = 0; i < imageData.data.length; i += 4) {
        const grayscale = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
        input[i / 4] = grayscale / 255.0
      }

      // Create tensor
      const tensor = new ort.Tensor('float32', input, [1, 1, 28, 28])
      
      // Run inference
      const feeds = { input: tensor }
      const results = await sessionRef.current.run(feeds)
      const output = results.output.data as Float32Array
      
      // Get prediction
      const predictedDigit = Array.from(output).indexOf(Math.max(...Array.from(output)))
      const probabilities = Array.from(output)
      
      setPrediction({
        digit: predictedDigit,
        confidence: probabilities[predictedDigit],
        allProbabilities: probabilities
      })

    } catch (err) {
      console.error('Prediction error:', err)
    }
  }

  const clearCanvas = () => {
    const canvas = drawingCanvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setPrediction(null)
    }
  }

  return (
    <div className="relative w-full h-screen">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-background/80 backdrop-blur-sm p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p>Loading MNIST model...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Draw a Digit</h2>
              {prediction && (
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-medium">
                  Prediction: {prediction.digit} ({(prediction.confidence * 100).toFixed(1)}%)
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative aspect-square border-2 border-primary rounded-lg overflow-hidden">
                  <canvas
                    ref={drawingCanvasRef}
                    width={280}
                    height={280}
                    className="touch-none w-full h-full bg-background"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <Button onClick={clearCanvas} variant="outline">Clear</Button>
                  <Button onClick={predict}>Predict</Button>
                </div>
              </div>

              {prediction && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Confidence Scores</h3>
                  <div className="space-y-2">
                    {prediction.allProbabilities.map((prob, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-6 text-right font-medium">{i}</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm tabular-nums">
                          {(prob * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default MatrixBackground 