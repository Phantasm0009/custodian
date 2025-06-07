import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../types';
import { logger } from '../lib/logger';

export const helpCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display help information about ArchiveMind bot commands')
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('Get detailed help for a specific command')
        .setRequired(false)
        .addChoices(
          { name: 'watch', value: 'watch' },
          { name: 'archive', value: 'archive' },
          { name: 'restore', value: 'restore' },
          { name: 'archives', value: 'archives' },
          { name: 'find', value: 'find' },
          { name: 'digest', value: 'digest' },
          { name: 'stats', value: 'stats' },
          { name: 'forget-channel', value: 'forget-channel' },
          { name: 'extract-resources', value: 'extract-resources' }
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
    .setTitle('🧠 ArchiveMind Bot - Help')
    .setDescription('All-in-one channel lifecycle manager that automates archiving inactive channels and rescues valuable resources to create a searchable knowledge base.')
    .setColor(0x5865F2)
    .addFields(
      {
        name: '🗃️ Channel Archiving System',
        value: [
          '`/watch` - Monitor channels for auto-archiving',
          '`/archive` - Archive a channel immediately',
          '`/restore` - Restore an archived channel',
          '`/archives` - Browse and search archived channels'
        ].join('\n'),
        inline: false
      },
      {
        name: '📦 Resource Rescue System',
        value: [
          '`/find` - Search rescued resources',
          '`/digest` - Generate knowledge reports',
          '`/extract-resources` - Manual resource extraction'
        ].join('\n'),
        inline: false
      },
      {
        name: '📊 Administration',
        value: [
          '`/stats` - View comprehensive statistics',
          '`/forget-channel` - GDPR-compliant data deletion'
        ].join('\n'),
        inline: false
      },
      {
        name: '❓ Get Detailed Help',
        value: 'Use `/help <command>` for detailed information about any command.',
        inline: false
      },
      {
        name: '🌟 Key Features',
        value: [
          '• Automatic inactive channel detection with warnings (7d, 3d, 1d)',
          '• Smart resource extraction (files, links, code, pins)',
          '• Complete channel restoration with original settings',
          '• Searchable knowledge base with smart tagging',
          '• Monthly digest generation for team onboarding',
          '• GDPR-compliant data management',
          '• Tombstone messages with restore commands'
        ].join('\n'),
        inline: false
      }
    )
    .setFooter({ 
      text: 'ArchiveMind • Use /help <command> for detailed command help',
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
        .setTitle('👁️ `/watch` Command')
        .setDescription('Monitor channels for automatic archiving based on inactivity with configurable warning periods.')
        .addFields(
          {
            name: 'Usage',
            value: '`/watch <channel> [inactivity_days] [rescue]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel` - Channel to monitor (required)',
              '• `inactivity_days` - Days of inactivity before warning (default: 30)',
              '• `rescue` - Enable resource rescue (default: true)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Warning Schedule',
            value: [
              '• 7 days before: First warning',
              '• 3 days before: Second warning', 
              '• 1 day before: Final warning',
              '• Archive time: Automatic archiving with resource rescue'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Examples',
            value: [
              '`/watch #old-project` - Monitor with default settings',
              '`/watch #temp-chat inactivity_days:14 rescue:true` - Custom settings'
            ].join('\n'),
            inline: false
          }
        );

    case 'archive':
      return embed
        .setTitle('📦 `/archive` Command')
        .setDescription('Immediately archive a channel with resource extraction and tombstone creation.')
        .addFields(
          {
            name: 'Usage',
            value: '`/archive <channel> [reason]`',
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
              '• Scans last 500 messages for valuable resources',
              '• Extracts files, links, code blocks, and pins',
              '• Posts rescued items to archive library with tags',
              '• Creates tombstone message with restore command',
              '• Archives channel with original settings preserved'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Safety Features',
            value: [
              '• Requires admin permissions',
              '• Confirmation dialog prevents accidents',
              '• Protected channels cannot be archived',
              '• Complete audit trail maintained'
            ].join('\n'),
            inline: false
          }
        );

    case 'restore':
      return embed
        .setTitle('🔄 `/restore` Command')
        .setDescription('Restore an archived channel to its original state with all settings and permissions.')
        .addFields(
          {
            name: 'Usage',
            value: '`/restore <channel_name> [reason]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel_name` - Name of archived channel (required)',
              '• `reason` - Reason for restoration (optional)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'What gets restored',
            value: [
              '• Original channel name and category',
              '• All permissions and role overrides',
              '• Channel topic and slowmode settings',
              '• NSFW flag and position',
              '• Links to rescued resources in knowledge base'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Important Notes',
            value: [
              '• Message history cannot be restored',
              '• Rescued resources remain in knowledge base',
              '• Use `/find` to access original resources',
              '• Restoration is logged for audit purposes'
            ].join('\n'),
            inline: false
          }
        );

    case 'archives':
      return embed
        .setTitle('📋 `/archives` Command')
        .setDescription('Browse and search archived channels with comprehensive filtering options.')
        .addFields(
          {
            name: 'Usage',
            value: '`/archives [action] [query] [limit]`',
            inline: false
          },
          {
            name: 'Actions',
            value: [
              '• `list` - Show all archived channels (default)',
              '• `search` - Search by name, category, or topic',
              '• `stats` - View archive statistics and analytics'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Search Features',
            value: [
              '• Search by channel name (partial matches)',
              '• Filter by category name',
              '• Search channel topics and descriptions',
              '• Case-insensitive matching',
              '• Configurable result limits'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Examples',
            value: [
              '`/archives` - List recent archives',
              '`/archives action:search query:project` - Find project channels',
              '`/archives action:stats` - View detailed statistics'
            ].join('\n'),
            inline: false
          }
        );

    case 'find':
      return embed
        .setTitle('🔍 `/find` Command')
        .setDescription('Search through rescued resources from archived channels with advanced filtering.')
        .addFields(
          {
            name: 'Usage',
            value: '`/find <query> [type] [author] [limit]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `query` - Search terms (required)',
              '• `type` - Filter by resource type (file, link, code, etc.)',
              '• `author` - Filter by author',
              '• `limit` - Max results (1-20, default: 10)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Search Capabilities',
            value: [
              '• Full-text search across content and context',
              '• Smart tagging based on channel and keywords',
              '• File name and URL matching',
              '• Code language detection',
              '• Author and date filtering'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Examples',
            value: [
              '`/find "API documentation"` - Search all resources',
              '`/find "react" type:code` - Find React code snippets',
              '`/find "tutorial" type:link author:@user` - Specific search'
            ].join('\n'),
            inline: false
          }
        );

    case 'digest':
      return embed
        .setTitle('📄 `/digest` Command')
        .setDescription('Generate comprehensive knowledge digests from rescued resources.')
        .addFields(
          {
            name: 'Usage',
            value: '`/digest [days] [type] [format]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `days` - Time period for digest (default: 7)',
              '• `type` - Filter by resource type',
              '• `format` - Output format (embed or markdown)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Digest Contents',
            value: [
              '• Resource summary and statistics',
              '• Categorized listings by type',
              '• Code snippet previews with syntax highlighting',
              '• Link descriptions and metadata',
              '• File information and thumbnails',
              '• Author contributions and timestamps'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Special Features',
            value: [
              '• `/digest all` - Monthly digest of all resources',
              '• Perfect for team onboarding',
              '• Automated knowledge sharing',
              '• Exportable formats (PDF, HTML, Markdown)'
            ].join('\n'),
            inline: false
          }
        );

    case 'stats':
      return embed
        .setTitle('📈 `/stats` Command')
        .setDescription('View comprehensive statistics and analytics for archives and resources.')
        .addFields(
          {
            name: 'Usage',
            value: '`/stats [type]`',
            inline: false
          },
          {
            name: 'Statistics Types',
            value: [
              '• `overview` - General statistics (default)',
              '• `channels` - Channel-specific analytics',
              '• `resources` - Resource type breakdown',
              '• `archives` - Archive history and trends'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Information Shown',
            value: [
              '• Total archived channels and resources',
              '• Resource breakdown by type and category',
              '• Top contributors and active channels',
              '• Recent archive activity and trends',
              '• Storage usage and impact metrics',
              '• Warning and restoration statistics'
            ].join('\n'),
            inline: false
          }
        );

    case 'forget-channel':
      return embed
        .setTitle('🗑️ `/forget-channel` Command')
        .setDescription('GDPR-compliant complete deletion of channel data (ADMIN ONLY).')
        .addFields(
          {
            name: 'Usage',
            value: '`/forget-channel <channel_name> <reason> <confirm_gdpr>`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `channel_name` - Name of channel to delete (required)',
              '• `reason` - Legal reason for deletion (required)',
              '• `confirm_gdpr` - Must be true to proceed (required)'
            ].join('\n'),
            inline: false
          },
          {
            name: '⚠️ WARNING',
            value: [
              '• **THIS ACTION CANNOT BE UNDONE**',
              '• Permanently deletes ALL channel data',
              '• Removes rescued resources and metadata',
              '• Complies with GDPR "Right to be Forgotten"',
              '• Requires administrator permissions'
            ].join('\n'),
            inline: false
          },
          {
            name: 'What gets deleted',
            value: [
              '• Channel metadata and settings',
              '• All rescued resources (files, links, code)',
              '• Archive warnings and notifications',
              '• Database records and audit trails',
              '• All associated tombstone messages'
            ].join('\n'),
            inline: false
          }
        );

    case 'extract-resources':
      return embed
        .setTitle('🔍 `/extract-resources` Command')
        .setDescription('Manually extract resources from recent messages in the current channel.')
        .addFields(
          {
            name: 'Usage',
            value: '`/extract-resources [count]`',
            inline: false
          },
          {
            name: 'Parameters',
            value: [
              '• `count` - Number of recent messages to scan (default: 50, max: 500)'
            ].join('\n'),
            inline: false
          },
          {
            name: 'Use Cases',
            value: [
              '• Testing resource extraction on existing channels',
              '• Backfilling resources from important discussions',
              '• Manual rescue before archiving',
              '• Extracting resources from active channels'
            ].join('\n'),
            inline: false
          },
          {
            name: 'What gets extracted',
            value: [
              '• Files and attachments (PDFs, images, documents)',
              '• Valuable links (GitHub, docs, tutorials)',
              '• Code blocks (5+ lines with syntax detection)',
              '• Pinned messages and important content'
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