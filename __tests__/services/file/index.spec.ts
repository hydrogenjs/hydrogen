import copyExtraStaticFiles from '../../../src/services/file/copyExtraStaticFiles';

global.Promise = jest.requireActual('promise');

jest.mock('fs');
jest.mock('path');

describe('File API', (): void => {
  describe('copyExtraStaticFiles', (): void => {
    test('function should return empty array', async (): Promise<void> => {
      const res = await copyExtraStaticFiles([]);

      expect(res).toMatchObject([]);
    });
  });
});
