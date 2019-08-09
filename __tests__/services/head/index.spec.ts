import { transformHeadToHTML } from '../../../src/services/head';
import { HeadTag } from '../../../src/services/head/types';

const head = async (): Promise<HeadTag[]> => [
  ['link', { rel: 'stylesheet', href: '/public/css/main.css' }, false],
  ['script', { src: '/public/js/script.js' }, true],
];

const expectedOutput = '<link rel="stylesheet" href="/public/css/main.css" /><script src="/public/js/script.js"></script>';

describe('Head API', (): void => {
  describe('transformHeadToHTML', (): void => {
    it('should return a string if given an array of head tags', async (): Promise<void> => {
      const HEAD = await transformHeadToHTML({
        head,
        data: {},
        config: {},
        dev: true,
      }).then((res): string => res.replace(/\n/g, '').trim());

      expect(HEAD).toBe(expectedOutput);
    });
  });
});
