import { 
  Client, 
  GatewayIntentBits, 
  Events, 
  Collection,
  REST,
  Routes,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags
} from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { logger } from './lib/logger';
import { ArchiveManager } from './lib/archiveManager';
import { RescueEngine } from './lib/rescueEngine';
import { ActivityMonitor } from './lib/activityMonitor';
import { loadCommands } from './commands';
import type { SlashCommand } from './types';
import { setBotInstance } from './lib/botInstance';

// Load environment variables
config();

/**
 * ArchiveMind Discord Bot
 * All-in-one channel lifecycle manager that automates archiving inactive channels
 * and rescues valuable resources to create a searchable knowledge base
 */
class ArchiveMindBot {
  public client: Client;
  public prisma: PrismaClient;
  public commands: Collection<string, SlashCommand>;
  public archiveManager: ArchiveManager;
  public rescueEngine: RescueEngine;
  public activityMonitor: ActivityMonitor;

  constructor() {
    // Initialize Discord client with required intents for global bot
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMembers, // For member permissions
      ],
    });

    // Initialize Prisma client
    this.prisma = new PrismaClient({
      log: ['error', 'warn'],
    });

    // Initialize commands collection
    this.commands = new Collection();

    // Initialize core components
    this.archiveManager = new ArchiveManager(this.client, this.prisma);
    this.rescueEngine = new RescueEngine(this.client, this.prisma);
    this.activityMonitor = new ActivityMonitor(this.client, this.prisma);

    // Set global bot instance for other modules to access
    setBotInstance(this);

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Bot ready event - register global commands
    this.client.once(Events.ClientReady, async (readyClient) => {
      logger.info(`🧠 ArchiveMind bot is ready! Logged in as ${readyClient.user.tag}`);
      logger.info(`📊 Connected to ${readyClient.guilds.cache.size} server(s)`);
      
      // Register global slash commands
      await this.registerGlobalCommands();
      
      // Start activity monitoring
      await this.activityMonitor.startMonitoring();
      
      logger.info('✅ All systems operational! ArchiveMind is preserving Discord knowledge.');
    });

    // New guild join event - setup guild-specific data
    this.client.on(Events.GuildCreate, async (guild) => {
      logger.info(`🎉 ArchiveMind joined new guild: ${guild.name} (${guild.id})`);
      
      // Send welcome message to system channel or owner
      await this.sendWelcomeMessage(guild);
      
      // Log guild statistics
      logger.info(`📈 Guild stats: ${guild.memberCount} members, ${guild.channels.cache.size} channels`);
    });

    // Guild leave event
    this.client.on(Events.GuildDelete, async (guild) => {
      logger.info(`👋 ArchiveMind left guild: ${guild.name} (${guild.id})`);
      
      // Optional: Clean up guild-specific data
      await this.cleanupGuildData(guild.id);
    });

    // Interaction handling (slash commands)
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) {
        logger.warn(`❌ Unknown command: ${interaction.commandName}`);
        return;
      }

      try {
        // Log command usage for analytics
        logger.info(`🔧 Command executed: ${interaction.commandName} by ${interaction.user.tag} in ${interaction.guild?.name}`);
        
        await command.execute(interaction);
      } catch (error) {
        logger.error(`❌ Error executing command ${interaction.commandName}:`, error);
        
        const errorEmbed = new EmbedBuilder()
          .setTitle('⚠️ Command Error')
          .setDescription('There was an error executing this command. Please try again later.')
          .setColor(0xff0000)
          .setTimestamp();

        try {
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
              embeds: [errorEmbed], 
              flags: [MessageFlags.Ephemeral] 
            });
          } else {
            await interaction.reply({ 
              embeds: [errorEmbed], 
              flags: [MessageFlags.Ephemeral] 
            });
          }
        } catch (responseError) {
          logger.error('Failed to send error response:', responseError);
        }
      }
    });

    // Message events for activity monitoring and resource extraction
    this.client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;
      
      try {
        // Update channel activity
        await this.activityMonitor.updateChannelActivity(message.channel.id);
        
        // Extract resources from valuable messages in real-time
        if (this.rescueEngine.hasValuableContent(message.content, message.attachments.size > 0)) {
          const channelName = 'name' in message.channel ? message.channel.name : 'DM';
          logger.info(`📋 Extracting resources from message by ${message.author.tag} in #${channelName}`);
          
          // Create a temporary "channel" for single message processing
          const resources = await this.rescueEngine.rescueResources(message.channel.id, 1);
          
          if (resources.length > 0) {
            logger.info(`✅ Extracted ${resources.length} resources in real-time`);
          }
        }
      } catch (error) {
        logger.error('Error processing message:', error);
      }
    });

    // Error handling
    this.client.on(Events.Error, (error) => {
      logger.error('Discord client error:', error);
    });

    this.client.on(Events.Warn, (warning) => {
      logger.warn('Discord client warning:', warning);
    });

    // Rate limit handling
    this.client.rest.on('rateLimited', (info) => {
      logger.warn(`⚠️ Rate limited: ${JSON.stringify(info)}`);
    });
  }

  /**
   * Register slash commands globally (not guild-specific)
   * This allows the bot to work across all servers
   */
  private async registerGlobalCommands(): Promise<void> {
    try {
      logger.info('🔄 Loading ArchiveMind slash commands...');
      
      const commands = await loadCommands();
      
      // Store commands in collection
      for (const command of commands) {
        this.commands.set(command.data.name, command);
      }
      
      // Register commands globally with Discord
      const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
      
      const commandData = commands.map(command => command.data.toJSON());
      
      await rest.put(
        Routes.applicationCommands(this.client.user!.id),
        { body: commandData }
      );
      
      logger.info(`✅ Successfully registered ${commands.length} global slash commands`);
    } catch (error) {
      logger.error('❌ Failed to register slash commands:', error);
      throw error;
    }
  }

  /**
   * Send welcome message when joining a new guild
   */
  private async sendWelcomeMessage(guild: any): Promise<void> {
    try {
      // Find system channel or first text channel
      const systemChannel = guild.systemChannel || 
        guild.channels.cache.find((channel: any) => 
          channel.type === ChannelType.GuildText && 
          channel.permissionsFor(guild.members.me!)?.has(PermissionFlagsBits.SendMessages)
        ) as any;

      if (!systemChannel) return;

      const welcomeEmbed = new EmbedBuilder()
        .setTitle('🧠 ArchiveMind Bot')
        .setDescription('Thanks for adding ArchiveMind to your server!')
        .addFields([
          {
            name: '📚 What I do',
            value: 'I automatically archive inactive channels while preserving valuable resources like files, links, and code snippets in searchable knowledge bases.',
            inline: false
          },
          {
            name: '🚀 Getting Started',
            value: 'Use `/help` to see all available commands.\nUse `/watch #channel` to start monitoring a channel for auto-archiving.',
            inline: false
          },
          {
            name: '🗃️ Key Features',
            value: '• Auto-archive inactive channels with warnings\n• Smart resource rescue (files, links, code)\n• Complete channel restoration\n• Searchable knowledge base\n• GDPR-compliant data management',
            inline: false
          },
          {
            name: '🔐 Permissions Required',
            value: 'I need `Manage Channels`, `Read Message History`, and `Send Messages` permissions to function properly.',
            inline: false
          },
          {
            name: '🔗 Support',
            value: 'Need help? Use `/help` for command information or check our documentation.',
            inline: false
          }
        ])
        .setColor(0x5865F2)
        .setThumbnail(this.client.user?.avatarURL() || '')
        .setFooter({ text: 'ArchiveMind • Preserving Discord knowledge, one channel at a time! 🧠📚' });

      await systemChannel.send({ embeds: [welcomeEmbed] });
    } catch (error) {
      logger.warn(`Failed to send welcome message to guild ${guild.id}:`, error);
    }
  }

  /**
   * Clean up guild-specific data when leaving a guild
   */
  private async cleanupGuildData(guildId: string): Promise<void> {
    try {
      // Remove watched channels for this guild
      await this.prisma.watchedChannel.deleteMany({
        where: { guildId }
      });

      // Optionally: Clean up archived channels and resources
      // Note: You might want to keep archives for data retention
      
      logger.info(`🧹 Cleaned up data for guild: ${guildId}`);
    } catch (error) {
      logger.error(`Failed to clean up data for guild ${guildId}:`, error);
    }
  }

  /**
   * Start the bot
   */
  public async start(): Promise<void> {
    try {
      // Connect to database
      await this.prisma.$connect();
      logger.info('✅ Connected to PostgreSQL database');

      // Login to Discord
      await this.client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
      logger.error('Failed to start ArchiveMind bot:', error);
      process.exit(1);
    }
  }

  /**
   * Gracefully shutdown the bot
   */
  public async shutdown(): Promise<void> {
    logger.info('🔄 Shutting down ArchiveMind bot...');
    
    try {
      // Stop activity monitoring
      this.activityMonitor.stopMonitoring();
      
      // Disconnect from database
      await this.prisma.$disconnect();
      
      // Destroy Discord client
      this.client.destroy();
      
      logger.info('✅ ArchiveMind shutdown complete');
    } catch (error) {
      logger.error('Error during shutdown:', error);
    }
  }
}

// Create and start the bot
const bot = new ArchiveMindBot();

// Handle process termination
process.on('SIGINT', async () => {
  await bot.shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await bot.shutdown();
  process.exit(0);
});

// Start the bot
bot.start().catch((error) => {
  logger.error('Failed to start ArchiveMind bot:', error);
  process.exit(1);
});

export default bot;