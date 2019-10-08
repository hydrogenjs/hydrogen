import { normalize } from 'path';
import glob from '../../helpers/glob';
import { PageProperties } from './types';
import getRoutes from './getRoutes';

const CWD = process.cwd();
const PATTERN = 'pages/**/*.js';

type Paths = string[];

export {
  getRoutes,
};

export const getPagesPaths = async (): Promise<Paths> => glob(PATTERN);

export const getPagesTemplate = async (paths: Paths): Promise<Promise<PageProperties>[]> => paths
  .map(async (path): Promise<PageProperties> => ({
    name: path.split('/').pop(),
    path: path.replace('pages', 'dist').replace('.js', '.html'),
    dynamic: path.includes('_'),
    ...await import(normalize(`${CWD}/${path}`)),
  }));

export const getPages = async (): Promise<PageProperties[]> => {
  const paths = await getPagesPaths();
  const routes = await getRoutes();
  const templates = await getPagesTemplate(paths);

  const dynamicRoutes = await routes;

  const resolvedTemplates = await Promise.all(templates);

  const dynamicTemplates = dynamicRoutes.map((route): PageProperties => {
    const [, ...routePaths] = route.path.split('/');
    const [pageName, ...urlPaths] = routePaths.reverse();

    const createURLPath = urlPaths.reverse().join('/');

    // @ts-ignore
    const { path, ...otherValues } = resolvedTemplates
      .find((template): boolean => template.dynamic && template.path.includes(createURLPath));

    return {
      path: path.replace('_', `${pageName}/`),
      route,
      ...otherValues,
    };
  });

  return [...dynamicTemplates, ...resolvedTemplates.filter((template): boolean => !template.dynamic)];
};

export default getPages;
