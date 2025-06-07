import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../types';
import { logger } from '../lib/logger';

export const helpCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display help information about Archivemind bot commands')
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('Get detailed help for a specific command')
        .setRequired(false)
        .addChoices(
          { name: 'watch', value: 'watch' },
          { name: 'archive-now', value: 'archive-now' },
          { name: 'restore', value: 'restore' },
          { name: 'find', value: 'find' },
          { name: 'digest', value: 'digest' },
          { name: 'stats', value: 'stats' }
        )
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const specificCommand = interaction.options.getString('command');

      if (specificCommand) {
        const embed = getCommandHelpEmbed(specificCommand);
        await interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        const embed = getGeneralHelpEmbed();
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      logger.info('Help command executed', {
        command: 'help',
        user: interaction.user.tag,
        guild: interaction.guild?.name || 'DM',
        specificCommand: specificCommand || 'general'
      });

    } catch (error) {
      logger.error('Error executing help command:', error);
      
      const errorMessage = 'Sorry, I encountered an error while displaying help information.';
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  },
};

function getGeneralHelpEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🤖 Archivemind Bot - Help')
    .setDescription('Archivemind automatically archives inactive channels while preserving valuable resources like files, links, and code snippets in searchable knowledge bases.')
    .setColor(0x5865F2)
    .addFields(
      {
        name: '📊 Channel Management',
        value: [
          '`/watch` - Monitor channels for auto-archiving',
          '`/archive-now` - Archive a channel immediately',
          '`/restore` - Restore an archived channel',
          '`/stats` - View archiving statistics'
        ].join('\n'),
        inline: false
      },
      {
        name: '🔍 Knowledge Base',
        value: [
          '`/find` - Search rescued resources',
          '`/digest` - Generate PDF knowledge reports'
        ].join('\n'),
        inline: false
      },
      {
        name: '❓ Get Detailed Help',
        value: 'Use `/help <command>` for detailed information about any command.',
        inline: false
      },
      {
        name: '🔧 Features',
        value: [
          '• Automatic inactive channel detection',
          '• Smart resource extraction (files, links, code)',
          '• Grace period warnings before archiving',
          '• Full channel restoration capabilities',
          '• Advanced search with filters',
          '• PDF knowledge digest generation'
        ].join('\n'),
        inline: false
      }
    )
    .setFooter({ 
      text: 'Archivemind • Use /help <command> for detailed command help',
      iconURL: 'https://cdn.discordapp.com/attachments/placeholder/bot-icon.png'
    })
    .setTimestamp();
}

function getCommandHelpEmbed(command: string): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTimestamp();

  switch (command) {
    case 'watch':
      return embed
        .setTitle('📊 `/watch` Command')
        .setDescription('Monitor channels for automatic archiving based on inactivity.')
        .addFields(
          {
            name: 'Usage',
            value: '`/watch <channel> [inactivity_days] [grace_period_days]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel` - Channel to monitor (required)',
              '• `inactivity_days` - Days of inactivity before warning (default: 30)',
              '• `grace_period_days` - Days between warning and archiving (default: 7)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Examples',
            value: [
              '`/watch #old-project` - Monitor with default settings',
              '`/watch #temp-chat 14 3` - Archive after 14 days inactive, 3 day grace period'
            ].join('\n'),
            inline: false
          }
        );

    case 'archive-now':
      return embed
        .setTitle('📦 `/archive-now` Command')
        .setDescription('Immediately archive a channel with resource extraction.')
        .addFields(
          {
            name: 'Usage',
            value: '`/archive-now <channel> [reason]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel` - Channel to archive (required)',
              '• `reason` - Reason for archiving (optional)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'What happens',
            value: [
              '• Channel becomes read-only',
              '• Resources are extracted and saved',
              '• Archive metadata is stored',
              '• Notification sent to knowledge base'
            ].join('\n'),
            inline: false
          }
        );

    case 'restore':
      return embed
        .setTitle('🔄 `/restore` Command')
        .setDescription('Restore an archived channel to its original state.')
        .addFields(
          {
            name: 'Usage',
            value: '`/restore <channel> [reason]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel` - Archived channel to restore (required)',
              '• `reason` - Reason for restoration (optional)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'What happens',
            value: [
              '• Original permissions restored',
              '• Channel becomes active again',
              '• Archive status removed',
              '• Restoration logged'
            ].join('\n'),
            inline: false
          }
        );

    case 'find':
      return embed
        .setTitle('🔍 `/find` Command')
        .setDescription('Search through rescued resources from archived channels.')
        .addFields(
          {
            name: 'Usage',
            value: '`/find <query> [type] [author] [channel] [limit]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `query` - Search terms (required)',
              '• `type` - Filter by resource type (file, link, code, etc.)',
              '• `author` - Filter by author',
              '• `channel` - Filter by original channel',
              '• `limit` - Max results (1-20, default: 10)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Examples',
            value: [
              '`/find "API documentation"` - Search all resources',
              '`/find "react" type:code` - Find React code snippets',
              '`/find "tutorial" type:link author:@user` - Find tutorial links by user'
            ].join('\n'),
            inline: false
          }
        );

    case 'digest':
      return embed
        .setTitle('📄 `/digest` Command')
        .setDescription('Generate a PDF knowledge digest from channel resources.')
        .addFields(
          {
            name: 'Usage',
            value: '`/digest <channel> [include_stats] [include_previews]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel` - Channel to generate digest for (required)',
              '• `include_stats` - Include statistics (default: true)',
              '• `include_previews` - Include resource previews (default: true)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Contents',
            value: [
              '• Channel summary and statistics',
              '• Categorized resource listings',
              '• Code snippet previews',
              '• Link descriptions and metadata',
              '• File information and thumbnails'
            ].join('\n'),
            inline: false
          }
        );

    case 'stats':
      return embed
        .setTitle('📈 `/stats` Command')
        .setDescription('View comprehensive archiving and resource statistics.')
        .addFields(
          {
            name: 'Usage',
            value: '`/stats [period]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: '• `period` - Time period for stats (week, month, year, all)',
            inline: false
          },
          {
            name: 'Information Shown',
            value: [
              '• Total archived channels',
              '• Resources rescued by type',
              '• Most active channels',
              '• Recent archive activity',
              '• Storage usage statistics',
              '• Warning and restoration counts'
            ].join('\n'),
            inline: false
          }
        );

    default:
      return embed
        .setTitle('❓ Unknown Command')
        .setDescription(`Command "${command}" not found. Use \`/help\` to see all available commands.`);
  }
}
