import { Command } from '@oclif/command';
import { tempateGenerator } from '../services/compiler';
export class Generate extends Command {
  static description = 'Generate a template';

  static args = [
    { name: 'file' },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Generate);

    tempateGenerator(args.file);
  }
}
