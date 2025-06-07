/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
=======
  experimental: {
    appDir: true,
  },
>>>>>>> ff2926dac213052e70dd22795681a7675e465ab8
  images: {
    domains: ['cdn.discordapp.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig