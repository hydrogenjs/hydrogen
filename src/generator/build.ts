import fs from 'fs-extra';
import cli from 'cli-ux';

interface Page {
  name: string;
  layout: string;
  title: string;
  page(data: object): string;
  data?(): Promise<object>;
}

interface Layout {
  name: string;
  default(): string;
}

interface PageAndLayout {
  name: string;
  title: string;
  layout({ title, content, dev }: { title: string; content: string; dev: boolean }): string;
  page(data: object): string;
  data?(): Promise<object>;
}

interface HTMLObject {
  html: string;
  name: string;
}

const DEV = process.env.MODE === 'dev';

const getPages = async (): Promise<Page[]> => {
  const filenames = await fs.readdir(`./pages`);

  return Promise.all(filenames.map(async (filename): Promise<Page> => ({
    name: filename,
    ...await import(`${process.env.PWD}/pages/${filename}`),
  })));
};

const getLayouts = async (): Promise<Layout[]> => {
  const filenames = await fs.readdir(`./layouts`);

  return Promise.all(filenames.map(async (filename): Promise<Layout> => ({
    name: filename.split('.')[0],
    ...await import(`${process.env.PWD}/layouts/${filename}`),
  })));
};

const mergeLayoutsWithPages = (pages: Page[], layouts: Layout[]): PageAndLayout[] => pages
  .map(({ layout, ...otherValues }) => ({
    layout: layouts.filter(({ name }) => name === layout)[0].default,
    ...otherValues,
  }));

const generateHTML = (pages: PageAndLayout[]): Promise<HTMLObject[]> => Promise.all(pages.map(async (page) => ({
  html: page.layout({ title: page.title, content: page.page(page.data ? { ...await page.data(), dev: DEV } : { dev: DEV }), dev: DEV }),
  name: page.name.replace('js', 'html'),
})));

const saveHTMLToFiles = (pages: HTMLObject[]): Promise<void[]> =>  Promise.all(pages.map((page) => fs.writeFile(`${process.env.PWD}/dist/${page.name}`, page.html)));

export const builder = async () => {
  cli.action.start('Building files');
  console.time('Build time');

  const pages = await getPages();
  const layouts = await getLayouts();
  const mergedLayoutsWithPages = await mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(mergedLayoutsWithPages);

  await saveHTMLToFiles(htmlPages);

  cli.action.stop();
  console.timeEnd('Build time');
};