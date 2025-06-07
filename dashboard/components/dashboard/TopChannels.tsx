'use client'

import { formatNumber, formatRelativeTime } from '@/lib/utils'
import { Hash, Users, Clock } from 'lucide-react'

interface TopChannelsProps {
  channels: any[]
}

export function TopChannels({ channels }: TopChannelsProps) {
  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Valuable Channels</h3>
        <p className="text-sm text-gray-600">Channels with the most rescued resources</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resources
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {channels.length > 0 ? (
              channels.slice(0, 5).map((channel, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {channel.name || `Channel ${index + 1}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {channel.category || 'No category'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatNumber(channel.resourceCount || 0)}
                    </div>
                    <div className="text-sm text-gray-500">
                      resources saved
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      channel.status === 'archived' 
                        ? 'bg-gray-100 text-gray-800'
                        : channel.status === 'watched'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {channel.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatRelativeTime(channel.lastActivity || new Date())}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No channel data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}