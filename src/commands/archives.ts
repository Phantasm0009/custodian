import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';
import { formatTimestamp, createInfoEmbed, createErrorEmbed } from '../lib/utils';

/**
 * /archives command - Browse and search archived channels
 * Provides list and search functionality for archived channels
 */
export const archivesCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('archives')
    .setDescription('Browse and search archived channels')
    .addStringOption(option =>
      option
        .setName('action')
        .setDescription('Action to perform')
        .setRequired(false)
        .addChoices(
          { name: '📋 List All', value: 'list' },
          { name: '🔍 Search', value: 'search' },
          { name: '📊 Statistics', value: 'stats' }
        )
    )
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('Search query (for search action)')
        .setRequired(false)
        .setMaxLength(100)
    )
    .addIntegerOption(option =>
      option
        .setName('limit')
        .setDescription('Number of results to show (default: 10)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(25)
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    const action = interaction.options.getString('action') || 'list';
    const query = interaction.options.getString('query');
    const limit = interaction.options.getInteger('limit') || 10;

    try {
      await interaction.deferReply();

      if (!interaction.guild) {
        await interaction.editReply({
          embeds: [createErrorEmbed('Server Required', 'This command can only be used in a server.')]
        });
        return;
      }

      switch (action) {
        case 'search':
          await handleSearch(interaction, bot, query, limit);
          break;
        case 'stats':
          await handleStats(interaction, bot);
          break;
        default:
          await handleList(interaction, bot, limit);
          break;
      }

    } catch (error) {
      console.error('Error in archives command:', error);
      await interaction.editReply({
        embeds: [createErrorEmbed('Command Error', 'An error occurred while processing the archives command.')]
      });
    }
  }
};

/**
 * Handle listing all archived channels
 */
async function handleList(
  interaction: ChatInputCommandInteraction,
  bot: any,
  limit: number
): Promise<void> {
  const archives = await bot.prisma.archivedChannel.findMany({
    where: { guildId: interaction.guildId },
    include: {
      _count: {
        select: { resources: true }
      }
    },
    orderBy: { archivedAt: 'desc' },
    take: limit
  });

  if (archives.length === 0) {
    await interaction.editReply({
      embeds: [createInfoEmbed(
        '📋 No Archived Channels',
        'No channels have been archived in this server yet.\n\nUse `/watch` to start monitoring channels for auto-archiving.'
      )]
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('📋 Archived Channels')
    .setDescription(`Showing ${archives.length} most recently archived channels`)
    .setColor(0x3498db)
    .setTimestamp();

  // Add fields for each archived channel
  for (const [index, archive] of archives.entries()) {
    const resourceCount = archive._count.resources;
    const archivedDate = formatTimestamp(archive.archivedAt, 'discord');
    
    embed.addFields([{
      name: `${index + 1}. ${archive.name}`,
      value: [
        `**Resources:** ${resourceCount}`,
        `**Category:** ${archive.category || 'None'}`,
        `**Archived:** ${archivedDate}`,
        `**Restored:** ${archive.restored ? '✅ Yes' : '❌ No'}`,
        `**Restore Command:** \`/restore ${archive.name}\``
      ].join('\n'),
      inline: false
    }]);
  }

  // Add navigation buttons if there are more archives
  const totalCount = await bot.prisma.archivedChannel.count({
    where: { guildId: interaction.guildId }
  });

  if (totalCount > limit) {
    embed.setFooter({ 
      text: `Showing ${limit} of ${totalCount} archived channels. Use search to find specific channels.` 
    });
  }

  await interaction.editReply({ embeds: [embed] });
}

/**
 * Handle searching archived channels
 */
async function handleSearch(
  interaction: ChatInputCommandInteraction,
  bot: any,
  query: string | null,
  limit: number
): Promise<void> {
  if (!query) {
    await interaction.editReply({
      embeds: [createErrorEmbed(
        'Search Query Required',
        'Please provide a search query when using the search action.\n\nExample: `/archives action:search query:project-name`'
      )]
    });
    return;
  }

  const archives = await bot.prisma.archivedChannel.findMany({
    where: {
      guildId: interaction.guildId,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { topic: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: {
      _count: {
        select: { resources: true }
      }
    },
    orderBy: { archivedAt: 'desc' },
    take: limit
  });

  if (archives.length === 0) {
    await interaction.editReply({
      embeds: [createInfoEmbed(
        '🔍 No Results Found',
        `No archived channels found matching "${query}".\n\n**Search Tips:**\n• Try partial channel names\n• Search by category name\n• Use keywords from channel topics`
      )]
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle(`🔍 Search Results for "${query}"`)
    .setDescription(`Found ${archives.length} archived channel${archives.length === 1 ? '' : 's'}`)
    .setColor(0x9b59b6)
    .setTimestamp();

  // Add fields for each found archive
  for (const [index, archive] of archives.entries()) {
    const resourceCount = archive._count.resources;
    const archivedDate = formatTimestamp(archive.archivedAt, 'discord');
    
    embed.addFields([{
      name: `${index + 1}. ${archive.name}`,
      value: [
        `**Resources:** ${resourceCount}`,
        `**Category:** ${archive.category || 'None'}`,
        `**Topic:** ${archive.topic ? archive.topic.substring(0, 50) + '...' : 'None'}`,
        `**Archived:** ${archivedDate}`,
        `**Restored:** ${archive.restored ? '✅ Yes' : '❌ No'}`,
        `**Restore Command:** \`/restore ${archive.name}\``
      ].join('\n'),
      inline: false
    }]);
  }

  await interaction.editReply({ embeds: [embed] });
}

/**
 * Handle archive statistics
 */
async function handleStats(
  interaction: ChatInputCommandInteraction,
  bot: any
): Promise<void> {
  const [totalArchives, restoredCount, totalResources, recentArchives] = await Promise.all([
    bot.prisma.archivedChannel.count({
      where: { guildId: interaction.guildId }
    }),
    bot.prisma.archivedChannel.count({
      where: { guildId: interaction.guildId, restored: true }
    }),
    bot.prisma.resource.count({
      where: { channel: { guildId: interaction.guildId } }
    }),
    bot.prisma.archivedChannel.count({
      where: {
        guildId: interaction.guildId,
        archivedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    })
  ]);

  // Get category breakdown
  const categoryStats = await bot.prisma.archivedChannel.groupBy({
    by: ['category'],
    where: { guildId: interaction.guildId },
    _count: { category: true }
  });

  const categoryBreakdown = categoryStats
    .map(stat => `• ${stat.category || 'No Category'}: ${stat._count.category}`)
    .join('\n') || 'No archives found';

  // Get resource type breakdown
  const resourceStats = await bot.prisma.resource.groupBy({
    by: ['type'],
    where: { channel: { guildId: interaction.guildId } },
    _count: { type: true }
  });

  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };

  const resourceBreakdown = resourceStats
    .map(stat => `• ${typeEmojis[stat.type as keyof typeof typeEmojis] || '📦'} ${stat.type}: ${stat._count.type}`)
    .join('\n') || 'No resources found';

  const embed = new EmbedBuilder()
    .setTitle('📊 Archive Statistics')
    .setDescription('Comprehensive archive analytics for this server')
    .setColor(0xe67e22)
    .addFields([
      {
        name: '📦 Archive Overview',
        value: [
          `**Total Archived:** ${totalArchives}`,
          `**Restored:** ${restoredCount}`,
          `**Active Archives:** ${totalArchives - restoredCount}`,
          `**Recent (30d):** ${recentArchives}`
        ].join('\n'),
        inline: true
      },
      {
        name: '📋 Resources Rescued',
        value: [
          `**Total Resources:** ${totalResources}`,
          `**Avg per Channel:** ${totalArchives > 0 ? Math.round(totalResources / totalArchives) : 0}`,
          `**Storage Impact:** Preserved valuable content`
        ].join('\n'),
        inline: true
      },
      {
        name: '📂 By Category',
        value: categoryBreakdown,
        inline: false
      },
      {
        name: '🏷️ Resource Types',
        value: resourceBreakdown,
        inline: false
      }
    ])
    .setFooter({ 
      text: 'Use /digest all to generate a comprehensive knowledge report' 
    })
    .setTimestamp();

  // Add action buttons
  const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('generate_digest')
        .setLabel('Generate Digest')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('📄'),
      new ButtonBuilder()
        .setCustomId('export_archives')
        .setLabel('Export List')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('📤')
    );

  await interaction.editReply({ 
    embeds: [embed],
    components: [row]
  });
}