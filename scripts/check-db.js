const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database contents...\n');
    
    // Check watched channels
    const watchedChannels = await prisma.watchedChannel.findMany();
    console.log(`📺 Watched Channels: ${watchedChannels.length}`);
    watchedChannels.forEach(channel => {
      console.log(`  - Channel ID: ${channel.channelId} (Guild: ${channel.guildId})`);
    });
    
    // Check archived channels
    const archivedChannels = await prisma.archivedChannel.findMany();
    console.log(`\n📦 Archived Channels: ${archivedChannels.length}`);
    archivedChannels.forEach(channel => {
      console.log(`  - ${channel.name} (ID: ${channel.originalId})`);
    });
    
    // Check resources
    const resources = await prisma.resource.findMany();
    console.log(`\n📋 Resources: ${resources.length}`);
    resources.forEach(resource => {
      console.log(`  - ${resource.type}: ${resource.url || resource.fileName || 'Content'} by ${resource.authorName}`);
    });
    
    // Check warnings
    const warnings = await prisma.archiveWarning.findMany();
    console.log(`\n⚠️ Archive Warnings: ${warnings.length}`);
    
    console.log('\n✅ Database check complete!');
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
