'use client'

import { BarChart3, Archive, Search, TrendingUp } from 'lucide-react'
import { DashboardStats } from '@/lib/api'
import { formatNumber, getResourceTypeIcon } from '@/lib/utils'

interface OverviewStatsProps {
  stats: DashboardStats
}

export function OverviewStats({ stats }: OverviewStatsProps) {
  const statCards = [
    {
      name: 'Total Channels',
      value: formatNumber(stats.totalChannels),
      change: '+12%',
      changeType: 'positive' as const,
      icon: BarChart3,
      description: 'Active, watched, and archived',
    },
    {
      name: 'Watched Channels',
      value: formatNumber(stats.watchedChannels),
      change: '+5%',
      changeType: 'positive' as const,
      icon: Archive,
      description: 'Currently being monitored',
    },
    {
      name: 'Archived Channels',
      value: formatNumber(stats.archivedChannels),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Archive,
      description: 'Successfully archived',
    },
    {
      name: 'Rescued Resources',
      value: formatNumber(stats.totalResources),
      change: '+23%',
      changeType: 'positive' as const,
      icon: Search,
      description: 'Files, links, and code saved',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-discord-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-discord-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">{stat.description}</p>
              <span className={`text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resource breakdown */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Resource Breakdown</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats.resourcesByType).map(([type, count]) => (
            <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">{getResourceTypeIcon(type)}</div>
              <div className="text-lg font-semibold text-gray-900">{formatNumber(count)}</div>
              <div className="text-xs text-gray-500 capitalize">{type.toLowerCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}