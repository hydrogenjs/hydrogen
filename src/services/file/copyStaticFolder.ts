import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export default async (folder: string | undefined = 'public'): Promise<void|boolean> => {
  if (!await fs.pathExists(normalize(`${CWD}/${folder}`))) {
    return false;
  }

  return fs.copy(normalize(`${CWD}/${folder}`), normalize(`${CWD}/dist/${folder}`));
};
