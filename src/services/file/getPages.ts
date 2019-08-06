import glob from '../../helpers/glob';
import { PageProperties } from './types';

const CWD = process.cwd();
const PATTERN = 'pages/**/*.js';

const getPagesPaths = async (): Promise<string[]> => glob(PATTERN);

const getPagesTemplate = async (paths: string[]): Promise<Promise<PageProperties>[]> => paths
  .map(async (path): Promise<PageProperties> => ({
    name: path.split('/').pop(),
    path: path.replace('pages', 'dist').replace('.js', '.html'),
    ...await import(`${CWD}/${path}`),
  }));

const getPages = async (): Promise<PageProperties[]> => {
  const paths = await getPagesPaths();
  const templates = await getPagesTemplate(paths);

  return Promise.all(templates);
};

export default {
  getPages,
};
