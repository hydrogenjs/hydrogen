import fs from 'fs-extra';
import beautify from 'js-beautify';
import { normalize } from 'path';
import { getServiceWorker } from '../file';
import glob from '../../helpers/glob';
import { Path } from './types';

const CWD = process.cwd();
const SW_DEFAULT_TEMPLATE = 'sw.js';

export const generateSW = async (sw: string | undefined = SW_DEFAULT_TEMPLATE, dev: boolean): Promise<void> => {
  const [pages, swFile] = await Promise.all([
    glob('dist/**/*.html'),
    getServiceWorker(sw),
  ]);

  const { version: cacheVersion } = await fs.readJSON(normalize(`${CWD}/package.json`));

  const paths = pages.map((page): Path => {
    const path = page.replace('dist', '').split('/');
    const filename = path.pop() as string;
    const route = path.join('/') || '/';

    return {
      route,
      filename,
      index: filename === 'index.html',
      depth: path.length - 1,
    };
  }).sort((a, b): number => a.depth - b.depth);

  const serviceWorker = `
    const DEV = ${JSON.stringify(dev)};
    const CACHE_VERSION = ${JSON.stringify(cacheVersion)};
    const routes = ${JSON.stringify(paths, null, 3)};

    ${swFile}
  `;

  const cleanUpFile = beautify(serviceWorker, { indent_size: 2, keep_array_indentation: true });

  return fs.outputFile(normalize(`${CWD}/dist/${sw}`), cleanUpFile);
};
