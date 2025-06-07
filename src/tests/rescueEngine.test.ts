import { RescueEngine } from '../lib/rescueEngine';
import { PrismaClient } from '@prisma/client';
import { Client, TextChannel } from 'discord.js';

// Mock the logger module
jest.mock('../lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
  ArchiveLogger: {
    logResourceExtraction: jest.fn(),
    logDatabase: jest.fn(),
  },
}));

// Mock Prisma
jest.mock('@prisma/client');
const mockPrisma = {
  resource: {
    create: jest.fn(),
  },
} as unknown as PrismaClient;

// Mock Discord Client with channels.fetch
const mockClient = {
  user: {
    id: 'bot-id',
  },
  channels: {
    fetch: jest.fn(),
  },
} as unknown as Client;

// Mock TextChannel
const createMockChannel = (name: string = 'test-channel'): Partial<TextChannel> => ({
  id: 'test-channel-id',
  name,
  messages: {
    fetch: jest.fn().mockResolvedValue(new Map()),
  },
} as any);

describe('RescueEngine', () => {
  let rescueEngine: RescueEngine;

  beforeEach(() => {
    rescueEngine = new RescueEngine(mockClient, mockPrisma);
    jest.clearAllMocks();
  });

  describe('hasValuableContent', () => {
    it('should detect JavaScript code blocks', () => {
      const content = `
        Here's some JavaScript:
        \`\`\`javascript
        function hello() {
          console.log("Hello World!");
          return true;
        }
        \`\`\`
      `;

      const hasValue = rescueEngine.hasValuableContent(content);
      expect(hasValue).toBe(true);
    });

    it('should detect GitHub links', () => {
      const content = 'Check out this repo: https://github.com/example/project';
      
      const hasValue = rescueEngine.hasValuableContent(content);
      expect(hasValue).toBe(true);
    });

    it('should detect documentation links', () => {
      const content = 'Check the docs: https://docs.example.com/api';
      
      const hasValue = rescueEngine.hasValuableContent(content);
      expect(hasValue).toBe(true);
    });

    it('should reject short content', () => {
      const content = 'Hi';
      
      const hasValue = rescueEngine.hasValuableContent(content);
      expect(hasValue).toBe(false);
    });

    it('should detect long-form content', () => {
      const content = 'This is a very long message that contains valuable information about how to implement a complex feature in our application. It includes detailed explanations and step-by-step instructions that would be valuable to preserve.';
      
      const hasValue = rescueEngine.hasValuableContent(content);
      expect(hasValue).toBe(true);
    });
  });

  describe('rescueResources', () => {
    it('should rescue resources from a channel', async () => {
      const mockChannel = createMockChannel('test-channel');
      (mockClient.channels.fetch as jest.Mock).mockResolvedValue(mockChannel);

      const resources = await rescueEngine.rescueResources('test-channel-id', 10);
      
      expect(resources).toBeDefined();
      expect(Array.isArray(resources)).toBe(true);
      expect(mockClient.channels.fetch).toHaveBeenCalledWith('test-channel-id');
    });

    it('should handle non-existent channels', async () => {
      (mockClient.channels.fetch as jest.Mock).mockResolvedValue(null);

      const resources = await rescueEngine.rescueResources('invalid-channel-id');
      
      expect(resources).toEqual([]);
    });

    it('should handle channel fetch errors', async () => {
      (mockClient.channels.fetch as jest.Mock).mockRejectedValue(new Error('Channel not found'));

      const resources = await rescueEngine.rescueResources('error-channel-id');
      
      expect(resources).toEqual([]);
    });
  });

  describe('saveResources', () => {
    it('should save resources to database', async () => {
      const mockResources = [
        {
          type: 'CODE' as const,
          content: 'console.log("test");',
          authorId: 'user-123',
          authorName: 'TestUser',
          messageId: 'msg-123'
        }
      ];

      await rescueEngine.saveResources(mockResources, 'channel-123');
      
      expect(mockPrisma.resource.create).toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      const mockResources = [
        {
          type: 'LINK' as const,
          url: 'https://example.com',
          authorId: 'user-123',
          authorName: 'TestUser',
          messageId: 'msg-123'
        }
      ];

      (mockPrisma.resource.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(rescueEngine.saveResources(mockResources, 'channel-123')).rejects.toThrow('Database error');
    });
  });
});
