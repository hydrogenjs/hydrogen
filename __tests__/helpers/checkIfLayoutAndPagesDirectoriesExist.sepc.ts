import { checkIfLayoutAndPageDirectoriesExist } from '../../src/generator/helpers';
import mock from 'mock-fs';

const fsConfig = {
  'layouts': {
    'default.js': 'Fake content',
  },
  'pages': {
    'index.js': 'Fake content',
  },
};

describe('checkIfLayoutAndPagesDirectoriesExist', () => {
  test('should be true if directories do not exist', async () => {
    const [check] = await checkIfLayoutAndPageDirectoriesExist();

    expect(check).toBe(true);
  });

  test('should be array length of 2 if directories do not exist', async () => {
    const [, dirs] = await checkIfLayoutAndPageDirectoriesExist();

    expect(dirs.length).toBe(2);
  });

  test('should be false if directories do exist', async () => {
    mock(fsConfig, { createCwd: false, createTmp: false });

    const [check] = await checkIfLayoutAndPageDirectoriesExist();

    expect(check).toBe(false);

    mock.restore();
  });

  test('should be array of length 0 if directories do exist', async () => {
    mock(fsConfig, { createCwd: false, createTmp: false });

    const [, dirs] = await checkIfLayoutAndPageDirectoriesExist();

    expect(dirs.length).toBe(0);

    mock.restore();
  });
});