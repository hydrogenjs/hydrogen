import { getPages, getLayouts } from '../file';
import { mergeLayoutsWithPages, generateHTML } from '../template';
import { HTMLObject } from '../template/types';
import { Config } from '../file/types';

export const build = async (dev: boolean, config: Config): Promise<HTMLObject[]> => {
  const [pages, layouts] = await Promise.all([getPages(), getLayouts()]);
  const layoutsWithPages = mergeLayoutsWithPages(pages, layouts);
  const htmlPages = await generateHTML(layoutsWithPages, { dev, config });

  return htmlPages;
};
