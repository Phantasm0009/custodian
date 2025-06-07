import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get('guildId')
    const search = searchParams.get('search')

    const where: any = {}
    if (guildId) where.guildId = guildId
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const archivedChannels = await prisma.archivedChannel.findMany({
      where,
      orderBy: { archivedAt: 'desc' },
      select: {
        id: true,
        name: true,
        category: true,
        archivedAt: true,
        restored: true,
        guildId: true,
        _count: {
          select: { resources: true }
        }
      }
    })

    const formattedChannels = archivedChannels.map(channel => ({
      id: channel.id,
      name: channel.name,
      category: channel.category,
      archivedAt: channel.archivedAt.toISOString(),
      resourceCount: channel._count.resources,
      restored: channel.restored,
      canRestore: !channel.restored // Can restore if not already restored
    }))

    return NextResponse.json(formattedChannels)
  } catch (error) {
    console.error('Error fetching archived channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch archived channels' },
      { status: 500 }
    )
  }
}
