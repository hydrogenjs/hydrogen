import mockFs from 'mock-fs';
import glob from '../../src/helpers/glob';

describe('Helpers', (): void => {
  test('glob should return array of file paths', async (): Promise<void> => {
    mockFs({
      'layouts/default.js': `
        module.exports = () => \`\`
      `,
      'layouts/no-header.js': `
        module.exports = () => \`\`
      `,
    });

    const res = await glob('layouts/**/*.js');

    mockFs.restore();

    expect(res).toEqual(['layouts/default.js', 'layouts/no-header.js']);
  });
});
