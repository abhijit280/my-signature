import { useState, useRef } from 'react'
import { Type, Download, Palette } from 'lucide-react'

export default function TextSignature() {
  const [text, setText] = useState('')
  const [fontFamily, setFontFamily] = useState('font-cursive')
  const [fontSize, setFontSize] = useState(48)
  const [textColor, setTextColor] = useState('#000000')
  const previewRef = useRef(null)

  const fonts = [
    { name: 'Cursive', value: 'font-cursive', family: 'Dancing Script' },
    { name: 'Handwriting', value: 'font-handwriting', family: 'Kalam' },
    { name: 'Signature', value: 'font-signature', family: 'Great Vibes' },
    { name: 'Bold', value: 'font-bold', family: 'system-ui' },
  ]

  const colors = ['#000000', '#1e40af', '#dc2626', '#059669', '#7c2d12', '#581c87']

  const downloadTextSignature = async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 800
    canvas.height = 200
    
    // Fill background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Set font and color
    const selectedFont = fonts.find(f => f.value === fontFamily)
    ctx.font = `${fontSize}px ${selectedFont.family}`
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    
    // Download
    const link = document.createElement('a')
    link.download = 'text-signature.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2 text-blue-600" />
              Text Controls
            </h3>
            
            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            {/* Font Family */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Font Style</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {fonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="80"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Text Color */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-1" />
                Text Color
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      textColor === color
                        ? 'border-gray-400 scale-110 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={downloadTextSignature}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Signature</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 min-h-[300px] flex items-center justify-center">
              <div
                ref={previewRef}
                className={`${fontFamily} transition-all duration-300`}
                style={{
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  lineHeight: '1.2'
                }}
              >
                {text || 'Enter your name'}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              This is how your signature will look
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}