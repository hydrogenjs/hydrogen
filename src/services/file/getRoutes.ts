import fs from 'fs-extra';
import { normalize } from 'path';
import { Route } from './types';

const FILE = 'hydrogen.routes.js';

const CWD = process.cwd();

const getRoutes = async (): Promise<{ default: () => Route[] }> => {
  if (!await fs.pathExists(normalize(`${CWD}/${FILE}`))) {
    return { default: (): Route[] => [] };
  }

  return import(normalize(`${CWD}/${FILE}`));
};

export default getRoutes;
