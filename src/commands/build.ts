import { Command } from '@oclif/command';
import { main } from '../generator';

export class Build extends Command {
  static description = 'Starts building templates for production';

  async run() {
    await main();
  };
};