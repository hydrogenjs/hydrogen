import glob from '../../helpers/glob';
import { LayoutTemplate } from './types';

const CWD = process.cwd();
const PATTERN = 'layouts/**/*.js';

const getLayoutPaths = async (): Promise<string[]> => glob(PATTERN);

const getLayoutTemplates = async (): Promise<Promise<LayoutTemplate>[]> => {
  const paths = await getLayoutPaths();

  return paths.map((path): Promise<LayoutTemplate> => import(`${CWD}/${path}`));
}

const getLayouts = async (): Promise<LayoutTemplate[]> => {
  const templates = await getLayoutTemplates();

  return Promise.all(templates);
};

export default {
  getLayouts,
};
