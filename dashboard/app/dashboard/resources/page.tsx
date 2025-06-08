'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { 
  DocumentTextIcon, 
  LinkIcon, 
  PhotoIcon, 
  CodeBracketIcon,
  MagnifyingGlassIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline'
import { dashboardApi, type Resource } from '@/lib/api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatDate, getResourceTypeIcon, getResourceTypeColor } from '@/lib/utils'

export default function ResourcesPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const guildId = searchParams.get('guild')
  const channelFilter = searchParams.get('channel')
  
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')

  useEffect(() => {
    if (guildId) {
      fetchResources()
    }
  }, [guildId, search, typeFilter, authorFilter, channelFilter])
  const fetchResources = async () => {
    if (!guildId) return
    
    try {
      setLoading(true)
      const params = new URLSearchParams({ guildId })
      if (search) params.append('search', search)
      if (typeFilter) params.append('type', typeFilter)
      if (authorFilter) params.append('author', authorFilter)
      if (channelFilter) params.append('channelId', channelFilter)
      
      const response = await fetch(`/api/resources?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setResources(data.resources || [])
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const resourceTypes = ['FILE', 'LINK', 'CODE', 'PIN', 'IMAGE', 'DOCUMENT']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <DocumentTextIcon className="h-8 w-8 text-green-600" />
          Resource Browser
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Search and explore rescued resources from archived channels
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Types</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            onClick={() => {
              setSearch('')
              setTypeFilter('')
              setAuthorFilter('')
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${getResourceTypeColor(resource.type)}`}>
                  {getResourceTypeIcon(resource.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {resource.fileName || resource.url || 'Untitled Resource'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      by {resource.authorName} in #{resource.channelName}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)} bg-opacity-20`}>
                      {resource.type}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(resource.createdAt)}
                    </p>
                  </div>
                </div>

                {resource.content && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {resource.content}
                    </p>
                  </div>
                )}

                {resource.url && (
                  <div className="mt-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Open Resource
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && !loading && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No resources found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  )
}
