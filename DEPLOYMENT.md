# Archivemind Discord Bot - Deployment Guide

## Overview

Archivemind is a global Discord bot that automatically archives inactive channels while extracting valuable resources (files, links, code) into searchable knowledge bases. This guide covers deploying the bot for production use across multiple Discord servers.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ with pgvector extension
- Discord Developer Application and Bot
- Production hosting environment (VPS, cloud, etc.)

## 1. Discord Bot Setup

### Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name (e.g., "Archivemind")
3. Go to "Bot" section and click "Add Bot"
4. Save the **Bot Token** (keep this secret!)
5. Note down the **Application ID** from the "General Information" tab
6. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent (optional, for better user detection)

### Bot Permissions
The bot needs these permissions (permission integer: `8389766208`):
- View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Manage Messages
- Manage Channels
- Use Slash Commands

### Invite Link
Replace `YOUR_CLIENT_ID` with your Application ID:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8389766208&scope=bot%20applications.commands
```

## 2. Database Setup

### Install PostgreSQL with pgvector

**Ubuntu/Debian:**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Install pgvector extension
sudo apt install postgresql-14-pgvector

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**CentOS/RHEL:**
```bash
# Install PostgreSQL
sudo dnf install postgresql postgresql-server postgresql-contrib

# Install pgvector (may need to compile from source)
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE archivemind;
CREATE USER archivemind_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE archivemind TO archivemind_user;

# Enable pgvector extension
\c archivemind
CREATE EXTENSION vector;

# Exit
\q
```

## 3. Project Setup

### Clone and Install
```bash
# Clone the project
git clone <your-repository-url>
cd discord-bot

# Install dependencies
npm install

# Build the project
npm run build
```

### Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit with your values
nano .env
```

**Required Environment Variables:**
```bash
# Discord Configuration
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here

# Database (replace with your actual values)
DATABASE_URL=postgresql://archivemind_user:your_secure_password@localhost:5432/archivemind?schema=public

# Production Settings
NODE_ENV=production
LOG_LEVEL=info
```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

## 4. Production Deployment

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
nano ecosystem.config.js
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [
    {
      name: 'archivemind-bot',
      script: 'dist/bot.js',
      cwd: '/path/to/your/discord-bot',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true
    }
  ]
};
```

```bash
# Start the bot
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 startup script
pm2 startup
```

### Using Docker (Alternative)
```bash
# Build Docker image
docker build -t archivemind-bot .

# Run with Docker Compose
docker-compose up -d
```

### Using systemd (Alternative)
```bash
# Create service file
sudo nano /etc/systemd/system/archivemind-bot.service
```

**archivemind-bot.service:**
```ini
[Unit]
Description=Archivemind Discord Bot
After=network.target

[Service]
Type=simple
User=archivemind
WorkingDirectory=/path/to/your/discord-bot
ExecStart=/usr/bin/node dist/bot.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable archivemind-bot.service
sudo systemctl start archivemind-bot.service
```

## 5. Monitoring and Maintenance

### Logs
```bash
# PM2 logs
pm2 logs archivemind-bot

# Systemd logs
sudo journalctl -u archivemind-bot.service -f

# Application logs
tail -f logs/app.log
```

### Health Checks
```bash
# Check bot status
pm2 status

# Check database connection
npx prisma db pull

# Test commands in Discord
/help
/stats
```

### Updates
```bash
# Pull latest changes
git pull

# Install dependencies
npm install

# Rebuild
npm run build

# Restart bot
pm2 restart archivemind-bot
```

## 6. Security Considerations

### Environment Security
- Keep `.env` file secure (never commit to git)
- Use strong database passwords
- Limit database access to localhost only
- Use firewall to restrict port access

### Bot Token Security
- Never share or commit your bot token
- Regenerate token if compromised
- Use environment variables only

### Database Security
- Use SSL connections for remote databases
- Regular backups
- Limit user permissions

## 7. Scaling and Performance

### Database Optimization
```sql
-- Create indexes for better performance
CREATE INDEX idx_archived_channels_guild ON "ArchivedChannel"("guildId");
CREATE INDEX idx_watched_channels_active ON "WatchedChannel"("isActive", "lastActivity");
CREATE INDEX idx_resources_search ON "Resource" USING gin("searchVector");
```

### Memory Management
- Monitor memory usage with `pm2 monit`
- Adjust `max_memory_restart` in PM2 config
- Consider clustering for high load

### Rate Limiting
- Configure rate limits in environment
- Monitor Discord API rate limits
- Implement graceful degradation

## 8. Troubleshooting

### Common Issues

**Bot not responding:**
- Check bot token is correct
- Verify bot has necessary permissions
- Check bot is online in Discord

**Database connection errors:**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Verify user permissions

**Commands not working:**
- Ensure global commands are registered
- Check bot permissions in server
- Verify slash command syntax

**Memory issues:**
- Monitor with `pm2 monit`
- Check for memory leaks
- Restart bot if needed

### Debug Mode
```bash
# Run in debug mode
LOG_LEVEL=debug pm2 restart archivemind-bot
```

## 9. Support and Maintenance

### Regular Maintenance
- Weekly log reviews
- Monthly database cleanup
- Quarterly dependency updates
- Annual security audit

### Monitoring Metrics
- Bot uptime
- Command usage statistics
- Error rates
- Database performance
- Memory/CPU usage

### Backup Strategy
```bash
# Database backup
pg_dump archivemind > backup_$(date +%Y%m%d).sql

# Automated backups with cron
0 2 * * * pg_dump archivemind > /backups/archivemind_$(date +\%Y\%m\%d).sql
```

## 10. License and Support

This bot is open source. For support:
- Create issues on GitHub
- Join our Discord support server
- Read the documentation

---

## Quick Start Checklist

- [ ] Discord bot created and token obtained
- [ ] PostgreSQL with pgvector installed
- [ ] Database created and configured
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Database migrated
- [ ] Bot started and running
- [ ] Global commands registered
- [ ] Bot invited to test server
- [ ] Basic commands tested
- [ ] Monitoring configured
- [ ] Backups scheduled

Your Archivemind bot is now ready for global deployment! 🚀

# Archivemind Discord Bot - Windows Setup Guide

## Prerequisites for Windows

1. **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
2. **Git**: Download from [git-scm.com](https://git-scm.com/)
3. **PostgreSQL**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
4. **Visual Studio Code** (recommended): Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Quick Setup for Windows

### 1. Install Prerequisites

```powershell
# Install Node.js (download and run installer from nodejs.org)
# Verify installation
node --version
npm --version

# Install PostgreSQL (download and run installer)
# During installation, remember your postgres password
```

### 2. Database Setup (Windows)

```powershell
# Open PostgreSQL command line (psql)
# You can find this in Start Menu > PostgreSQL > SQL Shell (psql)

# Connect as postgres user (enter password when prompted)
psql -U postgres

# Create database and user
CREATE DATABASE archivemind;
CREATE USER archivemind_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE archivemind TO archivemind_user;

# Enable pgvector extension (if available)
\c archivemind
CREATE EXTENSION IF NOT EXISTS vector;

# Exit
\q
```

### 3. Project Setup

```powershell
# Navigate to your project directory
cd "C:\Users\Pramod Tiwari\Downloads\discord-bot"

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env file with your configuration
notepad .env
```

### 4. Configure Environment Variables

Edit your `.env` file with these values:

```env
# Get these from Discord Developer Portal
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_id_here

# Update with your PostgreSQL credentials
DATABASE_URL="postgresql://archivemind_user:your_secure_password@localhost:5432/archivemind?schema=public"

# Create a channel for knowledge base notifications
KNOWLEDGE_BASE_CHANNEL_ID=your_channel_id_here

NODE_ENV=development
LOG_LEVEL=info
```

### 5. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application → Name it "Archivemind"
3. Go to "Bot" section → "Add Bot"
4. Copy the **Token** and put it in your `.env` file
5. Copy the **Application ID** from "General Information"
6. Enable these Privileged Gateway Intents:
   - Message Content Intent ✅
   - Server Members Intent ✅

### 6. Generate Prisma Client and Setup Database

```powershell
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 7. Build and Run

```powershell
# Build the TypeScript code
npm run build

# Run in development mode
npm run dev

# Or run in production mode
npm start
```

### 8. Invite Bot to Your Server

Use this URL (replace YOUR_CLIENT_ID with your Application ID):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8389766208&scope=bot%20applications.commands
```

Required permissions:
- View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Manage Messages
- Manage Channels
- Use Slash Commands

## Testing the Bot

Once the bot is running and invited to your server, test these commands:

```
/help                    # Show help information
/stats                   # View bot statistics
/watch #channel-name     # Start monitoring a channel
/find query:"test"       # Search for resources
```

## Production Deployment (Windows)

### Option 1: PM2 (Recommended)

```powershell
# Install PM2 globally
npm install -g pm2

# Start the bot with PM2
pm2 start dist/bot.js --name "archivemind-bot"

# Save PM2 configuration
pm2 save

# Set PM2 to start on Windows startup
pm2 startup
```

### Option 2: Windows Service

```powershell
# Install node-windows to create a Windows service
npm install -g node-windows

# Create service script (create this file: install-service.js)
```

Create `install-service.js`:
```javascript
const Service = require('node-windows').Service;

const svc = new Service({
  name: 'Archivemind Discord Bot',
  description: 'Discord bot for archiving channels and knowledge management',
  script: 'C:\\path\\to\\your\\discord-bot\\dist\\bot.js',
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

svc.on('install', () => {
  svc.start();
});

svc.install();
```

Then run:
```powershell
node install-service.js
```

## Troubleshooting

### Common Issues:

1. **"Command not found" errors**: Make sure Node.js and npm are in your PATH
2. **Database connection errors**: Check PostgreSQL is running and credentials are correct
3. **Permission errors**: Run PowerShell as Administrator if needed
4. **Bot not responding**: Check Discord token and bot permissions

### Logs Location:
- Application logs: `logs/` folder
- PM2 logs: `pm2 logs archivemind-bot`

### Useful Commands:
```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Check Node.js processes
Get-Process node

# View bot logs
Get-Content logs\combined.log -Tail 50

# Restart the bot
pm2 restart archivemind-bot
```

## Next Steps

1. **Test all commands** in your Discord server
2. **Monitor logs** for any errors
3. **Set up backup** for your database
4. **Configure monitoring** (optional)
5. **Deploy to cloud** for 24/7 uptime (Azure, AWS, etc.)

The bot is now ready for production use! 🚀
