import { PageProperties, LayoutProperties } from '../file/types';
import { PageAndLayoutProperties, HTMLObject, Options } from './types';
import { transformHeadToHTML } from '../head';

export const mergeLayoutsWithPages = (pages: PageProperties[], layouts: LayoutProperties[]): PageAndLayoutProperties[] => pages
  .map(({ layout, ...otherValues }): PageAndLayoutProperties => ({
    layout: layouts.filter(({ name }): boolean => name === layout)[0].default,
    ...otherValues,
  }));

export const generateHTML = (pages: PageAndLayoutProperties[], { dev, config }: Options): Promise<HTMLObject[]> => Promise.all(pages.map(async (page): Promise<HTMLObject> => {
  const pageData = page.data ? await page.data({ dev, config }) : {};

  const pageHead = transformHeadToHTML({
    head: page.head,
    data: pageData,
    config,
    dev,
  });

  const pageTemplate = page.page({
    data: pageData,
    config,
    dev,
  });

  const layoutTemplate = await page.layout({
    title: page.title,
    content: await pageTemplate,
    head: await pageHead,
    config,
    dev,
  });

  return {
    html: layoutTemplate,
    name: page.name.replace('js', 'html'),
    path: page.path,
  };
}));
