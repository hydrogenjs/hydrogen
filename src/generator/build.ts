import fs from 'fs-extra';
import cli from 'cli-ux';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import { copyPublicFolder, globFiles, transformHeadToHTML } from './helpers';

interface Path {
  route: string;
  file?: string;
}
interface LayoutArgs {
  title: string;
  content: string;
  head: string;
  config: Config;
  path: Path;
  dev: boolean;
}

interface PageArgs {
  config: Config;
  dev: boolean;
}

interface DataArgs {
  config: object;
  dev: boolean;
}

interface HeadArgs {
  config: object;
}

interface Page {
  name: string;
  layout: string;
  title: string;
  page(args: PageArgs): string;
  data?({ config, dev }: DataArgs): Promise<object>;
  path: string;
  head({ config }: HeadArgs): Promise<[string, object][]>;
}

interface Layout {
  name: string;
  default(): string;
}

interface PageAndLayout {
  name: string;
  title: string;
  layout(args: LayoutArgs): string;
  page(args: PageArgs): string;
  data?({ config, dev }: DataArgs): Promise<object>;
  path: string;
  head({ config }: HeadArgs): Promise<[string, object][]>;
}

interface HTMLObject {
  html: string;
  name: string;
  path: string;
}

export interface Config {
  name?: string;
  staticFolder?: string;
  head?({ config }: HeadArgs): Promise<[string, object][]>;
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

const generateHTML = (pages: PageAndLayout[], config: Config, dev: boolean): Promise<HTMLObject[]> => Promise.all(pages.map(async (page): Promise<HTMLObject> => {

  const data = page.data ? { ...await page.data({ config, dev }), config, path: page.path, dev } : { config, path: page.path, dev };

  const route = page.path.replace('dist', '').split('/');
  const file = route.pop();

  console.log(route.join('/'));

  return {
    html: await page.layout({
      title: page.title,
      content: await page.page(data),
      // @ts-ignore
      head: page.head ? await transformHeadToHTML(page.head, data, config) : '',
      config,
      path: {
        route: route.join('/') || '/',
        file,
      },
      dev,
    }),
    name: page.name.replace('js', 'html'),
    path: page.path,
  };
}));

const saveHTMLToFiles = (pages: HTMLObject[]): Promise<void[]> => Promise.all(pages.map((page): Promise<void> => fs.outputFile(path.normalize(`${CWD}/${page.path}`), page.html)));

export const builder = async (config: Config, dev: boolean): Promise<void> => {
  if (!dev) {
    console.log(chalk.red(await new Promise((resolve): void => figlet('Hydrogen', (e, data): void => resolve(data)))));
  }

  console.log(`\n${chalk.underline('MODE')}: ${dev ? chalk.red('DEVELOPMENT') : chalk.green('PRODUCTION')}`);

  cli.action.start('Building files');
  console.time('Build time');

  const pages = await getPages();
  const layouts = await getLayouts();
  const mergedLayoutsWithPages = await mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(mergedLayoutsWithPages, config, dev);

  await saveHTMLToFiles(htmlPages);
  await copyPublicFolder(config.staticFolder);

  cli.action.stop();
  console.timeEnd('Build time');
  console.log('');
};