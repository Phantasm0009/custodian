# ArchiveMind Discord Bot

An all-in-one channel lifecycle manager that automates archiving inactive channels and rescues valuable resources to create a searchable knowledge base.

## ✅ Project Status: COMPLETE & READY FOR DEPLOYMENT

**All core functionality implemented and tested:**
- ✅ Global bot deployment support (works across multiple Discord servers)
- ✅ Intelligent channel monitoring and archiving
- ✅ Smart resource extraction and rescue system
- ✅ Complete channel restoration with tombstones
- ✅ Searchable knowledge base with tagging
- ✅ Admin dashboard and permission system
- ✅ GDPR-compliant deletion features
- ✅ Monthly digest generation
- ✅ Full test coverage
- ✅ Production-ready error handling

## 🌟 Features

### 🗃️ Channel Archiving System
- **`/watch #channel [inactivity=30d]`**: Auto-archive after inactivity with configurable warning periods (7d, 3d, 1d)
- **`/archive #channel [reason]`**: Manually trigger archiving with confirmation
- **`/restore project-x`**: Restore archived channel with original settings (permissions, topic, category, slowmode, pinned messages)
- **`/archives [action] [query]`**: Browse and search archived channels with filters
- **Tombstones**: Leave pinned messages in archived channels with restore commands

### 📦 Resource Rescue System
- **Smart Resource Detection**: Automatically scans last 500 messages (customizable) for:
  - Links (GitHub, YouTube, Documentation, Stack Overflow)
  - Files (PDFs, images, code snippets, documents)
  - Code blocks (5+ lines with syntax highlighting)
  - Pinned messages and important content
- **Central Archive Library**: Posts rescued items to `#archive-library` with tags and context
- **Smart Tagging**: Auto-tags based on channel name and message keywords
- **`/digest #channel`**: Generate comprehensive resource summaries
- **`/digest all`**: Monthly PDF/HTML digest of all rescued resources
- **Tombstone Integration**: Links to view all rescued items from archived channels

### 📊 Admin Dashboard
- **Channel Analytics**: Scheduled archivals, activity monitoring, storage impact
- **Resource Analytics**: Top contributors, resource types, trending content
- **Permission Management**: Tiered access control and admin oversight
- **GDPR Compliance**: `/forget-channel` for complete data deletion

### 🔐 Permission System
- **Admin-Only Commands**: Restore and archive operations restricted to administrators
- **Tiered Access**: Different permission levels for various operations
- **Audit Logging**: Complete audit trail of all operations
- **GDPR Compliance**: Right to be forgotten with complete data removal

### 🌟 Bonus Features
- **Knowledge Base Search**: Advanced search with filters and semantic matching
- **Team Onboarding**: Automated knowledge sharing for new team members
- **Resource Previews**: Rich embeds with link previews and file thumbnails
- **Smart Notifications**: Contextual warnings and status updates

## 🛠️ Technology Stack

- **Runtime**: Node.js with TypeScript
- **Discord API**: Discord.js v14 with Slash Commands
- **Database**: PostgreSQL with advanced indexing
- **PDF Generation**: Puppeteer for digest creation
- **Logging**: Winston with structured logging
- **Web Scraping**: Puppeteer for link previews

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Discord Bot Token and Application
- Optional: Web dashboard hosting

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd archivemind-bot
npm install
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

### 3. Environment Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Discord Configuration
DISCORD_TOKEN=your_discord_bot_token
ARCHIVE_LIBRARY_CHANNEL_ID=your_archive_library_channel_id

# Database Configuration
DATABASE_URL="your_postgres_connection_string"

# Optional Settings
LOG_LEVEL=info
NODE_ENV=development
DEFAULT_INACTIVITY_DAYS=30
GRACE_PERIOD_DAYS=7
```

### 4. Discord Bot Setup

1. Create a Discord Application at [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a bot and copy the token to your `.env` file
3. Generate invite link with these permissions:
   - Send Messages
   - Use Slash Commands
   - Manage Channels
   - Read Message History
   - Attach Files
   - Embed Links
   - Manage Messages

Required bot permissions integer: `274881132608`

### 5. Start the Bot

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm run build
npm start
```

## 📚 Commands

### Channel Management

- **`/watch <channel> [inactivity_days] [rescue]`**
  - Monitor channels for auto-archiving
  - Default: 30 days inactivity, rescue enabled
  - Configurable warning periods: 7d, 3d, 1d

- **`/archive <channel> [reason]`**
  - Immediately archive a channel with resource extraction
  - Requires admin permissions and confirmation
  - Creates tombstone with restore information

- **`/restore <channel_name> [reason]`**
  - Restore an archived channel to its original state
  - Restores permissions, topic, category, slowmode
  - Restores pinned messages and settings

- **`/archives [action] [query]`**
  - List all archived channels
  - Search archived channels by name or content
  - Filter by date, size, or resource count

### Resource Management

- **`/find <query> [type] [author] [limit]`**
  - Search rescued resources with advanced filtering
  - Types: file, link, code, image, document, pin
  - Supports semantic search and tagging

- **`/digest <channel> [format] [timeframe]`**
  - Generate PDF/HTML knowledge digest from channel resources
  - Includes statistics, resource listings, and previews
  - Formats: PDF, HTML, Markdown

- **`/digest all [timeframe]`**
  - Monthly digest of all rescued resources across channels
  - Perfect for team onboarding and knowledge sharing
  - Automated generation and distribution

- **`/extract-resources [count]`**
  - Manually extract resources from recent messages
  - Useful for testing and backfilling resources

### Administration

- **`/stats [type] [period]`**
  - View comprehensive statistics and analytics
  - Types: overview, channels, resources, archives
  - Periods: week, month, year, all

- **`/forget-channel <channel>`**
  - GDPR-compliant complete data deletion
  - Removes all traces of channel and resources
  - Requires admin confirmation

### Help

- **`/help [command]`**
  - Display general help or detailed command information
  - Interactive help system with examples

## 🏗️ Architecture

### Core Components

```
src/
├── bot.ts                  # Main bot entry point
├── types.ts               # TypeScript interfaces
├── lib/
│   ├── logger.ts          # Winston logging system
│   ├── rescueEngine.ts    # Resource extraction engine
│   ├── archiveManager.ts  # Channel archiving logic
│   └── activityMonitor.ts # Activity tracking system
└── commands/              # Slash command implementations
    ├── index.ts
    ├── watch.ts
    ├── archive.ts
    ├── restore.ts
    ├── archives.ts
    ├── find.ts
    ├── digest.ts
    ├── stats.ts
    ├── forgetChannel.ts
    └── help.ts
```

### Database Schema

The bot uses a PostgreSQL database with the following main entities:

- **ArchivedChannel**: Stores archived channel metadata and settings
- **Resource**: Rescued files, links, code snippets with smart tagging
- **ArchiveWarning**: Warning notifications sent before archiving
- **WatchedChannel**: Channels being monitored for inactivity
- **KnowledgeDigest**: Generated PDF reports and their metadata

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DISCORD_TOKEN` | Discord bot token | Required |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `ARCHIVE_LIBRARY_CHANNEL_ID` | Channel for archive notifications | Required |
| `LOG_LEVEL` | Logging level (error, warn, info, debug) | `info` |
| `NODE_ENV` | Environment (development, production) | `development` |
| `DEFAULT_INACTIVITY_DAYS` | Default days before warning | `30` |
| `GRACE_PERIOD_DAYS` | Default grace period | `7` |

### Bot Configuration

Key configuration options in the code:

```typescript
// Default inactivity threshold
const DEFAULT_INACTIVITY_DAYS = 30;

// Grace period before archiving
const GRACE_PERIOD_DAYS = 7;

// Resource extraction settings
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const SUPPORTED_CODE_LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp'];
```

## 🧪 Development

### Scripts

```bash
# Development with auto-restart
npm run dev

# Build TypeScript
npm run build

# Start production
npm start

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema changes
npm run db:migrate    # Run migrations
npm run db:studio     # Open Prisma Studio

# Testing
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report

# Linting and formatting
npm run lint          # ESLint check
npm run lint:fix      # Fix ESLint issues
npm run format        # Prettier formatting
```

### Project Structure

```
archivemind-bot/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/                       # TypeScript source code
├── logs/                      # Log files (created at runtime)
├── dist/                      # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### Adding New Commands

1. Create command file in `src/commands/`
2. Implement the `SlashCommand` interface
3. Add to `src/commands/index.ts`
4. Update help command with new command info

Example command structure:

```typescript
import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { SlashCommand } from '../types';

export const myCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('mycommand')
    .setDescription('Description of my command'),

  async execute(interaction: CommandInteraction) {
    // Command implementation
  },
};
```

## 🔍 Resource Types

The bot automatically detects and categorizes these resource types:

- **Files**: Documents, images, archives, executables
- **Links**: URLs with automatic preview generation
- **Code**: Code blocks with syntax highlighting
- **GitHub**: Repositories, issues, pull requests
- **Documentation**: API docs, tutorials, guides
- **Images**: Embedded images and attachments

## 📊 Monitoring & Logging

### Log Files

- `logs/combined.log` - All log entries
- `logs/error.log` - Error-level logs only
- `logs/archive.log` - Archive-specific operations

### Log Levels

- `error` - Critical errors and failures
- `warn` - Warnings and potential issues
- `info` - General information and operations
- `debug` - Detailed debugging information

### Monitoring Capabilities

- Channel activity tracking
- Resource extraction statistics
- Archive operation audit trails
- Error tracking and alerting
- Performance metrics

## 🚀 Deployment

### Production Setup

1. **Server Requirements**:
   - Node.js 18+
   - PostgreSQL 14+
   - 2GB+ RAM recommended
   - SSD storage for logs and temp files

2. **Environment Setup**:
   ```bash
   # Set production environment
   NODE_ENV=production
   LOG_LEVEL=info
   
   # Use production database
   DATABASE_URL="your_production_db_url"
   ```

3. **Process Management**:
   ```bash
   # Using PM2 (recommended)
   npm install -g pm2
   pm2 start npm --name "archivemind" -- start
   pm2 save
   pm2 startup
   ```

### Docker Deployment (Optional)

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

1. **Bot not responding to commands**:
   - Check bot permissions in Discord server
   - Verify `DISCORD_TOKEN` is correct
   - Ensure bot is invited with proper scopes

2. **Database connection errors**:
   - Verify `DATABASE_URL` format
   - Check PostgreSQL is running
   - Ensure database exists

3. **Resource extraction failing**:
   - Check file size limits
   - Verify network connectivity for link previews
   - Review error logs for specific issues

4. **PDF generation errors**:
   - Ensure sufficient disk space
   - Check Puppeteer dependencies
   - Verify font availability

### Debug Mode

Enable debug logging for troubleshooting:

```env
LOG_LEVEL=debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add new feature"`
5. Push and create a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for formatting
- Add JSDoc comments for public functions
- Write unit tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Create an issue for bug reports
- Join our Discord server for community support
- Check the documentation for common solutions
- Review logs for detailed error information

## 🔮 Roadmap

- [ ] Web dashboard for bot management
- [ ] Advanced AI-powered resource categorization
- [ ] Integration with external knowledge bases
- [ ] Automated backup and restore from cloud storage
- [ ] Multi-server resource sharing
- [ ] Advanced analytics and reporting
- [ ] Plugin system for custom extractors

---

**ArchiveMind** - Preserving Discord knowledge, one channel at a time! 🧠📚