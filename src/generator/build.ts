import fs from 'fs-extra';
import cli from 'cli-ux';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import { copyPublicFolder, globFiles, generateHead } from './helpers';

interface Page {
  name: string;
  layout: string;
  title: string;
  page(data: object): string;
  data?({ dev }: { dev: boolean }): Promise<object>;
  path: string;
  head: [string, object][];
}

interface Layout {
  name: string;
  default(): string;
}

interface PageAndLayout {
  name: string;
  title: string;
  layout({ title, content, head, dev }: { title: string; content: string; head: string; dev: boolean }): string;
  page(data: object): string;
  data?({ dev }: { dev: boolean }): Promise<object>;
  path: string;
  head: [string, object][];
}

interface HTMLObject {
  html: string;
  name: string;
  path: string;
}

const CWD = process.cwd();

export const getPages = async (): Promise<Page[]> => {
  const filenames = await globFiles('pages/**/*.js');

  return Promise.all(filenames.map(async (filename): Promise<Page> => ({
    name: filename.split('/').pop(),
    path: filename.replace('pages', 'dist').replace('.js', '.html'),
    ...await import(path.normalize(`${CWD}/${filename}`)),
  })));
};

const getLayouts = async (): Promise<Layout[]> => {
  const filenames = await fs.readdir('./layouts');

  return Promise.all(filenames.map(async (filename): Promise<Layout> => ({
    name: filename.split('.')[0],
    ...await import(path.normalize(`${CWD}/layouts/${filename}`)),
  })));
};

const mergeLayoutsWithPages = (pages: Page[], layouts: Layout[]): PageAndLayout[] => pages
  .map(({ layout, ...otherValues }): PageAndLayout => ({
    layout: layouts.filter(({ name }): boolean => name === layout)[0].default,
    ...otherValues,
  }));

const generateHTML = (pages: PageAndLayout[], dev: boolean): Promise<HTMLObject[]> => Promise.all(pages.map(async (page): Promise<HTMLObject> => ({
  html: await page.layout({ title: page.title, content: await page.page(page.data ? { ...await page.data({ dev }), dev } : { dev }), head: page.head ? page.head.map(generateHead).join('\n') : '', dev }),
  name: page.name.replace('js', 'html'),
  path: page.path,
})));

const saveHTMLToFiles = (pages: HTMLObject[]): Promise<void[]> => Promise.all(pages.map((page): Promise<void> => fs.outputFile(path.normalize(`${CWD}/${page.path}`), page.html)));

export const builder = async (dev: boolean): Promise<void> => {
  if (!dev) {
    console.log(chalk.red(await new Promise((resolve): void => figlet('Hydrogen', (e, data): void => resolve(data)))));
  }

  console.log(`\n${chalk.underline('MODE')}: ${dev ? chalk.red('DEVELOPMENT') : chalk.green('PRODUCTION')}`);

  cli.action.start('Building files');
  console.time('Build time');

  const pages = await getPages();
  const layouts = await getLayouts();
  const mergedLayoutsWithPages = await mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(mergedLayoutsWithPages, dev);

  await saveHTMLToFiles(htmlPages);
  await copyPublicFolder();

  cli.action.stop();
  console.timeEnd('Build time');
  console.log('');
};