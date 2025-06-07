'use client'

import React, { useState, useEffect } from 'react'
import { Save, AlertCircle, CheckCircle, Settings as SettingsIcon, Shield, Bell, Archive, Zap } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Settings {
  general: {
    botName: string
    defaultPrefix: string
    timezone: string
    language: string
    theme: string
  }
  archive: {
    autoArchiveEnabled: boolean
    retentionDays: number
    compressionEnabled: boolean
    maxFileSize: number
    allowedFileTypes: string[]
  }
  notifications: {
    webhookUrl: string
    discordNotifications: boolean
    emailNotifications: boolean
    archiveCompleteNotify: boolean
    errorNotifications: boolean
  }
  permissions: {
    adminRoles: string[]
    viewerRoles: string[]
    requirePermission: boolean
  }
  rateLimit: {
    messagesPerBatch: number
    batchDelay: number
    maxRetries: number
    backoffMultiplier: number
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const result = await response.json()
      setSettings(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)
      setError(null)
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (!response.ok) throw new Error('Failed to save settings')
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (section: keyof Settings, key: string, value: any) => {
    if (!settings) return
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    })
  }

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'archive', name: 'Archive', icon: Archive },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'permissions', name: 'Permissions', icon: Shield },
    { id: 'rateLimit', name: 'Rate Limiting', icon: Zap },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (error && !settings) {
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your ArchiveMind bot settings</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-discord-600 text-white px-4 py-2 rounded-lg hover:bg-discord-700 disabled:opacity-50 flex items-center"
        >
          {saving ? (
            <LoadingSpinner size="sm" className="mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">Settings saved successfully!</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-discord-500 text-discord-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && settings && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
                <input
                  type="text"
                  value={settings.general.botName}
                  onChange={(e) => updateSettings('general', 'botName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Prefix</label>
                <input
                  type="text"
                  value={settings.general.defaultPrefix}
                  onChange={(e) => updateSettings('general', 'defaultPrefix', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => updateSettings('general', 'timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={settings.general.theme}
                  onChange={(e) => updateSettings('general', 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          )}

          {/* Archive Settings */}
          {activeTab === 'archive' && settings && (
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.archive.autoArchiveEnabled}
                  onChange={(e) => updateSettings('archive', 'autoArchiveEnabled', e.target.checked)}
                  className="h-4 w-4 text-discord-600 focus:ring-discord-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Enable automatic archiving</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
                <input
                  type="number"
                  value={settings.archive.retentionDays}
                  onChange={(e) => updateSettings('archive', 'retentionDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.archive.compressionEnabled}
                  onChange={(e) => updateSettings('archive', 'compressionEnabled', e.target.checked)}
                  className="h-4 w-4 text-discord-600 focus:ring-discord-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Enable compression</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                <input
                  type="number"
                  value={Math.round(settings.archive.maxFileSize / (1024 * 1024))}
                  onChange={(e) => updateSettings('archive', 'maxFileSize', parseInt(e.target.value) * 1024 * 1024)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && settings && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="url"
                  value={settings.notifications.webhookUrl}
                  onChange={(e) => updateSettings('notifications', 'webhookUrl', e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.discordNotifications}
                    onChange={(e) => updateSettings('notifications', 'discordNotifications', e.target.checked)}
                    className="h-4 w-4 text-discord-600 focus:ring-discord-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Discord notifications</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.archiveCompleteNotify}
                    onChange={(e) => updateSettings('notifications', 'archiveCompleteNotify', e.target.checked)}
                    className="h-4 w-4 text-discord-600 focus:ring-discord-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Archive completion notifications</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.errorNotifications}
                    onChange={(e) => updateSettings('notifications', 'errorNotifications', e.target.checked)}
                    className="h-4 w-4 text-discord-600 focus:ring-discord-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Error notifications</label>
                </div>
              </div>
            </div>
          )}

          {/* Rate Limiting Settings */}
          {activeTab === 'rateLimit' && settings && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Messages per Batch</label>
                <input
                  type="number"
                  value={settings.rateLimit.messagesPerBatch}
                  onChange={(e) => updateSettings('rateLimit', 'messagesPerBatch', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
                <p className="mt-1 text-sm text-gray-500">Number of messages to process in each batch</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Delay (ms)</label>
                <input
                  type="number"
                  value={settings.rateLimit.batchDelay}
                  onChange={(e) => updateSettings('rateLimit', 'batchDelay', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
                <p className="mt-1 text-sm text-gray-500">Delay between processing batches</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Retries</label>
                <input
                  type="number"
                  value={settings.rateLimit.maxRetries}
                  onChange={(e) => updateSettings('rateLimit', 'maxRetries', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backoff Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.rateLimit.backoffMultiplier}
                  onChange={(e) => updateSettings('rateLimit', 'backoffMultiplier', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-discord-500 focus:border-discord-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
