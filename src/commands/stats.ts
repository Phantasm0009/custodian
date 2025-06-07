import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  EmbedBuilder 
} from 'discord.js';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';

async function showOverviewStats(interaction: ChatInputCommandInteraction, bot: any): Promise<void> {
  const [totalResources, totalChannels, recentResources] = await Promise.all([
    bot.prisma.resource.count({
      where: { channel: { guildId: interaction.guildId } }
    }),
    bot.prisma.archivedChannel.count({
      where: { guildId: interaction.guildId }
    }),
    bot.prisma.resource.count({
      where: { 
        channel: { guildId: interaction.guildId },
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    })
  ]);

  const typeStats = await bot.prisma.resource.groupBy({
    by: ['type'],
    where: { channel: { guildId: interaction.guildId } },
    _count: { type: true }
  });

  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };
  const typeStatsText = typeStats
    .map((stat: any) => `${typeEmojis[stat.type as keyof typeof typeEmojis] || '📦'} ${stat.type}: ${stat._count.type}`)
    .join('\n');

  const embed = new EmbedBuilder()
    .setTitle('📊 Knowledge Base Statistics')
    .setColor(0x2ecc71)
    .addFields([
      { name: '📦 Total Resources', value: totalResources.toString(), inline: true },
      { name: '📂 Archived Channels', value: totalChannels.toString(), inline: true },
      { name: '🆕 Recent (30d)', value: recentResources.toString(), inline: true },
      { name: '📋 By Type', value: typeStatsText || 'No resources found', inline: false }
    ])
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function showChannelStats(interaction: ChatInputCommandInteraction, bot: any): Promise<void> {
  const channelStats = await bot.prisma.archivedChannel.findMany({
    where: { guildId: interaction.guildId },
    include: {
      _count: {
        select: { resources: true }
      }
    },
    orderBy: { archivedAt: 'desc' },
    take: 10
  });

  if (channelStats.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle('📂 Channel Statistics')
      .setDescription('No archived channels found in this server.')
      .setColor(0xe74c3c);
    
    await interaction.editReply({ embeds: [embed] });
    return;
  }

  const description = channelStats    .map((channel: any, index: number) => 
      `**${index + 1}.** ${channel.name} - ${channel._count.resources} resources`
    )
    .join('\n');

  const embed = new EmbedBuilder()
    .setTitle('📂 Channel Statistics (Top 10)')
    .setDescription(description)
    .setColor(0x3498db)
    .setFooter({ text: `Showing top ${channelStats.length} channels by resources` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function showResourceStats(interaction: ChatInputCommandInteraction, bot: any): Promise<void> {
  const resourceStats = await bot.prisma.resource.findMany({
    where: { channel: { guildId: interaction.guildId } },
    include: { channel: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  if (resourceStats.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle('📋 Recent Resources')
      .setDescription('No resources found in this server.')
      .setColor(0xe74c3c);
    
    await interaction.editReply({ embeds: [embed] });
    return;
  }

  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };
  const description = resourceStats
    .map((resource: any, index: number) => {
      const emoji = typeEmojis[resource.type as keyof typeof typeEmojis] || '📦';
      const title = resource.fileName || resource.url?.substring(0, 50) || 'Untitled';
      return `**${index + 1}.** ${emoji} ${title} (${resource.channel.name})`;
    })
    .join('\n');

  const embed = new EmbedBuilder()
    .setTitle('📋 Recent Resources (Last 10)')
    .setDescription(description)
    .setColor(0x9b59b6)
    .setFooter({ text: 'Showing most recently archived resources' })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

async function showArchiveStats(interaction: ChatInputCommandInteraction, bot: any): Promise<void> {
  const archives = await bot.prisma.archivedChannel.findMany({
    where: { guildId: interaction.guildId },
    orderBy: { archivedAt: 'desc' },
    take: 10
  });

  if (archives.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle('📦 Archive Statistics')
      .setDescription('No archived channels found in this server.')
      .setColor(0xe74c3c);
    
    await interaction.editReply({ embeds: [embed] });
    return;
  }

  const description = archives    .map((archive: any, index: number) => {
      const date = new Date(archive.archivedAt).toLocaleDateString();
      return `**${index + 1}.** ${archive.name} - Archived on ${date}`;
    })
    .join('\n');

  const embed = new EmbedBuilder()
    .setTitle('📦 Archive History (Last 10)')
    .setDescription(description)
    .setColor(0xe67e22)
    .setFooter({ text: `Total archives: ${archives.length}` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

export const statsCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View knowledge base statistics')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type of statistics to view')
        .setRequired(false)
        .addChoices(
          { name: '📊 Overview', value: 'overview' },
          { name: '📂 Channels', value: 'channels' },
          { name: '📋 Resources', value: 'resources' },
          { name: '📦 Archives', value: 'archives' }
        )
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    try {
      const bot = getBotInstance();
      if (!bot) {
        await interaction.editReply('❌ Bot instance not available.');
        return;
      }

      const type = interaction.options.getString('type') || 'overview';

      switch (type) {
        case 'channels':
          await showChannelStats(interaction, bot);
          break;
        case 'resources':
          await showResourceStats(interaction, bot);
          break;
        case 'archives':
          await showArchiveStats(interaction, bot);
          break;
        default:
          await showOverviewStats(interaction, bot);
          break;
      }

    } catch (error) {
      console.error('Error in stats command:', error);
      await interaction.editReply('❌ An error occurred while fetching statistics.');
    }
  }
};
