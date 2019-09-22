import { normalize } from 'path';
import glob from '../../helpers/glob';
import { PageProperties } from './types';

const CWD = process.cwd();
const PATTERN = 'pages/**/*.js';

type Paths = string[];

export const getPagesPaths = async (): Promise<Paths> => glob(PATTERN);

export const getPagesTemplate = async (paths: Paths): Promise<Promise<PageProperties>[]> => paths
  .map(async (path): Promise<PageProperties> => ({
    name: path.split('/').pop(),
    path: path.replace('pages', 'dist').replace('.js', '.html'),
    ...await import(normalize(`${CWD}/${path}`)),
  }));

export const getPages = async (): Promise<PageProperties[]> => {
  const paths = await getPagesPaths();
  const templates = await getPagesTemplate(paths);

  return Promise.all(templates);
};

export default getPages;
