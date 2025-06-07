import winston from 'winston';
import { DateTime } from 'luxon';

/**
 * Custom log formatter with timestamps and colors
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: () => DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
  }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

/**
 * Winston logger configuration for Archivemind bot
 * Supports multiple log levels and file/console output
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Console logging
    new winston.transports.Console({
      format: logFormat
    }),
    
    // Error log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    
    // Combined log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: 'logs/exceptions.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: 'logs/rejections.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

/**
 * Archive-specific logging utility
 */
export class ArchiveLogger {
  /**
   * Log channel archiving events
   */
  static logArchive(channelName: string, guildId: string, resourceCount: number): void {
    logger.info(`📦 Channel archived: ${channelName} (Guild: ${guildId}) - ${resourceCount} resources rescued`);
  }

  /**
   * Log channel restoration events
   */
  static logRestore(channelName: string, guildId: string): void {
    logger.info(`🔄 Channel restored: ${channelName} (Guild: ${guildId})`);
  }

  /**
   * Log resource extraction events
   */
  static logResourceExtraction(channelName: string, resourceType: string, count: number): void {
    logger.debug(`🔍 Extracted ${count} ${resourceType} resources from ${channelName}`);
  }

  /**
   * Log warning notifications
   */
  static logWarning(channelName: string, warningType: string, daysRemaining: number): void {
    logger.info(`⚠️ Archive warning sent: ${channelName} - ${warningType} (${daysRemaining} days remaining)`);
  }

  /**
   * Log activity monitoring events
   */
  static logActivityUpdate(channelId: string, lastActivity: Date): void {
    logger.debug(`📊 Activity updated for channel ${channelId}: ${lastActivity.toISOString()}`);
  }

  /**
   * Log command execution
   */
  static logCommand(commandName: string, userId: string, guildId: string): void {
    logger.info(`⚡ Command executed: /${commandName} by ${userId} in guild ${guildId}`);
  }

  /**
   * Log database operations
   */
  static logDatabase(operation: string, details?: string): void {
    logger.debug(`🗄️ Database ${operation}${details ? ': ' + details : ''}`);
  }

  /**
   * Log rate limit events
   */
  static logRateLimit(endpoint: string, retryAfter: number): void {
    logger.warn(`⏳ Rate limited on ${endpoint}, retry after ${retryAfter}ms`);
  }

  /**
   * Log permission errors
   */
  static logPermissionError(operation: string, channelId: string, requiredPermissions: string[]): void {
    logger.error(`🔒 Permission denied for ${operation} in channel ${channelId}. Required: ${requiredPermissions.join(', ')}`);
  }
}

// Create logs directory if it doesn't exist
import { existsSync, mkdirSync } from 'fs';
if (!existsSync('logs')) {
  mkdirSync('logs');
}
