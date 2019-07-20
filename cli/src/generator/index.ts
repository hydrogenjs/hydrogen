import { checkIfLayoutAndPageDirectoriesExist, logDirsThatDontExist } from "./helpers";

export const main = async (): Promise<void | boolean> => {
  const [check, dirs] = await checkIfLayoutAndPageDirectoriesExist();

  if (check) {
    logDirsThatDontExist(dirs);
    return false;
  }
};