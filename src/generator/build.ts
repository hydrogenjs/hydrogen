import fs from 'fs-extra';

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
  layout({ title, content }: { title: string; content: string }): string;
  page(data: object): string;
  data?(): Promise<object>;
}

interface HTMLObject {
  html: string;
  name: string;
}

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
  html: page.layout({ title: page.title, content: page.page(page.data ? await page.data() : {}) }),
  name: page.name.replace('js', 'html'),
})));

const saveHTMLToFiles = (pages: HTMLObject[]) => pages.map((page) => fs.writeFile(`${process.env.PWD}/dist/${page.name}`, page.html));

export const builder = async () => {
  const pages = await getPages();
  const layouts = await getLayouts();
  const mergedLayoutsWithPages = await mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(mergedLayoutsWithPages);

  saveHTMLToFiles(htmlPages);
};