// Simplified bot instance management to avoid circular dependencies
let botInstance: any = null;

export function setBotInstance(bot: any): void {
  botInstance = bot;
}

export function getBotInstance(): any {
  if (!botInstance) {
    throw new Error('Bot instance not initialized. Call setBotInstance first.');
  }
  return botInstance;
}