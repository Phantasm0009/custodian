import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

/**
 * Interface for slash command structure
 */
export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

/**
 * Resource detection result
 */
export interface DetectedResource {
  type: 'FILE' | 'LINK' | 'CODE' | 'PIN' | 'IMAGE' | 'DOCUMENT';
  url?: string;
  content?: string;
  fileName?: string;
  fileSize?: number;
  context?: string;
  authorId: string;
  authorName: string;
  messageId: string;
}

/**
 * Archive options configuration
 */
export interface ArchiveOptions {
  inactivityDays: number;
  rescueResources: boolean;
  gracePeriodDays?: number;
  preservePermissions?: boolean;
  notifyMembers?: boolean;
}

/**
 * Channel monitoring configuration
 */
export interface WatchOptions {
  channelId: string;
  guildId: string;
  inactivityDays: number;
  rescueResources: boolean;
  autoArchive: boolean;
}

/**
 * Knowledge base entry structure
 */
export interface KnowledgeBaseEntry {
  title: string;
  description: string;
  author: string;
  sourceChannel: string;
  resources: DetectedResource[];
  tags: string[];
  createdAt: Date;
}

/**
 * Archive warning configuration
 */
export interface WarningConfig {
  type: 'SEVEN_DAYS' | 'THREE_DAYS' | 'ONE_DAY' | 'FINAL_WARNING';
  daysRemaining: number;
  message: string;
}

/**
 * Discord permission requirements for bot operations
 */
export const REQUIRED_PERMISSIONS = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageRoles,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.UseApplicationCommands,
] as const;

/**
 * Resource type mappings
 */
export const RESOURCE_TYPES = {
  FILE: 'FILE',
  LINK: 'LINK', 
  CODE: 'CODE',
  PIN: 'PIN',
  IMAGE: 'IMAGE',
  DOCUMENT: 'DOCUMENT',
} as const;

/**
 * Archive statistics
 */
export interface ArchiveStats {
  totalChannelsArchived: number;
  totalResourcesRescued: number;
  totalFilesSize: number;
  averageInactivityPeriod: number;
  mostActiveResourceType: string;
}

/**
 * Search query structure
 */
export interface SearchQuery {
  query: string;
  type?: 'FILE' | 'LINK' | 'CODE' | 'PIN' | 'IMAGE' | 'DOCUMENT';
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  limit?: number;
}

/**
 * Digest generation options
 */
export interface DigestOptions {
  timeframe: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  includeStats: boolean;
  includePreview: boolean;
  format: 'PDF' | 'HTML' | 'MARKDOWN';
}

/**
 * Error types specific to Archivemind operations
 */
export enum ArchivemindError {
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  CHANNEL_NOT_FOUND = 'CHANNEL_NOT_FOUND',
  ALREADY_ARCHIVED = 'ALREADY_ARCHIVED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  DISCORD_API_ERROR = 'DISCORD_API_ERROR',
  RESOURCE_EXTRACTION_FAILED = 'RESOURCE_EXTRACTION_FAILED',
  RESTORE_FAILED = 'RESTORE_FAILED',
}

/**
 * Bot configuration interface
 */
export interface BotConfig {
  defaultInactivityDays: number;
  gracePeriodDays: number;
  maxResourcesPerChannel: number;
  enableVectorSearch: boolean;
  knowledgeBaseChannelId?: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}