import fs from 'fs-extra';
import { normalize } from 'path';
import { getPages, getLayouts, getConfig } from '../file';
import { mergeLayoutsWithPages, generateHTML } from '../template';
import { HTMLObject, PageAndLayoutProperties } from '../template/types';
import { Config } from '../file/types';
import { transformHeadToHTML } from '../head';

const CWD = process.cwd();

const build = async (dev: boolean, config: Config): Promise<HTMLObject[]> => {
  const [pages, layouts] = await Promise.all([getPages(), getLayouts()]);
  const layoutsWithPages = mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(layoutsWithPages, { dev, config });

  return htmlPages;
};

const templateGenerator = async (filename: string): Promise<void|boolean> => {
  if (!filename) {
    console.log('\nNo file provided\n');
    return false;
  }

  console.time('build time');
  const file = await import(normalize(`${CWD}/${filename}`)) as PageAndLayoutProperties;
  const config = await getConfig();

  const data = {
    ...file.data ? await file.data({ dev: false, config }) : {},
  };

  await fs.outputFile(filename.replace('.js', '.html'), await file.page({
    // @ts-ignore
    title: file.title,
    head: file.head ? await transformHeadToHTML({
      head: file.head, data, config, dev: false, route: {},
    }) : '',
    data,
  }));
  console.timeEnd('build time');
};

export { build, templateGenerator };
