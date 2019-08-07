import { getPages, getLayouts } from '../file';
import { mergeLayoutsWithPages, generateHTML } from '../template';
import { HTMLObject } from '../template/types';

export const build = async (dev: boolean): Promise<HTMLObject[]> => {
  const [pages, layouts] = await Promise.all([getPages(), getLayouts()]);
  const layoutsWithPages = mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(layoutsWithPages, { dev });

  return htmlPages;
};
