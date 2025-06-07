import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email guilds',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id
        // Fetch user's Discord guilds and check admin permissions
        session.user.isAdmin = await checkUserAdminPermissions(user.id)
        session.user.guilds = await getUserGuilds(user.id)
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.userId = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
}

async function checkUserAdminPermissions(userId: string): Promise<boolean> {
  try {
    // Check if user has admin permissions in any guild where the bot is present
    // This would require storing guild member data or making Discord API calls
    // For now, we'll implement a simple check
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true }
    })
    
    // You can implement more sophisticated permission checking here
    // For example, checking against a list of admin user IDs or Discord API
    return user?.accounts.some(account => account.provider === 'discord') || false
  } catch (error) {
    console.error('Error checking admin permissions:', error)
    return false
  }
}

async function getUserGuilds(userId: string): Promise<any[]> {
  try {
    // In a real implementation, you'd fetch this from Discord API
    // or store guild membership data in your database
    return []
  } catch (error) {
    console.error('Error fetching user guilds:', error)
    return []
  }
}