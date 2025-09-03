import { Heart, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-600 dark:text-gray-400">
              Made with
            </span>
            <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" />
            <span className="text-gray-600 dark:text-gray-400">
              by Abhijit Pradhan
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/abhijit280"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhijit-pradhan-87382b261/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Signature Maker. All rights reserved. | Create professional digital signatures online.
          </p>
        </div>
      </div>
    </footer>
  )
}