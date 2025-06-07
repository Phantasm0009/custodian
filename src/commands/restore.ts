import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';
import { retryWithBackoff } from '../lib/utils';

/**
 * /restore command - Restore an archived channel
 * Recreates a previously archived channel with its original settings
 */
export const restoreCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('restore')
    .setDescription('Restore an archived channel')
    .addStringOption(option =>
      option
        .setName('channel_name')
        .setDescription('Name of the archived channel to restore')
        .setRequired(true)
        .setMaxLength(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels) as SlashCommandBuilder,
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    try {
      await interaction.deferReply();

      const channelName = interaction.options.getString('channel_name', true);

      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      // Search for archived channels with similar names
      const archivedChannels = await bot.prisma.archivedChannel.findMany({
        where: {
          guildId: interaction.guild.id,
          restored: false,
          name: {
            contains: channelName,
            mode: 'insensitive'
          }
        },
        include: {
          resources: {
            take: 5 // Preview of resources
          }
        },
        orderBy: {
          archivedAt: 'desc'
        }
      });

      if (archivedChannels.length === 0) {
        await interaction.editReply({
          embeds: [{
            title: '❌ No Archived Channels Found',
            description: `No archived channels found matching "${channelName}".`,
            color: 0xe74c3c,
            fields: [
              {
                name: '💡 Tips',
                value: '• Check the spelling of the channel name\n• Try using partial names (e.g., "dev" for "dev-chat")\n• Use `/stats archived` to see all archived channels',
                inline: false
              }
            ]
          }]
        });
        return;
      }

      // If multiple matches, show selection
      if (archivedChannels.length > 1) {        const channelList = archivedChannels
          .slice(0, 10) // Limit to 10 results
          .map((ch: any, index: number) => {
            const resourceCount = ch.resources.length;
            const archivedDate = new Date(ch.archivedAt).toLocaleDateString();
            return `${index + 1}. **${ch.name}** (${resourceCount} resources, archived ${archivedDate})`;
          })
          .join('\n');

        await interaction.editReply({
          embeds: [{
            title: '🔍 Multiple Archived Channels Found',
            description: `Found ${archivedChannels.length} archived channels matching "${channelName}":\n\n${channelList}`,
            color: 0xf39c12,
            fields: [
              {
                name: '💡 Next Steps',
                value: 'Please use the exact channel name to restore a specific channel.\n\nExample: `/restore channel_name:dev-general`',
                inline: false
              }
            ]
          }]
        });
        return;
      }

      // Single match found - proceed with restoration
      const archivedChannel = archivedChannels[0];
      
      // Show confirmation with details
      const confirmButton = new ButtonBuilder()
        .setCustomId('restore_confirm')
        .setLabel('✅ Confirm Restore')
        .setStyle(ButtonStyle.Success);

      const cancelButton = new ButtonBuilder()
        .setCustomId('restore_cancel')
        .setLabel('❌ Cancel')
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(confirmButton, cancelButton);

      await interaction.editReply({
        embeds: [{
          title: '🔄 Restore Channel Confirmation',
          description: `**Channel:** ${archivedChannel.name}\n**Archived:** ${new Date(archivedChannel.archivedAt).toLocaleString()}\n**Resources:** ${archivedChannel.resources.length} items`,
          color: 0x3498db,
          fields: [
            {
              name: '📋 What will be restored:',
              value: `• Channel with original name and settings\n• Original permissions and category\n• Topic and slowmode settings\n• Notification about available resources`,
              inline: false
            },
            {
              name: '🔍 Resource Preview',
              value: archivedChannel.resources.length > 0 
                ? archivedChannel.resources.slice(0, 3).map((r: any) => `• ${r.type}: ${r.fileName || r.url?.substring(0, 50) || 'Content preview'}`).join('\n')
                : 'No resources were rescued from this channel',
              inline: false
            }
          ],
          footer: {
            text: 'Click a button below to confirm or cancel within 30 seconds'
          }
        }],
        components: [row]
      });

      // Wait for button interaction
      const filter = (i: any) => i.user.id === interaction.user.id;

      try {
        const buttonInteraction = await interaction.fetchReply().then(reply => 
          reply.awaitMessageComponent({ 
            filter, 
            time: 30000 
          })
        );

        if (buttonInteraction.customId === 'restore_cancel') {
          await buttonInteraction.update({
            embeds: [{
              title: '❌ Restoration Cancelled',
              description: 'Channel restoration was cancelled.',
              color: 0x95a5a6
            }],
            components: []
          });
          return;
        }

        if (buttonInteraction.customId === 'restore_confirm') {
          // Proceed with restoration
          await buttonInteraction.update({
            embeds: [{
              title: '🔄 Restoring Channel...',
              description: 'Please wait while the channel is being restored.',
              color: 0x3498db
            }],
            components: []
          });

          const result = await retryWithBackoff(
            () => bot.archiveManager.restoreChannel(archivedChannel.name, interaction.guild!.id),
            3,
            1000
          );

          if ((result as any).success) {
            await interaction.editReply({
              embeds: [{
                title: '✅ Channel Restored Successfully',
                description: `Channel **${archivedChannel.name}** has been restored!`,
                color: 0x2ecc71,
                fields: [
                  {
                    name: '📍 Restored Channel',
                    value: `<#${(result as any).channelId}>`,
                    inline: true
                  },
                  {
                    name: '📊 Available Resources',
                    value: `${archivedChannel.resources.length} resources are available in the knowledge base`,
                    inline: true
                  },
                  {
                    name: '🔍 Access Resources',
                    value: `Use \`/find\` command to search for resources that were rescued from this channel.`,
                    inline: false
                  },
                  {
                    name: '⚠️ Important Note',
                    value: 'The original message history cannot be restored, but all valuable resources have been preserved.',
                    inline: false
                  }
                ],
                footer: {
                  text: 'Restoration completed'
                },
                timestamp: new Date().toISOString()
              }],
              components: []
            });
          } else {
            await interaction.editReply({
              embeds: [{
                title: '❌ Restoration Failed',
                description: 'Failed to restore the channel. This might be due to permission issues or Discord API limitations.',
                color: 0xe74c3c,
                fields: [
                  {
                    name: '🔧 Troubleshooting',
                    value: '• Check that the bot has "Manage Channels" permission\n• Ensure the server isn\'t at the channel limit\n• Verify the bot can create channels in the target category',
                    inline: false
                  }
                ]
              }],
              components: []
            });
          }
        }

      } catch (error) {
        console.error('Button interaction timeout or error:', error);
        await interaction.editReply({
          embeds: [{
            title: '⏰ Confirmation Timeout',
            description: 'Restoration confirmation timed out. Please try the command again.',
            color: 0x95a5a6
          }],
          components: []
        }).catch(() => {}); // Ignore errors if interaction already expired
      }

    } catch (error) {
      console.error('Error in restore command:', error);
      await interaction.editReply('❌ An error occurred while restoring the channel.');
    }
  }
};
