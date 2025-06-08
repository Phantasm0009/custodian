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
    const exportId = searchParams.get('id')
    const userId = searchParams.get('userId')
    const format = searchParams.get('format') || 'json'

    if (!exportId && !userId) {
      return NextResponse.json(
        { error: 'Export ID or User ID required' },
        { status: 400 }
      )
    }

    if (userId) {
      // Export all data for a specific user
      const [resources, archivedChannels] = await Promise.all([
        prisma.resource.findMany({
          where: { authorName: { contains: userId, mode: 'insensitive' } },
          include: {
            channel: {
              select: {
                name: true,
                guildId: true
              }
            }
          }
        }),
        prisma.archivedChannel.findMany({
          where: {
            OR: [
              { archiveMetadata: { path: ['authorId'], equals: userId } },
              { originalName: { contains: userId, mode: 'insensitive' } }
            ]
          }
        })
      ])

      const exportData = {
        userId,
        exportDate: new Date().toISOString(),
        data: {
          resources: resources.map(r => ({
            id: r.id,
            type: r.type,
            url: r.url,
            fileName: r.fileName,
            content: r.content,
            authorName: r.authorName,
            createdAt: r.createdAt,
            channelName: r.channel?.name,
            guildId: r.channel?.guildId
          })),
          archivedChannels: archivedChannels.map(ac => ({
            id: ac.id,
            channelId: ac.channelId,
            guildId: ac.guildId,
            originalName: ac.originalName,
            archivedAt: ac.archivedAt,
            messageCount: ac.messageCount
          }))
        },
        summary: {
          totalResources: resources.length,
          totalArchivedChannels: archivedChannels.length
        }
      }

      // Set appropriate headers for download
      const headers = new Headers()
      
      if (format === 'csv') {
        headers.set('Content-Type', 'text/csv; charset=utf-8')
        headers.set('Content-Disposition', `attachment; filename="user_data_${userId}_${Date.now()}.csv"`)
        
        // Convert to CSV format
        const csvData = convertToCSV(exportData)
        return new NextResponse(csvData, { headers })
      } else {
        headers.set('Content-Type', 'application/json; charset=utf-8')
        headers.set('Content-Disposition', `attachment; filename="user_data_${userId}_${Date.now()}.json"`)
        
        return new NextResponse(JSON.stringify(exportData, null, 2), { headers })
      }
    }

    // Mock export file retrieval (in a real app, you'd store export files)
    const mockExportData = {
      exportId,
      status: 'completed',
      createdAt: new Date().toISOString(),
      downloadUrl: `/api/gdpr/export?id=${exportId}&download=true`
    }

    return NextResponse.json(mockExportData)
  } catch (error) {
    console.error('Error processing export:', error)
    return NextResponse.json(
      { error: 'Failed to process export' },
      { status: 500 }
    )
  }
}

function convertToCSV(data: any): string {
  const resources = data.data.resources
  const archivedChannels = data.data.archivedChannels

  let csv = 'Type,ID,Name,Content,Author,Date,Channel,Guild\n'

  // Add resources
  resources.forEach((resource: any) => {
    csv += `Resource,${resource.id},"${resource.fileName || 'N/A'}","${(resource.content || '').replace(/"/g, '""')}","${resource.authorName}","${resource.createdAt}","${resource.channelName || 'N/A'}","${resource.guildId || 'N/A'}"\n`
  })

  // Add archived channels
  archivedChannels.forEach((channel: any) => {
    csv += `ArchivedChannel,${channel.id},"${channel.originalName}","${channel.messageCount} messages","N/A","${channel.archivedAt}","${channel.channelId}","${channel.guildId}"\n`
  })

  return csv
}
