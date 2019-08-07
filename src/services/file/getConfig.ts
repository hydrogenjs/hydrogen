import fs from 'fs-extra';
import { Config } from './types';

const FILE = 'hydrogen.config.js';

const CWD = process.cwd();

const getConfig = async (): Promise<Config|object> => {
  if (!await fs.pathExists(`${CWD}/${FILE}`)) {
    return {};
  }

  return import(`${CWD}/${FILE}`);
};

export default getConfig;
