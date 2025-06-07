# ArchiveMind Dashboard

A comprehensive web dashboard for managing the ArchiveMind Discord bot with authentication, analytics, and admin controls.

## Features

### 🔐 Authentication & Security
- Discord OAuth2 integration
- Admin-only access control
- Session management with NextAuth.js
- Secure API endpoints

### 📊 Overview Panel
- Real-time statistics dashboard
- Channel activity monitoring
- Resource rescue analytics
- Interactive charts and graphs

### 📅 Scheduled Archivals
- View all watched channels
- Configure inactivity thresholds
- Toggle resource rescue settings
- Edit channel monitoring settings

### 📂 Archive & Resource Explorer
- Browse archived channels
- Search and filter resources
- Preview resource content
- Restore archived channels

### ⚙️ Settings Panel
- Configure default settings
- Map resource types to channels
- Customize bot behavior
- Manage global preferences

### 🛡️ GDPR Tools
- Complete data deletion
- Export user data
- Audit trail viewing
- Compliance reporting

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom components
- **Authentication**: NextAuth.js with Discord provider
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts for data visualization
- **UI Components**: Headless UI and Lucide icons
- **State Management**: React hooks and context

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Discord application with OAuth2 configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `NEXTAUTH_URL`: Your dashboard URL
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `DISCORD_CLIENT_ID`: Discord application client ID
- `DISCORD_CLIENT_SECRET`: Discord application client secret
- `DATABASE_URL`: PostgreSQL connection string

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`.

### Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or use existing one
3. Go to OAuth2 → General
4. Add redirect URI: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret to your `.env` file

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

For deployment platforms like Vercel, Netlify, or Railway:
- Set environment variables in your platform's dashboard
- Ensure your Discord OAuth redirect URI matches your production URL
- Configure your database connection for production

## API Integration

The dashboard communicates with the ArchiveMind bot through REST API endpoints. You'll need to implement these endpoints in your bot or create a separate API service:

### Required Endpoints

- `GET /api/stats` - Dashboard statistics
- `GET /api/watched` - Watched channels
- `PATCH /api/watched/:id` - Update watched channel
- `DELETE /api/watched/:id` - Remove watched channel
- `GET /api/archived` - Archived channels
- `POST /api/archived/:id/restore` - Restore channel
- `DELETE /api/archived/:id/forget` - GDPR deletion
- `GET /api/resources` - Browse resources
- `GET /api/settings/:guildId` - Guild settings
- `PATCH /api/settings/:guildId` - Update settings

## Security Considerations

- Only Discord server administrators should have access
- All API endpoints should validate user permissions
- Sensitive operations require additional confirmation
- GDPR deletion operations are logged for compliance
- Session tokens are securely managed by NextAuth.js

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Create custom components in `components/ui/`

### Features
- Add new dashboard pages in `app/dashboard/`
- Extend API integration in `lib/api.ts`
- Create custom charts and visualizations

### Branding
- Update logos and icons in the layout components
- Modify color scheme in Tailwind configuration
- Customize the sign-in page design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.