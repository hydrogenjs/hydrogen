import { Command, flags } from '@oclif/command';
import { build } from '../services/compiler';
import { saveHTMLToFiles } from '../services/file';

export class Build extends Command {
  static description = 'Starts building templates for production';

  static flags = {
    dev: flags.boolean({
      default: false,
      description: 'Enable development mode for your builds',
    }),
  };

  async run(): Promise<void> {
    const { flags: { dev } } = this.parse(Build);

    const htmlPages = await build(dev);

    await saveHTMLToFiles(htmlPages);
  }
}
