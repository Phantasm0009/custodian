'use client'

import { useState, useEffect } from 'react'
import { OverviewStats } from '@/components/dashboard/OverviewStats'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { TopChannels } from '@/components/dashboard/TopChannels'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { dashboardApi, type DashboardStats } from '@/lib/api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGuild, setSelectedGuild] = useState<string>('')

  useEffect(() => {
    loadStats()
  }, [selectedGuild])

  const loadStats = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getStats(selectedGuild || undefined)
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

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

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
        <button
          onClick={loadStats}
          className="mt-4 btn-primary"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your ArchiveMind bot activity and statistics
          </p>
        </div>
        <QuickActions onRefresh={loadStats} />
      </div>

      {/* Overview Stats */}
      <OverviewStats stats={stats} />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={stats.recentActivity} />
        <RecentActivity activities={stats.recentActivity} />
      </div>

      {/* Top Channels */}
      <TopChannels channels={stats.topChannels} />
    </div>
  )
}