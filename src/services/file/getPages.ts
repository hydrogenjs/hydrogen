import glob from '../../helpers/glob';
import { PageTemplate } from './types';

const CWD = process.cwd();
const PATTERN = 'pages/**/*.js';

const getPagesPaths = async (): Promise<string[]> => glob(PATTERN);

const getPagesTemplate = async (): Promise<Promise<PageTemplate>[]> => {
  const paths = await getPagesPaths();

  return paths.map((path): Promise<PageTemplate> => import(`${CWD}/${path}`));
};

const getPages = async (): Promise<PageTemplate[]> => {
  const templates = await getPagesTemplate();

  return Promise.all(templates);
};

export default {
  getPages,
};
