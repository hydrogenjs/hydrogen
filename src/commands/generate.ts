import { Command } from '@oclif/command';
import { tempateGenerator } from '../generator/helpers';

export class Generate extends Command {
  static description = 'Generate a template';

  static args = [
    { name: 'file' },
  ];

  async run() {
    const { args } = this.parse(Generate);

    tempateGenerator(args.file);
  };
};