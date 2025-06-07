import { jest } from '@jest/globals';

// Mock winston logger to avoid import issues
jest.mock('winston', () => ({
  default: {
    createLogger: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      colorize: jest.fn(),
      printf: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  },
}));

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/archivemind_test';
process.env.DISCORD_TOKEN = 'test-token';
process.env.KNOWLEDGE_BASE_CHANNEL_ID = '123456789012345678';

// Mock Prisma Client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    archivedChannel: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    resource: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    watchedChannel: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    archiveWarning: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    knowledgeDigest: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

// Mock Discord.js
jest.mock('discord.js', () => ({
  Client: jest.fn(),
  GatewayIntentBits: {
    Guilds: 1,
    GuildMessages: 2,
    MessageContent: 4,
  },
  SlashCommandBuilder: jest.fn().mockImplementation(() => ({
    setName: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    addStringOption: jest.fn().mockReturnThis(),
    addChannelOption: jest.fn().mockReturnThis(),
    addIntegerOption: jest.fn().mockReturnThis(),
    addBooleanOption: jest.fn().mockReturnThis(),
    addUserOption: jest.fn().mockReturnThis(),
  })),
  EmbedBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    setColor: jest.fn().mockReturnThis(),
    addFields: jest.fn().mockReturnThis(),
    setFooter: jest.fn().mockReturnThis(),
    setTimestamp: jest.fn().mockReturnThis(),
    setThumbnail: jest.fn().mockReturnThis(),
  })),  PermissionsBitField: jest.fn().mockImplementation((permissions: any) => ({
    has: jest.fn((permission: any) => Array.isArray(permissions) && permissions.includes(permission)),
  })),
  ChannelType: {
    GuildText: 0,
  },
  ActionRowBuilder: jest.fn(),
  ButtonBuilder: jest.fn(),
  ButtonStyle: {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
  },
}));

// Mock Winston logger
jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  })),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    json: jest.fn(),
    simple: jest.fn(),
    printf: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

// Mock Puppeteer
jest.mock('puppeteer', () => ({
  launch: jest.fn(() => ({
    newPage: jest.fn(() => ({
      setContent: jest.fn(),
      pdf: jest.fn(() => Buffer.from('mock-pdf-content')),
      close: jest.fn(),
    })),
    close: jest.fn(),
  })),
}));

// Global test utilities
export const createMockInteraction = (options: Record<string, any> = {}) => ({
  user: { id: 'test-user', tag: 'TestUser#1234' },
  guild: { id: 'test-guild', name: 'Test Guild' },
  channel: { id: 'test-channel' },
  options: {
    get: jest.fn((name: string) => options[name] || null),
    getChannel: jest.fn((name: string) => options[name] || null),
    getString: jest.fn((name: string) => options[name] || null),
    getInteger: jest.fn((name: string) => options[name] || null),
    getBoolean: jest.fn((name: string) => options[name] || null),
    getUser: jest.fn((name: string) => options[name] || null),
  },
  reply: jest.fn(),
  followUp: jest.fn(),
  deferReply: jest.fn(),
  editReply: jest.fn(),
  replied: false,
  deferred: false,
});
