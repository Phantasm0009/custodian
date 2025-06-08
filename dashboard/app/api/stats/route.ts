import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get('guildId')    // Get basic stats
    const [watchedChannels, archivedChannels, resources] = await Promise.all([
      prisma.watchedChannel.count(guildId ? { where: { guildId } } : {}),
      prisma.archivedChannel.count(guildId ? { where: { guildId } } : {}),
      prisma.resource.count(guildId ? { 
        where: { 
          channel: { 
            guildId 
          } 
        } 
      } : {}),
    ])

    // Get resources by type
    const resourcesByType = await prisma.resource.groupBy({
      by: ['type'],
      where: guildId ? { 
        channel: { 
          guildId 
        } 
      } : {},
      _count: { type: true },
    })

    const resourcesGrouped = resourcesByType.reduce((acc, item) => {
      acc[item.type] = item._count.type
      return acc
    }, {} as Record<string, number>)

    // Get recent activity (recent archives/resources)
    const recentActivity = await prisma.archivedChannel.findMany({
      where: guildId ? { guildId } : {},
      orderBy: { archivedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        archivedAt: true,
        guildId: true,
        _count: { select: { resources: true } }
      }
    })

    // Get top channels by resource count
    const topChannels = await prisma.archivedChannel.findMany({
      where: guildId ? { guildId } : {},
      orderBy: { resources: { _count: 'desc' } },
      take: 5,
      select: {
        id: true,
        name: true,
        archivedAt: true,
        _count: { select: { resources: true } }
      }
    })

    // Calculate storage used (mock for now)
    const storageUsed = resources * 1024 * 500 // Rough estimate

    const stats = {
      totalChannels: watchedChannels + archivedChannels,
      watchedChannels,
      archivedChannels,
      totalResources: resources,
      resourcesByType: resourcesGrouped,
      recentActivity: recentActivity.map(channel => ({
        id: channel.id,
        type: 'archived',
        title: `Channel "${channel.name}" archived`,
        timestamp: channel.archivedAt,
        resourceCount: channel._count.resources
      })),
      storageUsed,
      topChannels: topChannels.map(channel => ({
        id: channel.id,
        name: channel.name,
        resourceCount: channel._count.resources,
        archivedAt: channel.archivedAt
      }))
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
