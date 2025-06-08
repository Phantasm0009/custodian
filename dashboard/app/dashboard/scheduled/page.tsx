'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, Play, Pause, Settings, Plus, AlertCircle } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import toast from 'react-hot-toast'

interface ScheduledArchive {
  id: string
  channelId: string
  channelName: string
  guildName: string
  lastActivity: string | null
  nextScheduled: string
  frequency: string
  status: 'active' | 'inactive' | 'paused'
  archiveCount: number
  createdAt: string
  updatedAt: string
}

interface ScheduledData {
  scheduled: ScheduledArchive[]
  total: number
}

export default function ScheduledArchivesPage() {
  const searchParams = useSearchParams()
  const guildId = searchParams.get('guild')
  
  const [data, setData] = useState<ScheduledData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'paused'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (guildId) {
      fetchScheduledArchives()
    }
  }, [guildId])

  const fetchScheduledArchives = async () => {
    if (!guildId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/scheduled?guildId=${guildId}`)
      if (!response.ok) throw new Error('Failed to fetch scheduled archives')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }
  const toggleSchedule = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active'
      const response = await fetch('/api/scheduled', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: id, enabled: newStatus === 'active' })
      })
      
      if (response.ok) {
        fetchScheduledArchives()
        toast.success(`Schedule ${newStatus === 'active' ? 'activated' : 'paused'}`)
      }
    } catch (err) {
      console.error('Error toggling schedule:', err)
      toast.error('Failed to update schedule')
    }
  }

  const createNewSchedule = async (scheduleData: any) => {
    try {
      const response = await fetch('/api/scheduled', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData)
      })
      
      if (response.ok) {
        setShowCreateModal(false)
        fetchScheduledArchives()
        toast.success('New schedule created successfully')
      } else {
        toast.error('Failed to create schedule')
      }
    } catch (err) {
      console.error('Error creating schedule:', err)
      toast.error('Failed to create schedule')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'inactive': return <AlertCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredSchedules = data?.scheduled.filter(schedule => 
    filter === 'all' || schedule.status === filter
  ) || []

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading scheduled archives...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Archives</h1>
          <p className="text-gray-600">Automate channel archiving with scheduled tasks</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-discord-600 text-white px-4 py-2 rounded-lg hover:bg-discord-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Schedules</p>
              <p className="text-2xl font-bold text-gray-900">{data?.total || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Play className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.scheduled.filter(s => s.status === 'active').length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Pause className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paused</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.scheduled.filter(s => s.status === 'paused').length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Run</p>
              <p className="text-sm font-bold text-gray-900">
                {data?.scheduled.length ? formatRelativeTime(data.scheduled[0].nextScheduled) : 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          {(['all', 'active', 'paused', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-discord-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 text-xs">
                  ({data?.scheduled.filter(s => s.status === status).length || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled archives</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first archive schedule.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Run
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archives
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{schedule.channelName}
                        </div>
                        <div className="text-sm text-gray-500">{schedule.guildName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {getStatusIcon(schedule.status)}
                        <span className="ml-1">{schedule.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(schedule.nextScheduled)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.archiveCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => toggleSchedule(schedule.id, schedule.status)}
                        className={`${
                          schedule.status === 'active' 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {schedule.status === 'active' ? 'Pause' : 'Resume'}
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Settings className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>      {/* New Schedule Modal */}
      {showCreateModal && guildId && (
        <NewScheduleModal
          guildId={guildId}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createNewSchedule}
        />
      )}
    </div>
  )
}

// New Schedule Modal Component
function NewScheduleModal({ guildId, onClose, onSubmit }: {
  guildId: string
  onClose: () => void
  onSubmit: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    channelId: '',
    frequency: 'daily',
    time: '02:00',
    inactivityDays: 30,
    enabled: true
  })
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState<Array<{id: string, name: string, type: string, category?: string}>>([])
  const [channelsLoading, setChannelsLoading] = useState(true)
  const [channelsError, setChannelsError] = useState<string | null>(null)  // Fetch real Discord channels
  const fetchChannels = async () => {
    try {
      setChannelsLoading(true)
      setChannelsError(null)
      const response = await fetch(`/api/channels?guildId=${guildId}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        
        // Handle specific error codes from the API
        if (errorData.code === 'TOKEN_EXPIRED') {
          setChannelsError('Your Discord session has expired. Please sign out and sign in again to access real channels.')
        } else if (errorData.code === 'ACCESS_DENIED') {
          setChannelsError('Access denied to this Discord server. You may not have permission to view channels.')
        } else if (response.status === 401) {
          setChannelsError('Authentication required. Please sign out and sign in again with Discord.')
        } else if (response.status === 403) {
          setChannelsError('You don\'t have permission to access channels in this Discord server.')
        } else {
          setChannelsError(errorData.error || `Failed to fetch channels (${response.status})`)
        }
        
        // Use fallback data when real channels can't be loaded
        setChannels([
          { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels' },
          { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels' },
          { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels' },
          { id: 'fallback-4', name: 'off-topic', type: 'text', category: 'Fallback Channels' }
        ])
        return
      }
      
      const data = await response.json()
      setChannels(data.channels.filter((c: any) => c.type === 'text')) // Only text channels for archiving
      setChannelsError(null)
    } catch (error) {
      console.error('Error fetching channels:', error)
      setChannelsError('Network error occurred while loading channels. Using fallback data.')
      
      // Fallback to mock data for development/testing
      setChannels([
        { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels' },
        { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels' },
        { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels' },
        { id: 'fallback-4', name: 'off-topic', type: 'text', category: 'Fallback Channels' }
      ])
    } finally {
      setChannelsLoading(false)
    }
  }

  useEffect(() => {
    if (guildId) {
      fetchChannels()
    }
  }, [guildId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSubmit({
        ...formData,
        guildId,
        channelName: channels.find(c => c.id === formData.channelId)?.name || 'Unknown'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Schedule</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel
            </label>
            {channelsLoading ? (
              <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <div className="flex items-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2 text-gray-500">Loading channels...</span>
                </div>
              </div>            ) : channelsError ? (
              <div>
                <div className="w-full border border-amber-300 rounded-lg px-3 py-2 bg-amber-50 mb-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-amber-800 font-medium">Unable to load Discord channels</p>
                      <p className="text-amber-700 mt-1">{channelsError}</p>
                      {channelsError.includes('sign out') && (
                        <p className="text-amber-700 mt-1">
                          <strong>Solution:</strong> Sign out and sign in again with Discord.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={fetchChannels}
                      disabled={channelsLoading}
                      className="px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded hover:bg-amber-200 disabled:opacity-50"
                    >
                      {channelsLoading ? 'Retrying...' : 'Retry Loading Channels'}
                    </button>
                  </div>
                </div>
                <select
                  value={formData.channelId}
                  onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select a channel (fallback data)</option>
                  {channels.map((channel: any) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name} {channel.id.startsWith('fallback-') ? '(Fallback)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <select
                value={formData.channelId}
                onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="">Select a channel</option>
                {channels.map((channel: any) => (
                  <option key={channel.id} value={channel.id}>
                    #{channel.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archive Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inactivity Days (trigger archiving after)
            </label>
            <input
              type="number"
              value={formData.inactivityDays}
              onChange={(e) => setFormData({ ...formData, inactivityDays: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="1"
              max="365"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 mr-3"
              />
              <span className="text-sm text-gray-700">Enable schedule immediately</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.channelId}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <LoadingSpinner size="sm" /> : <Plus size={16} />}
              Create Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
