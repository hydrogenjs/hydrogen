import { mergeLayoutsWithPages, generateHTML } from '../../../src/services/template';
import { PageProperties, LayoutProperties } from '../../../src/services/file/types';
import { HeadTag } from '../../../src/services/head/types';

const pages: PageProperties[] = [
  {
    name: 'index.js',
    path: 'dist/docs/template-apis/index.html',
    layout: 'default',
    title: 'Template APIs | �🎈 Hydrogen',
    dynamic: false,
    route: {
      data: {},
      hash: '',
    },
    page: (): string => '<p>Hello World</p>',
  },
];

const layouts: LayoutProperties[] = [
  {
    name: 'default',
    default: ({ content }): string => `${content}`,
  },
];

// @ts-ignore
const pagesWithNoLayout = pages.map(({ layout, ...otherValues }) => ({ ...otherValues }));

const pagesWithData = pages.map(({ page, ...otherValues }): PageProperties => ({
  data: async (): Promise<{ name: string }> => ({
    name: 'John',
  }),
  page: ({ data }): string => `<p>${data.name}</p>`,
  ...otherValues,
}));

const pagesWithHead = pages.map((page): PageProperties => ({
  head: async (): Promise<HeadTag[]> => [
    ['link', { rel: 'stylesheet', href: 'https://main.css' }, false],
  ],
  ...page,
}));

const layoutsForHead = layouts.map(({ name }): LayoutProperties => ({
  name,
  default: ({ head }): string => `${head}`,
}));

describe('Template API', (): void => {
  describe('mergeLayoutsWithPages', (): void => {
    it('should merge a layout template with the related page template', (): void => {
      const [page] = mergeLayoutsWithPages(pages, layouts);

      expect(page.name).toBe('index.js');
      expect(page.path).toBe('dist/docs/template-apis/index.html');
      expect(page.title).toBe('Template APIs | �🎈 Hydrogen');
      expect(page.data).toBe(undefined);
      expect(page.head).toBe(undefined);
      expect(typeof page.layout === 'function').toBe(true);
      expect(typeof page.page === 'function').toBe(true);
    });

    it('should merge default layout template with the related page template if layout is unknown', (): void => {
      const [page] = mergeLayoutsWithPages(pagesWithNoLayout, layouts);

      expect(page.name).toBe('index.js');
      expect(page.path).toBe('dist/docs/template-apis/index.html');
      expect(page.title).toBe('Template APIs | �🎈 Hydrogen');
      expect(page.data).toBe(undefined);
      expect(page.head).toBe(undefined);
      expect(typeof page.layout === 'function').toBe(true);
      expect(typeof page.page === 'function').toBe(true);
    });

    it('should have a data function', (): void => {
      const [page] = mergeLayoutsWithPages(pagesWithData, layouts);

      expect(page.name).toBe('index.js');
      expect(page.path).toBe('dist/docs/template-apis/index.html');
      expect(page.title).toBe('Template APIs | �🎈 Hydrogen');
      expect(page.head).toBe(undefined);
      expect(page).toHaveProperty('data');
      expect(typeof page.layout === 'function').toBe(true);
      expect(typeof page.page === 'function').toBe(true);
      expect(typeof page.data === 'function').toBe(true);
    });

    it('should have a head function', (): void => {
      const [page] = mergeLayoutsWithPages(pagesWithHead, layouts);

      expect(page.name).toBe('index.js');
      expect(page.path).toBe('dist/docs/template-apis/index.html');
      expect(page.title).toBe('Template APIs | �🎈 Hydrogen');
      expect(page.data).toBe(undefined);
      expect(page).toHaveProperty('head');
      expect(typeof page.layout === 'function').toBe(true);
      expect(typeof page.page === 'function').toBe(true);
      expect(typeof page.head === 'function').toBe(true);
    });
  });

  describe('generateHTML', (): void => {
    it('should take merged layout and page template and generate an HTMLObject', async (): Promise<void> => {
      const layoutsWithPages = mergeLayoutsWithPages(pages, layouts);
      const [generatedPage] = await generateHTML(layoutsWithPages, { dev: true, config: {} });

      expect(generatedPage.name).toBe('index.html');
      expect(generatedPage.path).toBe('dist/docs/template-apis/index.html');
      expect(generatedPage.html).toBe('<p>Hello World</p>');
    });

    it('should have output of data function in generated HTMLObject', async (): Promise<void> => {
      const layoutsWithPages = mergeLayoutsWithPages(pagesWithData, layouts);
      const [generatedPage] = await generateHTML(layoutsWithPages, { dev: true, config: {} });

      expect(generatedPage.name).toBe('index.html');
      expect(generatedPage.path).toBe('dist/docs/template-apis/index.html');
      expect(generatedPage.html).toBe('<p>John</p>');
    });

    it('should have output of head function in generated HTMLObject', async (): Promise<void> => {
      const layoutsWithPages = mergeLayoutsWithPages(pagesWithHead, layoutsForHead);
      const [generatedPage] = await generateHTML(layoutsWithPages, { dev: true, config: {} });

      expect(generatedPage.name).toBe('index.html');
      expect(generatedPage.path).toBe('dist/docs/template-apis/index.html');
      expect(generatedPage.html).toBe('<link rel="stylesheet" href="https://main.css" />');
    });
  });
});
