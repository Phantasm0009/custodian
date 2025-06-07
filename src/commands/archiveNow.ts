import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  ChannelType,
  PermissionFlagsBits 
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';

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
      }      // Safety check - prevent archiving important channels
      const channelName = (channel.name || '').toLowerCase();
      const protectedChannels = ['general', 'announcements', 'rules', 'welcome'];
      
      if (protectedChannels.some(protectedName => channelName.includes(protectedName))) {
        await interaction.editReply({
          embeds: [{
            title: '⚠️ Protected Channel',
            description: `Channel <#${channel.id}> appears to be an important server channel and cannot be archived for safety reasons.`,
            color: 0xe74c3c,
            fields: [
              {
                name: 'Protected Channel Types',
                value: protectedChannels.map(name => `• ${name}`).join('\n'),
                inline: false
              }
            ]
          }]
        });
        return;
      }

      // Confirmation for immediate archiving
      await interaction.editReply({
        content: `⚠️ **Confirmation Required**\n\nYou are about to archive <#${channel.id}> immediately.\n\n**This action will:**\n• Delete the channel permanently\n• ${rescueResources ? 'Rescue valuable resources to the knowledge base' : 'NOT rescue any resources'}\n• Send a notification before deletion\n\n**Reason:** ${reason}`,
        embeds: [{
          title: '📦 Archive Confirmation',
          description: 'React with ✅ to confirm or ❌ to cancel within 30 seconds.',
          color: 0xf39c12,
          footer: {
            text: 'This action cannot be undone easily'
          }
        }]
      });

      // Wait for confirmation
      const confirmationMessage = await interaction.fetchReply();
      await confirmationMessage.react('✅');
      await confirmationMessage.react('❌');

      const filter = (reaction: any, user: any) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === interaction.user.id;
      };

      try {
        const collected = await confirmationMessage.awaitReactions({
          filter,
          max: 1,
          time: 30000,
          errors: ['time']
        });

        const reaction = collected.first();
        
        if (reaction?.emoji.name === '❌') {
          await interaction.editReply({
            content: '❌ Archive operation cancelled.',
            embeds: []
          });
          return;
        }

        if (reaction?.emoji.name === '✅') {
          // Proceed with archiving
          await interaction.editReply({
            content: '📦 Archiving channel... This may take a few moments.',
            embeds: []
          });

          const result = await bot.archiveManager.archiveChannel(channel.id, {
            inactivityDays: 0, // Immediate
            rescueResources,
            gracePeriodDays: 0
          });

          if (result.success) {
            await interaction.editReply({
              embeds: [{
                title: '✅ Channel Archived Successfully',
                description: `Channel **${channel.name}** has been archived.`,
                color: 0x2ecc71,
                fields: [
                  {
                    name: '📊 Resources Rescued',
                    value: `${result.resourceCount || 0} valuable resources were saved to the knowledge base.`,
                    inline: false
                  },
                  {
                    name: '🔄 Restoration',
                    value: `Use \`/restore ${channel.name}\` to restore this channel if needed.`,
                    inline: false
                  },
                  {
                    name: '📋 Archive Details',
                    value: `**Reason:** ${reason}\n**Archived by:** <@${interaction.user.id}>\n**Archive ID:** \`${result.archivedChannelId}\``,
                    inline: false
                  }
                ],
                footer: {
                  text: 'Archive completed'
                },
                timestamp: new Date().toISOString()
              }]
            });
          } else {
            await interaction.editReply({
              embeds: [{
                title: '❌ Archive Failed',
                description: 'Failed to archive the channel. Please check bot permissions and try again.',
                color: 0xe74c3c
              }]
            });
          }
        }

      } catch (error) {
        await interaction.editReply({
          content: '⏰ Confirmation timed out. Archive operation cancelled.',
          embeds: []
        });
      }

    } catch (error) {
      console.error('Error in archive-now command:', error);
      await interaction.editReply('❌ An error occurred while archiving the channel.');
    }
  }
};
