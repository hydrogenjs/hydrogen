import fs from 'fs-extra';

const getPages = async () => {
  const filenames = await fs.readdir(`./pages`);

  return Promise.all(filenames.map(async filename => ({
    name: filename,
    ...await import(`${process.env.PWD}/pages/${filename}`),
  })));
};

const getLayouts = async () => {
  const filenames = await fs.readdir(`./layouts`);

  return Promise.all(filenames.map(async filename => ({
    name: filename.split('.')[0],
    ...await import(`${process.env.PWD}/layouts/${filename}`),
  })));
};

const generateHTML = (pages) => Promise.all(pages.map(async (page) => ({
  html: page.layout({ title: page.title, content: page.page(page.data ? await page.data() : {}) }),
  name: page.name.replace('js', 'html'),
})));

const mergeLayoutsWithPages = (pages, layouts) => pages
  .map(({ layout, ...otherValues }) => ({
    layout: layouts.find(({ name }) => name === layout).default,
    ...otherValues
  }));

const saveHTMLToFiles = (pages) => pages.map((page) => fs.writeFile(`${process.env.PWD}/dist/${page.name}`, page.html));

export const builder = async () => {
  const pages = await getPages();
  const layouts = await getLayouts();
  const mergedLayoutsWithPages = mergeLayoutsWithPages(pages, layouts);

  const htmlPages = await generateHTML(mergedLayoutsWithPages);

  saveHTMLToFiles(htmlPages);
};