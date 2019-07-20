import { checkIfLayoutAndPageDirectoriesExist, logDirsThatDontExist, checkifBuildFolderExists } from "./helpers";

export const main = async (): Promise<void | boolean> => {
  await checkifBuildFolderExists();
  const [check, dirs] = await checkIfLayoutAndPageDirectoriesExist();

  if (check) {
    logDirsThatDontExist(dirs);
    return false;
  }
};