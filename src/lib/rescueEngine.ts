import { Client, Message, TextChannel, Attachment, Collection, FetchMessagesOptions } from 'discord.js';
import { PrismaClient, ResourceType } from '@prisma/client';
import { logger, ArchiveLogger } from './logger';
import type { DetectedResource } from '../types';

/**
 * Resource Rescue Engine
 * Scans messages for valuable content (files, links, code blocks, etc.)
 * and extracts them for knowledge base integration
 */
export class RescueEngine {
  private client: Client;
  private prisma: PrismaClient;

  // Regex patterns for resource detection
  private readonly patterns = {
    // GitHub links
    github: /https?:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+(?:\/[\w\-\.\/]*)?/gi,
    
    // Documentation links
    docs: /https?:\/\/(?:docs\.|documentation\.|wiki\.)[\w\-\.]+\.[\w]+(?:\/[\w\-\.\/]*)?/gi,
    
    // Tutorial/learning resources
    tutorials: /https?:\/\/(?:tutorial|learn|course|guide)[\w\-\.]*\.[\w]+(?:\/[\w\-\.\/]*)?/gi,
    
    // Stack Overflow and similar
    stackoverflow: /https?:\/\/(?:stackoverflow|stackexchange|serverfault)\.com\/[\w\-\.\/]*\d+/gi,
    
    // YouTube videos
    youtube: /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]+/gi,
    
    // General valuable links
    links: /https?:\/\/[\w\-\.]+\.[\w]+(?:\/[\w\-\.\/\?&=#%]*)?/gi,
    
    // Code blocks (```lang or ``` with 5+ lines)
    codeBlocks: /```(?:(\w+)\n)?([\s\S]*?)```/gi,
    
    // Inline code with context
    inlineCode: /`([^`\n]+)`/gi,
    
    // File extensions of interest
    importantFiles: /\.(pdf|docx?|xlsx?|pptx?|zip|rar|tar\.gz|json|xml|csv|sql|py|js|ts|java|cpp|cs|go|rs|rb|php|html|css|md|txt)$/i,
    
    // Spam patterns to filter out
    spam: /(?:discord\.gg\/|invite|join|server|nitro|free|click here|amazing deal)/gi
  };

  constructor(client: Client, prisma: PrismaClient) {
    this.client = client;
    this.prisma = prisma;
  }

  /**
   * Main method to rescue resources from a channel
   * Scans the last N messages for valuable content
   */
  async rescueResources(channelId: string, messageLimit: number = 500): Promise<DetectedResource[]> {
    try {
      const channel = await this.client.channels.fetch(channelId) as TextChannel;
      if (!channel) {
        throw new Error(`Channel ${channelId} not found`);
      }

      logger.info(`🔍 Starting resource rescue for channel: ${channel.name}`);
      
      // Fetch messages with pagination
      const messages = await this.fetchMessages(channel, messageLimit);
      
      // Extract resources from messages
      const resources: DetectedResource[] = [];
      
      for (const message of messages) {
        const messageResources = await this.extractResourcesFromMessage(message);
        resources.push(...messageResources);
      }

      // Filter out spam and duplicates
      const filteredResources = this.filterAndDeduplicateResources(resources);
      
      ArchiveLogger.logResourceExtraction(
        channel.name, 
        'mixed', 
        filteredResources.length
      );

      return filteredResources;
    } catch (error) {
      logger.error(`Failed to rescue resources from channel ${channelId}:`, error);
      return [];
    }
  }
  /**
   * Check if a message contains valuable content worth archiving
   */
  hasValuableContent(content: string, hasAttachments = false): boolean {
    if (!content || content.length < 10) {
      // If no content but has attachments, consider it valuable
      return hasAttachments;
    }
    
    // Check for code blocks
    if (this.patterns.codeBlocks.test(content)) return true;
    
    // Check for valuable links
    if (this.patterns.github.test(content) || 
        this.patterns.docs.test(content) || 
        this.patterns.tutorials.test(content)) {
      return true;
    }
    
    // Files/attachments are always valuable
    if (hasAttachments) return true;
    
    // Check for long-form content
    if (content.length > 200 && !this.patterns.spam.test(content)) {
      return true;
    }
    
    return false;
  }
  /**
   * Fetch messages from channel with pagination
   */
  private async fetchMessages(channel: TextChannel, limit: number): Promise<Message[]> {
    const messages: Message[] = [];
    let lastId: string | undefined;
      while (messages.length < limit) {
      const batchOptions: FetchMessagesOptions = {
        limit: Math.min(100, limit - messages.length)
      };
      
      if (lastId) {
        batchOptions.before = lastId;
      }
      
      const batch: Collection<string, Message> = await channel.messages.fetch(batchOptions);
      
      if (batch.size === 0) break;
      
      messages.push(...batch.values());
      lastId = batch.last()?.id;
    }
    
    return messages;
  }

  /**
   * Extract resources from a single message
   */
  private async extractResourcesFromMessage(message: Message): Promise<DetectedResource[]> {
    const resources: DetectedResource[] = [];
    
    try {
      // Get context (3 preceding messages)
      const context = await this.getMessageContext(message);
      
      // Check for file attachments
      if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
          const fileResource = this.extractFileResource(message, attachment, context);
          if (fileResource) {
            resources.push(fileResource);
          }
        }
      }
      
      // Check for links
      const linkResources = this.extractLinkResources(message, context);
      resources.push(...linkResources);
      
      // Check for code blocks
      const codeResources = this.extractCodeResources(message, context);
      resources.push(...codeResources);
      
      // Check if message is pinned
      if (message.pinned) {
        resources.push({
          type: 'PIN',
          content: message.content,
          context,
          authorId: message.author.id,
          authorName: message.author.displayName || message.author.username,
          messageId: message.id
        });
      }
      
    } catch (error) {
      logger.error(`Error extracting resources from message ${message.id}:`, error);
    }
    
    return resources;
  }

  /**
   * Extract file resources from attachments
   */
  private extractFileResource(
    message: Message, 
    attachment: Attachment, 
    context: string
  ): DetectedResource | null {
    // Filter out unimportant files
    if (!this.patterns.importantFiles.test(attachment.name || '')) {
      return null;
    }
    
    // Determine file type
    let type: ResourceType = 'FILE';
    const fileName = attachment.name?.toLowerCase() || '';
    
    if (fileName.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      type = 'IMAGE';
    } else if (fileName.match(/\.(pdf|docx?|xlsx?|pptx?)$/)) {
      type = 'DOCUMENT';
    }
      return {
      type,
      url: attachment.url,
      fileName: attachment.name || 'unknown',
      fileSize: attachment.size,
      context,
      authorId: message.author.id,
      authorName: message.author.displayName || message.author.username,
      messageId: message.id
    };
  }

  /**
   * Extract link resources from message content
   */
  private extractLinkResources(message: Message, context: string): DetectedResource[] {
    const resources: DetectedResource[] = [];
    const content = message.content;
    
    // Find all links
    const links = content.match(this.patterns.links) || [];
    
    for (const link of links) {
      // Skip if it's spam
      if (this.patterns.spam.test(link)) continue;
      
      // Prioritize valuable links
      if (this.patterns.github.test(link) || 
          this.patterns.docs.test(link) || 
          this.patterns.tutorials.test(link) ||
          this.patterns.stackoverflow.test(link)) {
        
        resources.push({
          type: 'LINK',
          url: link,
          context,
          authorId: message.author.id,
          authorName: message.author.displayName || message.author.username,
          messageId: message.id
        });
      }
    }
    
    return resources;
  }

  /**
   * Extract code resources from message content
   */
  private extractCodeResources(message: Message, context: string): DetectedResource[] {
    const resources: DetectedResource[] = [];
    const content = message.content;
    
    // Find code blocks
    let match;
    this.patterns.codeBlocks.lastIndex = 0; // Reset regex
    
    while ((match = this.patterns.codeBlocks.exec(content)) !== null) {
      const [, language, code] = match;
      
      // Only save code blocks with 5+ lines or significant content
      if (code.split('\n').length >= 5 || code.length > 100) {
        resources.push({
          type: 'CODE',
          content: code.trim(),
          context: `Language: ${language || 'unknown'}\n\n${context}`,
          authorId: message.author.id,
          authorName: message.author.displayName || message.author.username,
          messageId: message.id
        });
      }
    }
    
    return resources;
  }

  /**
   * Get context from 3 preceding messages
   */
  private async getMessageContext(message: Message): Promise<string> {
    try {
      const channel = message.channel as TextChannel;
      const contextMessages = await channel.messages.fetch({
        limit: 3,
        before: message.id
      });
      
      return contextMessages
        .reverse()
        .map(msg => `${msg.author.displayName || msg.author.username}: ${msg.content}`)
        .join('\n')
        .substring(0, 500); // Limit context length
        
    } catch (error) {
      logger.error(`Failed to get context for message ${message.id}:`, error);
      return '';
    }
  }

  /**
   * Filter out spam and deduplicate resources
   */
  private filterAndDeduplicateResources(resources: DetectedResource[]): DetectedResource[] {
    const seen = new Set<string>();
    const filtered: DetectedResource[] = [];
    
    for (const resource of resources) {
      // Create unique key based on type and content/url
      const key = `${resource.type}:${resource.url || resource.content}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(resource);
      }
    }
    
    return filtered;
  }

  /**
   * Save rescued resources to database
   */
  async saveResources(
    resources: DetectedResource[], 
    channelId: string,
    savedToChannelId?: string
  ): Promise<void> {
    try {      for (const resource of resources) {
        const resourceData: any = {
          url: resource.url || '',
          type: resource.type,
          authorId: resource.authorId,
          authorName: resource.authorName,
          originalMessageId: resource.messageId,
          channelId,
          tags: this.generateTags(resource)
        };

        // Only add optional properties if they have values
        if (resource.fileName) {
          resourceData.fileName = resource.fileName;
        }
        if (resource.fileSize !== undefined) {
          resourceData.fileSize = resource.fileSize;
        }
        if (resource.context) {
          resourceData.context = resource.context;
        }
        if (resource.content) {
          resourceData.content = resource.content;
        }
        if (savedToChannelId) {
          resourceData.savedTo = savedToChannelId;
        }

        await this.prisma.resource.create({ data: resourceData });
      }
      
      ArchiveLogger.logDatabase('save', `${resources.length} resources saved`);
    } catch (error) {
      logger.error('Failed to save resources to database:', error);
      throw error;
    }
  }

  /**
   * Generate tags for a resource based on its content
   */
  private generateTags(resource: DetectedResource): string[] {
    const tags: string[] = [];
    
    // Add type-based tags
    tags.push(resource.type.toLowerCase());
    
    // Add language tags for code
    if (resource.type === 'CODE' && resource.context) {
      const langMatch = resource.context.match(/Language: (\w+)/);
      if (langMatch) {
        tags.push(langMatch[1]);
      }
    }
    
    // Add domain tags for links
    if (resource.type === 'LINK' && resource.url) {
      try {
        const domain = new URL(resource.url).hostname.replace('www.', '');
        tags.push(domain);
      } catch {
        // Invalid URL, skip domain tag
      }
    }
    
    // Add file extension tags
    if (resource.fileName) {
      const ext = resource.fileName.split('.').pop()?.toLowerCase();
      if (ext) {
        tags.push(ext);
      }
    }
    
    return tags;
  }
}
