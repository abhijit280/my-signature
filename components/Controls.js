import { Palette, Minus, Plus } from 'lucide-react'

export default function Controls({ penColor, setPenColor, penThickness, setPenThickness }) {
  const colors = ['#000000', '#1e40af', '#dc2626', '#059669', '#7c2d12', '#581c87']

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-blue-600" />
        Drawing Controls
      </h3>
      
      {/* Pen Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Pen Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setPenColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                penColor === color
                  ? 'border-gray-400 scale-110 shadow-lg'
                  : 'border-gray-300 dark:border-gray-600 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
        
        {/* Custom Color Picker */}
        <div className="mt-3">
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Pen Thickness */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Pen Thickness: {penThickness}px
        </label>
        <div className="flex items-center space-x-3 mb-3">
          <button
            onClick={() => setPenThickness(Math.max(1, penThickness - 1))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono text-lg min-w-[3rem] text-center">
            {penThickness}
          </span>
          <button
            onClick={() => setPenThickness(Math.min(20, penThickness + 1))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={penThickness}
          onChange={(e) => setPenThickness(parseInt(e.target.value))}
          className="w-full accent-blue-600"
        />
        
        {/* Thickness Preview */}
        <div className="mt-3 flex justify-center">
          <div
            className="rounded-full bg-current"
            style={{
              width: penThickness + 'px',
              height: penThickness + 'px',
              color: penColor
            }}
          />
        </div>
      </div>
    </div>
  )
}