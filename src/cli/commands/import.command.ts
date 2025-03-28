import { Command } from './command.interface.js';
import { CommandName } from './types.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import { createOffer } from 'src/shared/helpers/index.js';

export class ImportCommand implements Command {
  getName(): CommandName {
    return CommandName.Import;
  }

  execute(...params: string[]) {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }

  private onImportedLine(line: string): void {
    const offer = createOffer(line);

    console.log(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(chalk.blue(`${count} rows imported.`));
  }
}
