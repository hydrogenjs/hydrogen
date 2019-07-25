import { checkIfLayoutAndPageDirectoriesExist, logDirsThatDontExist, checkIfBuildFolderExists } from "./helpers";
import { builder } from './build';

export const main = async (dev: boolean): Promise<void | boolean> => {
  const [check, dirs] = await checkIfLayoutAndPageDirectoriesExist();
  
  if (check) {
    logDirsThatDontExist(dirs);
    return false;
  }

  await checkIfBuildFolderExists();
  await builder(dev);
};