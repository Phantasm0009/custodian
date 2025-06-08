import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get('guildId')

    // Bot application ID (this should come from environment variables)
    const botClientId = process.env.DISCORD_CLIENT_ID || '1380362496774246572'
    
    // Required permissions for the bot (these are the permissions the bot needs)
    const permissions = [
      'VIEW_CHANNEL',
      'SEND_MESSAGES', 
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'USE_SLASH_COMMANDS'
    ].join('+')

    // Create Discord OAuth invite URL
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${botClientId}&permissions=1099511627776&scope=bot+applications.commands${guildId ? `&guild_id=${guildId}` : ''}`

    return NextResponse.json({
      inviteUrl,
      permissions: [
        'View Channels',
        'Send Messages',
        'Manage Messages', 
        'Embed Links',
        'Attach Files',
        'Read Message History',
        'Use Slash Commands'
      ]
    })
  } catch (error) {
    console.error('Error generating invite:', error)
    return NextResponse.json(
      { error: 'Failed to generate invite' },
      { status: 500 }
    )
  }
}
