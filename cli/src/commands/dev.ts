import { Command } from '@oclif/command';
import execa from 'execa';

export default class Dev extends Command {
  static description = 'Start Hydrogen dev server';

  async run() {
    await execa.command('npx nodemon -w ./layouts -w ./pages server.js').stdout.pipe(process.stdout);
  }
}
