import { ArchiveManager } from '../lib/archiveManager';
import { PrismaClient } from '@prisma/client';
import { Client, TextChannel, Guild } from 'discord.js';

// Mock the logger module
jest.mock('../lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
  ArchiveLogger: {
    logArchive: jest.fn(),
    logRestore: jest.fn(),
    logWarning: jest.fn(),
    logResourceExtraction: jest.fn(),
  },
}));

// Mock Prisma
jest.mock('@prisma/client');
const mockPrisma = {
  archivedChannel: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  watchedChannel: {
    delete: jest.fn(),
  },
  resource: {
    create: jest.fn(),
  },
} as unknown as PrismaClient;

// Mock Discord Client
const mockClient = {
  user: { id: 'bot-id' },
  channels: {
    create: jest.fn(),
    fetch: jest.fn(),
  },
  guilds: {
    fetch: jest.fn(),
  },
} as unknown as Client;

describe('ArchiveManager', () => {
  let archiveManager: ArchiveManager;

  beforeEach(() => {
    archiveManager = new ArchiveManager(mockClient, mockPrisma);
    jest.clearAllMocks();
  });  describe('archiveChannel', () => {
    it('should archive a channel successfully', async () => {
      const mockChannel = {
        id: 'test-channel-id',
        name: 'test-channel',
        guild: { id: 'test-guild-id' },
        parent: null,
        topic: null,
        nsfw: false,
        rateLimitPerUser: 0,
        position: 0,
        permissionOverwrites: { cache: new Map() },
        delete: jest.fn(),
        send: jest.fn(),
      } as unknown as TextChannel;

      (mockClient.channels.fetch as jest.Mock).mockResolvedValue(mockChannel);
      (mockPrisma.archivedChannel.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.archivedChannel.create as jest.Mock).mockResolvedValue({
        id: 'archive-id',
        originalId: 'test-channel-id',
        name: 'test-channel',
      });      // Mock the RescueEngine methods
      const mockRescueResources = jest.fn().mockResolvedValue([]);
      const mockSaveResources = jest.fn().mockResolvedValue(undefined);
      
      archiveManager['rescueEngine'] = {
        rescueResources: mockRescueResources,
        saveResources: mockSaveResources,
      } as any;

      // Mock the sendArchiveNotification method to avoid Discord API calls
      const mockSendArchiveNotification = jest.fn().mockResolvedValue(undefined);
      archiveManager['sendArchiveNotification'] = mockSendArchiveNotification;

      const result = await archiveManager.archiveChannel('test-channel-id', {
        inactivityDays: 7,
        rescueResources: false,
        gracePeriodDays: 0
      });

      expect(result.success).toBe(true);
      expect(result.archivedChannelId).toBe('archive-id');
      expect(mockPrisma.archivedChannel.create).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      const mockChannel = {
        id: 'test-channel-id',
        name: 'test-channel',
        guild: { id: 'test-guild-id' },
        parent: null,
        topic: null,
        nsfw: false,
        rateLimitPerUser: 0,
        position: 0,
        permissionOverwrites: { cache: new Map() },
        delete: jest.fn(),
        send: jest.fn(),
      } as unknown as TextChannel;

      (mockClient.channels.fetch as jest.Mock).mockResolvedValue(mockChannel);
      (mockPrisma.archivedChannel.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.archivedChannel.create as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const result = await archiveManager.archiveChannel('test-channel-id', {
        inactivityDays: 7,
        rescueResources: false,
        gracePeriodDays: 0
      });

      expect(result.success).toBe(false);
    });

    it('should prevent archiving already archived channels', async () => {
      const mockChannel = {
        id: 'test-channel-id',
        name: 'test-channel',
        guild: { id: 'test-guild-id' },
        parent: null,
        topic: null,
        nsfw: false,
        rateLimitPerUser: 0,
        position: 0,
        permissionOverwrites: { cache: new Map() },
        delete: jest.fn(),
        send: jest.fn(),
      } as unknown as TextChannel;

      (mockClient.channels.fetch as jest.Mock).mockResolvedValue(mockChannel);
      (mockPrisma.archivedChannel.findUnique as jest.Mock).mockResolvedValue({
        id: 'existing-archive',
        restored: false
      });

      const result = await archiveManager.archiveChannel('test-channel-id', {
        inactivityDays: 7,
        rescueResources: false,
        gracePeriodDays: 0
      });

      expect(result.success).toBe(false);
    });
  });

  describe('restoreChannel', () => {
    it('should restore a channel successfully', async () => {
      const mockArchiveData = {
        id: 'archive-id',
        name: 'test-channel',
        category: null,
        guildId: 'test-guild-id',
        topic: 'Test topic',
        nsfw: false,
        rateLimitPerUser: 0,
        position: 0,
        permissions: [],
        resources: [],
      };

      const mockGuild = {
        id: 'test-guild-id',
        channels: {
          create: jest.fn().mockResolvedValue({
            id: 'new-channel-id',
            name: 'test-channel',
            send: jest.fn(),
          }),
          cache: {
            find: jest.fn().mockReturnValue(null),
          },
        },
      } as unknown as Guild;      (mockPrisma.archivedChannel.findFirst as jest.Mock).mockResolvedValue(mockArchiveData);
      (mockPrisma.archivedChannel.update as jest.Mock).mockResolvedValue(mockArchiveData);
      (mockClient.guilds.fetch as jest.Mock).mockResolvedValue(mockGuild);

      // Mock the sendRestorationNotification method to avoid Discord API calls
      const mockSendRestorationNotification = jest.fn().mockResolvedValue(undefined);
      archiveManager['sendRestorationNotification'] = mockSendRestorationNotification;

      const result = await archiveManager.restoreChannel('test-channel', 'test-guild-id');

      expect(result.success).toBe(true);
      expect(result.channelId).toBe('new-channel-id');
      expect(mockPrisma.archivedChannel.update).toHaveBeenCalledWith({
        where: { id: 'archive-id' },
        data: {
          restored: true,
          restoredAt: expect.any(Date)
        }
      });
    });

    it('should handle missing archive data', async () => {
      (mockPrisma.archivedChannel.findFirst as jest.Mock).mockResolvedValue(null);
      (mockClient.guilds.fetch as jest.Mock).mockResolvedValue({
        id: 'test-guild-id'
      });

      const result = await archiveManager.restoreChannel('missing-channel', 'test-guild-id');

      expect(result.success).toBe(false);
    });

    it('should handle guild fetch errors', async () => {
      const mockArchiveData = {
        id: 'archive-id',
        name: 'test-channel',
        guildId: 'test-guild-id',
      };

      (mockPrisma.archivedChannel.findFirst as jest.Mock).mockResolvedValue(mockArchiveData);
      (mockClient.guilds.fetch as jest.Mock).mockRejectedValue(new Error('Guild not found'));

      const result = await archiveManager.restoreChannel('test-channel', 'invalid-guild-id');

      expect(result.success).toBe(false);
    });
  });
});
