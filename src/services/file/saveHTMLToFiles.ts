import fs from 'fs-extra';
import path from 'path';
import { HTMLObject } from '../template/types';

const CWD = process.cwd();

const saveHTMLToFiles = (pages: HTMLObject[]): Promise<void[]> => Promise
  .all(pages.map((page): Promise<void> => fs.outputFile(path.normalize(`${CWD}/${page.path}`), page.html)));

export default saveHTMLToFiles;
