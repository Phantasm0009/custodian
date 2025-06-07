# Discord OAuth Setup Guide

## Setting up Discord OAuth for the Dashboard

To complete the dashboard authentication setup, you need to configure Discord OAuth:

### 1. Discord Developer Portal Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your existing bot application (ID: 1380362496774246572)
3. Navigate to **OAuth2** section in the left sidebar

### 2. Configure OAuth2 Settings

1. **Client ID**: Already configured (1380362496774246572)
2. **Client Secret**: 
   - Click "Reset Secret" to generate a new client secret
   - Copy the secret and update `.env.local` with the real value
3. **Redirects**:
   - Add redirect URL: `http://localhost:3000/api/auth/callback/discord`
   - For production, add: `https://your-domain.com/api/auth/callback/discord`

### 3. OAuth2 URL Generator (Optional)

Under "OAuth2 URL Generator":
- **Scopes**: Select `identify`, `email`, `guilds`
- **Redirect URL**: Select the URL you added above

### 4. Update Environment Variables

Update your `.env.local` file:
```bash
DISCORD_CLIENT_SECRET=your_actual_client_secret_here
```

### 5. Test Authentication

1. Start the dashboard: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Try to sign in with Discord
4. Check that the session is created in the database

### 6. Production Setup

For production deployment:
1. Add production redirect URL to Discord OAuth settings
2. Update `NEXTAUTH_URL` in production environment
3. Generate secure `NEXTAUTH_SECRET` for production

## Current Status

✅ Database schema includes NextAuth models
✅ Prisma adapter configured
✅ Discord provider configured
🟡 Need to add actual Discord client secret
🟡 Need to add OAuth redirect URLs in Discord settings

## Next Steps

1. Complete Discord OAuth configuration
2. Test authentication flow
3. Verify dashboard functionality
