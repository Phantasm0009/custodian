import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface DiscordGuild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  permissions_new: string
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const withBotOnly = searchParams.get('withBotOnly') === 'true'

    // Get user's Discord access token from the database
    const account = await prisma.account.findFirst({
      where: {
        userId: (session.user as any).id,
        provider: 'discord'
      }
    })

    if (!account?.access_token) {
      return NextResponse.json({ error: 'Discord access token not found' }, { status: 400 })
    }

    // Fetch user's Discord guilds from Discord API
    const discordResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!discordResponse.ok) {
      console.error('Discord API error:', discordResponse.status, discordResponse.statusText)
      return NextResponse.json({ error: 'Failed to fetch Discord guilds' }, { status: 500 })
    }

    const userGuilds: DiscordGuild[] = await discordResponse.json()

    // Filter guilds where user can manage server (permission to invite bots)
    const manageableGuilds = userGuilds.filter(guild => {
      const permissions = BigInt(guild.permissions)
      const MANAGE_GUILD = BigInt(0x20) // 32 - Manage Server permission
      const ADMINISTRATOR = BigInt(0x8) // 8 - Administrator permission
      
      return guild.owner || (permissions & (MANAGE_GUILD | ADMINISTRATOR)) !== BigInt(0)
    })    // Check which guilds have the bot by looking for archived channels or watched channels
    const guildsWithBot = await Promise.all(
      manageableGuilds.map(async (guild) => {
        const [archivedCount, watchedCount] = await Promise.all([
          prisma.archivedChannel.count({ where: { guildId: guild.id } }),
          prisma.watchedChannel.count({ where: { guildId: guild.id } })
        ])

        const hasBot = archivedCount > 0 || watchedCount > 0

        return {
          ...guild,
          hasBot,
          canInvite: guild.owner || (BigInt(guild.permissions) & (BigInt(0x20) | BigInt(0x8))) !== BigInt(0),
          stats: hasBot ? {
            archivedChannels: archivedCount,
            watchedChannels: watchedCount
          } : undefined
        }
      })
    )

    const filteredGuilds = withBotOnly 
      ? guildsWithBot.filter(guild => guild.hasBot)
      : guildsWithBot

    return NextResponse.json({
      guilds: filteredGuilds,
      total: filteredGuilds.length
    })
  } catch (error) {
    console.error('Error fetching guilds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guilds' },
      { status: 500 }
    )
  }
}
