'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Brain,
  BarChart3,
  Calendar,
  Archive,
  Search,
  Settings,
  Shield,
  Menu,
  X,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: BarChart3 },
  { name: 'Scheduled Archives', href: '/dashboard/scheduled', icon: Calendar },
  { name: 'Archive Explorer', href: '/dashboard/archives', icon: Archive },
  { name: 'Resource Browser', href: '/dashboard/resources', icon: Search },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'GDPR Tools', href: '/dashboard/gdpr', icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const guildId = searchParams.get('guild')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // If no guild is selected, don't show the sidebar
  if (!guildId) {
    return null
  }

  const getHrefWithGuild = (href: string) => {
    return `${href}?guild=${guildId}`
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-discord-600" />
              <span className="ml-2 text-xl font-bold text-gradient">
                ArchiveMind
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const hrefWithGuild = getHrefWithGuild(item.href)
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={hrefWithGuild}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    isActive ? 'nav-link-active' : 'nav-link-inactive'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>ArchiveMind Dashboard</p>
              <p>v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}