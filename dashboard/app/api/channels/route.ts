import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get('guildId')

    if (!guildId) {
      return NextResponse.json(
        { error: 'Guild ID required' },
        { status: 400 }
      )
    }

    // Get user's Discord access token from the database
    const account = await prisma.account.findFirst({
      where: {
        userId: (session.user as any).id,
        provider: 'discord'
      }
    })

    if (!account?.access_token) {
      return NextResponse.json({ error: 'Discord access token not found' }, { status: 400 })
    }    // Fetch guild channels from Discord API
    // Use the bot token for guild endpoints, as user tokens can't directly access these endpoints
    const discordResponse = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}/channels`, {
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!discordResponse.ok) {
      const error = await discordResponse.text()
      console.error('Discord API error:', discordResponse.status, discordResponse.statusText, error)      // If unauthorized, it might be an expired token or insufficient permissions
      if (discordResponse.status === 401) {
        return NextResponse.json({ 
          error: 'Discord access token expired or has insufficient permissions. Please sign out and sign in again.',
          code: 'TOKEN_EXPIRED',
          channels: [
            { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels' },
            { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels' },
            { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels' }
          ],
          isFallback: true
        }, { status: 401 })
      }
        // If forbidden, the user might not have the necessary permissions
      if (discordResponse.status === 403) {
        return NextResponse.json({ 
          error: 'Access denied to this Discord server. You may not have permission to view channels.',
          code: 'ACCESS_DENIED',
          channels: [
            { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels' },
            { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels' },
            { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels' }
          ],
          isFallback: true
        }, { status: 403 })
      }
      
      // For other errors, provide fallback with error details
      return NextResponse.json({ 
        error: 'Failed to fetch Discord channels',
        details: `Discord API returned ${discordResponse.status}`,
        channels: [
          { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels' },
          { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels' },
          { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels' }
        ],
        isFallback: true
      }, { status: 500 })
    }

    const channels = await discordResponse.json()

    // Filter to only text channels (type 0) and voice channels (type 2) 
    // and exclude categories (type 4) and threads
    const filteredChannels = channels
      .filter((channel: any) => channel.type === 0 || channel.type === 2) // 0 = text, 2 = voice
      .map((channel: any) => ({
        id: channel.id,
        name: channel.name,
        type: channel.type === 0 ? 'text' : 'voice',
        category: channel.parent_id ? channels.find((c: any) => c.id === channel.parent_id)?.name : null,
        position: channel.position || 0
      }))
      .sort((a: any, b: any) => a.position - b.position)

    return NextResponse.json({
      channels: filteredChannels,
      guildId
    })  } catch (error) {
    console.error('Error fetching channels:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch channels',
        channels: [
          { id: 'fallback-1', name: 'general', type: 'text', category: 'Fallback Channels (Error)' },
          { id: 'fallback-2', name: 'announcements', type: 'text', category: 'Fallback Channels (Error)' },
          { id: 'fallback-3', name: 'help', type: 'text', category: 'Fallback Channels (Error)' }
        ],
        isFallback: true
      },
      { status: 500 }
    )
  }
}
