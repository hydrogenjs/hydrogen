import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export default async (files: string[] | undefined = []): Promise<void[]|boolean> => Promise
  .all(files.map((file): Promise<void> => fs.copyFile(normalize(`${CWD}/${file}`), normalize(`${CWD}/dist/${file}`))));
