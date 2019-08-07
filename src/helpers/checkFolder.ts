import fs from 'fs-extra';
import { normalize } from 'path';

const CWD = process.cwd();

export const ifExists = async (folder: string): Promise<{ exists: boolean; name: string }> => ({
  exists: await fs.pathExists(normalize(`${CWD}/${folder}`)),
  name: folder,
});

export const doFoldersExist = async (): Promise<boolean> => {
  const folders = await Promise.all([ifExists('pages'), ifExists('layouts')]);

  return folders.every(({ exists }): boolean => exists);
};
