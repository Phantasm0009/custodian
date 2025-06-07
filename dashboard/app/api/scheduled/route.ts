import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }    // Get scheduled archives (using WatchedChannel as a proxy for scheduling)
    const scheduledArchives = await prisma.watchedChannel.findMany({
      select: {
        id: true,
        channelId: true,
        guildId: true,
        lastActivity: true,
        watchedSince: true,
        inactivityDays: true,
        isActive: true
      },
      orderBy: {
        lastActivity: 'desc'
      }
    })    // Transform data for the frontend
    const formattedSchedules = scheduledArchives.map(channel => ({
      id: channel.id,
      channelId: channel.channelId,
      channelName: `channel-${channel.channelId.slice(-4)}`, // Mock channel name
      guildName: `guild-${channel.guildId.slice(-4)}`, // Mock guild name
      lastActivity: channel.lastActivity,
      nextScheduled: new Date(Date.now() + channel.inactivityDays * 24 * 60 * 60 * 1000),
      frequency: channel.inactivityDays <= 7 ? 'weekly' : channel.inactivityDays <= 30 ? 'monthly' : 'quarterly',
      status: channel.isActive ? 'active' : 'inactive',
      archiveCount: 0, // Will be calculated differently
      createdAt: channel.watchedSince,
      updatedAt: channel.watchedSince
    }))

    return NextResponse.json({
      scheduled: formattedSchedules,
      total: formattedSchedules.length
    })
  } catch (error) {
    console.error('Error fetching scheduled archives:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scheduled archives' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { channelId, frequency, enabled } = await request.json()

    // Mock implementation - in a real app, you'd create/update scheduling records
    return NextResponse.json({
      success: true,
      message: 'Schedule updated successfully'
    })
  } catch (error) {
    console.error('Error updating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    )
  }
}
