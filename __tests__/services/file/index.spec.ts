import fs from 'fs-extra';

import copyExtraStaticFiles from '../../../src/services/file/copyExtraStaticFiles';
import copyStaticFolder from '../../../src/services/file/copyStaticFolder';
import getConfig from '../../../src/services/file/getConfig';
import * as Layout from '../../../src/services/file/getLayouts';
import * as Page from '../../../src/services/file/getPages';
import getServiceWorker from '../../../src/services/file/getServiceWorker';
import { LayoutProperties, PageProperties } from '../../../src/services/file/types';

jest.mock('fs-extra');
jest.mock('path');

describe('File API', (): void => {
  describe('copyExtraStaticFiles', (): void => {
    test('function should return array of undefined', async (): Promise<void> => {
      const res = await copyExtraStaticFiles(['/layouts/default.js', '/layouts/no-header.js']);

      expect(res).toMatchObject([undefined, undefined]);
    });
  });

  describe('copyStaticFolder', (): void => {
    test('function should return undefined ', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(true);

      const res = await copyStaticFolder();
      expect(res).toBeUndefined();
    });

    test('function should return false', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(false);

      const res = await copyStaticFolder();
      expect(res).toBe(false);
    });
  });

  describe('getConfig', (): void => {
    test('function should return empty object', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(false);

      const res = await getConfig();
      expect(res).toMatchObject({});
    });

    test('function should return a module', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(true);

      const res = await getConfig();
      expect(typeof res).toBe('object');
      expect(res).toHaveProperty('default');
    });
  });

  describe('getLayouts', (): void => {
    test('function should return array of layout templates', async (): Promise<void> => {
      const getLayoutPathsSpy = jest.spyOn(Layout, 'getLayoutPaths');
      const getLayoutTemplatesSpy = jest.spyOn(Layout, 'getLayoutTemplates');

      getLayoutPathsSpy.mockReturnValue(Promise.resolve(['layout/default.js']));
      getLayoutTemplatesSpy.mockReturnValue(Promise.resolve([Promise.resolve({ name: 'default', default: ({ title }): string => `<title>${title}</title>` })]));

      const [{ name, default: fn }] = await Layout.getLayouts();

      expect(getLayoutPathsSpy).toHaveBeenCalledTimes(1);
      expect(getLayoutTemplatesSpy).toHaveBeenCalledTimes(1);
      expect(name).toBe('default');
      expect(typeof fn).toBe('function');
      expect(fn({
        title: 'Hello World',
        content: '<p>Hello World</p>',
        head: '<meta name="test" description="test">',
        config: {},
        dev: false,
      })).toBe('<title>Hello World</title>');

      getLayoutPathsSpy.mockRestore();
      getLayoutTemplatesSpy.mockRestore();

      const [first] = await Layout.getLayoutTemplates(['layout/default.js']).then((temp): Promise<LayoutProperties[]> => Promise.all(temp));

      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('default');
      expect(typeof first.default).toBe('function');
    });
  });

  describe('getPages', (): void => {
    test('function should return array of page templates', async (): Promise<void> => {
      const getPagesPathsSpy = jest.spyOn(Page, 'getPagesPaths');
      const getPagesTemplateSpy = jest.spyOn(Page, 'getPagesTemplate');

      getPagesPathsSpy.mockReturnValue(Promise.resolve(['pages/index.js']));
      getPagesTemplateSpy.mockReturnValue(Promise.resolve([
        Promise.resolve({
          name: 'index.js',
          path: 'dist/index.html',
          title: 'Hello World',
          page: ({ data }): string => `<p>${data.name}</p>`,
        }),
      ]));

      const res = await Page.getPages().then((temp): Promise<PageProperties[]> => Promise.all(temp));

      expect(res[0].name).toBe('index.js');
      expect(res[0].path).toBe('dist/index.html');
      expect(res[0].title).toBe('Hello World');
      expect(res[0].page({ data: { name: 'John' }, config: {}, dev: true })).toBe('<p>John</p>');

      const [first] = await Page.getPagesTemplate(['pages/index.js']).then((temp): Promise<PageProperties[]> => Promise.all(temp));

      expect(first.name).toBe('index.js');
      expect(first.path).toBe('dist/index.html');
      expect(first.title).toBe('Hello World');
      expect(first.page({ data: { name: 'John' }, config: {}, dev: true })).toBe('<p>John</p>');
    });
  });

  describe('getServiceWorker', (): void => {
    test('function should return undefined', async (): Promise<void> => {
      const res = await getServiceWorker();

      expect(res).toBeUndefined();
    });

    test('function should return undefined when file does not exist', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(false);
      const res = await getServiceWorker('sw.js');

      expect(res).toBeUndefined();
    });

    test('function should return a file', async (): Promise<void> => {
      fs.pathExists = jest.fn().mockReturnValue(true);
      fs.readFile = jest.fn().mockReturnValue('self.addEventListener(\'install\', () => {})');

      const res = await getServiceWorker('sw.js');

      expect(res).toBe('self.addEventListener(\'install\', () => {})');
    });
  });
});
