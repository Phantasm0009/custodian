'use client'

import { RefreshCw, Download, Settings, Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface QuickActionsProps {
  onRefresh: () => void
}

export function QuickActions({ onRefresh }: QuickActionsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
      toast.success('Dashboard refreshed')
    } catch (error) {
      toast.error('Failed to refresh dashboard')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExport = () => {
    toast.success('Export feature coming soon')
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="btn-secondary flex items-center"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </button>
      
      <button
        onClick={handleExport}
        className="btn-secondary flex items-center"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </button>
      
      <button className="btn-primary flex items-center">
        <Plus className="h-4 w-4 mr-2" />
        Quick Setup
      </button>
    </div>
  )
}