import fs from 'fs-extra';
declare function require(path: string): any;

const getPages = async () => {
  const pages = await fs.readdir('./pages');

  return pages;
};

export const builder = async () => {
  const pages = await getPages();

  console.log(pages);
};