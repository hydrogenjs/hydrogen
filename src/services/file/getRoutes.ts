import fs from 'fs-extra';
import { normalize } from 'path';
import { Route } from './types';

const FILE = 'hydrogen.routes.js';

const CWD = process.cwd();

const getRoutes = async (): Promise<Route[]> => {
  if (!await fs.pathExists(normalize(`${CWD}/${FILE}`))) {
    return [];
  }

  const { default: fn } = await import(normalize(`${CWD}/${FILE}`));

  return fn();
};

export default getRoutes;
