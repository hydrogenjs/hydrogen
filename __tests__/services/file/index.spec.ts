import fs from 'fs-extra';

import copyExtraStaticFiles from '../../../src/services/file/copyExtraStaticFiles';
import copyStaticFolder from '../../../src/services/file/copyStaticFolder';
import getConfig from '../../../src/services/file/getConfig';
import getLayouts from '../../../src/services/file/getLayouts';

jest.mock('fs-extra');
jest.mock('path');
jest.mock('../../../src/services/file/getLayouts');

describe('File API', (): void => {
  describe('copyExtraStaticFiles', (): void => {
    test('function should return empty array', async (): Promise<void> => {
      const res = await copyExtraStaticFiles([]);

      expect(res).toMatchObject([]);
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
      const getLayoutsMock = getLayouts as jest.Mock;
      const mock = getLayoutsMock.mockReturnValue([{ name: 'default', default: (): string => '' }]);

      const [{ name, default: fn }] = await mock();

      expect(name).toBe('default');
      expect(typeof fn).toBe('function');
      expect(mock).toBeCalledTimes(1);
    });
  });
});
