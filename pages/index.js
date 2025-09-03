import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Canvas from '../components/Canvas'
import Controls from '../components/Controls'
import TextSignature from '../components/TextSignature'
import Footer from '../components/Footer'

export default function Home({ darkMode, setDarkMode }) {
  const [activeTab, setActiveTab] = useState('draw')
  const [penColor, setPenColor] = useState('#000000')
  const [penThickness, setPenThickness] = useState(3)

  return (
    <>
      <Head>
        <title>Signature Maker - Create Your Digital Signature | Abhijit Pradhan</title>
        <meta name="description" content="Create beautiful digital signatures with our free signature maker tool. Draw or type your signature with customizable options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Signature Maker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create your perfect digital signature with our professional tools. 
              Draw freehand or generate text-based signatures with custom styling.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('draw')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'draw'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Draw Signature
              </button>
              <button
                onClick={() => setActiveTab('type')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'type'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Type Signature
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'draw' ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <Controls
                    penColor={penColor}
                    setPenColor={setPenColor}
                    penThickness={penThickness}
                    setPenThickness={setPenThickness}
                  />
                </div>
                <div className="lg:col-span-3">
                  <Canvas
                    penColor={penColor}
                    penThickness={penThickness}
                  />
                </div>
              </div>
            ) : (
              <TextSignature />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}