import got from 'got';
import chalk from 'chalk';
import { appendFile } from 'node:fs/promises';

import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { CommandName } from 'src/cli/commands/types.js';
import { Symbols } from 'src/shared/constants.js';
import { TSVOfferGenerator } from 'src/shared/libs/offer-generator/tsv-offer-generator.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  getName(): CommandName {
    return CommandName.Generate;
  }

  async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const advertCount = Number.parseInt(count, 10);

    try {
      await this.loadMockData(url);
      await this.write(filepath, advertCount);

      console.info(chalk.green(`File ${filepath} was created!`));
    } catch {
      console.error(chalk.red('Can not generate data'));
    }
  }

  private async loadMockData(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, advertCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);

    for (let i = 0; i < advertCount; i++) {
      await appendFile(filePath, `${tsvOfferGenerator.generate()}${Symbols.NewLine}`, 'utf-8');
    }
  }
}
