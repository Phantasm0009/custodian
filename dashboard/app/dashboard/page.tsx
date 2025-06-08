'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { OverviewStats } from '@/components/dashboard/OverviewStats'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { TopChannels } from '@/components/dashboard/TopChannels'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { dashboardApi, type DashboardStats } from '@/lib/api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Server, Plus, ExternalLink, Settings, Zap, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface Guild {
  id: string
  name: string
  icon: string | null
  hasBot: boolean
  owner: boolean
  permissions: string
  canInvite: boolean
  stats?: {
    archivedChannels: number
    watchedChannels: number
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedGuildId = searchParams.get('guild')
  
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [showQuickSetup, setShowQuickSetup] = useState(false)

  useEffect(() => {
    loadGuilds()
  }, [])

  useEffect(() => {
    if (selectedGuildId) {
      loadStats()
    }
  }, [selectedGuildId])

  const loadGuilds = async () => {
    try {
      const response = await fetch('/api/guilds')
      if (response.ok) {
        const data = await response.json()
        setGuilds(data.guilds)
      }
    } catch (error) {
      console.error('Failed to load guilds:', error)
      toast.error('Failed to load servers')
    }
  }

  const loadStats = async () => {
    if (!selectedGuildId) return
    
    try {
      setLoading(true)
      const data = await dashboardApi.getStats(selectedGuildId)
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  const handleGuildSelect = (guildId: string) => {
    router.push(`/dashboard?guild=${guildId}`)
  }

  const handleInviteBot = async (guildId: string) => {
    try {
      const response = await fetch(`/api/invite?guildId=${guildId}`)
      if (response.ok) {
        const data = await response.json()
        window.open(data.inviteUrl, '_blank', 'width=500,height=700')
        // Refresh guilds after potential bot invite
        setTimeout(() => loadGuilds(), 2000)
      }
    } catch (error) {
      console.error('Failed to generate invite:', error)
      toast.error('Failed to generate bot invite')
    }
  }

  const handleQuickSetup = async (guildId: string) => {
    setShowQuickSetup(true)
  }

  // If no guild is selected, show server selector
  if (!selectedGuildId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select a Server</h1>
            <p className="text-gray-600">Choose a Discord server to manage with ArchiveMind</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                    {guild.icon ? (
                      <img
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`}
                        alt={guild.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      guild.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{guild.name}</h3>
                    <div className="flex items-center mt-1">
                      {guild.hasBot ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          Bot Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                          No Bot
                        </span>
                      )}
                      {guild.owner && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {guild.hasBot && guild.stats && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600">Archived</div>
                        <div className="font-semibold text-lg">{guild.stats.archivedChannels}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Watching</div>
                        <div className="font-semibold text-lg">{guild.stats.watchedChannels}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {guild.hasBot ? (
                    <>
                      <button
                        onClick={() => handleGuildSelect(guild.id)}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        <Server size={16} />
                        Manage
                      </button>
                      <button
                        onClick={() => handleQuickSetup(guild.id)}
                        className="px-3 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Quick Setup"
                      >
                        <Zap size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleInviteBot(guild.id)}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
                        guild.canInvite 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!guild.canInvite}
                      title={guild.canInvite ? 'Add ArchiveMind bot to this server' : 'You need Manage Server permission to add bots'}
                    >
                      <Plus size={16} />
                      {guild.canInvite ? 'Add Bot' : 'No Permission'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {guilds.length === 0 && (
            <div className="text-center py-12">
              <Server size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No servers found</h3>
              <p className="text-gray-600 mb-4">Make sure you're logged in with Discord and have manage permissions in at least one server</p>
              <button
                onClick={loadGuilds}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const selectedGuild = guilds.find(g => g.id === selectedGuildId)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats && selectedGuild) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
        <button
          onClick={loadStats}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Server Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Back to server selection"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
              {selectedGuild?.icon ? (
                <img
                  src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png?size=128`}
                  alt={selectedGuild.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                selectedGuild?.name?.charAt(0) || 'S'
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedGuild?.name || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Server Management</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowQuickSetup(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Zap size={16} />
              Quick Setup
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Server size={16} />
              Switch Server
            </button>
          </div>
        </div>
      </div>

      {/* Quick Setup Modal */}
      {showQuickSetup && (
        <QuickSetupModal
          guildId={selectedGuildId}
          onClose={() => setShowQuickSetup(false)}
          onComplete={() => {
            setShowQuickSetup(false)
            loadStats()
            toast.success('Quick setup completed!')
          }}
        />
      )}

      {/* Dashboard Content */}
      {stats && (
        <>
          <OverviewStats stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityChart data={stats.recentActivity} />
            <QuickActions onRefresh={loadStats} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={stats.recentActivity} />
            <TopChannels channels={stats.topChannels} />
          </div>
        </>
      )}
    </div>
  )
}

// Quick Setup Modal Component
function QuickSetupModal({ guildId, onClose, onComplete }: {
  guildId: string
  onClose: () => void
  onComplete: () => void
}) {
  const [step, setStep] = useState(1)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [settings, setSettings] = useState({
    inactivityDays: 30,
    autoArchive: true
  })
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState<Array<{id: string, name: string, type: string, category?: string}>>([])
  const [channelsLoading, setChannelsLoading] = useState(true)
  const [channelsError, setChannelsError] = useState<string | null>(null)

  // Fetch real Discord channels
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

  const handleComplete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guildId,
          channels: selectedChannels,
          settings
        })
      })

      if (response.ok) {
        onComplete()
      } else {
        toast.error('Setup failed')
      }
    } catch (error) {
      console.error('Setup error:', error)
      toast.error('Setup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Setup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Channels to Monitor</h3>
            {channelsLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="lg" />
                <span className="ml-3 text-gray-600">Loading channels...</span>
              </div>
            ) : channelsError ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800 font-medium mb-2">Unable to load Discord channels</p>
                    <p className="text-amber-700 text-sm mb-3">{channelsError}</p>
                    {channelsError.includes('sign out') && (
                      <p className="text-amber-700 text-sm">
                        <strong>Solution:</strong> Go to your profile menu and sign out, then sign in again with Discord.
                      </p>
                    )}
                    {channels.length > 0 && (
                      <p className="text-amber-700 text-sm mt-2">
                        <strong>Note:</strong> Showing fallback channels for testing. Your actual setup may need adjustment.
                      </p>
                    )}
                    <button
                      onClick={fetchChannels}
                      disabled={channelsLoading}
                      className="mt-3 px-3 py-1 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {channelsLoading ? <LoadingSpinner size="sm" /> : '🔄'}
                      {channelsLoading ? 'Retrying...' : 'Retry Loading Channels'}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            {channels.length > 0 && (
              <div className="space-y-2 mb-6">
                {channelsError && (
                  <div className="text-sm text-amber-600 mb-3 p-2 bg-amber-50 rounded border border-amber-200">
                    ⚠️ Using fallback channels. Real channels will be used once Discord connection is restored.
                  </div>
                )}
                {channels.map((channel: any) => (
                  <label key={channel.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(channel.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChannels([...selectedChannels, channel.id])
                        } else {
                          setSelectedChannels(selectedChannels.filter(id => id !== channel.id))
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 mr-3"
                    />
                    <span className="font-mono text-gray-700">#{channel.name}</span>
                    {channel.category && (
                      <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {channel.category}
                      </span>
                    )}
                    {channel.id.startsWith('fallback-') && (
                      <span className="ml-2 text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                        Fallback
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={selectedChannels.length === 0 || channelsLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Configure Settings</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inactivity Days (before archiving)
                </label>
                <input
                  type="number"
                  value={settings.inactivityDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    inactivityDays: parseInt(e.target.value)
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  min="1"
                  max="365"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoArchive}
                    onChange={(e) => setSettings({
                      ...settings,
                      autoArchive: e.target.checked
                    })}
                    className="rounded border-gray-300 text-indigo-600 mr-3"
                  />
                  <span>Enable automatic archiving</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-lg">
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Zap size={16} />}
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}