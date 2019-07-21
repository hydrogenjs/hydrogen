import { checkIfBuildFolderExists } from '../../src/generator/helpers';
import fs from 'fs-extra'; 

import mock from 'mock-fs';

describe('checkifBuildFolderExists', () => {
  test('should return false if build folder exists', async () => {
    mock({ 'dist': { 'index.html': 'Fake content' }});
    const exists = await checkIfBuildFolderExists();

    expect(exists).toBe(false);
    mock.restore();
  });

  test('should create dist folder if folder does not exist', async () => {
    await checkIfBuildFolderExists();

    const exist = await fs.pathExists('./dist');

    expect(exist).toBe(true);

    await fs.rmdir('./dist');
  });
});