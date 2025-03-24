import { CommandName } from './types.js';

export interface Command {
  getName(): CommandName;
  execute(...params: string[]): void;
}
