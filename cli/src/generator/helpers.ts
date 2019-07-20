import fs from 'fs-extra';
import chalk from 'chalk';

interface Directory {
  dirName: string;
  exists: boolean;
}

export const checkIfLayoutAndPageDirectoriesExist = async (): Promise<[boolean, Directory[]]> => {
  const directoriesToCheck = ['layouts', 'pages'].map(async (dir: string): Promise<Directory> => ({
    dirName: dir,
    exists: await fs.pathExists(`./${dir}`),
  }));

  return Promise.all(directoriesToCheck).then((dirs: Directory[]): [boolean, Directory[]] => [
    !dirs.every(({ exists }) => !exists),
    dirs.filter(({ exists }) => !exists),
  ]);
};

export const logDirsThatDontExist = (dirs: Directory[]): void => dirs.forEach(({ dirName }) => console.log(`[${chalk.green(dirName)}] folder does not exist ❌`));

export const checkifBuildFolderExists = async (): Promise<boolean | void> => {
  if (await fs.pathExists('./dist')) {
    return false;
  }

  return fs.mkdir('./dist');
};