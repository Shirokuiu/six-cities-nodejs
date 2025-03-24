import { Command } from './command.interface.js';
import { CommandName } from './types.js';
import { TsvFileReader } from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  getName(): CommandName {
    return CommandName.Import;
  }

  execute(...params: string[]) {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
