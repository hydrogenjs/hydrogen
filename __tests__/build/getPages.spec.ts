import { getPages } from '../../src/generator/build';
import mock from 'mock-fs';

const fsConfig = {
  pages: {
    'index.js': `
      module.exports = {
        title: 'HomePage',
        layout: 'default',
        page: ({ name, dev }) => '',
        data: () => ({ name: 'John' }),
      }
    `
  }
};

describe('getPages', () => {
  test('should be an array of length 0', async () => {
    mock({ pages: {} });
    const pages = await getPages();

    expect(pages.length).toBe(0);
    mock.restore();
  });

  test('should be an array of length 1', async () => {
    mock(fsConfig);
    const pages = await getPages();

    expect(pages.length).toBe(1);
    mock.restore();
  });
});