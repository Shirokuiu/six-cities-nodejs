import { Command } from 'src/cli/commands/command.interface.js';
import { CommandName } from 'src/cli/commands/types.js';

export class HelpCommand implements Command {
  getName(): CommandName {
    return CommandName.Help;
  }

  async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `);
  }
}
