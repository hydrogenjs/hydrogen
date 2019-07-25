import { Command, flags } from '@oclif/command';
import { main } from '../generator';

export class Build extends Command {
  static description = 'Starts building templates for production';

  static flags = {
    dev: flags.boolean({
      default: false,
      description: 'Enable development mode for your builds',
    }),
  };

  async run() {
    const { flags } = this.parse(Build);
    await main(flags.dev);
  };
};