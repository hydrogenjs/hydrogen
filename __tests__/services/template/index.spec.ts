import { mergeLayoutsWithPages, generateHTML } from '../../../src/services/template';
import { PageProperties, LayoutProperties } from '../../../src/services/file/types';

const pages: PageProperties[] = [
  {
    name: 'index.js',
    path: 'dist/docs/template-apis/index.html',
    layout: 'default',
    title: 'Template APIs | �🎈 Hydrogen',
    page: (): string => '<p>Hello World</p>',
  },
];

const layouts: LayoutProperties[] = [
  {
    name: 'default',
    default: ({ content }): string => `${content}`,
  },
];

const pageWithData = pages.map((page): PageProperties => ({
  data: async (): Promise<{ name: string }> => ({
    name: 'John',
  }),
  page: ({ data }): string => `<p>${data.name}</p>`,
  ...page,
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

    it('should have a data function', (): void => {
      const [page] = mergeLayoutsWithPages(pageWithData, layouts);

      expect(page.name).toBe('index.js');
      expect(page.path).toBe('dist/docs/template-apis/index.html');
      expect(page.title).toBe('Template APIs | �🎈 Hydrogen');
      expect(page.head).toBe(undefined);
      expect(page).toHaveProperty('data');
      expect(typeof page.layout === 'function').toBe(true);
      expect(typeof page.page === 'function').toBe(true);
      expect(typeof page.data === 'function').toBe(true);
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
  });
});
