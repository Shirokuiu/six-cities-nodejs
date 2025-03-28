#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';
import { GenerateCommand } from 'src/cli/commands/generate.command.js';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
