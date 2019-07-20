import { checkIfLayoutAndPageDirectoriesExist, logDirsThatDontExist, checkifBuildFolderExists } from "./helpers";
import { builder } from './build';

export const main = async (): Promise<void | boolean> => {
  const [check, dirs] = await checkIfLayoutAndPageDirectoriesExist();
  
  if (check) {
    logDirsThatDontExist(dirs);
    return false;
  }

  await checkifBuildFolderExists();
  await builder();
};