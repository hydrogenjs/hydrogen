import { Command } from '@oclif/command';
import execa from 'execa';

export class Build extends Command {
  static description = 'Starts building templates for production';

  async run() {
    execa.command('node server.js').stdout.pipe(process.stdout);
  };
}