import fs from 'fs-extra';
import path from 'path';
import { HTMLObject } from '../template/types';
import getHooks from './getHooks';

const CWD = process.cwd();

const saveHTMLToFiles = (pages: HTMLObject[]): Promise<void[]> => Promise
  .all(pages.map(async (page): Promise<void> => {
    const hooks = await getHooks();

    await hooks?.beforeEachPageSaved?.(page);

    return fs.outputFile(path.normalize(`${CWD}/${page.path}`), page.html)
      .then((): Promise<void> | undefined => hooks?.afterEachPageGenerated?.(page));
  }));

export default saveHTMLToFiles;
