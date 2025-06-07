'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ArchiveBoxIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { dashboardApi, type ArchivedChannel } from '@/lib/api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatDate, formatNumber } from '@/lib/utils'

export default function ArchivesPage() {
  const { data: session } = useSession()
  const [archives, setArchives] = useState<ArchivedChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filteredArchives, setFilteredArchives] = useState<ArchivedChannel[]>([])

  useEffect(() => {
    fetchArchives()
  }, [])

  useEffect(() => {
    if (search) {
      setFilteredArchives(
        archives.filter(archive =>
          archive.name.toLowerCase().includes(search.toLowerCase()) ||
          archive.category?.toLowerCase().includes(search.toLowerCase())
        )
      )
    } else {
      setFilteredArchives(archives)
    }
  }, [search, archives])

  const fetchArchives = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getArchivedChannels()
      setArchives(data)
    } catch (error) {
      console.error('Failed to fetch archives:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (channelId: string) => {
    try {
      await dashboardApi.restoreChannel(channelId)
      fetchArchives() // Refresh the list
    } catch (error) {
      console.error('Failed to restore channel:', error)
    }
  }

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
          <ArchiveBoxIcon className="h-8 w-8 text-blue-600" />
          Channel Archives
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Browse and manage archived channels and their rescued resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search archives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={fetchArchives}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Archives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArchives.map((archive) => (
          <div key={archive.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{archive.name}
                </h3>
                {archive.category && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Category: {archive.category}
                  </p>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                archive.restored 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {archive.restored ? 'Restored' : 'Archived'}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Resources:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(archive.resourceCount)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Archived:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDate(archive.archivedAt)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => window.open(`/dashboard/resources?channel=${archive.id}`, '_blank')}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                View Resources
              </button>
              {archive.canRestore && !archive.restored && (
                <button
                  onClick={() => handleRestore(archive.id)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredArchives.length === 0 && !loading && (
        <div className="text-center py-12">
          <ArchiveBoxIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No archives found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {search ? 'Try adjusting your search terms' : 'No channels have been archived yet'}
          </p>
        </div>
      )}
    </div>
  )
}
