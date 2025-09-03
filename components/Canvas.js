import { useRef, useEffect, useState } from 'react'
import { RotateCcw, Trash2, Download } from 'lucide-react'

export default function Canvas({ penColor, penThickness }) {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState([])
  const [currentStroke, setCurrentStroke] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    canvas.style.width = canvas.offsetWidth + 'px'
    canvas.style.height = canvas.offsetHeight + 'px'
    
    context.scale(2, 2)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = penColor
    context.lineWidth = penThickness
    
    contextRef.current = context
  }, [])

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = penColor
      contextRef.current.lineWidth = penThickness
    }
  }, [penColor, penThickness])

  const startDrawing = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    setCurrentStroke([{ x: offsetX, y: offsetY, color: penColor, thickness: penThickness }])
  }

  const draw = (event) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    setCurrentStroke(prev => [...prev, { x: offsetX, y: offsetY, color: penColor, thickness: penThickness }])
  }

  const finishDrawing = () => {
    if (!isDrawing) return
    contextRef.current.closePath()
    setIsDrawing(false)
    setStrokes(prev => [...prev, currentStroke])
    setCurrentStroke([])
  }

  // Touch events for mobile
  const handleTouchStart = (event) => {
    event.preventDefault()
    const touch = event.touches[0]
    const rect = canvasRef.current.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top
    
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    setCurrentStroke([{ x: offsetX, y: offsetY, color: penColor, thickness: penThickness }])
  }

  const handleTouchMove = (event) => {
    if (!isDrawing) return
    event.preventDefault()
    const touch = event.touches[0]
    const rect = canvasRef.current.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top
    
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    setCurrentStroke(prev => [...prev, { x: offsetX, y: offsetY, color: penColor, thickness: penThickness }])
  }

  const handleTouchEnd = (event) => {
    event.preventDefault()
    finishDrawing()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
    setStrokes([])
    setCurrentStroke([])
  }

  const undoLastStroke = () => {
    if (strokes.length === 0) return
    
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    
    // Redraw canvas
    const canvas = canvasRef.current
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
    
    newStrokes.forEach(stroke => {
      if (stroke.length > 0) {
        contextRef.current.beginPath()
        contextRef.current.strokeStyle = stroke[0].color
        contextRef.current.lineWidth = stroke[0].thickness
        contextRef.current.moveTo(stroke[0].x, stroke[0].y)
        
        stroke.forEach((point, index) => {
          if (index > 0) {
            contextRef.current.lineTo(point.x, point.y)
          }
        })
        contextRef.current.stroke()
      }
    })
  }

  const downloadSignature = () => {
    const canvas = canvasRef.current
    
    // Create a new canvas with white background
    const downloadCanvas = document.createElement('canvas')
    downloadCanvas.width = canvas.width
    downloadCanvas.height = canvas.height
    const downloadContext = downloadCanvas.getContext('2d')
    
    // Fill with white background
    downloadContext.fillStyle = 'white'
    downloadContext.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height)
    
    // Draw the signature
    downloadContext.drawImage(canvas, 0, 0)
    
    // Download
    const link = document.createElement('a')
    link.download = 'signature.png'
    link.href = downloadCanvas.toDataURL()
    link.click()
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <h3 className="text-lg font-semibold">Draw Your Signature</h3>
        <div className="flex gap-2">
          <button
            onClick={undoLastStroke}
            className="btn-secondary flex items-center space-x-2"
            disabled={strokes.length === 0}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Undo</span>
          </button>
          <button
            onClick={clearCanvas}
            className="btn-danger flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
          <button
            onClick={downloadSignature}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair bg-white"
          style={{ touchAction: 'none' }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {strokes.length === 0 && (
            <p className="text-gray-400 text-lg">Start drawing your signature here</p>
          )}
        </div>
      </div>
    </div>
  )
}