import fs from 'fs-extra';

import copyExtraStaticFiles from '../../../src/services/file/copyExtraStaticFiles';
import copyStaticFolder from '../../../src/services/file/copyStaticFolder';

jest.mock('fs-extra');

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
});
