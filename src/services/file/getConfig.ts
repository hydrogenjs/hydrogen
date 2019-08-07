import fs from 'fs-extra';
import { normalize } from 'path';
import { Config } from './types';

const FILE = 'hydrogen.config.js';

const CWD = process.cwd();

const getConfig = async (): Promise<Config> => {
  if (!await fs.pathExists(normalize(`${CWD}/${FILE}`))) {
    return {};
  }

  return import(normalize(`${CWD}/${FILE}`));
};

export default getConfig;
