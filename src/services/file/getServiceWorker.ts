import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export default async (sw: string): Promise<Buffer|boolean> => {
  if (!sw) {
    return false;
  }

  if (!await fs.pathExists(normalize(`${CWD}/${sw}`))) {
    return false;
  }

  // @ts-ignore
  return fs.readFile(`${CWD}/${sw}`, 'utf-8');
};
