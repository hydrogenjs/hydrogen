import { checkIfLayoutAndPageDirectoriesExist, logDirsThatDontExist, checkIfBuildFolderExists, getConfig } from './helpers';
import { builder } from './build';

export const main = async (dev: boolean): Promise<void | boolean> => {
  const [check, dirs] = await checkIfLayoutAndPageDirectoriesExist();

  if (check) {
    logDirsThatDontExist(dirs);
    return false;
  }

  const config = await getConfig();

  await checkIfBuildFolderExists();
  await builder(config, dev);
};
