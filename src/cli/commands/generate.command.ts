import got from 'got';
import chalk from 'chalk';

import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { CommandName } from 'src/cli/commands/types.js';
import { TSVOfferGenerator } from 'src/shared/libs/offer-generator/tsv-offer-generator.js';
import { TSVFileWriter } from 'src/shared/libs/file-writer/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async loadMockData(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, advertCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < advertCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  getName(): CommandName {
    return CommandName.Generate;
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const advertCount = Number.parseInt(count, 10);

    try {
      console.info(chalk.blue('loading mock data...'));
      await this.loadMockData(url);
      console.info(chalk.green('mock data loaded'));

      console.info(chalk.blue('start writing...'));
      await this.write(filepath, advertCount);
      console.info(chalk.green(`File ${filepath} was created!`));
    } catch {
      console.error(chalk.red('Can not generate data'));
    }
  }
}
