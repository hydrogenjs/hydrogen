import glob from '../../helpers/glob';
import { LayoutProperties } from './types';

const CWD = process.cwd();
const PATTERN = 'layouts/**/*.js';

const getLayoutPaths = async (): Promise<string[]> => glob(PATTERN);

const getLayoutTemplates = async (paths: string[]): Promise<Promise<LayoutProperties>[]> => paths
  .map(async (path): Promise<LayoutProperties> => {
    const filename = path.split('/').pop() as string;

    return {
      name: filename.split('.')[0],
      ...await import(`${CWD}/${path}`),
    };
  });

const getLayouts = async (): Promise<LayoutProperties[]> => {
  const paths = await getLayoutPaths();
  const templates = await getLayoutTemplates(paths);

  return Promise.all(templates);
};

export default {
  getLayouts,
};
