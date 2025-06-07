import axios from 'axios'

const api = axios.create({
  baseURL: process.env.BOT_API_URL || 'http://localhost:3001',
  headers: {
    'Authorization': `Bearer ${process.env.BOT_API_SECRET}`,
    'Content-Type': 'application/json',
  },
})

export interface DashboardStats {
  totalChannels: number
  watchedChannels: number
  archivedChannels: number
  totalResources: number
  resourcesByType: Record<string, number>
  recentActivity: any[]
  storageUsed: number
  topChannels: any[]
}

export interface WatchedChannel {
  id: string
  channelId: string
  guildId: string
  name: string
  inactivityDays: number
  lastActivity: string
  timeUntilArchive: number
  resourceCount: number
  rescueEnabled: boolean
}

export interface ArchivedChannel {
  id: string
  name: string
  category: string | null
  archivedAt: string
  resourceCount: number
  restored: boolean
  canRestore: boolean
}

export interface Resource {
  id: string
  type: string
  url?: string
  fileName?: string
  content?: string
  authorName: string
  createdAt: string
  channelName: string
  tags: string[]
}

export const dashboardApi = {
  // Overview stats
  async getStats(guildId?: string): Promise<DashboardStats> {
    const response = await api.get(`/api/stats${guildId ? `?guildId=${guildId}` : ''}`)
    return response.data
  },

  // Watched channels
  async getWatchedChannels(guildId?: string): Promise<WatchedChannel[]> {
    const response = await api.get(`/api/watched${guildId ? `?guildId=${guildId}` : ''}`)
    return response.data
  },

  async updateWatchedChannel(channelId: string, data: Partial<WatchedChannel>): Promise<void> {
    await api.patch(`/api/watched/${channelId}`, data)
  },

  async removeWatchedChannel(channelId: string): Promise<void> {
    await api.delete(`/api/watched/${channelId}`)
  },

  // Archived channels
  async getArchivedChannels(guildId?: string, search?: string): Promise<ArchivedChannel[]> {
    const params = new URLSearchParams()
    if (guildId) params.append('guildId', guildId)
    if (search) params.append('search', search)
    
    const response = await api.get(`/api/archived?${params.toString()}`)
    return response.data
  },

  async restoreChannel(channelId: string, reason?: string): Promise<void> {
    await api.post(`/api/archived/${channelId}/restore`, { reason })
  },

  // Resources
  async getResources(filters: {
    guildId?: string
    type?: string
    author?: string
    search?: string
    limit?: number
  }): Promise<Resource[]> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString())
    })
    
    const response = await api.get(`/api/resources?${params.toString()}`)
    return response.data
  },

  // GDPR operations
  async forgetChannel(channelId: string, reason: string): Promise<void> {
    await api.delete(`/api/archived/${channelId}/forget`, {
      data: { reason }
    })
  },

  async exportData(guildId: string, format: 'json' | 'csv'): Promise<Blob> {
    const response = await api.get(`/api/export/${guildId}?format=${format}`, {
      responseType: 'blob'
    })
    return response.data
  },

  // Settings
  async getSettings(guildId: string): Promise<any> {
    const response = await api.get(`/api/settings/${guildId}`)
    return response.data
  },

  async updateSettings(guildId: string, settings: any): Promise<void> {
    await api.patch(`/api/settings/${guildId}`, settings)
  },
}