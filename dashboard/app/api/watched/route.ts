import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get('guildId')    const watchedChannels = await prisma.watchedChannel.findMany({
      where: guildId ? { guildId } : {},
      orderBy: { lastActivity: 'desc' },
      select: {
        id: true,
        channelId: true,
        guildId: true,
        inactivityDays: true,
        lastActivity: true,
        rescueResources: true,
        watchedSince: true,
        isActive: true
      }
    })    const formattedChannels = watchedChannels.map(channel => ({
      id: channel.id,
      channelId: channel.channelId,
      guildId: channel.guildId,
      name: `Channel-${channel.channelId}`, // Placeholder since we don't store names
      inactivityDays: channel.inactivityDays,
      lastActivity: channel.lastActivity.toISOString(),
      timeUntilArchive: Math.max(0, channel.inactivityDays - Math.floor((Date.now() - channel.lastActivity.getTime()) / (1000 * 60 * 60 * 24))),
      resourceCount: 0, // Placeholder since we don't have direct relation
      rescueEnabled: channel.rescueResources,
      watchedSince: channel.watchedSince.toISOString(),
      isActive: channel.isActive
    }))

    return NextResponse.json(formattedChannels)
  } catch (error) {
    console.error('Error fetching watched channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watched channels' },
      { status: 500 }
    )
  }
}
