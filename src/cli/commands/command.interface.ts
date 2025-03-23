import { CommandName } from 'src/cli/commands/types.js';

export interface Command {
  getName(): CommandName;
  execute(...params: string[]): void;
}
