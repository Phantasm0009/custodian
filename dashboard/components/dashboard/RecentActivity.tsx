'use client'

import { formatRelativeTime, getResourceTypeIcon } from '@/lib/utils'
import { Archive, Search, AlertTriangle } from 'lucide-react'

interface RecentActivityProps {
  activities: any[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const recentActivities = activities.slice(0, 10)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'archive':
        return <Archive className="h-4 w-4 text-blue-600" />
      case 'resource':
        return <Search className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Archive className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-600">Latest bot actions and events</p>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title || 'Activity'}
                </p>
                <p className="text-sm text-gray-600">
                  {activity.description || 'No description available'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp || new Date())}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Archive className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400">
              Activity will appear here as your bot operates
            </p>
          </div>
        )}
      </div>
    </div>
  )
}