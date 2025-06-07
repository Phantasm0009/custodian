import type { Client } from 'discord.js';
import type { PrismaClient } from '@prisma/client';
import type { Collection } from 'discord.js';
import type { SlashCommand } from '../types';
import type { ArchiveManager } from './archiveManager';
import type { RescueEngine } from './rescueEngine';
import type { ActivityMonitor } from './activityMonitor';

// Define the bot type based on the actual ArchivemindBot class structure
interface BotInstance {
  client: Client;
  prisma: PrismaClient;
  commands: Collection<string, SlashCommand>;
  archiveManager: ArchiveManager;
  rescueEngine: RescueEngine;
  activityMonitor: ActivityMonitor;
}

let botInstance: BotInstance | null = null;

export function setBotInstance(bot: BotInstance): void {
  botInstance = bot;
}

export function getBotInstance(): BotInstance {
  if (!botInstance) {
    throw new Error('Bot instance not initialized. Call setBotInstance first.');
  }
  return botInstance;
}
