import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  ChannelType,
  PermissionFlagsBits 
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';

/**
 * /watch command - Monitor a channel for auto-archiving
 * Watches a channel and automatically archives it after specified inactivity period
 */
export const watchCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('watch')
    .setDescription('Monitor a channel for auto-archiving')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to monitor')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addIntegerOption(option =>
      option
        .setName('inactivity_days')
        .setDescription('Number of days of inactivity before archiving')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(365)
    )
    .addBooleanOption(option =>
      option
        .setName('rescue')
        .setDescription('Whether to rescue resources before archiving')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    try {
      await interaction.deferReply();

      const channel = interaction.options.getChannel('channel', true);
      const inactivityDays = interaction.options.getInteger('inactivity_days') ?? 30;
      const rescueResources = interaction.options.getBoolean('rescue') ?? true;

      // Validate permissions
      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      // Check bot permissions in target channel
      const targetChannel = await bot.client.channels.fetch(channel.id);
      if (!targetChannel || !targetChannel.isTextBased()) {
        await interaction.editReply('Invalid channel specified.');
        return;
      }

      const result = await bot.activityMonitor.watchChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        inactivityDays,
        rescueResources,
        autoArchive: true
      });

      if (result.success) {
        await interaction.editReply({
          content: `✅ ${result.message}`,
          embeds: [{
            title: '👁️ Channel Monitoring Active',
            description: `**Channel:** <#${channel.id}>\n**Inactivity Threshold:** ${inactivityDays} days\n**Resource Rescue:** ${rescueResources ? 'Enabled' : 'Disabled'}`,
            color: 0x2ecc71,
            fields: [
              {
                name: '⚠️ Warning Schedule',
                value: `• 7 days before: First warning\n• 3 days before: Second warning\n• 1 day before: Final warning\n• Archive time: Automatic archiving`,
                inline: false
              },
              {
                name: '🔄 Activity Reset',
                value: 'Any message in the channel will reset the inactivity timer.',
                inline: false
              }
            ],
            footer: {
              text: 'Use /stats to view all watched channels'
            },
            timestamp: new Date().toISOString()
          }]
        });
      } else {
        await interaction.editReply(`❌ ${result.message}`);
      }

    } catch (error) {
      console.error('Error in watch command:', error);
      await interaction.editReply('❌ An error occurred while setting up channel monitoring.');
    }
  }
};
