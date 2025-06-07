import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder
} from 'discord.js';
import { DateTime } from 'luxon';
import type { SlashCommand } from '../types';
import { getBotInstance } from '../lib/botInstance';

function generateDigestSummary(resources: any[]): string {
  const typeCounts = resources.reduce((acc, resource) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeEmojis = {
    FILE: '📄', LINK: '🔗', CODE: '💻', PIN: '📌', IMAGE: '🖼️', DOCUMENT: '📋'
  };

  const totalResources = resources.length;
  const summary = Object.entries(typeCounts)
    .map(([type, count]) => {
      const emoji = typeEmojis[type as keyof typeof typeEmojis] || '📦';
      const percentage = Math.round(((count as number) / totalResources) * 100);
      return `${emoji} **${type}**: ${count} (${percentage}%)`;
    })
    .join('\n');

  return summary || 'No resources found.';
}

function formatTimeRange(days: number): string {
  if (days === 1) return 'Last 24 hours';
  if (days === 7) return 'Last week';
  if (days === 30) return 'Last month';
  return `Last ${days} days`;
}

function generateMarkdownDigest(resources: any[], timeRange: string): string {
  const header = `# Archive Digest - ${timeRange}\n\nGenerated on ${DateTime.now().toFormat('dd/MM/yyyy HH:mm')}\n\n`;
  const summary = `## Summary\n\n${generateDigestSummary(resources)}\n\n**Total Resources**: ${resources.length}\n\n`;
  
  let content = header + summary;
  
  const resourcesByType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) acc[resource.type] = [];
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, any[]>);  // Process resources by type
  for (const [type, typeResources] of Object.entries(resourcesByType)) {
    content += `## ${type}\n\n`;
    for (const resource of typeResources as any[]) {
      content += `### ${resource.title || resource.fileName || 'Untitled'}\n\n`;
      if (resource.url) content += `**URL:** ${resource.url}\n\n`;
      if (resource.content) content += `**Content:**\n\`\`\`\n${resource.content.substring(0, 500)}${resource.content.length > 500 ? '...' : ''}\n\`\`\`\n\n`;
      content += `**Channel:** ${resource.channel.name} | **Author:** <@${resource.authorId}> | **Date:** ${DateTime.fromJSDate(resource.createdAt).toFormat('dd/MM/yyyy HH:mm')}\n\n---\n\n`;
    }
  }

  return content;
}

export const digestCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('digest')
    .setDescription('Generate and export archive digest')
    .addIntegerOption(option =>
      option.setName('days').setDescription('Number of days to include in digest')
        .setRequired(false).setMinValue(1).setMaxValue(365)
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
    .addStringOption(option =>
      option.setName('format').setDescription('Export format').setRequired(false)
        .addChoices(
          { name: '📄 Markdown (.md)', value: 'markdown' },
          { name: '📊 Discord Embed', value: 'embed' }
        )
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = getBotInstance();
    try {
      await interaction.deferReply();

      const days = interaction.options.getInteger('days') || 7;
      const typeFilter = interaction.options.getString('type');
      const format = interaction.options.getString('format') || 'embed';

      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      const cutoffDate = DateTime.now().minus({ days }).toJSDate();
      const whereClause: any = { createdAt: { gte: cutoffDate } };
      if (typeFilter) whereClause.type = typeFilter;

      let resources = await bot.prisma.resource.findMany({
        where: whereClause,
        include: { channel: { select: { name: true, guildId: true, archivedAt: true } } },
        orderBy: [{ type: 'asc' }, { createdAt: 'desc' }]
      });

      resources = resources.filter((r: any) => r.channel.guildId === interaction.guildId);

      if (resources.length === 0) {
        const timeRange = formatTimeRange(days);
        const filterText = typeFilter ? ` of type **${typeFilter}**` : '';
        
        await interaction.editReply({
          embeds: [new EmbedBuilder()
            .setTitle('📋 No Resources Found')
            .setDescription(`No resources found in ${timeRange}${filterText}.`)
            .setColor(0x95a5a6)]
        });
        return;
      }

      const timeRange = formatTimeRange(days);

      if (format === 'markdown') {
        const markdownContent = generateMarkdownDigest(resources, timeRange);
        const fileName = `archive-digest-${DateTime.now().toFormat('yyyy-MM-dd')}.md`;
        const attachment = new AttachmentBuilder(Buffer.from(markdownContent, 'utf8'), { name: fileName });

        const embed = new EmbedBuilder()
          .setTitle('📋 Archive Digest Generated')
          .setDescription(`Digest for **${timeRange}** has been generated and attached.`)
          .setColor(0x27ae60)
          .addFields([
            { name: '📊 Summary', value: generateDigestSummary(resources), inline: false },
            { name: '📄 Export Details', value: `**Format:** Markdown (.md)\n**Resources:** ${resources.length}\n**File:** ${fileName}`, inline: false }
          ])
          .setTimestamp();

        const avatarURL = bot.client.user?.avatarURL();
        if (avatarURL) {
          embed.setFooter({ text: 'Archivemind Bot', iconURL: avatarURL });
        }

        await interaction.editReply({ embeds: [embed], files: [attachment] });
      } else {
        const embed = new EmbedBuilder()
          .setTitle(`📋 Archive Digest - ${timeRange}`)
          .setDescription('Comprehensive digest of rescued resources from archived channels.')
          .setColor(0x3498db)
          .addFields([
            { name: '📊 Resource Summary', value: generateDigestSummary(resources), inline: false },
            { name: '📈 Statistics', value: `**Total Resources:** ${resources.length}\n**Time Period:** ${timeRange}\n**Generated:** <t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
          ])
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
      }
      
    } catch (error) {
      console.error('Error in digest command:', error);
      await interaction.editReply('❌ An error occurred while generating the digest.');
    }
  }
};
