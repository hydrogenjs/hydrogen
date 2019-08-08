import fs from 'fs-extra';
import beautify from 'js-beautify';
import { normalize } from 'path';
import { getServiceWorker } from '../file';
import glob from '../../helpers/glob';
import { Path } from './types';

const CWD = process.cwd();

export const generateSW = async (sw: string | undefined = 'sw.js'): Promise<void> => {
  const pages = await glob('pages/**/*.js');
  const file = await getServiceWorker(sw);

  const paths = pages.map((page): Path => {
    const path = page.replace('pages', '').replace('.js', '.html').split('/');
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
    const routes = ${JSON.stringify(paths, null, 3)}

    ${file}
  `;

  const cleanUpFile = beautify(serviceWorker, { indent_size: 2, keep_array_indentation: true });

  return fs.outputFile(normalize(`${CWD}/dist/${sw}`), cleanUpFile);
};
