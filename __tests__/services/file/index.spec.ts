import fs from 'fs-extra';

import copyExtraStaticFiles from '../../../src/services/file/copyExtraStaticFiles';
import copyStaticFolder from '../../../src/services/file/copyStaticFolder';
import getConfig from '../../../src/services/file/getConfig';
import * as Layout from '../../../src/services/file/getLayouts';

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
    });
  });
});
