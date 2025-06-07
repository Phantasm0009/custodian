import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  PermissionFlagsBits,
  ChannelType 
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';
import { createSuccessEmbed, createErrorEmbed, retryWithBackoff } from '../lib/utils';
import { logger } from '../lib/logger';

/**
 * /extract-resources command - Manually extract resources from recent messages
 * Useful for testing and backfilling resources from channels
 */
export const extractResourcesCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('extract-resources')
    .setDescription('Manually extract resources from recent messages in this channel')
    .addIntegerOption(option =>
      option
        .setName('count')
        .setDescription('Number of recent messages to scan (default: 50, max: 500)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(500)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    const count = interaction.options.getInteger('count') || 50;

    try {
      await interaction.deferReply();

      // Verify this is a text channel
      if (interaction.channel?.type !== ChannelType.GuildText) {
        await interaction.editReply({
          embeds: [createErrorEmbed(
            '❌ Invalid Channel Type',
            'This command can only be used in text channels.'
          )]
        });
        return;
      }

      const channel = interaction.channel;
      
      logger.info(`🔍 Manual resource extraction requested by ${interaction.user.tag} in #${channel.name} (${count} messages)`);

      // Extract resources with rate limiting protection
      const resources = await retryWithBackoff(
        () => bot.rescueEngine.rescueResources(channel.id, count),
        3,
        2000 // 2 second base delay for resource extraction
      );

      if (!resources || (resources as any[]).length === 0) {
        await interaction.editReply({
          embeds: [createSuccessEmbed(
            '📋 Extraction Complete',
            `Scanned ${count} recent messages but found no valuable resources to extract.`
          )]
        });
        return;
      }

      // Save resources to database with rate limiting protection
      await retryWithBackoff(
        () => bot.rescueEngine.saveResources(resources, channel.id),
        3,
        1000
      );

      const resourcesByType = (resources as any[]).reduce((acc, resource) => {
        acc[resource.type] = (acc[resource.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const typesList = Object.entries(resourcesByType)
        .map(([type, count]) => `• ${count} ${type.toLowerCase()}${(count as number) > 1 ? 's' : ''}`)
        .join('\n');

      await interaction.editReply({
        embeds: [createSuccessEmbed(
          '✅ Resources Extracted',
          `Successfully extracted **${(resources as any[]).length}** resources from ${count} recent messages:\n\n${typesList}\n\nUse \`/find\` to search through extracted resources.`
        )]
      });

      logger.info(`✅ Manual extraction complete: ${(resources as any[]).length} resources saved`);

    } catch (error) {
      logger.error('Error in extract-resources command:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      await interaction.editReply({
        embeds: [createErrorEmbed(
          '❌ Extraction Failed',
          `Failed to extract resources: ${errorMessage}`
        )]
      });
    }
  }
};
