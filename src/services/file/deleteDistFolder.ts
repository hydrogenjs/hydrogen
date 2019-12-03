import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export default async (): Promise<void> => fs.remove(normalize(`${CWD}/dist`));
