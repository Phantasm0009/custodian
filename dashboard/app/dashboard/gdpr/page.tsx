'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Shield, Download, Trash2, UserX, AlertTriangle, CheckCircle, FileText, Users, Database, Calendar } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatNumber, formatDate } from '@/lib/utils'

interface GDPRData {
  overview: {
    totalUsers: number
    totalChannels: number
    totalResources: number
    dataRetention: {
      last30Days: number
      last90Days: number
      lastYear: number
      total: number
    }
  }
  compliance: {
    dataRetentionPolicy: string
    lastAudit: string
    gdprCompliant: boolean
    encryptionEnabled: boolean
  }
}

interface GDPRAction {
  id: string
  type: 'export' | 'delete' | 'anonymize'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  userId?: string
  reason: string
  createdAt: string
  completedAt?: string
}

export default function GDPRPage() {
  const searchParams = useSearchParams()
  const guildId = searchParams.get('guild')
  
  const [data, setData] = useState<GDPRData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState<string | null>(null)
  const [userId, setUserId] = useState('')
  const [reason, setReason] = useState('')
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null)
  const [recentActions, setRecentActions] = useState<GDPRAction[]>([])
  useEffect(() => {
    if (guildId) {
      fetchGDPRData()
      loadRecentActions()
    }
  }, [guildId])

  const fetchGDPRData = async () => {
    if (!guildId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/gdpr?guildId=${guildId}`)
      if (!response.ok) throw new Error('Failed to fetch GDPR data')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const loadRecentActions = () => {
    // Mock recent actions - in a real app, this would come from the database
    const mockActions: GDPRAction[] = [
      {
        id: '1',
        type: 'export',
        status: 'completed',
        userId: '123456789',
        reason: 'User data request',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'delete',
        status: 'processing',
        userId: '987654321',
        reason: 'Account deletion request',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ]
    setRecentActions(mockActions)
  }
  const handleGDPRAction = async (action: 'export_data' | 'delete_user_data' | 'anonymize_data') => {
    if (!userId.trim() || !reason.trim()) {
      setError('Please provide both User ID and reason')
      return
    }

    try {
      setProcessing(action)
      setError(null)
      
      if (action === 'export_data') {
        // Handle data export with file download
        const exportFormat = (document.getElementById('exportFormat') as HTMLSelectElement)?.value || 'json'
        
        const response = await fetch(`/api/gdpr/export?userId=${encodeURIComponent(userId)}&format=${exportFormat}`)
        
        if (!response.ok) throw new Error('Failed to export data')
        
        // Create download link
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `user_data_${userId}_${Date.now()}.${exportFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        // Add success message
        setError(null)
        alert(`Data export completed successfully! File downloaded: user_data_${userId}_${Date.now()}.${exportFormat}`)
      } else {
        // Handle other GDPR actions
        const response = await fetch('/api/gdpr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, userId, reason })
        })

        if (!response.ok) throw new Error('Failed to process GDPR action')
        
        const result = await response.json()
        alert(`${action.replace('_', ' ')} completed successfully!`)
      }
      
      // Add to recent actions
      const newAction: GDPRAction = {
        id: Date.now().toString(),
        type: action.replace('_data', '').replace('_user', '') as 'export' | 'delete' | 'anonymize',
        status: 'completed',
        userId,
        reason,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
      setRecentActions([newAction, ...recentActions.slice(0, 9)])
      
      // Clear form
      setUserId('')
      setReason('')
      setShowConfirmDialog(null)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process action')
    } finally {
      setProcessing(null)
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'export': return <Download className="h-4 w-4" />
      case 'delete': return <Trash2 className="h-4 w-4" />
      case 'anonymize': return <UserX className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case 'export': return 'bg-blue-100 text-blue-800'
      case 'delete': return 'bg-red-100 text-red-800'
      case 'anonymize': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading GDPR tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Shield className="h-8 w-8 text-green-600 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GDPR Compliance Tools</h1>
          <p className="text-gray-600">Manage data privacy and user rights compliance</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Compliance Status */}
      {data && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">GDPR Compliant</p>
                <p className="font-semibold text-green-600">
                  {data.compliance.gdprCompliant ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Encryption</p>
                <p className="font-semibold text-blue-600">
                  {data.compliance.encryptionEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Retention Policy</p>
                <p className="font-semibold text-purple-600">
                  {data.compliance.dataRetentionPolicy}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-orange-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Last Audit</p>
                <p className="font-semibold text-orange-600">
                  {formatDate(data.compliance.lastAudit)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Overview */}
      {data && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.totalUsers)}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            
            <div className="text-center">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.totalChannels)}</p>
              <p className="text-sm text-gray-600">Archived Channels</p>
            </div>
            
            <div className="text-center">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.totalResources)}</p>
              <p className="text-sm text-gray-600">Total Resources</p>
            </div>
            
            <div className="text-center">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.dataRetention.last30Days)}</p>
              <p className="text-sm text-gray-600">Last 30 Days</p>
            </div>
          </div>
        </div>
      )}

      {/* GDPR Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">GDPR Actions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter Discord User ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for GDPR action (required for compliance)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select
                  id="exportFormat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowConfirmDialog('export_data')}
              disabled={!userId.trim() || !reason.trim() || processing === 'export_data'}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              {processing === 'export_data' ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export User Data
            </button>
            
            <button
              onClick={() => setShowConfirmDialog('anonymize_data')}
              disabled={!userId.trim() || !reason.trim() || processing === 'anonymize_data'}
              className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex items-center justify-center"
            >
              {processing === 'anonymize_data' ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <UserX className="h-4 w-4 mr-2" />
              )}
              Anonymize User Data
            </button>
            
            <button
              onClick={() => setShowConfirmDialog('delete_user_data')}
              disabled={!userId.trim() || !reason.trim() || processing === 'delete_user_data'}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
            >
              {processing === 'delete_user_data' ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete User Data
            </button>
          </div>
        </div>
      </div>

      {/* Recent Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Actions</h2>
        
        {recentActions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No recent GDPR actions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${getActionColor(action.type)}`}>
                    {getActionIcon(action.type)}
                    <span className="ml-1 capitalize">{action.type}</span>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      User ID: {action.userId}
                    </p>
                    <p className="text-sm text-gray-500">{action.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                    {action.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(action.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Action</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to {showConfirmDialog.replace('_', ' ')} for user ID: {userId}?
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGDPRAction(showConfirmDialog as any)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
