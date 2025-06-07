import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  PermissionFlagsBits, 
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} from 'discord.js';
import { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';
import { createErrorEmbed, createSuccessEmbed, retryWithBackoff } from '../lib/utils';
import { logger } from '../lib/logger';

/**
 * /archive-now command - Immediately archive a channel
 * Archives a channel without waiting for inactivity period
 */
export const archiveNowCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('archive-now')
    .setDescription('Immediately archive a channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to archive')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addBooleanOption(option =>
      option
        .setName('rescue')
        .setDescription('Whether to rescue resources before archiving')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for archiving')
        .setRequired(false)
        .setMaxLength(200)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels) as SlashCommandBuilder,
  
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    try {
      await interaction.deferReply();

      const channel = interaction.options.getChannel('channel', true);
      const rescueResources = interaction.options.getBoolean('rescue') ?? true;
      const reason = interaction.options.getString('reason') || 'Manual archive request';

      // Validate permissions
      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      const channelName = (channel.name || '').toLowerCase();
      const protectedChannels = ['general', 'announcements', 'rules', 'welcome'];
      
      if (protectedChannels.some(protectedName => channelName.includes(protectedName))) {
        await interaction.editReply({
          embeds: [createErrorEmbed(
            '🛡️ Protected Channel',
            `Channel "${channel.name}" appears to be a protected channel and cannot be archived. Protected channels include: ${protectedChannels.join(', ')}`
          )]
        });
        return;
      }

      // Use ActionRow with buttons instead of reactions to avoid rate limits
      const confirmButton = new ButtonBuilder()
        .setCustomId('archive_confirm')
        .setLabel('✅ Confirm Archive')
        .setStyle(ButtonStyle.Danger);

      const cancelButton = new ButtonBuilder()
        .setCustomId('archive_cancel')
        .setLabel('❌ Cancel')
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(confirmButton, cancelButton);

      await interaction.editReply({
        content: `⚠️ **Confirmation Required**\n\nYou are about to archive <#${channel.id}> immediately.\n\n**This action will:**\n• Delete the channel permanently\n• ${rescueResources ? 'Rescue valuable resources to the knowledge base' : 'NOT rescue any resources'}\n• Send a notification before deletion\n\n**Reason:** ${reason}`,
        embeds: [{
          title: '📦 Archive Confirmation',
          description: 'Click ✅ Confirm Archive or ❌ Cancel within 30 seconds.',
          color: 0xf39c12,
          footer: {
            text: 'This action cannot be undone easily'
          }
        }],
        components: [row]
      });

      // Wait for button interaction instead of reactions
      const filter = (i: any) => {
        return (i.customId === 'archive_confirm' || i.customId === 'archive_cancel') && 
               i.user.id === interaction.user.id;
      };

      try {
        const buttonInteraction = await interaction.fetchReply().then(reply => 
          reply.awaitMessageComponent({ 
            filter, 
            time: 30000 
          })
        );

        if (buttonInteraction.customId === 'archive_cancel') {
          await buttonInteraction.update({
            content: '❌ **Archive Cancelled**\n\nThe archive operation has been cancelled.',
            embeds: [],
            components: []
          });
          return;
        }

        // Proceed with archiving
        await buttonInteraction.update({
          content: '🔄 **Archiving in progress...**\n\nPlease wait while we archive the channel and rescue resources.',
          embeds: [],
          components: []
        });

        const result = await bot.archiveManager.archiveChannel(channel.id, {
          inactivityDays: 0, // Immediate
          rescueResources,
          gracePeriodDays: 0,
          preservePermissions: true,
          notifyMembers: true
        });

        if (result.success) {
          await interaction.editReply({
            content: '',
            embeds: [createSuccessEmbed(
              '✅ Channel Archived Successfully',
              `**Channel:** ${channel.name}\n**Resources Rescued:** ${result.resourceCount || 0}\n**Archive ID:** ${result.archivedChannelId}\n**Reason:** ${reason}\n\nUse \`/restore ${channel.name}\` to restore this channel if needed.`
            )],
            components: []
          });
        } else {
          await interaction.editReply({
            content: '',
            embeds: [createErrorEmbed(
              '❌ Archive Failed',
              'Failed to archive the channel. Please check bot permissions and try again.'
            )],
            components: []
          });
        }

      } catch (error) {
        logger.error('Button interaction timeout or error:', error);
        await interaction.editReply({
          content: '⏰ **Confirmation Timeout**\n\nArchive operation cancelled due to no response within 30 seconds.',
          embeds: [],
          components: []
        }).catch(() => {}); // Ignore errors if interaction already expired
      }

    } catch (error) {
      logger.error('Error in archive-now command:', error);
      await interaction.editReply({
        content: '',
        embeds: [createErrorEmbed(
          '❌ Archive Error',
          'An error occurred while processing the archive request. Please try again.'
        )],
        components: []
      }).catch(() => {}); // Ignore errors if interaction already expired
    }
  }
};
