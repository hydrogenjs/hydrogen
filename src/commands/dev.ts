import { Command } from '@oclif/command';
import execa from 'execa';
import { main } from '../generator';

export default class Dev extends Command {
  static description = 'Start Hydrogen dev server';

  async run() {
    await main();
  }
}
