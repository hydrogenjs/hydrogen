import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import { build } from '../services/compiler';
import { saveHTMLToFiles, getConfig, copyStaticFolder, copyExtraStaticFiles } from '../services/file';
import { doFoldersExist } from '../helpers/checkFolder';
import { logBuildMode } from '../helpers/log';
import { generateSW } from '../services/service_worker';

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

    const config = await getConfig();

    await logBuildMode(dev);

    if (!await doFoldersExist()) {
      return false;
    }

    cli.action.start('Building files');
    console.time('Build time');

    const htmlPages = await build(dev, config);

    await saveHTMLToFiles(htmlPages);

    await Promise.all([
      copyStaticFolder(config.staticFolder),
      copyExtraStaticFiles(config.extraStaticFiles),
      generateSW(config.sw, dev),
    ]);

    cli.action.stop();
    console.timeEnd('Build time');
  }
}
