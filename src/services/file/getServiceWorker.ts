import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export default async (sw?: string): Promise<Buffer|undefined|string> => {
  if (!sw) {
    return;
  }

  if (!await fs.pathExists(normalize(`${CWD}/${sw}`))) {
    return;
  }

  return fs.readFile(`${CWD}/${sw}`, 'utf-8');
};
