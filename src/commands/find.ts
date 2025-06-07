import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';

function getResultsSummary(resources: any[]): string {
  const typeCounts = resources.reduce((acc, resource) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };

  return Object.entries(typeCounts)
    .map(([type, count]) => `${typeEmojis[type as keyof typeof typeEmojis] || '📦'} ${type}: ${count}`)
    .join('\n');
}

function createResourceEmbed(resource: any, index: number): EmbedBuilder {
  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };

  const embed = new EmbedBuilder()
    .setTitle(`${typeEmojis[resource.type as keyof typeof typeEmojis] || '📦'} Result ${index}`)
    .setColor(0x3498db)
    .setTimestamp(new Date(resource.createdAt));

  if (resource.fileName) {
    embed.addFields([{ name: '📋 File Name', value: resource.fileName, inline: true }]);
  }

  if (resource.url) {
    embed.addFields([{ name: '🔗 URL', value: resource.url.length > 100 ? resource.url.substring(0, 97) + '...' : resource.url, inline: false }]);
  }

  if (resource.content) {
    const content = resource.content.length > 300 ? resource.content.substring(0, 297) + '...' : resource.content;
    embed.addFields([{ name: '📝 Content', value: `\`\`\`${content}\`\`\``, inline: false }]);
  }

  embed.addFields([
    { name: '📅 Archived', value: `<t:${Math.floor(new Date(resource.channel.archivedAt).getTime() / 1000)}:R>`, inline: true },
    { name: '📂 Channel', value: resource.channel.name, inline: true },
    { name: '👤 Author', value: `<@${resource.authorId}>`, inline: true }
  ]);

  return embed;
}

export const findCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('find')
    .setDescription('Search rescued resources in the knowledge base')
    .addStringOption(option =>
      option.setName('query').setDescription('Search query (keywords, URLs, filenames)')
        .setRequired(true).setMinLength(2).setMaxLength(100)
    )
    .addStringOption(option =>
      option.setName('type').setDescription('Filter by resource type').setRequired(false)
        .addChoices(
          { name: '📄 Files', value: 'FILE' },
          { name: '🔗 Links', value: 'LINK' },
          { name: '💻 Code', value: 'CODE' },
          { name: '📌 Pins', value: 'PIN' },
          { name: '🖼️ Images', value: 'IMAGE' },
          { name: '📋 Documents', value: 'DOCUMENT' }
        )
    )
    .addUserOption(option => option.setName('author').setDescription('Filter by resource author').setRequired(false))
    .addIntegerOption(option => option.setName('limit').setDescription('Maximum number of results (1-20)').setRequired(false).setMinValue(1).setMaxValue(20)) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    try {
      await interaction.deferReply();

      const query = interaction.options.getString('query', true);
      const type = interaction.options.getString('type') as any;
      const author = interaction.options.getUser('author');
      const limit = interaction.options.getInteger('limit') || 10;

      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      const whereClause: any = {
        channel: { guildId: interaction.guild.id },
        OR: [
          { url: { contains: query, mode: 'insensitive' } },
          { fileName: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { context: { contains: query, mode: 'insensitive' } },
          { tags: { has: query.toLowerCase() } }
        ]
      };

      if (type) whereClause.type = type;
      if (author) whereClause.authorId = author.id;

      const resources = await bot.prisma.resource.findMany({
        where: whereClause,
        include: { channel: { select: { name: true, archivedAt: true } } },
        orderBy: { createdAt: 'desc' },
        take: limit
      });

      if (resources.length === 0) {
        await interaction.editReply({
          embeds: [{
            title: '🔍 No Results Found',
            description: `No resources found matching "${query}".`,
            color: 0x95a5a6,
            fields: [{
              name: '💡 Search Tips',
              value: '• Try different keywords or partial matches\n• Use broader search terms\n• Check spelling and try variations\n• Remove type/author filters to expand results',
              inline: false
            }]
          }]
        });
        return;
      }

      const embeds: EmbedBuilder[] = [];
      const summaryEmbed = new EmbedBuilder()
        .setTitle('🔍 Search Results')
        .setDescription(`Found **${resources.length}** resource${resources.length === 1 ? '' : 's'} matching "${query}"`)
        .setColor(0x3498db)
        .addFields([{ name: '📊 Results Summary', value: getResultsSummary(resources), inline: false }])
        .setFooter({ text: `Showing ${Math.min(resources.length, limit)} of ${resources.length} results` })
        .setTimestamp();

      embeds.push(summaryEmbed);

      const maxResourceEmbeds = Math.min(resources.length, 9);
      for (let i = 0; i < maxResourceEmbeds; i++) {
        embeds.push(createResourceEmbed(resources[i], i + 1));
      }

      await interaction.editReply({ embeds });

      if (resources.length > maxResourceEmbeds) {
        const additionalCount = resources.length - maxResourceEmbeds;
        await interaction.followUp({
          content: `📄 **${additionalCount} more result${additionalCount === 1 ? '' : 's'} available**\n\nUse a more specific query or increase the \`limit\` parameter to see more results.`,
          flags: [MessageFlags.Ephemeral]
        });
      }
    } catch (error) {
      console.error('Error in find command:', error);
      try {
        await interaction.editReply('❌ An error occurred while searching resources.');
      } catch (editError) {
        console.error('Failed to edit reply:', editError);
      }
    }
  }
};