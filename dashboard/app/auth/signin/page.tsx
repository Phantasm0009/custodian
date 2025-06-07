'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Brain, Shield, BarChart3, Archive, Search, FileText } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('discord', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-discord-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding and features */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:px-12">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <Brain className="h-12 w-12 text-discord-600" />
              <h1 className="ml-3 text-3xl font-bold text-gradient">
                ArchiveMind
              </h1>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Intelligent Discord Channel Management
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Automate channel archiving, rescue valuable resources, and maintain 
              a searchable knowledge base for your Discord community.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Archive className="h-6 w-6 text-discord-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Archiving</h3>
                  <p className="text-gray-600">Automatically archive inactive channels with configurable warnings</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Search className="h-6 w-6 text-discord-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Resource Rescue</h3>
                  <p className="text-gray-600">Extract and preserve files, links, and code before archiving</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <BarChart3 className="h-6 w-6 text-discord-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Analytics Dashboard</h3>
                  <p className="text-gray-600">Monitor activity, track resources, and manage archives</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-discord-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">GDPR Compliant</h3>
                  <p className="text-gray-600">Complete data deletion and export capabilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-sm">
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-10 w-10 text-discord-600" />
                <h1 className="ml-2 text-2xl font-bold text-gradient">
                  ArchiveMind
                </h1>
              </div>
              <p className="text-gray-600">
                Discord Channel Management Dashboard
              </p>
            </div>

            <div className="card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-2 text-gray-600">
                  Sign in with Discord to access your dashboard
                </p>
              </div>

              <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm bg-discord-600 hover:bg-discord-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-500 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="loading-spinner mr-3" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                )}
                {isLoading ? 'Signing in...' : 'Continue with Discord'}
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our terms of service and privacy policy.
                  Only Discord server administrators can access this dashboard.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-700 transition-colors">
                  Documentation
                </a>
                <a href="#" className="hover:text-gray-700 transition-colors">
                  Support
                </a>
                <a href="#" className="hover:text-gray-700 transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}