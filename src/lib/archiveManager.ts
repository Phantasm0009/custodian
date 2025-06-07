import { 
  Client, 
  TextChannel, 
  CategoryChannel, 
  ChannelType,
  PermissionOverwrites,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { logger, ArchiveLogger } from './logger';
import { RescueEngine } from './rescueEngine';
import type { ArchiveOptions, DetectedResource } from '../types';

/**
 * Archive Manager
 * Handles channel archiving, restoration, and management operations
 */
export class ArchiveManager {
  private client: Client;
  private prisma: PrismaClient;
  private rescueEngine: RescueEngine;

  constructor(client: Client, prisma: PrismaClient) {
    this.client = client;
    this.prisma = prisma;
    this.rescueEngine = new RescueEngine(client, prisma);
  }

  /**
   * Archive a channel with resource rescue
   */
  async archiveChannel(
    channelId: string, 
    options: ArchiveOptions
  ): Promise<{ success: boolean; archivedChannelId?: string; resourceCount?: number }> {
    try {
      const channel = await this.client.channels.fetch(channelId) as TextChannel;
      if (!channel) {
        throw new Error(`Channel ${channelId} not found`);
      }

      // Check if already archived
      const existingArchive = await this.prisma.archivedChannel.findUnique({
        where: { originalId: channelId }
      });

      if (existingArchive && !existingArchive.restored) {
        throw new Error(`Channel ${channel.name} is already archived`);
      }

      logger.info(`📦 Starting archive process for channel: ${channel.name}`);

      // Rescue resources if enabled
      let resources: DetectedResource[] = [];
      if (options.rescueResources) {
        resources = await this.rescueEngine.rescueResources(channelId);
      }

      // Backup channel metadata
      const channelData = await this.backupChannelMetadata(channel);

      // Create archive record in database
      const archivedChannel = await this.prisma.archivedChannel.create({
        data: {
          originalId: channelId,
          name: channel.name,
          category: channel.parent?.name || null,
          guildId: channel.guild.id,
          inactivityDays: options.inactivityDays,
          topic: channel.topic,
          nsfw: channel.nsfw,
          rateLimitPerUser: channel.rateLimitPerUser,
          position: channel.position,
          permissions: channelData.permissions,
          archivedAt: new Date()
        }
      });

      // Save rescued resources to database
      if (resources.length > 0) {
        await this.rescueEngine.saveResources(resources, archivedChannel.id);
      }

      // Send notification to knowledge base channel if configured
      if (resources.length > 0 && process.env.KNOWLEDGE_BASE_CHANNEL_ID) {
        await this.postToKnowledgeBase(channel, resources);
      }

      // Send archive notification to the channel
      await this.sendArchiveNotification(channel, resources.length);

      // Delete the channel after a brief delay
      setTimeout(async () => {
        try {
          await channel.delete(`Archived by Archivemind - Inactive for ${options.inactivityDays} days`);
          ArchiveLogger.logArchive(channel.name, channel.guild.id, resources.length);
        } catch (error) {
          logger.error(`Failed to delete channel ${channel.name}:`, error);
        }
      }, 5000);

      return {
        success: true,
        archivedChannelId: archivedChannel.id,
        resourceCount: resources.length
      };

    } catch (error) {
      logger.error(`Failed to archive channel ${channelId}:`, error);
      return { success: false };
    }
  }

  /**
   * Restore an archived channel
   */
  async restoreChannel(
    channelName: string, 
    guildId: string
  ): Promise<{ success: boolean; channelId?: string }> {
    try {
      // Find archived channel by name
      const archivedChannel = await this.prisma.archivedChannel.findFirst({
        where: {
          name: channelName,
          guildId: guildId,
          restored: false
        },
        include: {
          resources: true
        }
      });

      if (!archivedChannel) {
        throw new Error(`No archived channel found with name: ${channelName}`);
      }

      const guild = await this.client.guilds.fetch(guildId);
      if (!guild) {
        throw new Error(`Guild ${guildId} not found`);
      }

      logger.info(`🔄 Restoring channel: ${channelName}`);

      // Find or create category
      let category: CategoryChannel | null = null;
      if (archivedChannel.category) {
        category = guild.channels.cache.find(
          ch => ch.type === ChannelType.GuildCategory && ch.name === archivedChannel.category
        ) as CategoryChannel || null;
      }      // Create the channel
      const channelOptions: any = {
        name: archivedChannel.name,
        type: ChannelType.GuildText,
        nsfw: archivedChannel.nsfw,
        parent: category,
        permissionOverwrites: this.restorePermissions(archivedChannel.permissions as any)
      };

      // Only add optional properties if they have values
      if (archivedChannel.topic) {
        channelOptions.topic = archivedChannel.topic;
      }
      if (archivedChannel.rateLimitPerUser) {
        channelOptions.rateLimitPerUser = archivedChannel.rateLimitPerUser;
      }
      if (archivedChannel.position !== null && archivedChannel.position !== undefined) {
        channelOptions.position = archivedChannel.position;
      }      const restoredChannel = await guild.channels.create(channelOptions) as TextChannel;

      // Send restoration notification with resources summary
      await this.sendRestorationNotification(restoredChannel, archivedChannel.resources);

      // Mark as restored in database
      await this.prisma.archivedChannel.update({
        where: { id: archivedChannel.id },
        data: {
          restored: true,
          restoredAt: new Date()
        }
      });

      ArchiveLogger.logRestore(channelName, guildId);

      return {
        success: true,
        channelId: restoredChannel.id
      };

    } catch (error) {
      logger.error(`Failed to restore channel ${channelName}:`, error);
      return { success: false };
    }
  }

  /**
   * Send archive warning to channel
   */
  async sendArchiveWarning(
    channelId: string, 
    warningType: 'SEVEN_DAYS' | 'THREE_DAYS' | 'ONE_DAY' | 'FINAL_WARNING',
    daysRemaining: number
  ): Promise<void> {
    try {
      const channel = await this.client.channels.fetch(channelId) as TextChannel;
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle('⚠️ Channel Archive Warning')
        .setColor(this.getWarningColor(warningType))
        .setDescription(this.getWarningMessage(warningType, daysRemaining))
        .addFields([
          {
            name: '📊 Channel Activity',
            value: `This channel will be archived if no messages are sent within ${daysRemaining} days.`,
            inline: false
          },
          {
            name: '🔄 How to Prevent Archiving',
            value: 'Simply send a message in this channel to reset the inactivity timer.',
            inline: false
          },
          {
            name: '📦 What Happens When Archived',
            value: 'Important resources (files, links, code) will be saved to the knowledge base before archiving.',
            inline: false
          }        ])
        .setFooter({ 
          text: 'Archivemind Bot • Use /watch to modify settings',
          ...(this.client.user?.avatarURL() ? { iconURL: this.client.user.avatarURL()! } : {})
        })
        .setTimestamp();

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`postpone_archive_${channelId}`)
            .setLabel('Postpone Archive (+7 days)')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⏰'),
          new ButtonBuilder()
            .setCustomId(`archive_now_${channelId}`)
            .setLabel('Archive Now')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('📦')
        );

      await channel.send({ embeds: [embed], components: [row] });

      // Record warning in database
      await this.prisma.archiveWarning.create({
        data: {
          channelId,
          warningType,
          sentAt: new Date()
        }
      });

      ArchiveLogger.logWarning(channel.name, warningType, daysRemaining);

    } catch (error) {
      logger.error(`Failed to send archive warning to channel ${channelId}:`, error);
    }
  }

  /**
   * Backup channel metadata before archiving
   */
  private async backupChannelMetadata(channel: TextChannel): Promise<{
    permissions: PermissionOverwrites[];
  }> {
    const permissions = Array.from(channel.permissionOverwrites.cache.values());
    
    return {
      permissions: permissions.map(perm => ({
        id: perm.id,
        type: perm.type,
        allow: perm.allow.bitfield.toString(),
        deny: perm.deny.bitfield.toString()
      })) as any
    };
  }
  /**
   * Restore channel permissions from backup
   */
  private restorePermissions(permissionsData: any): any[] {
    if (!permissionsData || !Array.isArray(permissionsData)) {
      return [];
    }

    return permissionsData.map((perm: any) => ({
      id: perm.id,
      type: perm.type,
      allow: BigInt(perm.allow),
      deny: BigInt(perm.deny)
    }));
  }

  /**
   * Send archive notification to channel
   */
  private async sendArchiveNotification(channel: TextChannel, resourceCount: number): Promise<void> {
    const embed = new EmbedBuilder()
      .setTitle('📦 Channel Archived')
      .setColor(0x95a5a6)
      .setDescription(`This channel has been archived due to inactivity.`)
      .addFields([
        {
          name: '📊 Resources Rescued',
          value: `${resourceCount} valuable resources have been saved to the knowledge base.`,
          inline: false
        },        {
          name: '🔄 Restoration',
          value: 'This channel can be restored using the `/restore` command.',
          inline: false
        }
      ])
      .setTimestamp();

    // Add footer with icon if available
    const avatarURL = this.client.user?.avatarURL();
    if (avatarURL) {
      embed.setFooter({ 
        text: 'Archivemind Bot',
        iconURL: avatarURL
      });
    } else {
      embed.setFooter({ text: 'Archivemind Bot' });
    }

    await channel.send({ embeds: [embed] });
  }

  /**
   * Send restoration notification to restored channel
   */
  private async sendRestorationNotification(
    channel: TextChannel, 
    resources: any[]
  ): Promise<void> {
    const embed = new EmbedBuilder()
      .setTitle('🔄 Channel Restored')
      .setColor(0x2ecc71)
      .setDescription('This channel has been successfully restored from the archive.')
      .addFields([
        {
          name: '📊 Original Resources',
          value: `${resources.length} resources were originally rescued from this channel.`,
          inline: false
        },        {
          name: '🔍 Access Resources',
          value: 'Use `/find` to search for the original resources in the knowledge base.',
          inline: false
        }
      ])
      .setTimestamp();

    // Add footer with icon if available
    const avatarURL2 = this.client.user?.avatarURL();
    if (avatarURL2) {
      embed.setFooter({ 
        text: 'Archivemind Bot',
        iconURL: avatarURL2
      });
    } else {
      embed.setFooter({ text: 'Archivemind Bot' });
    }

    await channel.send({ embeds: [embed] });
  }

  /**
   * Post rescued resources to knowledge base channel
   */
  private async postToKnowledgeBase(
    sourceChannel: TextChannel, 
    resources: DetectedResource[]
  ): Promise<void> {
    try {
      const knowledgeBaseChannelId = process.env.KNOWLEDGE_BASE_CHANNEL_ID;
      if (!knowledgeBaseChannelId) return;

      const knowledgeChannel = await this.client.channels.fetch(knowledgeBaseChannelId) as TextChannel;
      if (!knowledgeChannel) return;

      // Group resources by type
      const resourcesByType = resources.reduce((acc, resource) => {
        if (!acc[resource.type]) acc[resource.type] = [];
        acc[resource.type].push(resource);
        return acc;
      }, {} as Record<string, DetectedResource[]>);

      // Create embed for each resource type
      for (const [type, typeResources] of Object.entries(resourcesByType)) {
        const embed = new EmbedBuilder()
          .setTitle(`📚 Resources from #${sourceChannel.name}`)
          .setColor(this.getResourceTypeColor(type))
          .setDescription(`**Type:** ${type} • **Count:** ${typeResources.length}`)
          .addFields([
            {
              name: '📍 Source',
              value: `<#${sourceChannel.id}> (Archived)`,
              inline: true
            },
            {
              name: '📅 Archived',
              value: DateTime.now().toFormat('yyyy-MM-dd HH:mm'),
              inline: true
            }
          ]);

        // Add sample resources (limit to 5)
        const sampleResources = typeResources.slice(0, 5);
        for (const [index, resource] of sampleResources.entries()) {
          embed.addFields([{
            name: `${this.getResourceEmoji(resource.type)} ${resource.fileName || `${resource.type} ${index + 1}`}`,
            value: `**Author:** <@${resource.authorId}>\n${resource.url || resource.content?.substring(0, 100) + '...' || 'No preview available'}`,
            inline: false
          }]);
        }

        if (typeResources.length > 5) {
          embed.addFields([{
            name: '📋 Additional Resources',
            value: `... and ${typeResources.length - 5} more resources. Use \`/find\` to search all resources.`,
            inline: false
          }]);
        }

        await knowledgeChannel.send({ embeds: [embed] });
      }

    } catch (error) {
      logger.error('Failed to post to knowledge base:', error);
    }
  }

  /**
   * Get warning color based on urgency
   */
  private getWarningColor(warningType: string): number {
    switch (warningType) {
      case 'SEVEN_DAYS': return 0xf39c12;  // Orange
      case 'THREE_DAYS': return 0xe67e22;  // Dark orange
      case 'ONE_DAY': return 0xe74c3c;     // Red
      case 'FINAL_WARNING': return 0x8e44ad; // Purple
      default: return 0x95a5a6;            // Gray
    }
  }

  /**
   * Get warning message based on type
   */
  private getWarningMessage(warningType: string, daysRemaining: number): string {
    switch (warningType) {
      case 'SEVEN_DAYS':
        return `This channel will be archived in **${daysRemaining} days** due to inactivity.`;
      case 'THREE_DAYS':
        return `⚠️ **Warning:** This channel will be archived in **${daysRemaining} days** if no activity is detected.`;
      case 'ONE_DAY':
        return `🚨 **Final Notice:** This channel will be archived in **${daysRemaining} day** unless there is activity.`;
      case 'FINAL_WARNING':
        return `🚨 **URGENT:** This channel will be archived within the next few hours due to prolonged inactivity.`;
      default:
        return `This channel will be archived in ${daysRemaining} days due to inactivity.`;
    }
  }

  /**
   * Get color for resource type
   */
  private getResourceTypeColor(type: string): number {
    switch (type) {
      case 'FILE': return 0x3498db;      // Blue
      case 'LINK': return 0x2ecc71;     // Green
      case 'CODE': return 0x9b59b6;     // Purple
      case 'PIN': return 0xf1c40f;      // Yellow
      case 'IMAGE': return 0xe91e63;    // Pink
      case 'DOCUMENT': return 0x34495e; // Dark blue
      default: return 0x95a5a6;         // Gray
    }
  }

  /**
   * Get emoji for resource type
   */
  private getResourceEmoji(type: string): string {
    switch (type) {
      case 'FILE': return '📄';
      case 'LINK': return '🔗';
      case 'CODE': return '💻';
      case 'PIN': return '📌';
      case 'IMAGE': return '🖼️';
      case 'DOCUMENT': return '📋';
      default: return '📦';
    }
  }
}
