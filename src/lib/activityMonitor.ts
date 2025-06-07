import { Client, TextChannel } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { logger, ArchiveLogger } from './logger';
import { ArchiveManager } from './archiveManager';
import type { WatchOptions } from '../types';

/**
 * Activity Monitor
 * Tracks channel activity and triggers archiving based on inactivity periods
 */
export class ActivityMonitor {
  private client: Client;
  private prisma: PrismaClient;
  private archiveManager: ArchiveManager;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour

  constructor(client: Client, prisma: PrismaClient) {
    this.client = client;
    this.prisma = prisma;
    this.archiveManager = new ArchiveManager(client, prisma);
  }

  /**
   * Start monitoring watched channels
   */
  async startMonitoring(): Promise<void> {
    logger.info('📊 Starting activity monitoring...');
    
    // Initial check
    await this.checkAllWatchedChannels();
    
    // Set up recurring checks
    this.monitoringInterval = setInterval(async () => {
      await this.checkAllWatchedChannels();
    }, this.CHECK_INTERVAL);
    
    logger.info('✅ Activity monitoring started');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      logger.info('⏹️ Activity monitoring stopped');
    }
  }

  /**
   * Add a channel to the watch list
   */
  async watchChannel(options: WatchOptions): Promise<{ success: boolean; message: string }> {
    try {
      // Check if channel exists
      const channel = await this.client.channels.fetch(options.channelId) as TextChannel;
      if (!channel) {
        return { success: false, message: 'Channel not found' };
      }

      // Check if already being watched
      const existing = await this.prisma.watchedChannel.findUnique({
        where: { channelId: options.channelId }
      });

      if (existing) {
        // Update existing watch configuration
        await this.prisma.watchedChannel.update({
          where: { channelId: options.channelId },
          data: {
            inactivityDays: options.inactivityDays,
            rescueResources: options.rescueResources,
            isActive: true
          }
        });
        
        return { 
          success: true, 
          message: `Updated watch settings for #${channel.name}` 
        };
      }

      // Create new watch entry
      await this.prisma.watchedChannel.create({
        data: {
          channelId: options.channelId,
          guildId: options.guildId,
          inactivityDays: options.inactivityDays,
          rescueResources: options.rescueResources,
          lastActivity: new Date(),
          isActive: true
        }
      });

      logger.info(`👁️ Now watching channel: ${channel.name} (${options.inactivityDays} days)`);
      
      return { 
        success: true, 
        message: `Now watching #${channel.name} for ${options.inactivityDays} days of inactivity` 
      };

    } catch (error) {
      logger.error('Failed to watch channel:', error);
      return { success: false, message: 'Failed to watch channel' };
    }
  }

  /**
   * Remove a channel from the watch list
   */
  async unwatchChannel(channelId: string): Promise<{ success: boolean; message: string }> {
    try {
      const watchedChannel = await this.prisma.watchedChannel.findUnique({
        where: { channelId }
      });

      if (!watchedChannel) {
        return { success: false, message: 'Channel is not being watched' };
      }

      await this.prisma.watchedChannel.update({
        where: { channelId },
        data: { isActive: false }
      });

      const channel = await this.client.channels.fetch(channelId) as TextChannel;
      const channelName = channel?.name || channelId;

      logger.info(`👁️ Stopped watching channel: ${channelName}`);
      
      return { 
        success: true, 
        message: `Stopped watching #${channelName}` 
      };

    } catch (error) {
      logger.error('Failed to unwatch channel:', error);
      return { success: false, message: 'Failed to unwatch channel' };
    }
  }

  /**
   * Update last activity timestamp for a channel
   */
  async updateChannelActivity(channelId: string): Promise<void> {
    try {
      const watchedChannel = await this.prisma.watchedChannel.findUnique({
        where: { channelId, isActive: true }
      });

      if (watchedChannel) {
        await this.prisma.watchedChannel.update({
          where: { channelId },
          data: { lastActivity: new Date() }
        });

        ArchiveLogger.logActivityUpdate(channelId, new Date());
      }
    } catch (error) {
      logger.error(`Failed to update activity for channel ${channelId}:`, error);
    }
  }

  /**
   * Get list of all watched channels
   */
  async getWatchedChannels(guildId?: string): Promise<any[]> {
    try {
      const whereClause: any = { isActive: true };
      if (guildId) {
        whereClause.guildId = guildId;
      }

      return await this.prisma.watchedChannel.findMany({
        where: whereClause,
        orderBy: { lastActivity: 'asc' }
      });
    } catch (error) {
      logger.error('Failed to get watched channels:', error);
      return [];
    }
  }

  /**
   * Check all watched channels for inactivity
   */
  private async checkAllWatchedChannels(): Promise<void> {
    try {
      const watchedChannels = await this.prisma.watchedChannel.findMany({
        where: { isActive: true }
      });

      logger.debug(`🔍 Checking ${watchedChannels.length} watched channels for inactivity`);

      for (const watched of watchedChannels) {
        await this.checkChannelInactivity(watched);
      }
    } catch (error) {
      logger.error('Failed to check watched channels:', error);
    }
  }

  /**
   * Check individual channel for inactivity and trigger appropriate actions
   */
  private async checkChannelInactivity(watchedChannel: any): Promise<void> {
    try {
      const now = DateTime.now();
      const lastActivity = DateTime.fromJSDate(watchedChannel.lastActivity);
      const daysSinceActivity = now.diff(lastActivity, 'days').days;

      // Check if channel still exists
      const channel = await this.client.channels.fetch(watchedChannel.channelId).catch(() => null);
      if (!channel) {
        // Channel was deleted, remove from watch list
        await this.prisma.watchedChannel.update({
          where: { channelId: watchedChannel.channelId },
          data: { isActive: false }
        });
        return;
      }

      const channelName = (channel as TextChannel).name;
      const inactivityThreshold = watchedChannel.inactivityDays;

      // Define warning thresholds
      const warningThresholds = [
        { days: 7, type: 'SEVEN_DAYS' as const },
        { days: 3, type: 'THREE_DAYS' as const },
        { days: 1, type: 'ONE_DAY' as const },
        { days: 0.5, type: 'FINAL_WARNING' as const }
      ];

      // Check if it's time to archive
      if (daysSinceActivity >= inactivityThreshold) {
        logger.info(`📦 Archiving channel ${channelName} after ${Math.floor(daysSinceActivity)} days of inactivity`);
        
        await this.archiveManager.archiveChannel(watchedChannel.channelId, {
          inactivityDays: watchedChannel.inactivityDays,
          rescueResources: watchedChannel.rescueResources
        });

        // Remove from watch list
        await this.prisma.watchedChannel.update({
          where: { channelId: watchedChannel.channelId },
          data: { isActive: false }
        });

        return;
      }

      // Check for warning thresholds
      for (const threshold of warningThresholds) {
        const daysUntilArchive = inactivityThreshold - daysSinceActivity;
        
        if (daysUntilArchive <= threshold.days && daysUntilArchive > 0) {
          // Check if we've already sent this warning
          const existingWarning = await this.prisma.archiveWarning.findFirst({
            where: {
              channelId: watchedChannel.channelId,
              warningType: threshold.type,
              sentAt: {
                gte: DateTime.now().minus({ days: 1 }).toJSDate() // Within last 24 hours
              }
            }
          });

          if (!existingWarning) {
            await this.archiveManager.sendArchiveWarning(
              watchedChannel.channelId,
              threshold.type,
              Math.ceil(daysUntilArchive)
            );
          }
          break; // Only send one warning per check
        }
      }

    } catch (error) {
      logger.error(`Failed to check inactivity for channel ${watchedChannel.channelId}:`, error);
    }
  }

  /**
   * Get activity statistics for a guild
   */
  async getActivityStats(guildId: string): Promise<{
    totalWatched: number;
    activeChannels: number;
    inactiveChannels: number;
    channelsNearArchive: number;
    averageInactivityDays: number;
  }> {
    try {
      const watchedChannels = await this.prisma.watchedChannel.findMany({
        where: { guildId, isActive: true }
      });

      const now = DateTime.now();
      let totalInactivityDays = 0;
      let activeChannels = 0;
      let inactiveChannels = 0;
      let channelsNearArchive = 0;

      for (const watched of watchedChannels) {
        const lastActivity = DateTime.fromJSDate(watched.lastActivity);
        const daysSinceActivity = now.diff(lastActivity, 'days').days;
        
        totalInactivityDays += daysSinceActivity;

        if (daysSinceActivity < 1) {
          activeChannels++;
        } else if (daysSinceActivity < watched.inactivityDays) {
          inactiveChannels++;
        }

        // Near archive if within 3 days of threshold
        if (daysSinceActivity >= watched.inactivityDays - 3) {
          channelsNearArchive++;
        }
      }

      return {
        totalWatched: watchedChannels.length,
        activeChannels,
        inactiveChannels,
        channelsNearArchive,
        averageInactivityDays: watchedChannels.length > 0 
          ? totalInactivityDays / watchedChannels.length 
          : 0
      };
    } catch (error) {
      logger.error('Failed to get activity stats:', error);
      return {
        totalWatched: 0,
        activeChannels: 0,
        inactiveChannels: 0,
        channelsNearArchive: 0,
        averageInactivityDays: 0
      };
    }
  }

  /**
   * Postpone archiving for a channel by adding extra days
   */
  async postponeArchive(channelId: string, additionalDays: number = 7): Promise<boolean> {
    try {
      const watchedChannel = await this.prisma.watchedChannel.findUnique({
        where: { channelId, isActive: true }
      });

      if (!watchedChannel) {
        return false;
      }

      // Update last activity to effectively postpone archiving
      const newLastActivity = DateTime.now().minus({ days: -additionalDays }).toJSDate();
      
      await this.prisma.watchedChannel.update({
        where: { channelId },
        data: { lastActivity: newLastActivity }
      });

      const channel = await this.client.channels.fetch(channelId) as TextChannel;
      logger.info(`⏰ Postponed archiving for ${channel?.name || channelId} by ${additionalDays} days`);

      return true;
    } catch (error) {
      logger.error(`Failed to postpone archive for channel ${channelId}:`, error);
      return false;
    }
  }
}
