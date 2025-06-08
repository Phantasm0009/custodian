import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { guildId, channels, settings } = await request.json()

    if (!guildId || !channels || !Array.isArray(channels)) {
      return NextResponse.json(
        { error: 'Invalid setup data' },
        { status: 400 }
      )
    }

    // Set up watched channels for the guild
    const watchedChannels = await Promise.all(
      channels.map(async (channelId: string) => {
        return prisma.watchedChannel.upsert({
          where: {
            channelId_guildId: {
              channelId,
              guildId
            }
          },
          create: {
            channelId,
            guildId,
            watchedSince: new Date(),
            lastActivity: new Date(),
            inactivityDays: settings?.inactivityDays || 30,
            isActive: true
          },
          update: {
            isActive: true,
            inactivityDays: settings?.inactivityDays || 30
          }
        })
      })
    )

    return NextResponse.json({
      success: true,
      message: `Successfully set up ${watchedChannels.length} channels for monitoring`,
      data: {
        guildId,
        channelsConfigured: watchedChannels.length,
        settings: settings || {}
      }
    })
  } catch (error) {
    console.error('Error in quick setup:', error)
    return NextResponse.json(
      { error: 'Failed to complete setup' },
      { status: 500 }
    )
  }
}

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

    // Get current setup for the guild
    const watchedChannels = await prisma.watchedChannel.findMany({
      where: { guildId },
      select: {
        channelId: true,
        isActive: true,
        inactivityDays: true,
        watchedSince: true
      }
    })

    return NextResponse.json({
      guildId,
      channels: watchedChannels,
      isConfigured: watchedChannels.length > 0
    })
  } catch (error) {
    console.error('Error fetching setup:', error)
    return NextResponse.json(
      { error: 'Failed to fetch setup' },
      { status: 500 }
    )
  }
}
