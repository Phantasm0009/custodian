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

    // If guildId is provided, try to fetch guild-specific settings
    let guildSettings = null
    if (guildId) {
      // Check if the guild has any watched channels (indicating bot presence)
      const watchedChannels = await prisma.watchedChannel.findFirst({
        where: { guildId }
      })

      if (watchedChannels) {
        // Guild has the bot, load settings (in real app, you'd have a guild_settings table)
        guildSettings = {
          guildId,
          hasBot: true
        }
      }
    }

    // Default settings with guild-specific overrides
    const settings = {
      general: {
        botName: 'ArchiveMind',
        defaultPrefix: guildSettings ? '/' : '!', // Use slash commands if bot is present
        timezone: 'UTC',
        language: 'en',
        theme: 'dark',
        guildId: guildId || null,
        hasBot: guildSettings?.hasBot || false
      },
      archive: {
        autoArchiveEnabled: true,
        retentionDays: 730, // 2 years
        compressionEnabled: true,
        maxFileSize: 25 * 1024 * 1024, // 25MB
        allowedFileTypes: ['.txt', '.pdf', '.docx', '.xlsx', '.png', '.jpg', '.gif']
      },
      notifications: {
        webhookUrl: '',
        discordNotifications: true,
        emailNotifications: false,
        archiveCompleteNotify: true,
        errorNotifications: true
      },
      permissions: {
        adminRoles: ['Administrator', 'Moderator'],
        viewerRoles: ['Member'],
        requirePermission: true
      },
      rateLimit: {
        messagesPerBatch: 50,
        batchDelay: 5000,
        maxRetries: 3,
        backoffMultiplier: 2
      }
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await request.json()
    const guildId = settings.general?.guildId

    // In a real app, you would save settings to database
    // For now, we'll just validate and return success
    
    if (guildId) {
      // Validate that the guild has the bot
      const watchedChannels = await prisma.watchedChannel.findFirst({
        where: { guildId }
      })

      if (!watchedChannels) {
        return NextResponse.json(
          { error: 'Bot not found in this guild' },
          { status: 400 }
        )
      }

      // Here you would save guild-specific settings
      // await prisma.guildSettings.upsert({
      //   where: { guildId },
      //   create: { guildId, settings },
      //   update: { settings }
      // })
    }

    // Validate prefix
    if (settings.general?.defaultPrefix) {
      const prefix = settings.general.defaultPrefix.trim()
      if (prefix.length === 0 || prefix.length > 5) {
        return NextResponse.json(
          { error: 'Prefix must be 1-5 characters long' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
