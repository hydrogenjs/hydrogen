import { Command, flags } from '@oclif/command';
import { build } from '../services/compiler';
import { saveHTMLToFiles } from '../services/file';
import { doFoldersExist } from '../helpers/checkFolder';

export class Build extends Command {
  static description = 'Starts building templates for production';

  static flags = {
    dev: flags.boolean({
      default: false,
      description: 'Enable development mode for your builds',
    }),
  };

  async run(): Promise<boolean|void> {
    const { flags: { dev } } = this.parse(Build);

    if (!await doFoldersExist()) {
      return false;
    }

    const htmlPages = await build(dev);

    await saveHTMLToFiles(htmlPages);
  }
}
