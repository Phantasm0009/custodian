import { SlashCommand } from '../types';
import { watchCommand } from './watch';
import { archiveNowCommand } from './archiveNow';
import { restoreCommand } from './restore';
import { findCommand } from './find';
import { digestCommand } from './digest';
import { statsCommand } from './stats';
import { helpCommand } from './help';
import { extractResourcesCommand } from './extractResources';
import { archivesCommand } from './archives';
import { forgetChannelCommand } from './forgetChannel';

/**
 * Load all slash commands for ArchiveMind bot
 */
export async function loadCommands(): Promise<SlashCommand[]> {
  return [
    watchCommand,
    archiveNowCommand,
    restoreCommand,
    findCommand,
    digestCommand,
    statsCommand,
    helpCommand,
    extractResourcesCommand,
    archivesCommand,
    forgetChannelCommand,
  ];
}